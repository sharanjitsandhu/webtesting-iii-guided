const uuid = require("uuid");
const axios = require("axios");

module.exports = {
  makePerson,
  forEvenOnly,
  greet,
  callApi
};

function callApi(url, payload) {}

function makePerson(first, last) {
  return {
    id: uuid(),
    name: `${first} ${last}`
  };
}

function forEvenOnly(number, callback) {
  if (number % 2 === 0) {
    callback(number);
  }
}

function greet(cb) {
  return cb();
}
