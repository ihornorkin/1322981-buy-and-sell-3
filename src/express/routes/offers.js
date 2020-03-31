'use strict';

const {Router} = require(`express`);
const {THINKS, COMMENTS} = require(`../../constants`);
const offers = new Router();

offers.get(`/category/:id`, (req, res) => res.render(`offers/category`, {thinks: THINKS}));
offers.get(`/add`, (req, res) => res.render(`offers/new-ticket`));
offers.get(`/edit/:id`, (req, res) => res.render(`offers/ticket-edit`));
offers.get(`/:id`, (req, res) => res.render(`offers/ticket`, {comments: COMMENTS}));

module.exports = offers;
