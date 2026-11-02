//Elementos importantes

const taskList = document.getElementById("task-list");
const inputId = document.getElementById("input-id");
const btnAdd = document.getElementById("btn-add");

//Clase tarea

class Task{
    constructor(id, text, isCompleted = false){
        this.id = id;
        this.text = text;
        this.isCompleted = isCompleted;
        this.element = null; /*creas como un espacio para li (elemento de la lista), creamos el elemento más abajo y en él incluímos this.text*/

        this.createElement()
    }

    createElement(){
        let li = document.createElement("li");
        li.className = "task-item"
        if (this.isCompleted){
            li.classList.add('done')
        }
        li.innerHTML = `
                    <div class="task-container">
                    <button class="btn-check"> ✓ </button>
                    <span class="task-name">${this.text}</span>
                    </div>
                    <button class="btn-delete"><span class="material-symbols-outlined">delete</span></button>
                    ` /*<- A pesar de haber borrado los li de html aquí se establece el formato*/
        const btnCheck = li.querySelector(".btn-check"); /*Incluimos el escuchador para invocar la función que cambia la clase de la tarea a class= item done*/
        btnCheck.addEventListener("click",() => this.finishTask());

        const btnDelete = li.querySelector(".btn-delete"); /*Incluimos el escuchador para invocar la función delete task y unir botón con función*/
        btnDelete.addEventListener("click",() => this.deleteTask());
        
        
        console.log(li);
        this.element = li;
    }

    finishTask(){
        this.isCompleted = !this.isCompleted; /* Cambiamos el valor de thiscompleted que al principio de la página era = falso */
        this.saveToLocalStorage();
        this.element.classList.toggle("done");
    }

    deleteTask(){
        localStorage.removeItem('task_', '')
        this.element.remove()
        
    }

    saveToLocalStorage(){
        const data = {
            text: this.text,
            isCompleted: this.isCompleted
        }

        localStorage.setItem('task_'+this.id, JSON.stringify(data)) /* Guardo data en loal storage */
    }

}

function addTask(){
    const id = new Date().getTime();
    const taskText = inputId.value.trim(); /* trim elimina los espacios del principio y del final de la frase*/

    if(taskText !== ""){ /*Este if hace que si el valor es un elemento vacío que la tarea no se agrege*/ 
    const taskToAdd = new Task(id, taskText); 
    taskToAdd.saveToLocalStorage()
    taskList.prepend(taskToAdd.element)
    inputId.value = "";
    }
}

function loadTask() {/* Sacamos del storage nuestras tareas guardadas */
    for(let i=0; i < localStorage.length; i++){
        const key = localStorage.key(i);

        if (key.startsWith('task_')){
            const id = key.replace('task_','')
            const data = JSON.parse(localStorage.getItem(key))
            const loadedTask = new Task(id, data.text, data.isCompleted)
            taskList.prepend(loadedTask.element);
        }
    }

}

loadTask()