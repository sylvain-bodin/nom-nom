import { extend } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import { messages } from 'vee-validate/dist/locale/fr.json';

Object.keys(rules)
  .forEach((rule) => {
    extend(rule, {
      ...rules[rule], // copies rule configuration
      message: messages[rule], // assign message
    });
  });

const urlPattern = /(https?|ftp):\/\/(-\.)?([^\s/?.#-]+\.?)+(\/[^\s]*)?$/i;
extend('url', {
  validate: (value) => urlPattern.test(value),
  message: 'Le champ {_field_} n\'est pas une URL valide. e.g.: https://www.exemple.com',
});
