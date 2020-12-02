console.log('Analitics...');

const intervalId = setInterval( () => {
    console.log('Sending adalytics data...')
}, 2000);

document.getElementById('stop-analitics-btn').addEventListener('click', () => {
    clearInterval(intervalId) 
})