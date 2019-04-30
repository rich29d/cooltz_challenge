const components = require('./components.js');
const events = require('./events.js');
const colors = require("colors/safe");

let interval;
let time = 0;
let stopwatch = 0;
let namePet = 'Bolt';
let dead = false;

const myPet = {
  hunger : components.bar('hungry ', 'green', 1),
  dirt   : components.bar('dirty  ', 'red', 1),
  boredom: components.bar('bored  ', 'blue', 1)
}

const action = choose => {
  if (dead) return;
  
  switch(choose) {
    case 'eat':
      console.log(colors.blue(`The ${namePet} is fed. `));
      myPet.hunger.setCurrent(0);
      myPet.dirt.addCurrent(1);      
      break;

    case 'play':
      console.log(colors.blue(`The ${namePet} joked a lot. `));
      myPet.boredom.setCurrent(0);
      myPet.dirt.addCurrent(1);
      break;

    case 'shower':
      console.log(colors.blue(`The ${namePet} took a great shower `));
      myPet.dirt.setCurrent(0);
      timer();
      break;

    case 'finish':
      dead = true
      clearInterval(interval);
      break;

    default:
      timer();
  }
}

const monitor = () => {
  interval = setInterval(() => {
    const dead = Object.keys(myPet).every(feature => myPet[feature].critical());

    if (dead) {
      components.badNews(stopwatch);
      action('finish');
      return;
    }

    const almostDead = Object.keys(myPet).some(feature => myPet[feature].critical());

    myPet.hunger.setDouble(almostDead);
    myPet.dirt.setDouble(almostDead);
    myPet.boredom.setDouble(almostDead);

    stopwatch += 10;
  }, 10000);
}

const showAll = () => {
  console.log('');
  myPet.hunger.show();
  myPet.dirt.show();
  myPet.boredom.show();
  console.log('');
}

const timer = () => {
  const timerInterval = setInterval(() => {
    time += 1;
    let changedStatus = myPet.hunger.verify(time, false);
    changedStatus = myPet.dirt.verify(time, changedStatus);
    changedStatus = myPet.boredom.verify(time, changedStatus);

    console.log(time);

    if (changedStatus) {
      clearInterval(timerInterval);
    }
  }, 1000)
};

const configPet = () => {
  const actPet = () => {
    showAll();
    events.act('What do you want to do? (eat, play, shower)', resp => action(resp));
  }
  myPet.hunger.setAct(actPet);
  myPet.dirt.setAct(actPet);
  myPet.boredom.setAct(actPet);
}

components.apresetantion();
events.askName(name => {
  namePet = name;
  configPet();
  showAll();
  timer();
  monitor();
});