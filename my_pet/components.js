const prompt = require("./lib/prompt");
const colors = require("colors/safe");

prompt.start();

const components = {
  bar: (adjective = 'x', color = 'blue', seconds = 10) => {
    let numCurrent = 0;
    let numTotal = 4;
    let numFilled = numCurrent * 10;
    let numBlank = (numTotal * 10) - (numCurrent * 10);
    let filled = colors[color]('▇');
    let blank = colors.grey('░');
    let current = colors.magenta(numCurrent);
    let double = false;
    let increment = 1;
    let namePet = 'Pet';
    let act = () => {};
    
    const nameBar = colors[color](adjective);
    const total = colors.magenta(`/${numTotal}`);

    const methods = {
      setNamePet: name => namePet = name,
      setDouble: toggle => double = toggle,
      setCurrent: num => {
        numCurrent = num;
        methods.update();
      },
      setAct: newAct => act = newAct,
      
      show: () => console.log(nameBar, filled.repeat(numFilled) + blank.repeat(numBlank), current + total),
      critical: () => numCurrent === numTotal,
      addCurrent: num => {
        numCurrent += num;
        methods.update();
        notificate();
      },
      update: () => {      
        current = colors.magenta(numCurrent);
        numFilled = numCurrent * 10;
        numBlank = (numTotal * 10) - (numCurrent * 10);
      },
      verify: (time, changedStatus) => {
        if (time % seconds === 0) {
          if (numCurrent < numTotal) {
            increment = double ? increment * 2 : 1;        
            numCurrent = numCurrent + increment < numTotal ? numCurrent + increment : numTotal;
            methods.update();         
          }
          
          !changedStatus && notificate();
          changedStatus = true;
        }

        return changedStatus;
      }
    }
    
    const notificate = () => {      
      console.log('');
      console.log(colors[color](`${namePet} is ${adjective}`));
      act();
    }

    return methods
  },
  
  apresetantion: () => {
    console.log(colors.yellow("\n Hello, you won a pet, take good care of its."));
  },

  badNews: stopwatch => {
    console.log(colors.magenta(
      `Unfortunately I have bad news for you, your little animal has gone to a much better place, but now he is at peace.
      He lived ${stopwatch} seconds.`
    ));
  },

  message: text => {
    console.log(`\n ${text} \n`);
  }
}

module.exports = components;