// declaring global variables
var intervalId, hour, min, sec;

// starting button config
document.getElementById('pause').disabled = true;
document.getElementById('resume').disabled = true;
document.getElementById('cancel').disabled = true;

// timer buttons
// start timer
document.getElementById('start').addEventListener('click', () => {
	if (document.getElementById('timeValid').style.visibility === 'visible') {
		document.getElementById('timeValid').style.visibility ='hidden';
	}

	hour = parseFloat(document.getElementById('hour').value, 10);
	min = parseFloat(document.getElementById('minute').value, 10);
	sec = parseFloat(document.getElementById('second').value, 10);
	
	if ((!hour && !min && !sec) || isNaN(hour) || isNaN(min) || isNaN(sec) || min > 60 || sec > 60 || !checkAllInt()) {
		document.getElementById('error').style.visibility = 'visible';
		clearInput();
	} else {
		document.getElementById('error').style.visibility = 'hidden';

		document.getElementById('seconds').textContent = checkValid(sec);
		document.getElementById('minutes').textContent = checkValid(min);
		document.getElementById('hours').textContent = checkValid(hour);

		document.getElementById('pause').disabled = false;
		document.getElementById('cancel').disabled = false;
		document.getElementById('start').disabled = true;

		clearInput();
		startTimer();
	}
});

// pause timer
document.getElementById('pause').addEventListener('click', () => {
	clearInterval(intervalId);
	document.getElementById('pause').disabled = true;
	document.getElementById('resume').disabled = false;
});

// resume timer
document.getElementById('resume').addEventListener('click', () => {
	hour = parseInt(document.getElementById('hours').textContent);
	min = parseInt(document.getElementById('minutes').textContent);
	sec = parseInt(document.getElementById('seconds').textContent);

	document.getElementById('pause').disabled = false;
	document.getElementById('resume').disabled = true;

	startTimer();
});

// cancel/clear timer
document.getElementById('cancel').addEventListener('click', () => {
	clearInterval(intervalId);

	// clear timer view
	document.getElementById('seconds').textContent = 0;
	document.getElementById('minutes').textContent = 0;
	document.getElementById('hours').textContent = 0;

	document.getElementById('pause').disabled = true;
	document.getElementById('resume').disabled = true;
	document.getElementById('cancel').disabled = true;
	document.getElementById('start').disabled = false;
});


// functions for buttons

// always return parseInt
function checkValid(value) {
	return (value) ? value : 0;
}

function startTimer() {
	intervalId = setInterval(checkTimer, 1000);
}

function checkTimer() {
	 hour = parseInt(document.getElementById('hours').textContent, 10);
	 min = parseInt(document.getElementById('minutes').textContent, 10);
	 sec = parseInt(document.getElementById('seconds').textContent, 10);


	if (!sec && !min && !hour) {
		clearInterval(intervalId);
		document.getElementById('timeValid').style.visibility = 'visible';
		document.getElementById('pause').disabled = true;
		document.getElementById('cancel').disabled = true;
		document.getElementById('start').disabled = false;
	} else if (!sec && !min) {
		hour--;
		document.getElementById('hours').textContent = hour;
		min = 59;
		document.getElementById('minutes').textContent = min;
		sec = 59;
		document.getElementById('seconds').textContent = sec;
	} else if (!sec) {
		min--;
		document.getElementById('minutes').textContent = min;
		sec = 59;
		document.getElementById('seconds').textContent = sec;
	} else {
		sec--;
		document.getElementById('seconds').textContent = sec;
	}
}

function clearInput() {
	document.getElementById('hour').value = 0;
	document.getElementById('minute').value = 0;
	document.getElementById('second').value = 0;
}

function isInt(value) {
	return value === Math.floor(value);
}

function checkAllInt() {
	if (isInt(hour) && isInt(min) && isInt(sec)) {
		return true;
	} else {
		return false;
	}
}

