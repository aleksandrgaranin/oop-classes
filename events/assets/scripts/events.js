const buttons = document.querySelectorAll('button');

// button.onclick = function() {
//     alert('button was clicked');
// };

const buttonClickHandler = (event) => {
    // alert('Button was Clicked!');
    
    // event.target.disabled = true
    console.log(event)
};

// const anotherButtonClickHandler = () => {
//     console.log('Button Clicked');
// };

// button.onclick = buttonClickHandler
// button.onclick = anotherButtonClickHandler // overrite old onclick

// button.addEventListener('click', buttonClickHandler)

// setTimeout(() => {
//     buttons.removeEventListener('click', buttonClickHandler);
// }, 2000)

// buttons.forEach(btn => {
//     btn.addEventListener('click', buttonClickHandler)
// })

buttons.forEach(btn => {
    btn.addEventListener('mouseenter', buttonClickHandler)
})

// window.addEventListener('scroll', event => {
//     console.log(event)
// })

// Basic Infinite Scrolling 

let curElementNumber = 0;
 
function scrollHandler() {
    const distanceToBottom = document.body.getBoundingClientRect().bottom;
 
    if (distanceToBottom < document.documentElement.clientHeight + 150) {
        const newDataElement = document.createElement('div');
        curElementNumber++;
        newDataElement.innerHTML = `<p>Element ${curElementNumber}</p>`;
        document.body.append(newDataElement);
    }
}
 
window.addEventListener('scroll', scrollHandler);