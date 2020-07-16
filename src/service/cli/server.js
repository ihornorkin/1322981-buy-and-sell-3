'use strict';

const {DEFAULT_PORT, HttpCode, API_PREFIX} = require(`../../constants`);
const express = require(`express`);
const getMockData = require(`../lib/get-mock-data`);
const routes = require(`../api`);

module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    const app = express();
    app.use(express.json());

    app.get(`/offers`, async (req, res) => {
      try {
        const fileContent = await getMockData();
        const mocks = fileContent;
        res.json(mocks);
      } catch (err) {
        if (err.code === `ENOENT`) {
          res.json([]);
        }
        res.status(HttpCode.INTERNAL_SERVER_ERROR).send(err);
      }
    });

    app.use(API_PREFIX, routes);

    app.use((req, res) => res
      .status(HttpCode.NOT_FOUND)
      .send(`Not found`));

    app.listen(port, () => console.log(`Сервер запущен на порту: ${port}`));

  }
};
