'use strict';

const {Router} = require(`express`);
const {THINKS} = require(`../../constants`);
const search = new Router();

search.get(`/`, (req, res) => res.render(`search/search-result`, {thinks: THINKS.slice(0, 2)}));

module.exports = search;
