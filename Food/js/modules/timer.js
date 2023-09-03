function timer(id, deadline) {

	function getTimeRemaining(endtime){
		let days, hours, minutes, seconds;
		const t = Date.parse(endtime) - new Date();
		if(t <= 0){
			days = 0;
			hours = 0;
			minutes = 0;
			seconds = 0;
		} else {
			days = Math.floor(t / (1000 * 60 * 60 * 24)),
			hours = Math.floor(t / (1000 * 60 * 60) % 24),
			minutes = Math.floor((t / 1000 / 60) % 60),
			seconds = Math.floor((t / 1000) % 60);
		}
		
		return {
			'total' : t,
			'days' : days,
			'hours' : hours,
			'minutes' : minutes,
			'seconds' : seconds
		};
	}

	function addZero(num){
		if(num < 10){
			return num = `0${num}`;
		} else {
			return num;
		}
	} 

	function setTimeOnPages(timer, endtime) {
		const timerBlock = document.querySelector(timer),
			  days = timerBlock.querySelector('#days'),
			  hours = timerBlock.querySelector('#hours'),
			  minutes = timerBlock.querySelector('#minutes'),
			  seconds = timerBlock.querySelector('#seconds'),
			  timeInterval = setInterval(setTimer, 1000);

		setTimer();
		function setTimer() {
			const t = getTimeRemaining(endtime);

			days.innerHTML = addZero(t.days);
			hours.innerHTML = addZero(t.hours);
			minutes.innerHTML = addZero(t.minutes);
			seconds.innerHTML = addZero(t.seconds);

			if(t.total <= 0){
				clearInterval(timeInterval);
			}
		}
	}

	setTimeOnPages(id, deadline);
}

export default timer;