class Tooltip {

}

class ProjectItem {
    constructor(id){
        this.id = id
    }
}

class ProjectList {
    projects = []
    constructor(type){
        const prjItems = document.querySelectorAll(`#${type}-projects li`);
        // console.log(prhItems)
        for (const prjItem of prjItems){
            this.projects.push(new ProjectItem(prjItem.id))
        }
        console.log(this.projects);
    }
}

class App {
    static init() {
        const activeProjectList = new ProjectList('active');
        const finishedProjectsList = new ProjectList('finished');
    }
}

App.init()