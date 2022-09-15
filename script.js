const html = document.querySelector('html');
const main = document.querySelector('.main');
const nav = document.querySelector('.sidenav');
const button = document.querySelector('.main button');
const closer = document.querySelector('.sidenav .fa-xmark');

let disable = document.createElement('div');
disable.classList.toggle('disabled');

button.addEventListener('click', openNav);
closer.addEventListener('click', closeNav);


function openNav(){
    nav.style.width = "50%";
    main.style.marginLeft = "50%";
};

function closeNav(){
    nav.style.width = "0";
    main.style.marginLeft = "0";
};

// medications page
const medication = document.querySelector('.medication');
const meds = document.querySelector('.meds-page');
const select = document.querySelector('select');
const frequency = document.querySelectorAll('.frequency input');
const backArrow = document.querySelector('.meds-page .fa-arrow-left');  
const nextButton = document.querySelector('.meds-page button');

const rem = document.createElement('p');
rem.classList.toggle('rem');

medication.addEventListener('click', openMedsMenu);
backArrow.addEventListener('click', closeMedsMenu);
nextButton.addEventListener('click', () =>{
    if (unit == "" && freq == ""){
        rem.textContent = 'please add medication frequency and unit.'
        meds.appendChild(rem);
    } else if (unit == ""){
        rem.textContent = 'please add medication unit.'
        meds.appendChild(rem);
    } else if (freq == ""){
        rem.textContent = 'please add medication frequency.'
        meds.appendChild(rem);
    }
    else openAddMeds();
});


function openMedsMenu(){
    meds.style.display = "block";
    html.appendChild(disable);
};

function closeMedsMenu(){
    meds.style.display = "none";
    html.removeChild(disable);
}

select.addEventListener('change', () => {
    unit = select.value;
    if (meds.contains(rem)){
    meds.removeChild(rem)};
});

frequency.forEach(choice => {choice.addEventListener('click', () => {
    freq = choice.value;
    if (meds.contains(rem)){
        meds.removeChild(rem)};
})});

const addMeds = document.querySelector('.add-meds');
const medsUnit = document.querySelector('.meds-unit');
const medsFreq = document.querySelector('.meds-freq');
const closeMark = document.querySelector('.add-meds .fa-xmark');
const onceDaily = document.querySelector('.once-daily');
const saveButton = document.querySelector('.save');
const addTime = document.querySelector('.add-time');
const addDose = document.querySelector('.add-dose');




let unit = "";
let freq = "";

function openAddMeds(){
    if(unit != "" && freq != ""){
    addMeds.style.display = "block";}

    medsUnit.textContent = `unit: ${unit}`;

    if (freq === "once"){
        medsFreq.textContent = `Frequency: ${freq} daily`;
        addMeds.insertBefore(onceDaily, saveButton);
        onceDaily.style.display = "block";
    } else if (freq === "twice"){
        medsFreq.textContent = `Frequency: ${freq} daily`;
        
    } else if (freq === "needed"){
        medsFreq.textContent = `Frequency: As ${freq}`;

    } else if (freq === "other"){
        medsFreq.textContent = `Frequency: ${freq} frequency`;

    }
}

addTime.addEventListener('click', () => {
   wrapper.style.display = "flex";
});

addDose.addEventListener('click', () => {
    dosage.style.display = "flex";
    doseUnit.textContent = unit;
} );


closeMark.addEventListener('click',  () =>{
    let warning = document.createElement('div');
    warning.classList.add('warning');
    warning.textContent = "Are you sure you want to discard your changes? ";

    let cancel = document.createElement("button");
    cancel.textContent = "cancel";

    let accept = document.createElement("button");
    accept.textContent = "yes, discard";

    warning.appendChild(cancel);
    warning.appendChild(accept);
    addMeds.appendChild(warning);

    cancel.addEventListener('click', () =>{
        addMeds.removeChild(warning);
    });

    accept.addEventListener('click', () => {
        addMeds.removeChild(warning);
        addMeds.style.display = "none";   
    });
});

saveButton.addEventListener('click', () => {
    if (alarmTime == "" && dose == "0"){
    addMeds.style.display = "none";
    meds.style.display = "none";
    html.removeChild(disable);
    nav.style.width = "0";
    main.style.marginLeft = "0";}
    else {
        let remind = document.createElement('p');
        remind.classList.toggle('rem');
        remind.textContent = "please select time and dose of medication "
        addMeds.appendChild(remind);
    }
});

//alarm clock
const wrapper = document.querySelector('.wrapper')
const content = document.querySelector(".content"),
selectMenu = document.querySelectorAll(".column select"),
exitAlarm = document.querySelector('.cancel'),
setAlarmBtn = document.querySelector(".set");

let time;

let alarmTime, isAlarmSet,
ringtone = new Audio("./files/ringtone.mp3");

for (let i = 12; i > 0; i--) {
    i = i < 10 ? `0${i}` : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 59; i >= 0; i--) {
    i = i < 10 ? `0${i}` : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 2; i > 0; i--) {
    let ampm = i == 1 ? "AM" : "PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

setInterval(() => {
    let date = new Date(),
    h = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds(),
    ampm = "AM";
    if(h >= 12) {
        h = h - 12;
        ampm = "PM";
    }
    h = h == 0 ? h = 12 : h;
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    time = `${h}:${m}:${s} ${ampm}`;

    if (alarmTime === `${h}:${m} ${ampm}`) {
        ringtone.play();
        ringtone.loop = true;
    }
});

function setAlarm() {
    if (isAlarmSet) {
        alarmTime = "";
        ringtone.pause();
        content.classList.remove("disable");
        setAlarmBtn.innerText = "Set Alarm";
        return isAlarmSet = false;
    }

    let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
    if (time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")) {
        return alert("Please, select a valid time to set Alarm!");
    }
    alarmTime = time;
    isAlarmSet = true;
    content.classList.add("disable");
    setAlarmBtn.innerText = "Clear Alarm";
    console.log(alarmTime);
}

setAlarmBtn.addEventListener("click", () =>{
    setAlarm()
    wrapper.style.display = "none";
});

exitAlarm.addEventListener("click", () =>{
    wrapper.style.display = "none";
})

//alarm clock end


//dosage setting
const dosage = document.querySelector('.container');
const doseSelect = document.querySelector('.dosage select');
const doseUnit = document.querySelector('.dosage-text');
const setDoseButton = document.querySelector('.set-dose');
const cancelDoseButton = document.querySelector('.cancel-dose');

let dose;

for (let i = 10; i > 0; i--) {
    let option = `<option value="${i}">${i}</option>`;
    doseSelect.firstElementChild.insertAdjacentHTML("afterend", option);
}
function setDose(){
    if (doseSelect.value == "0"){
        return alert("Please, select a valid dose for your medication!");
    }
    dose = doseSelect.value;
    console.log(dose + "injections")

}

setDoseButton.addEventListener('click', () => {
    setDose();
    dosage.style.display = "none";
})
cancelDoseButton.addEventListener('click', () =>{
    dosage.style.display = "none";
})

//dosage setting end


// activities page
const activity = document.querySelector('.activity'); 
const acts = document.querySelector('.activities-page')
const returnArrow = document.querySelector('.activities-page .fa-arrow-left');  

activity.addEventListener('click', openActivityMenu);
returnArrow.addEventListener('click', closeActivityMenu);

function openActivityMenu(){  
    acts.style.display = "block";  
    html.appendChild(disable);
};

function closeActivityMenu() {
    acts.style.display = "none"; 
    html.removeChild(disable);
};

const activities = 'https://gist.githubusercontent.com/cpendo/ca3caf6ffe75118121301d9e07655e51/raw/2f0496a95d2477786b93d5bf89b53642e67b45b9/activities.json'

const exercise = [];

fetch(activities)
    .then(blob =>blob.json())
    .then(data => exercise.push(...data));
function findMatches(wordToMatch, exercise){
    return exercise.filter(word => {
    const regex = new RegExp(wordToMatch, 'gi');

    return word.match(regex);
    });
}

function displayMatches(){        
    suggestions.style.display = "block";  
    const matchArray = findMatches(this.value, exercise);
    const html = matchArray.map(word => {
        const regex = new RegExp(this.value, 'gi');
        const exerciseName = word.replace(regex, `<span class="hl">${this.value}</span>`);

        return `
                <li>
                    <span class="name">${exerciseName}</span>
                </li>`;
    }).join('');
    suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);

const showAllActivities = document.querySelector('.show-all');
const activitiesList = document.querySelector('.all-activities');

showAllActivities.addEventListener('click', () =>{
    exercise.forEach((element) => {
        let li = document.createElement('li');
        li.innerHTML = element;
        activitiesList.appendChild(li);
    });
});

