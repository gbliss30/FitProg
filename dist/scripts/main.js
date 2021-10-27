//Nav buttons
const logoButton = document.querySelector('.navbar-brand');
const homeButton = document.getElementById('home-button');
const healthButton = document.getElementById('health-button');
const button531 = document.getElementById('button-531');

//Elements
const home = document.getElementById('home');
const health = document.getElementById('health');
const workout = document.getElementById('workout');

//Sections
const content = document.querySelectorAll('.content-section');

homeButton.addEventListener('click', () => {
    toggleMenuVisibility(home);
});

logoButton.addEventListener('click', () => {
    toggleMenuVisibility(home);
});

healthButton.addEventListener('click', () => {
    toggleMenuVisibility(health);
});

button531.addEventListener('click', () => {
    fiveThreeOne.forEach((el) => {
        el.value = '';
    });
    toggleMenuVisibility(workout);
});

function toggleMenuVisibility(el) {
    content.forEach((element) => element.classList.add('invisible'));
    el.classList.toggle('invisible');
}

//Display an alert
function showAlert(message, type) {
    alert.className += ` bg-${type}`;
    alert.innerHTML = message;

    setTimeout(() => {
        alert.innerHTML = '';
        alert.classList.remove(`bg-${type}`);
    }, 3000);
}
