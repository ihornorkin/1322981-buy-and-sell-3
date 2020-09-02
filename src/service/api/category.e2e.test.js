'use strict';

const request = require(`supertest`);
const server = require(`../cli/server`);
const {HttpCode} = require(`../../constants`);
const {describe, expect, test} = require(`@jest/globals`);

describe(`Category API end-points`, () => {
  test(`Category status code should be 200`, async () => {
    const res = await request(server.run()).get(`/api/categories`);
    expect(res.statusCode).toBe(HttpCode.OK);
  });
});
