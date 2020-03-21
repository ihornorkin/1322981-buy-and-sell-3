'use strict';

const {Router} = require(`express`);
const offers = new Router();

offers.get(`/category/:id`, (req, res) => res.send(`/offers/category/:id`));
offers.get(`/add`, (req, res) => res.send(`/offers/add`));
offers.get(`/edit/:id`, (req, res) => res.send(`/offers/edit/:id`));
offers.get(`/:id`, (req, res) => res.send(`/offers/:id`));

module.exports = offers;
