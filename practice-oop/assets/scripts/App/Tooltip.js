import Component from './Component.js';


export class Tooltip extends Component {

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


