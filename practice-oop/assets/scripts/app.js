class DOMHelper {
    static clearEventListeners(element){
        const clonedElement = element.cloneNode(true);
        element.replaceWith(clonedElement);
        return clonedElement
    }
    static moveElement(elementId, newDestinationSelector){
        const element = document.getElementById(elementId);
        const destinationElement = document.querySelector(newDestinationSelector);
        // console.log(destinationElement)
        // console.log(element)
        destinationElement.append(element);
    }
}

class Tooltip {

}

class ProjectItem {
    constructor(id, updateProjectListFunction, type){
        this.id = id
        this.updateProjectListHandler = updateProjectListFunction
        this.connectSwitchButton();
        this.connectMoreInfoButton(type);
    }
    connectMoreInfoButton() {}

    connectSwitchButton(type) {
        const projectItemElement = document.getElementById(this.id)
        let switchBtn = projectItemElement.querySelector('button:last-of-type')
        switchBtn = DOMHelper.clearEventListeners(switchBtn)
        switchBtn.textContent = type === 'active' ? 'Finish' : 'Activate';
        switchBtn.addEventListener('click', this.updateProjectListHandler.bind(null, this.id) )
    }

    update(updateProjectListFn, type) {
        this.updateProjectListHandler = updateProjectListFn;
        this.connectSwitchButton(type)
    }
}

class ProjectList {
    projects = []
    constructor(type){
        this.type = type;
        const prjItems = document.querySelectorAll(`#${type}-projects li`);
        // console.log(prhItems)
        for (const prjItem of prjItems){
            this.projects.push(new ProjectItem(prjItem.id, this.switchProject.bind(this), this.type))
        }
        console.log(this.projects);
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

class App {
    static init() {
        const activeProjectList = new ProjectList('active');
        const finishedProjectsList = new ProjectList('finished');
        activeProjectList.setSwitchHandler(finishedProjectsList.addProject.bind(finishedProjectsList));
        finishedProjectsList.setSwitchHandler(activeProjectList.addProject.bind(activeProjectList));
    }
}

App.init()