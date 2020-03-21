'use strict';

const {Router} = require(`express`);
const advert = new Router();

advert.get(`/`, (req, res) => res.send(`/my`));
advert.get(`/comments`, (req, res) => res.send(`/my/comments`));


module.exports = advert;
