//inputs
const measurement = document.querySelectorAll(
    'input[name="measurement-system"]'
);
const weight = document.querySelector('#basic-weight');
const height = document.querySelector('#basic-height');
const age = document.querySelector('#basic-age');
const gender = document.querySelectorAll('input[name="gender"]');
const activity = document.querySelector('#basic-activity');
const inputContainer = document.getElementById('health-form');

//outputs
const outputContainer = document.getElementById('health-results');
const bmiOutput = document.querySelector('#BMI');
const bmrOutput = document.querySelector('#BMR');
const tdeeOutput = document.querySelector('#TDEE');
const alert = document.getElementById('alert');

//submit
const submit = document
    .getElementById('health-submit')
    .addEventListener('click', (e) => {
        e.preventDefault();

        const selectedGender = gender[0].checked ? 'male' : 'female';
        const system = measurement[0].checked ? 'english' : 'metric';

        let BMI, BMR, TDEE;

        //Check falsy & run calculations
        if (weight.value !== '' && height.value !== '' && age.value !== '') {
            if (activity.value !== 'null') {
                inputContainer.classList.toggle('invisible');
                outputContainer.classList.toggle('invisible');
                showAlert('Successfully calculated', 'success');
                BMI = calcBMI(weight.value, height.value, system);
                BMR = calcBMR(
                    weight.value,
                    height.value,
                    age.value,
                    selectedGender,
                    system
                ).toFixed(1);
                TDEE = calcTDEE(BMR, activity.value, system).toFixed(1);
            } else {
                showAlert('Please select an activity level', 'danger');
            }
        } else {
            showAlert('Please enter correct values', 'danger');
        }

        //Output
        bmiOutput.innerHTML = `BMI: ${BMI[0].toFixed(1)}, ${BMI[1]}<br />`;
        bmrOutput.innerHTML = `BMR: ${BMR} <br />`;
        tdeeOutput.innerHTML = `TDEE: ${TDEE}`;
    });

const back = document
    .getElementById('health-back')
    .addEventListener('click', () => {
        toggleDisplay(inputContainer);
        toggleDisplay(outputContainer);
        fieldReset();
    });

//clear output
const reset = document
    .getElementById('health-reset')
    .addEventListener('click', (e) => {
        e.preventDefault();

        Object.values(outputContainer.children).forEach((child) => {
            child.innerHTML = '';
        });

        fieldReset();
    });

//calculate BMI
function calcBMI(weight, height, system) {
    let bmi;
    if (system === 'english') {
        bmi = (weight / (height * height)) * 703;
    } else {
        bmi = (weight / (height * height)) * 10000;
    }

    let classBMI;

    if (bmi >= 40) {
        classBMI = 'Obese Class 3';
    } else if (bmi >= 35.0 && bmi <= 39.9) {
        classBMI = 'Obese Class 2';
    } else if (bmi >= 30.0 && bmi <= 34.9) {
        classBMI = 'Obese Class 1';
    } else if (bmi >= 25.0 && bmi <= 29.9) {
        classBMI = 'Overweight';
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        classBMI = 'Normal Range';
    } else if (bmi < 18.5) {
        classBMI = 'Underweight';
    }

    return [bmi, classBMI];
}

//calculate BMR
function calcBMR(weight, height, age, gender, system) {
    //reasign variables if metric
    let total = 0;

    if (gender === 'male') {
        total = 5;
    } else {
        total = -161;
    }

    //return english-metric conversion
    if (system === 'metric') {
        return total + 10 * weight + 6.25 * height - 5 * age;
    } else {
        return (
            total +
            10 * (weight * 0.45359237) +
            6.25 * (height * 2.54) -
            5 * age
        );
    }
}

//Calculate TDEE
function calcTDEE(BMR, activity) {
    return BMR * activity;
}

function toggleDisplay(el) {
    el.classList.toggle('invisible');
}

function toggleVis(el) {
    if ((el.style.visibility = 'visible')) {
        el.style.visibility = 'invisible';
    } else {
        el.style.visibility = 'visible';
    }
}

function fieldReset() {
    weight.value = '';
    height.value = '';
    age.value = '';
    activity.value = 'null';
}
