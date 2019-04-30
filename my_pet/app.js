const components = require('./components.js');
const events = require('./events.js');
const colors = require("colors/safe");

let interval;
let time = 0;
let stopwatch = 0;
let namePet = 'Bolt';

const myPet = {
  hunger : components.bar('hungry ', 'green', 30),
  boredom: components.bar('bored  ', 'blue', 10),
  dirt   : components.bar('dirty  ', 'red', 50),
}

const action = choose => {  
  switch(choose) {
    case 'eat':
      myPet.hunger.setCurrent(0);
      myPet.dirt.addCurrent(1);
      break;

    case 'play':
      myPet.boredom.setCurrent(0);
      myPet.dirt.addCurrent(1);
      break;

    case 'shower':
      console.log('\x1Bc');
      myPet.dirt.setCurrent(0);
      showAll();
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
    time += 10;
    let changedStatus = myPet.hunger.verify(time, false);
    changedStatus = myPet.dirt.verify(time, changedStatus);
    changedStatus = myPet.boredom.verify(time, changedStatus);

    if (changedStatus)
      clearInterval(timerInterval);
  }, 10000)
};

const configPet = name => {
  const actPet = () => {    
    showAll();
    events.act('What do you want to do? (eat, shower, play, finish)', resp => action(resp));
  }

  myPet.hunger.setAct(actPet);
  myPet.dirt.setAct(actPet);
  myPet.boredom.setAct(actPet);

  myPet.hunger.setNamePet(name);
  myPet.dirt.setNamePet(name);
  myPet.boredom.setNamePet(name);
}

components.apresetantion();
events.askName(name => {
  namePet = name;  
  console.log('\x1Bc');
  console.log(colors.blue(`Ok, the name your pet is ${namePet}, wait.`))
  configPet(name);
  timer();
  monitor();
});