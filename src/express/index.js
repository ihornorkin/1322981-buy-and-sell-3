'use strict';

const express = require(`express`);
const {DEFAULT_EXPRESS_PORT} = require(`../constants`);
const authorization = require(`./routes/authorization`);
const advert = require(`./routes/advert`);
const offers = require(`./routes/offers`);
const search = require(`./routes/search`);

const app = express();

app.use(`/`, authorization);
app.use(`/my`, advert);
app.use(`/offers`, offers);
app.use(`/search`, search);
app.listen(DEFAULT_EXPRESS_PORT,
    () => console.log(`Сервер запущен на порту: ${DEFAULT_EXPRESS_PORT}`));
