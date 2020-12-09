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