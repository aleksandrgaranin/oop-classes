const button = document.querySelector('button');

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

// buttons.forEach(btn => {
//     btn.addEventListener('mouseenter', buttonClickHandler)
// })

// window.addEventListener('scroll', event => {
//     console.log(event)
// })

// Basic Infinite Scrolling 

// let curElementNumber = 0;
 
// function scrollHandler() {
//     const distanceToBottom = document.body.getBoundingClientRect().bottom;
 
//     if (distanceToBottom < document.documentElement.clientHeight + 150) {
//         const newDataElement = document.createElement('div');
//         curElementNumber++;
//         newDataElement.innerHTML = `<p>Element ${curElementNumber}</p>`;
//         document.body.append(newDataElement);
//     }
// }
 
// window.addEventListener('scroll', scrollHandler);

const form = document.querySelector('form');

form.addEventListener('submit', event => {
    event.preventDefault();
    console.log(event);
});

const div = document.querySelector('div');
div.addEventListener('mouseenter', event => {
    console.log('CLICKED DIV')
    console.log(event)
})
// }, true) // if true is Propagation else Bubbling 

button.addEventListener('mouseenter', event => {
    event.stopPropagation();
    console.log('CLICKED BUTTON')
    console.log(event);
})