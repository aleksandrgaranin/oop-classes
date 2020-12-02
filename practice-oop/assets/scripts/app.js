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
        element.scrollIntoView({behavior: 'smooth'});
    }
}

class Componet {
    constructor(hostElementId, insertBefore = false) {
        if (hostElementId) {
            this.hostElement = document.getElementById(hostElementId);
        } else {
            this.hostElement = document.body;
        }
        this.insertBefore = insertBefore
    }

    detach() {
        if (this.element){
            this.element.remove();
        }
        // this.element.parantElement.removeChild(this.element);// old way
    }

    attach() {        
        this.hostElement.insertAdjacentElement(
            this.insertBefore ? 'afterbegin': 'beforeend', 
            this.element
        );
    }
}

class Tooltip extends Componet {

    constructor(closeNotifierFunction, text, hostElementId) {
        super(hostElementId);
        this.closeNotifier = closeNotifierFunction;
        this.text = text
        this.create()
    }

    create() {
        // console.log('The Tooltip...')
        const tooltipElement = document.createElement('div');
        tooltipElement.className = 'card';
        tooltipElement.textContent = this.text;

        const hostElPosLeft = this.hostElement.offsetLeft;
        const hostElPosTop = this.hostElement.offsetTop;
        const hostElHight = this.hostElement.clientHeight;
        const parantElementScrolling = this.hostElement.parentElement.scrollTop; // for solving scrolling issue


        const x = hostElPosLeft + 20;
        const y = hostElPosTop+ hostElHight - parantElementScrolling - 10;

        tooltipElement.style.position = 'absolute'// requierd for change position of element
        tooltipElement.style.left = x + 'px';
        tooltipElement.style.top = y + 'px';

        tooltipElement.addEventListener('click', this.closeTooltip);
        this.element = tooltipElement;
        // console.log(this.hostElement.getBoundingClientRect())
    }


    closeTooltip = () => {
        this.detach();
        this.closeNotifier()
    }
    
   
}

class ProjectItem {
    hasActiveTooltip = false;

    constructor(id, updateProjectListFunction, type){
        this.id = id
        this.updateProjectListHandler = updateProjectListFunction
        this.connectMoreInfoButton();
        this.connectSwitchButton(type);
    }

    showMoreInfoHandler() {
        if (this.hasActiveTooltip){ 
            return 
        }
        const projectElement = document.getElementById(this.id)
        // console.log(projectElement.dataset)
        // projectElement.dataset.someInfo = 'Info'
        const tooltipText = projectElement.dataset.extraInfo
        const tooltip = new Tooltip(() => {
            this.hasActiveTooltip = false;
        }, tooltipText, this.id);
        tooltip.attach();
        this.hasActiveTooltip = true;
    }

    connectMoreInfoButton() {
        const projectItemElement = document.getElementById(this.id);
        const moreInfo = projectItemElement.querySelector('button:first-of-type');
        moreInfo.addEventListener('click', this.showMoreInfoHandler.bind(this))
    }

    connectSwitchButton(type) {
        const projectItemElement = document.getElementById(this.id)
        let switchBtn = projectItemElement.querySelector('button:last-of-type')
        switchBtn = DOMHelper.clearEventListeners(switchBtn)
        switchBtn.textContent = type === 'finished' ? 'Activate' : 'Finish';
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
       document.getElementById('start-analitics-btn').addEventListener('click', this.startAnalytics)
    }

    static startAnalytics() {
        const analiticsScript = document.createElement('script');
        analiticsScript.src = 'assets/scripts/analytics.js'
        analiticsScript.defer = 'true';
        document.head.append(analiticsScript);
    }
}

App.init()