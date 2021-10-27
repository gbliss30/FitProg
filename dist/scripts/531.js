//input
const form = document.getElementById('531-form');
const container531 = document.getElementById('531-results-container');
const measurementSys = document.querySelectorAll('input[name="system531"]');
const fiveThreeOne = document.querySelectorAll('input[name="531Input"]');

//output
const workoutOutput = document.getElementById('531-results');

//submit
document.getElementById('531-submit').addEventListener('click', (e) => {
    e.preventDefault();
    const lifts = [];
    const measurementSystem = measurementSys[0].checked ? 'lbs' : 'kgs';
    let valid = 0;

    //valid 8 means every cell of input is valid
    fiveThreeOne.forEach((input) => {
        if (!input.value || input.value < 1) {
            showAlert('Please enter correct values', 'danger');
        } else {
            //construct lifts array
            lifts.push(input.value);
            valid++;
        }
    });

    if (valid === 8) {
        showAlert('Successfully calculated routine', 'success');
        container531.classList.remove('invisible');
        form.classList.add('invisible');
        //calculate
        workoutOutput.innerHTML = calcFiveThreeOne(lifts, measurementSystem);
    }
});

//reset
document.getElementById('531-reset').addEventListener('click', (e) => {
    e.preventDefault();
    fiveThreeOne.forEach((el) => {
        el.value = '';
    });
});

//back
document.getElementById('531-back').addEventListener('click', (e) => {
    e.preventDefault();
    fiveThreeOne.forEach((el) => {
        el.value = '';
    });
    container531.classList.add('invisible');
    form.classList.remove('invisible');
});

//lifts array indexes
//0 & 1 = OHP weight/reps
//2 & 3 = Deadlift weight/reps
//4 & 5 = Bench weight/reps
//6 & 7 = Squat weight/reps

function calcFiveThreeOne(lifts, formula) {
    //determine formula
    const measurementSystem = measurementSys[0].checked ? 'lbs' : 'kgs';

    //calculate 1rm using selected formula
    let ohp = lifts[0] * (1 + lifts[1] / 30),
        deadlift = lifts[2] * (1 + lifts[3] / 30),
        bench = lifts[4] * (1 + lifts[5] / 30),
        squat = lifts[6] * (1 + lifts[7] / 30);

    //create table
    return `<h1>5/3/1 - 4 Week Template - <a href="https://www.t-nation.com/workouts/5-3-1-how-to-build-pure-strength/" target="_blank">Read More</a></h1>
    <p>Start light, progress slowly, leave your ego at the door.</p>
    <p>The last set on each day (5+, 3+, 1+) is read as "do as many reps as you can, with a minimum of X." This is where strength is built so put the maximum amount of effort into this set. If you can't do the minimum, your 1RM is not accurate. Re-enter the data with lifts you have performed with clean form.</p>
    <p>Your 3RM should equal aproximately 90% of your 1RM. If at any point this is inaccurate readjust your inputs with lifts that you have performed with clean form.</p>
	<p>The assistance program is optional, and can be substituted for other similar pulling/pushing motions. Your focus should be on the core lifts, not the accessory work.</p>
	<p>Week 4 is your deload week. Don't push yourself, and don't work with weight anywhere close to your 1RM.</p>
    <p>Bar assumed to be ${
        measurementSystem === 'lbs' ? '45lbs' : '20kgs'
    }, each lift has been rounded down to the closest ${
        measurementSystem === 'lbs' ? '2.5 lbs' : '5 kgs'
    } without going over. The parenthesis after each lift represents the weights that will be loaded onto a bar. For example, ${calcExample(
        measurementSystem
    )}</p><br />
    
	<div class="container">
		<div class="title"><h3>Overhead Press</h3></div>
		<div class="row row-cols-4">
			<span class="col-md-3 week1-title"><h5>Week One</h5></span>
			<span class="col-md-3 week2-title"><h5>Week Two</h5></span>
			<span class="col-md-3 week3-title"><h5>Week Three</h5></span>
			<span class="col-md-3 week4-title"><h5>Week Four</h5></span>
		</div>
		<div class="row row-cols-5">
			<span class="col-md-3 week1">${finalCalc(ohp, 5, 0.65)}</span>
			<span class="col-md-3 week2">${finalCalc(ohp, 3, 0.7)}</span>
			<span class="col-md-3 week3">${finalCalc(ohp, 5, 0.75)}</span>
			<span class="col-md-3 week4">${finalCalc(ohp, 5, 0.4)}</span>
		</div>
		<div class="row row-cols-5">
			<span class="col-md-3 week1">${finalCalc(ohp, 5, 0.75)}</span>
			<span class="col-md-3 week2">${finalCalc(ohp, 3, 0.8)}</span>
			<span class="col-md-3 week3">${finalCalc(ohp, 3, 0.85)}</span>
			<span class="col-md-3 week4">${finalCalc(ohp, 5, 0.5)}</span>
		</div>
		<div class="row row-cols-5">
			<span class="col-md-3 week1">${finalCalc(ohp, '5+', 0.85)}</span>
			<span class="col-md-3 week2">${finalCalc(ohp, '3+', 0.9)}</span>
			<span class="col-md-3 week3">${finalCalc(ohp, '1+', 0.95)}</span>
			<span class="col-md-3 week4">${finalCalc(ohp, '5+', 0.6)}</span>
		</div>
		<div class="row row-cols-5">
			<span class="col-md-3 week1">Assistance:<br /> 5x15 Dips<br />5x10 Chin Ups</span>
			<span class="col-md-3 week2">Assistance:<br /> 5x15 Dips<br />5x10 Chin Ups</span>
			<span class="col-md-3 week3">Assistance:<br /> 5x15 Dips<br />5x10 Chin Ups</span>
			<span class="col-md-3 week4">Assistance:<br /> 5x15 Dips<br />5x10 Chin Ups</span>
		</div><br />
		<div class="title"><h3>Deadlift</h3></div>
		<div class="row row-cols-4">
			<span class="col-md-3 week1-title"><h5>Week One</h5></span>
			<span class="col-md-3 week2-title"><h5>Week Two</h5></span>
			<span class="col-md-3 week3-title"><h5>Week Three</h5></span>
			<span class="col-md-3 week4-title"><h5>Week Four</h5></span>
		</div>
		<div class="row row-cols-5">
			<span class="col-md-3 week1">${finalCalc(deadlift, 5, 0.65)}</span>
			<span class="col-md-3 week2">${finalCalc(deadlift, 3, 0.7)}</span>
			<span class="col-md-3 week3">${finalCalc(deadlift, 5, 0.75)}</span>
			<span class="col-md-3 week4">${finalCalc(deadlift, 5, 0.4)}</span>
		</div>
		<div class="row row-cols-5">
			<span class="col-md-3 week1">${finalCalc(deadlift, 5, 0.75)}</span>
			<span class="col-md-3 week2">${finalCalc(deadlift, 3, 0.8)}</span>
			<span class="col-md-3 week3">${finalCalc(deadlift, 3, 0.85)}</span>
			<span class="col-md-3 week4">${finalCalc(deadlift, 5, 0.5)}</span>
		</div>
		<div class="row row-cols-5">
			<span class="col-md-3 week1">${finalCalc(deadlift, '5+', 0.85)}</span>
			<span class="col-md-3 week2">${finalCalc(deadlift, '3+', 0.9)}</span>
			<span class="col-md-3 week3">${finalCalc(deadlift, '1+', 0.95)}</span>
			<span class="col-md-3 week4">${finalCalc(deadlift, '5+', 0.6)}</span>
		</div>
		<div class="row row-cols-5">
			<span class="col-md-3 week1">Assistance:<br /> 5x12 Good Mornings<br />5x15 Hanging Leg Raise</span>
			<span class="col-md-3 week2">Assistance:<br /> 5x12 Good Mornings<br />5x15 Hanging Leg Raise</span>
			<span class="col-md-3 week3">Assistance:<br /> 5x12 Good Mornings<br />5x15 Hanging Leg Raise</span>
			<span class="col-md-3 week4">Assistance:<br /> 5x12 Good Mornings<br />5x15 Hanging Leg Raise</span>
		</div><br />
		<div class="title"><h3>Bench Press</h3></div>
		<div class="row row-cols-4">
			<span class="col-md-3 week1-title"><h5>Week One</h5></span>
			<span class="col-md-3 week2-title"><h5>Week Two</h5></span>
			<span class="col-md-3 week3-title"><h5>Week Three</h5></span>
			<span class="col-md-3 week4-title"><h5>Week Four</h5></span>
		</div>
		<div class="row row-cols-5">
			<span class="col-md-3 week1">${finalCalc(bench, 5, 0.65)}</span>
			<span class="col-md-3 week2">${finalCalc(bench, 3, 0.7)}</span>
			<span class="col-md-3 week3">${finalCalc(bench, 5, 0.75)}</span>
			<span class="col-md-3 week4">${finalCalc(bench, 5, 0.4)}</span>
		</div>
		<div class="row row-cols-5">
			<span class="col-md-3 week1">${finalCalc(bench, 5, 0.75)}</span>
			<span class="col-md-3 week2">${finalCalc(bench, 3, 0.8)}</span>
			<span class="col-md-3 week3">${finalCalc(bench, 3, 0.85)}</span>
			<span class="col-md-3 week4">${finalCalc(bench, 5, 0.5)}</span>
		</div>
		<div class="row row-cols-5">
			<span class="col-md-3 week1">${finalCalc(bench, '5+', 0.85)}</span>
			<span class="col-md-3 week2">${finalCalc(bench, '3+', 0.9)}</span>
			<span class="col-md-3 week3">${finalCalc(bench, '1+', 0.95)}</span>
			<span class="col-md-3 week4">${finalCalc(bench, '5+', 0.6)}</span>
		</div>
		<div class="row row-cols-5">
			<span class="col-md-3 week1">Assistance:<br /> 5x15 DB Chest Press<br />5x10 DB Row</span>
			<span class="col-md-3 week2">Assistance:<br /> 5x15 DB Chest Press<br />5x10 DB Row</span>
			<span class="col-md-3 week3">Assistance:<br /> 5x15 DB Chest Press<br />5x10 DB Row</span>
			<span class="col-md-3 week4">Assistance:<br /> 5x15 DB Chest Press<br />5x10 DB Row</span>
		</div><br />
		<div class="title"><h3>Squat</h3></div>
		<div class="row row-cols-4">
			<span class="col-md-3 week1-title"><h5>Week One</h5></span>
			<span class="col-md-3 week2-title"><h5>Week Two</h5></span>
			<span class="col-md-3 week3-title"><h5>Week Three</h5></span>
			<span class="col-md-3 week4-title"><h5>Week Four</h5></span>
		</div>
		<div class="row row-cols-5">
			<span class="col-md-3 week1">${finalCalc(squat, 5, 0.65)}</span>
			<span class="col-md-3 week2">${finalCalc(squat, 3, 0.7)}</span>
			<span class="col-md-3 week3">${finalCalc(squat, 5, 0.75)}</span>
			<span class="col-md-3 week4">${finalCalc(squat, 5, 0.4)}</span>
		</div>
		<div class="row row-cols-5">
			<span class="col-md-3 week1">${finalCalc(squat, 5, 0.75)}</span>
			<span class="col-md-3 week2">${finalCalc(squat, 3, 0.8)}</span>
			<span class="col-md-3 week3">${finalCalc(squat, 3, 0.85)}</span>
			<span class="col-md-3 week4">${finalCalc(squat, 5, 0.5)}</span>
		</div>
		<div class="row row-cols-5">
			<span class="col-md-3 week1">${finalCalc(squat, '5+', 0.85)}</span>
			<span class="col-md-3 week2">${finalCalc(squat, '3+', 0.9)}</span>
			<span class="col-md-3 week3">${finalCalc(squat, '1+', 0.95)}</span>
			<span class="col-md-3 week4">${finalCalc(squat, '5+', 0.6)}</span>
		</div>
		<div class="row row-cols-5">
			<span class="col-md-3 week1">Assistance:<br />5x15 Leg Press<br />5x10 Leg Curl</span>
			<span class="col-md-3 week2">Assistance:<br />5x15 Leg Press<br />5x10 Leg Curl</span>
			<span class="col-md-3 week3">Assistance:<br />5x15 Leg Press<br />5x10 Leg Curl</span>
			<span class="col-md-3 week4">Assistance:<br />5x15 Leg Press<br />5x10 Leg Curl</span>
		</div>
	</div><br />
    `;
}

//construct example based on system input
function calcExample(sys) {
    if (sys === 'lbs') {
        return '195lbs (45, 25, 5), a 45, 25, and 5 pound plate on each side of the bar.';
    } else {
        return '85kgs (20, 10, 5), a 20, 10, and 5 kg plate on each side of the bar.';
    }
}

//construct table row data
function finalCalc(lift, reps, percent) {
    const measurementSystem = measurementSys[0].checked ? 'lbs' : 'kgs';
    plateArray = calcPlates(calcPercent(lift, percent), measurementSystem);

    // display large weight arrays cleanly by condensing the number of large plates into one statement
    if (plateArray.includes(45) && measurementSystem === 'lbs') {
        let count = 0;
        plateArray.forEach((plate) => {
            if (plate === 45) {
                count++;
            }
        });
        if (count > 1) {
            plateArray.splice(0, count, `45 x ${count}`);
        }
    }
    return `${reps} reps at ${100 * percent}%:<br /> ${calcPercent(
        lift,
        percent
    )}${measurementSystem}<br /> (${plateArray})`;
}

//get the total equal to the smallest plate size * 2
function calcPercent(lift, percent) {
    return Math.floor((lift * percent) / 5) * 5;
}

function calcPlates(lift, system) {
    const lbs = [45, 35, 25, 10, 5, 2.5];
    const kgs = [20, 15, 10, 5, 2.5];
    const platesNeeded = [];

    //This calculation will output in the array platesNeeded what weights will be used on each side of the bar
    //determine english or metric
    if (system === 'lbs') {
        //subtract weight of bar
        let total = lift - 45;
        //iterate through array of plates used
        lbs.forEach((plate) => {
            let plateMath = Math.floor(total / (plate * 2));
            //determine if the current iteration plate will be used
            if (plateMath >= 1) {
                //determine if multiple plates will be used
                if (plateMath >= 2) {
                    //add multiple instances of that plate to the array
                    for (let i = 1; i < plateMath; i++) {
                        platesNeeded.push(plate);
                        total -= Math.floor(total / (plate * 2)) * (plate * 2);
                    }
                }
                platesNeeded.push(plate);

                total -= Math.floor(total / (plate * 2)) * (plate * 2);
            }
        });
    } else if (system === 'kgs') {
        //identical, but 20kg bar
        let total = lift - 20;
        kgs.forEach((plate) => {
            let plateMath = Math.floor(total / (plate * 2));
            if (plateMath >= 1) {
                if (plateMath >= 2) {
                    for (let i = 1; i < plateMath; i++) {
                        platesNeeded.push(plate);
                        total -= Math.floor(total / (plate * 2)) * (plate * 2);
                    }
                }
                platesNeeded.push(plate);

                total -= Math.floor(total / (plate * 2)) * (plate * 2);
            }
        });
    }

    return platesNeeded;
}
