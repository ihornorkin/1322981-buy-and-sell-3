const CategoryService = require(`../data-service/category`);
const getMockData = require(`../lib/get-mock-data`);
const {Router} = require(`express`);
const category = require(`./category`);

const api = new Router();

(async () => {
  const mockData = await getMockData();

  category(api, new CategoryService(mockData));
  //search(app, new SearchService(mockData));
  //offer(app, new OfferService(mockData), new CommentService());
})();

module.exports = api;
