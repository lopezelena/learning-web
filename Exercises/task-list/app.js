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
                    <button class="btn-delete">🪣</button>
                    `

        console.log(li);
        this.element = li;
    }
}

function addTask(){

    const id = new Date().getTime();
    const taskText = inputId.value.trim(); /* trim elimina los espacios del principio y del final de la frase*/
    const taskToAdd = new Task(id, taskText); 
    taskList.prepend(taskToAdd.element)
    inputId.value = "";
}
