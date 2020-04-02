'use strict';

const {Router} = require(`express`);
const {COMMENTS, THINKS, GOOD} = require(`../../constants`);
const advert = new Router();

const data = {
  think: {
    ...GOOD[0],
    comments: COMMENTS
  }
};

advert.get(`/`, (req, res) => res.render(`advert/my-tickets`, {thinks: THINKS}));
advert.get(`/comments`, (req, res) => res.render(`advert/comments`, {thinks: data}));

module.exports = advert;
