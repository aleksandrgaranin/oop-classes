class Tooltip {

}

class ProjectItem {

}

class ProjectList {
    constructor(type){
        const prhItems = document.querySelectorAll(`#${type}-projects li`);
        console.log(prhItems)
    }
}

class App {
    static init() {
        const activeProjectList = new ProjectList('active');
        const finishedProjectsList = new ProjectList('finished');
    }
}

App.init()