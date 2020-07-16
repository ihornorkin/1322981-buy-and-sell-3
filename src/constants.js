'use strict';

const DEFAULT_COUNT = 1;
const MAX_COUNT = 1000;
const FILE_NAME = `mocks.json`;

const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;
const FILE_COMMENTS_PATH = `./data/comments.txt`;

const OfferType = {
  offer: `offer`,
  sale: `sale`,
};

const PictureRestrict = {
  min: 1,
  max: 16,
};

const SumRestrict = {
  min: 1000,
  max: 100000,
};

const USER_ARGV_INDEX = 2;
const DEFAULT_COMMAND = `--help`;

const ExitCode = {
  success: 0,
  failure: 1,
};

const DEFAULT_PORT = 3000;
const DEFAULT_EXPRESS_PORT = 8080;

const THINKS = [{
  name: `Фотик Canon`,
  price: `32 000`,
  description: `Куплю вот такую итальянскую кофеварку, можно любой фирмы...`,
  label: `Куплю`,
  image: `/img/item08.jpg`,
  category: `ЭЛЕКТРОНИКА`
},
{
  name: `Кофемашина`,
  price: `26 000`,
  description: `Продам свое старое кресло, чтобы сидеть и читать книги зимними...`,
  label: `ПРОДАМ`,
  image: `/img/item15.jpg`,
  category: `ЭЛЕКТРОНИКА`
},
{
  name: `Фотик Canon`,
  price: `32 000`,
  description: `Куплю вот такую итальянскую кофеварку, можно любой фирмы...`,
  label: `Куплю`,
  image: `/img/item08.jpg`,
  category: `ЭЛЕКТРОНИКА`
},
{
  name: `Кофемашина`,
  price: `26 000`,
  description: `Продам свое старое кресло, чтобы сидеть и читать книги зимними...`,
  label: `ПРОДАМ`,
  image: `/img/item15.jpg`,
  category: `ЭЛЕКТРОНИКА`
},
{
  name: `Фотик Canon`,
  price: `32 000`,
  description: `Куплю вот такую итальянскую кофеварку, можно любой фирмы...`,
  label: `Куплю`,
  image: `/img/item08.jpg`,
  category: `ЭЛЕКТРОНИКА`
},
{
  name: `Кофемашина`,
  price: `26 000`,
  description: `Продам свое старое кресло, чтобы сидеть и читать книги зимними...`,
  label: `ПРОДАМ`,
  image: `/img/item15.jpg`,
  category: `ЭЛЕКТРОНИКА`
},
{
  name: `Фотик Canon`,
  price: `32 000`,
  description: `Куплю вот такую итальянскую кофеварку, можно любой фирмы...`,
  label: `Куплю`,
  image: `/img/item08.jpg`,
  category: `ЭЛЕКТРОНИКА`
},
{
  name: `Кофемашина`,
  price: `26 000`,
  description: `Продам свое старое кресло, чтобы сидеть и читать книги зимними...`,
  label: `ПРОДАМ`,
  image: `/img/item15.jpg`,
  category: `ЭЛЕКТРОНИКА`
}];

const GOOD = [{
  name: `Ленд Ровер`,
  price: `900 000`,
  label: `ПРОДАМ`
}];

const COMMENTS = [{
  avatar: `/img/avatar03.jpg`,
  name: `Александр Бурый`,
  content: `А что с прогоном автомобиля? Также вижу на фото зимнюю резину. А летняя идет ли впридачу?`
},
{
  avatar: `/img/avatar04.jpg`,
  name: `Анатолий Хакимов`,
  content: `Хочу прийти посмотреть на авто в среду. Мой телефон 89254455566. Готовы принять?`
},
{
  avatar: `/img/avatar02.jpg`,
  name: `Георгий Шпиц`,
  content: `Что это за рухлядь? Стыдно такое даже фотографировать, не то, что&nbsp;продавать.`
}];

const MAX_ID_LENGTH = 6;

const MAX_COMMENTS = 4;

const API_PREFIX = `/api`;

module.exports = {
  DEFAULT_COUNT,
  FILE_NAME,
  OfferType,
  PictureRestrict,
  SumRestrict,
  USER_ARGV_INDEX,
  DEFAULT_COMMAND,
  ExitCode,
  MAX_COUNT,
  FILE_SENTENCES_PATH,
  FILE_TITLES_PATH,
  FILE_CATEGORIES_PATH,
  FILE_COMMENTS_PATH,
  DEFAULT_PORT,
  DEFAULT_EXPRESS_PORT,
  THINKS,
  COMMENTS,
  GOOD,
  MAX_ID_LENGTH,
  MAX_COMMENTS,
  API_PREFIX
};

module.exports.HttpCode = {
  OK: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400
};

