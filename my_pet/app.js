const components = require('./components.js');
const events = require('./events.js');
const colors = require("colors/safe");

let timer;
let namePet = 'Bolt';

const myPet = {
  hunger : components.bar('hunger ', 'green', 30),
  dirt   : components.bar('dirt   ', 'red', 50),
  boredom: components.bar('boredom', 'blue', 10)
}

const action = {
  eat: () => {
    myPet.hunger.setCurrent(0);
    myPet.dirt.addCurrent(1);
    
    showAll(colors.blue(`The ${namePet} is fed. `));
  },

  play: () => {
    myPet.boredom.setCurrent(0);
    myPet.dirt.addCurrent(1);
    
    showAll(colors.blue(`The ${namePet} joked a lot. `));
  },

  shower: () => {
    myPet.dirt.setCurrent(0);
    
    showAll(colors.blue(`The ${namePet} took a great shower `));
  },

  refresh: () => {
    showAll(colors.blue('Updated!'))
  },

  finish: () => {
    myPet.hunger.close();
    myPet.dirt.close();
    myPet.boredom.close();
    clearInterval(timer);
  }
}

const showAll = async message => {
  console.log('\x1Bc');
  
  myPet.hunger.show();
  myPet.dirt.show();
  myPet.boredom.show();

  message && components.message(message);
  const choose = await events.menu();
  action[choose.action]();
};

const monitor = () => {
  timer = setInterval(function() {
    const dead = Object.keys(myPet).every(feature => myPet[feature].critical());

    if (dead) {
      console.log('\x1Bc');
      components.badNews();
      action.finish();
    }
  }, 10000);
}

components.apresetantion();
events.askName(name => {
  namePet = name;
  showAll(colors.blue(`Ok, the name your pet is ${name}`))
  monitor();
});