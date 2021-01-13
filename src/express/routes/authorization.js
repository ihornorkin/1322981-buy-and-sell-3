'use strict';

const {Router} = require(`express`);
const api = require(`../api`).getAPI();
const authorization = new Router();

authorization.get(`/`, async (req, res) => {
  const offers = await api.getOffers();
  res.render(`main`, {offers});
});

authorization.get(`/register`, (req, res) => res.render(`authorization/sign-up`));
authorization.get(`/login`, (req, res) => res.render(`authorization/login`));

module.exports = authorization;
