'use strict';

const {Router} = require(`express`);
const search = new Router();

search.get(`/`, (req, res) => res.send(`/search`));

module.exports = search;
