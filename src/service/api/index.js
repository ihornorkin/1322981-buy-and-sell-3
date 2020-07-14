'use strict';

const getMockData = require(`../lib/get-mock-data`);
const {Router} = require(`express`);
const category = require(`./category`);
const offer = require(`./offer`);
const search = require(`./search`);
search
const {
  CategoryService,
  SearchService,
  OfferService,
  CommentService,
} = require(`../data-service`);

const app = new Router();

(async () => {
  const mockData = await getMockData();

  category(app, new CategoryService(mockData));
  search(app, new SearchService(mockData));
  offer(app, new OfferService(mockData), new CommentService());
})();

module.exports = app;
