'use strict';

const {Router} = require(`express`);
const api = require(`../api`).getAPI();
const advert = new Router();

advert.get(`/`, async (req, res) => {
  const [
    offers,
    categories
  ] = await Promise.all([
    api.getOffers(),
    api.getCategories(true)
  ]);

  res.render(`advert/my-tickets`, {offers, categories});
});

advert.get(`/comments`, async (req, res) => {
  const offers = await api.getOffers({comments: true});
  const offer = {...offers[0]};
  res.render(`advert/comments`, {thinks: {offer}});
});

module.exports = advert;
