

const btnAddElm = document.querySelector('#btn-add');
const txtInputElm = document.querySelector('#txt-input');
let lastTaskId = 0;
let selectedTask = null;

class TaskItem {
    id;
    checked;
    #description
    #liElm

    get description(){
        return this.#description;
    }
    set description(value){
        this.#description = value;
        if (this.#liElm)
            this.#liElm.querySelector('label').innertext = value;
    }

    constructor (id, description, checked=false){
        this.id = id;
        this.checked = checked;
        this.description = description;
        this.#liElm= this.addItemTolist();
    }

    addItemTolist(){
        const ulElm = document.querySelector("ul");
        const liElm = document.createElement('li');
        liElm.className = 'd-flex flex-row justify-content-between p-2 align-items-center px-2 py-2';
        liElm.innerHTML = `
        <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
            <label class="form-check-label" for="flexCheckDefault">
            Description
        </label>
        </div>
        <div class="d-flex gap-2 ">
            <i class="bi bi-pencil-fill"></i>
            <i class="bi bi-trash-fill"></i>
        </div>
        `;
    }
}

btnAddElm.addEventListener('click', ()=> {
    const text =  txtInputElm.value.trim();
    if(text) {
        if(selectedTask !== null) {
            selectedTask.description = text;
            selectedTask=null;
            btnAddElm.innerText = "ADD";
        }else {
            new TaskItem(lastTaskId, text);
        }
        txtTaskElm.value = '';
        txtTaskElm.focus();
    }else{
        txtInputElm.focus();
        txtInputElm.select();
    }
});