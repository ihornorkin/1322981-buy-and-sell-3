'use strict';

const express = require(`express`);
const request = require(`supertest`);
const offer = require(`./offer`);
const DataService = require(`../data-service/offer`);
const CommentService = require(`../data-service/comment`);
const {HttpCode} = require(`../../constants`);

const mockData = [
  {
    "id": `VZRihx`,
    "category": [
      `Игры`,
      `Разное`,
      `Канцтовары`,
      `Посуда`,
      `Журналы`,
      `Книги`
    ],
    "picture": `item06.jpg`,
    "description": `Даю недельную гарантию. Бонусом отдам все аксессуары. При покупке с меня бесплатная доставка в черте города. Не пытайтесь торговаться. Цену вещам я знаю.`,
    "title": `Продам отличную подборку фильмов на VHS.`,
    "type": `offer`,
    "sum": 82083,
    "comments": [
      {
        "id": `nhWmJO`,
        "text": `А где блок питания? А сколько игр в комплекте? Продаю в связи с переездом. Отрываю от сердца.`
      },
      {
        "id": `qolhlF`,
        "text": `Почему в таком ужасном состоянии? Продаю в связи с переездом. Отрываю от сердца. Совсем немного... С чем связана продажа? Почему так дешёво? А сколько игр в комплекте?`
      },
      {
        "id": `3JRsX8`,
        "text": `Совсем немного... С чем связана продажа? Почему так дешёво? А где блок питания? Неплохо, но дорого`
      },
      {
        "id": `0aokWP`,
        "text": `А сколько игр в комплекте?`
      }
    ]
  },
  {
    "id": `TyPXOQ`,
    "category": [
      `Посуда`
    ],
    "picture": `item07.jpg`,
    "description": `Совершенно новый, экспортный (клеймо - MADE IN USSR). Не пытайтесь торговаться. Цену вещам я знаю. Кому нужен этот новый телефон, если тут такое... Пользовались бережно и только по большим праздникам.`,
    "title": `Продам советскую посуду. Почти не разбита.`,
    "type": `sale`,
    "sum": 28389,
    "comments": [
      {
        "id": `xy3dXG`,
        "text": `Оплата наличными или перевод на карту? А где блок питания?`
      },
      {
        "id": `AkiOWl`,
        "text": `Вы что?! В магазине дешевле. С чем связана продажа? Почему так дешёво?`
      },
      {
        "id": `eJZ7FV`,
        "text": `Неплохо, но дорого Вы что?! В магазине дешевле.`
      }
    ]
  }
];

const createAPI = () => {
  const app = express();
  const cloneData = JSON.parse(JSON.stringify(mockData));
  app.use(express.json());
  offer(app, new DataService(cloneData), new CommentService());
  return app;
};

describe(`API returns a list of all offers`, () => {

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/offers`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns a list of 1 offers`, () => expect(response.body.length).toBe(2));

  test(`First offer's id equals "VZRihx"`, () => expect(response.body[0].id).toBe(`VZRihx`));

});

describe(`API returns an offer with given id`, () => {

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/offers/VZRihx`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Offer's title is "Продам отличную подборку фильмов на VHS."`, () => expect(response.body.title).toBe(`Продам отличную подборку фильмов на VHS.`));

});

describe(`API creates an offer if data is valid`, () => {

  const newOffer = {
    category: `Котики`,
    title: `Дам погладить котика`,
    description: `Дам погладить котика. Дорого. Не гербалайф`,
    picture: `cat.jpg`,
    type: `OFFER`,
    sum: 100500
  };
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .post(`/offers`)
      .send(newOffer);

    test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));

    test(`Returns offer created`, () => expect(response.body).toEqual(expect.objectContaining(newOffer)));

    const expectResultWhenOfferCreated = (res) => {
      return expect(res.body.length).toBe(2);
    };

    test(`Offers count is changed`, () => request(app)
      .get(`/offers`)
      .expect((res) => {
        expectResultWhenOfferCreated(res);
      })
    );

  });

});

describe(`API refuses to create an offer if data is invalid`, () => {

  const newOffer = {
    category: `Котики`,
    title: `Дам погладить котика`,
    description: `Дам погладить котика. Дорого. Не гербалайф`,
    picture: `cat.jpg`,
    type: `OFFER`,
    sum: 100500
  };
  const app = createAPI();

  test(`Without any required property response code is 400`, async () => {
    for (const key of Object.keys(newOffer)) {
      const badOffer = {...newOffer};
      delete badOffer[key];
      await request(app)
        .post(`/offers`)
        .send(badOffer)
        .expect(HttpCode.BAD_REQUEST);
    }
  });

});

describe(`API changes existent offer`, () => {

  const newOffer = {
    category: `Котики`,
    title: `Дам погладить котика`,
    description: `Дам погладить котика. Дорого. Не гербалайф`,
    picture: `cat.jpg`,
    type: `OFFER`,
    sum: 100500
  };
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .put(`/offers/VZRihx`)
      .send(newOffer);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns changed offer`, () => expect(response.body).toEqual(expect.objectContaining(newOffer)));

  test(`Offer is really changed`, () => request(app)
    .get(`/offers/VZRihx`)
    .expect((res) => expect(res.body.title).toBe(`Дам погладить котика`))
  );

});

test(`API returns status code 404 when trying to change non-existent offer`, () => {

  const app = createAPI();

  const validOffer = {
    category: `Это`,
    title: `валидный`,
    description: `объект`,
    picture: `объявления`,
    type: `однако`,
    sum: 404
  };

  return request(app)
    .put(`/offers/VZR2ihx`)
    .send(validOffer)
    .expect(HttpCode.NOT_FOUND);
});

test(`API returns status code 400 when trying to change an offer with invalid data`, () => {

  const app = createAPI();

  const invalidOffer = {
    category: `Это`,
    title: `невалидный`,
    description: `объект`,
    picture: `объявления`,
    type: `нет поля sum`
  };

  return request(app)
    .put(`/offers/VZRihx`)
    .send(invalidOffer)
    .expect(HttpCode.BAD_REQUEST);
});

describe(`API correctly deletes an offer`, () => {

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .delete(`/offers/VZRihx`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns deleted offer`, () => expect(response.body.id).toBe(`VZRihx`));

  test(`Offer count is 0 now`, () => request(app)
    .get(`/offers`)
    .expect((res) => expect(res.body.length).toBe(7))
  );

});

test(`API refuses to delete non-existent offer`, () => {

  const app = createAPI();

  return request(app)
    .delete(`/offers/NOEXST`)
    .expect(HttpCode.NOT_FOUND);

});

describe(`API returns a list of comments to given offer`, () => {

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/offers/TyPXOQ/comments`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns list of 4 comments`, () => expect(response.body.length).toBe(3));

  test(`First comment's id is "nhWmJO"`, () => expect(response.body[0].id).toBe(`xy3dXG`));

});

describe(`API creates a comment if data is valid`, () => {

  const newComment = {
    text: `Валидному комментарию достаточно этого поля`
  };
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .post(`/offers/TyPXOQ/comments`)
      .send(newComment);
  });


  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));


  test(`Returns comment created`, () => expect(response.body).toEqual(expect.objectContaining(newComment)));

  test(`Comments count is changed`, () => request(app)
    .get(`/offers/TyPXOQ/comments`)
    .expect((res) => expect(res.body.length).toBe(4))
  );

});

test(`API refuses to create a comment to non-existent offer and returns status code 404`, () => {

  const app = createAPI();

  return request(app)
    .post(`/offers/2PXOQ/comments`)
    .send({
      text: `Неважно`
    })
    .expect(HttpCode.NOT_FOUND);

});

test(`API refuses to create a comment when data is invalid, and returns status code 400`, () => {

  const app = createAPI();

  return request(app)
    .post(`/offers/TyPXOQ/comments`)
    .send({})
    .expect(HttpCode.BAD_REQUEST);

});

describe(`API correctly deletes a comment`, () => {

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .delete(`/offers/TyPXOQ/comments/xy3dXG`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns comment deleted`, () => expect(response.body.id).toBe(`xy3dXG`));

  test(`Comments count is 3 now`, () => request(app)
    .get(`/offers/TyPXOQ/comments`)
    .expect((res) => expect(res.body.length).toBe(3))
  );

});

test(`API refuses to delete non-existent comment`, () => {

  const app = createAPI();

  return request(app)
    .delete(`/offers/Gx3dTz/comments/NOEXST`)
    .expect(HttpCode.NOT_FOUND);

});

test(`API refuses to delete a comment to non-existent offer`, () => {

  const app = createAPI();

  return request(app)
    .delete(`/offers/NrEXGT/comments/kqME9j`)
    .expect(HttpCode.NOT_FOUND);

});
