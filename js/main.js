function initializeToolTips(){
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
}

initializeToolTips();

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
        this.#liElm.querySelector(".delete").addEventListener('click', ()=>{
            this.#liElm.remove();
        });
        this.#liElm.querySelector(".edit").addEventListener('click', ()=>{
            txtTaskElm.value = this.description;
            btnAddElm.innerText = "UPDATE";
            txtTaskElm.focus();
            selectedTask = this;
        });
    }

    addItemTolist(){
        const ulElm = document.querySelector("ul");
        const liElm = document.createElement('li');
        liElm.className = 'd-flex flex-row justify-content-between p-2 align-items-center px-2 py-2';
        liElm.innerHTML = `
        <div class="form-check">
            <input ${this.checked ? 'checked' : ''} 
            class="form-check-input" type="checkbox" value="" id="chk-${this.id}">
            <label class="form-check-label" for="chk-${this.id}">
            ${this.description}
        </label>
        </div>
        <div class="d-flex gap-2 ">
            <i class="edit bi bi-pencil-fill"></i>
            <i class="delete bi bi-trash-fill"></i>
        </div>
        `;
        ulElm.prepend(liElm);
        initializeToolTips();
        return liElm;
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
            console.log("worrrrrrrrrrrrrrking")
            new TaskItem(lastTaskId, text);
        }
        txtInputElm.value = '';
        txtInputElm.focus();
    }else{
        txtInputElm.focus();
        txtInputElm.select();
    }
});
txtInputElm.addEventListener('keypress', (e)=>{
    if (e.key === "Enter") btnAddElm.click();
});