'use strict';

const {Router} = require(`express`);
const {THINKS} = require(`../../constants`);
const authorization = new Router();

authorization.get(`/`, (req, res) => res.render(`main`, {mostNew: THINKS, mostDiscuss: THINKS}));
authorization.get(`/register`, (req, res) => res.render(`authorization/sign-up`));
authorization.get(`/login`, (req, res) => res.render(`authorization/login`));

module.exports = authorization;
