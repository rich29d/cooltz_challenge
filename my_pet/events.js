const prompt = require("./lib/prompt");
const colors = require("colors/safe");
const prompts = require('prompts');

prompt.start();

const events = {
  askName(callback) {
    console.log('');

    prompt.get({
      properties: {
        name: {
          default: 'Bolt',
          description: colors.magenta("Choose a name for it"),
          pattern: /^[a-zA-Z\s-]+$/,
          message: 'Name must be only letters, spaces, or dashes',
          required: true,
        }
      }
    }, function (err, result) {
      result.name && callback && callback(result.name);
    });
  },

  act(message, callback) {
    prompt.get({
      properties: {
        method: {
          description: colors.magenta(`${message}`),
        }
      }
    }, function (err, result) {
      result && (result.method || result.method ===  '') && callback && callback(result.method);
    });
  }
}

module.exports = events;