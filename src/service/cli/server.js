'use strict';

const {DEFAULT_PORT, HttpCode, API_PREFIX} = require(`../../constants`);
const express = require(`express`);
const getMockData = require(`../lib/get-mock-data`);
const routes = require(`../api`);
const loggerUtil = require(`../lib/logger`);
const sequelize = require(`../lib/sequelize`);

const logger = loggerUtil.getLogger({name: `api`});

module.exports = {
  name: `--server`,
  async run(args) {
    try {
      logger.info(`Trying to connect to database...`);
      await sequelize.authenticate();
    } catch (err) {
      logger.error(`An error occured: ${err.message}`);
      process.exit(1);
    }
    logger.info(`Connection to database established`);
    const [customPort] = args ? args : [];
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    const app = express();

    app.use(express.json());

    app.use((req, res, next) => {
      logger.debug(`Request on route ${req.url}`);
      res.on(`finish`, () => {
        logger.info(`Response status code ${res.statusCode}`);
      });
      next();
    });

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

    app.use((req, res) => {
      res.status(HttpCode.NOT_FOUND)
        .send(`Not found`);
      logger.error(`Route not found: ${req.url}`);
    });

    app.use((err, _req, _res, _next) => {
      logger.error(`An error occured on processing request: ${err.message}`);
    });

    try {
      app.listen(port, (err) => {
        if (err) {
          return logger.error(`An error occured on server creation: ${err.message}`);
        }

        return logger.info(`Listening to connections on ${port}`);
      });

    } catch (err) {
      logger.error(`An error occured: ${err.message}`);
      process.exit(1);
    }

    return app;

  }
};
