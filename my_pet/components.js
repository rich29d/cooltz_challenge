const prompt = require("./lib/prompt");
const colors = require("colors/safe");

prompt.start();

const components = {
  bar: (name = 'x', color = 'blue', seconds = 10) => {
    let numCurrent = 0;
    let numTotal = 4;
    let numFilled = numCurrent * 10;
    let numBlank = (numTotal * 10) - (numCurrent * 10);
    let filled = colors[color]('▇');
    let blank = colors.grey('░');
    let current = colors.magenta(numCurrent);
    
    const miliseconds = seconds * 1000;
    const nameBar = colors.magenta(name);
    const total = colors.magenta(`/${numTotal}`);
    
    const show = () => console.log(nameBar, filled.repeat(numFilled) + blank.repeat(numBlank), current + total);
    const critical = () => numCurrent === numTotal;
    const setCurrent = num => {
      numCurrent = num;
      update();
    };
    const addCurrent = num => {
      numCurrent += num;
      update();
    }
    const getText = () => current + total;
    const update = () => {      
      current = colors.magenta(numCurrent);
      numFilled = numCurrent * 10;
      numBlank = (numTotal * 10) - (numCurrent * 10);
    }
    const close = () => clearInterval(timer);
    
    const timer = setInterval(function () {
      numCurrent < numTotal && numCurrent++;;
      update();
    }, miliseconds);

    return {
      show,
      critical,
      setCurrent,
      addCurrent,
      getText,
      close,
    }
  },
  
  apresetantion: () => {
    console.log(colors.yellow("\n Hello, you won a pet, take good care of its."));
  },

  badNews: () => {
    console.log(colors.magenta(
      `Unfortunately I have bad news for you, your little animal has gone to a much better place, but now he is at peace.`
    ));
  },

  message: text => {
    console.log(`\n ${text} \n`);
  }
}

module.exports = components;