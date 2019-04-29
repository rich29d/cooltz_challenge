const prompt = require("./lib/prompt");
const prompts = require('prompts');
const colors = require("colors/safe");

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

  menu: async callback => {
    return await prompts([
      {
        type: 'select',
        name: 'action',
        message: 'What do you want to do?',
        choices: [
          { title: 'Refresh', value: 'refresh' },
          { title: 'eat', value: 'eat' },
          { title: 'shower', value: 'shower' },
          { title: 'play', value: 'play' },
          { title: 'finish', value: 'finish' },
        ],
      }
    ]);
  },
}

module.exports = events;