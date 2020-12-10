// import { Tooltip } from './Tooltip.js'
import { DOMHelper } from '../Utility/DOMHelper.js'


export class ProjectItem {
    hasActiveTooltip = false;

    constructor(id, updateProjectListFunction, type){
        this.id = id
        this.updateProjectListHandler = updateProjectListFunction
        this.connectMoreInfoButton();
        this.connectSwitchButton(type);
        this.connectDrag();
    }

    showMoreInfoHandler() {
        if (this.hasActiveTooltip){ 
            return 
        }
        const projectElement = document.getElementById(this.id)
        // console.log(projectElement.dataset)
        // projectElement.dataset.someInfo = 'Info'
        const tooltipText = projectElement.dataset.extraInfo
        import('./Tooltip.js').then(module => {
            const tooltip = new module.Tooltip(() => {
                this.hasActiveTooltip = false;
            }, tooltipText, this.id);
            tooltip.attach();
            this.hasActiveTooltip = true;
        })
    }

    connectDrag() {
        const item = document.getElementById(this.id)
        item.addEventListener('dragstart', event => {
            event.dataTransfer.setData('text/plain', this.id)
            event.dataTransfer.effectAllowed = 'move';
        })

        item.addEventListener('dragend', event => {
            console.log(event)
        })
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