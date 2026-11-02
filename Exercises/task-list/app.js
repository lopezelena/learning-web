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
        li.innerHTML = `
                    <div class="task-container">
                    <button class="btn-check"> ✓ </button>
                    <span class="task-name">${this.text}</span>
                    </div>
                    <button class="btn-delete"><span class="material-symbols-outlined">delete</span></button>
                    `
        const btnCheck = li.querySelector(".btn-check"); /*Incluimos el escuchador para invocar la función que cambia la clase de la tarea a class= item done*/
        btnCheck.addEventListener("click",() => this.finishTask());

        const btnDelete = li.querySelector(".btn-delete"); /*Incluimos el escuchador para invocar la función delete task y unir botón con función*/
        btnDelete.addEventListener("click",() => this.deleteTask());
        
        
        console.log(li);
        this.element = li;
    }

    finishTask(){
        this.isCompleted = !this.isCompleted; /* Cambiamos el valor de thiscompleted que al principio de la página era = falso */
        this.element.classList.toggle("done");
    }

    deleteTask(){
        this.element.remove()
        
    }
}

function addTask(){
    const id = new Date().getTime();
    const taskText = inputId.value.trim(); /* trim elimina los espacios del principio y del final de la frase*/

    if(taskText !== ""){ /*Este if hace que si el valor es un elemento vacío que la tarea no se agrege*/ 
    const taskToAdd = new Task(id, taskText); 
    taskList.prepend(taskToAdd.element)
    inputId.value = "";
    }
}


