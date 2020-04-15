'use strict';

const fs = require(`fs`).promises;
const {DEFAULT_PORT, HttpCode, FILE_NAME} = require(`../../constants`);
const express = require(`express`);

module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    const app = express();
    app.use(express.json());

    app.get(`/offers`, async (req, res) => {
      try {
        const fileContent = await fs.readFile(FILE_NAME);
        const mocks = JSON.parse(fileContent);
        res.json(mocks);
      } catch (err) {
        if (err.code === `ENOENT`) {
          res.json([]);
        }
        res.status(HttpCode.INTERNAL_SERVER_ERROR).send(err);
      }
    });

    app.use((req, res) => res
      .status(HttpCode.NOT_FOUND)
      .send(`Not found`));

    app.listen(port, () => console.log(`Сервер запущен на порту: ${port}`));

  }
};
