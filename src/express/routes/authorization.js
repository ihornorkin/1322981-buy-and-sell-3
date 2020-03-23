'use strict';

const {Router} = require(`express`);
const authorization = new Router();

authorization.get(`/`, (req, res) => res.send(`/`));
authorization.get(`/register`, (req, res) => res.send(`/register`));
authorization.get(`/login`, (req, res) => res.send(`/login`));

module.exports = authorization;
