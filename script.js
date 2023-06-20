 const inputContainer = document.getElementById('input-container');
 const countDownForm = document.getElementById('countdown-form');
 const dateEl = document.getElementById('date-picker');
 const countDownEl = document.getElementById('countdown');
 const countDownElTitle = document.getElementById('countdown-title');
 const countDownBtn = document.getElementById('countdown-button');
 const timeEls = document.querySelectorAll('span');
 const completeEl = document.getElementById('complete');
 const completeElInfo = document.getElementById('complete-info');
 const completeBtn = document.getElementById('complete-button')

 let countDownTitle = '';
 let countDownDate = '';
 let countDownValue = new Date();
 let countDownActive;
 let saveCountDown = {};
 let tzDiff = countDownValue.getTimezoneOffset();
 const msPerMinute = 60000;

 const second = 1000;
 const minute = second * 60;
 const hour = minute * 60;
 const day = hour * 24;

 //Set date input min with todays date
 const today = new Date().toISOString().split('T')[0];
 dateEl.setAttribute('min', today);

 //Populate Countdown / Complet UI
function updateDOM(){
    countDownActive = setInterval(() => {
    const now = new Date().getTime();
    const distance = (countDownValue + (tzDiff * msPerMinute)) - now;
    

    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);
    
    //Hide Input
    inputContainer.hidden = true;
    
    //If Countdown finshed, show complete
    if (distance < 0){
        countDownEl.hidden = true;
        clearInterval(countDownActive);
        completeElInfo.textContent = `${countDownTitle} finished on ${countDownDate}`;
        completeEl.hidden = false;
        countDownEl.hidden = true;
    } else {
        //Populate countdown
    countDownElTitle.textContent = `${countDownTitle}`;
    timeEls[0].textContent = `${days}`;
    timeEls[1].textContent = `${hours}`;
    timeEls[2].textContent = `${minutes}`;
    timeEls[3].textContent = `${seconds}`;
    completeEl.hidden = true;
    countDownEl.hidden = false;
    }
    }, second);
}

//take values from form input
function updateCountdown(e){
    e.preventDefault();
    countDownTitle = e.target[0].value
    countDownDate = e.target[1].value
    saveCountDown = {
        title: countDownTitle,
        date: countDownDate
    }
    localStorage.setItem('countdown', JSON.stringify(saveCountDown));
    //Check for valid date
    if (countDownDate === ''){
        alert('PLease enter the date for the count down')
    } else {
        //Get number version of current date
        countDownValue = new Date(countDownDate).getTime();
        
        updateDOM();
    }
}

//reset all values
function reset(){
    //hide countdowns, show inputs
    countDownEl.hidden = true;
    inputContainer.hidden = false;
    completeEl.hidden = true;
    //stop Countdown
    clearInterval(countDownActive);
    //reset values
    countDownTitle = '';
    countDownDate = '';
    localStorage.removeItem('countdown');
}

function restoreCountdown(){
    if(localStorage.getItem('countdown')){
        inputContainer.hidden = true;
        saveCountDown = JSON.parse(localStorage.getItem('countdown'));
        countDownTitle = saveCountDown.title;
        countDownDate = saveCountDown.date;
        countDownValue = new Date(countDownDate).getTime();
        updateDOM();
    }
}

 //Event Listeners
 countDownForm.addEventListener('submit', updateCountdown);
 countDownBtn.addEventListener('click', reset);
 completeBtn.addEventListener('click', reset);

 restoreCountdown();