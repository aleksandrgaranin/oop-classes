const button = document.querySelector('button');

// button.onclick = function() {
//     alert('button was clicked');
// };

const buttonClickHandler = () => {
    alert('Button was Clicked!');
};

// const anotherButtonClickHandler = () => {
//     console.log('Button Clicked');
// };

// button.onclick = buttonClickHandler
// button.onclick = anotherButtonClickHandler // overrite old onclick

button.addEventListener('click', buttonClickHandler)

setTimeout(() => {
    button.removeEventListener('click', buttonClickHandler);
}, 2000)