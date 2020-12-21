'use strict';

const {Router} = require(`express`);
const api = require(`../api`).getAPI();
const search = new Router();

search.get(`/`, async (req, res) => {
  try {
    const {search} = req.query;
    const results = await api.search(search);

    res.render(`search/search-result`, {
      results
    });
  } catch (error) {
    res.render(`search/search-result`, {
      results: []
    });
  }
});

module.exports = search;
