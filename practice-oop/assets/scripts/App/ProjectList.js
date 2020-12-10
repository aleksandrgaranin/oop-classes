import { ProjectItem } from './ProjectItem.js'
import { DOMHelper } from '../Utility/DOMHelper.js'

export class ProjectList {
    projects = []
    constructor(type){
        this.type = type;
        const prjItems = document.querySelectorAll(`#${this.type}-projects li`);
        // console.log(prhItems)
        for (const prjItem of prjItems){
            this.projects.push(new ProjectItem(prjItem.id, this.switchProject.bind(this), this.type))
        }
        console.log(this.projects);
        this.connerctDroppable()
    }

    connerctDroppable() {
        const list = document.querySelector(`#${this.type}-projects ul`);

        list.addEventListener('dragenter', event => {
            if(event.dataTransfer.types[0] === 'text/plain') {
                list.parentElement.classList.add('droppable');
                event.preventDefault();
            }
        });

        list.addEventListener('dragover', event => {
            if(event.dataTransfer.types[0] === 'text/plain') {
                event.preventDefault();
            }
        });

        list.addEventListener('dragleave', event => {
            if(event.relatedTarget.closest(`#${this.type}-projects ul`) !== list){
                list.parentElement.classList.remove('droppable');
            }
        })

        list.addEventListener('drop', event => {
            const prjId = event.dataTransfer.getData('text/plain');
            if (this.projects.find(p => p.id === prjId)){
                return;
            } 
            document
                .getElementById(prjId)
                .querySelector('button:last-of-type')
                .click()
            list.parentElement.classList.remove('droppable');
                // event.preventDefault(); //not required
        })
    }

    setSwitchHandler(switchHAndlerFunction) {
        this.switchHandler = switchHAndlerFunction
    }

    addProject(project) {
        console.log(project)
        this.projects.push(project)
        DOMHelper.moveElement(project.id, `#${this.type}-projects ul`)
        project.update(this.switchProject.bind(this), this.type);
    }

    switchProject(projctId) {
        // const projectInddex = this.projects.findIndex(p => p.ia === projctId)
        // this.projects.splice(projectInddex, 1)
        // console.log(this.projects.find(p => p.id === projctId))
        this.switchHandler(this.projects.find(p => p.id === projctId))
        this.projects = this.projects.filter(p => p.id !== projctId);
    }
}
