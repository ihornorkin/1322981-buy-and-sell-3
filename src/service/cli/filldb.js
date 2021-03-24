'use strict';

const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const {
  getRandomInt,
  shuffle,
  getPictureFileName
} = require(`../../utils`);
const {
  FILE_NAME,
  DEFAULT_COUNT,
  OfferType,
  PictureRestrict,
  SumRestrict,
  MAX_COUNT,
  ExitCode,
  FILE_SENTENCES_PATH,
  FILE_TITLES_PATH,
  FILE_CATEGORIES_PATH,
  FILE_COMMENTS_PATH,
  MAX_ID_LENGTH,
  MAX_COMMENTS
} = require(`../../constants`);
const {nanoid} = require(`nanoid`);
const sequelize = require(`../lib/sequelize`);
const defineModels = require(`../models`);
const Aliase = require(`../models/aliase`);
const loggerUtil = require(`../lib/logger`);
const logger = loggerUtil.getLogger({name: `api`});

module.exports = {
  name: `--filldb`,
  async run(args, process) {
    try {
      logger.info(`Trying to connect to database...`);
      await sequelize.authenticate();
    } catch (err) {
      logger.error(`An error occured: ${err.message}`);
      process.exit(1);
    }
    logger.info(`Connection to database established`);

    const {Category, Offer} = defineModels(sequelize);

    await sequelize.sync({force: true});

    const readContent = async (filePath) => {
      try {
        const content = await fs.readFile(filePath, `utf8`);
        return content.split(`\n`).slice(0, -1);
      } catch (err) {
        console.error(chalk.red(err));
        return [];
      }
    };

    const sentences = await readContent(FILE_SENTENCES_PATH);
    const titles = await readContent(FILE_TITLES_PATH);
    const categories = await readContent(FILE_CATEGORIES_PATH);
    const comments = await readContent(FILE_COMMENTS_PATH);

    const categoryModels = await Category.bulkCreate(
      categories.map((item) => ({name: item}))
    );

    const categoryIdByName = categoryModels.reduce((acc, next) => ({
      [next.name]: next.id,
      ...acc
    }), {});

    const getRandomSubarray = (items) => {
      items = items.slice();
      let count = getRandomInt(1, items.length - 1);
      const result = [];
      while (count--) {
        result.push(
            ...items.splice(getRandomInt(0, items.length - 1), 1)
        );
      }
      return result;
    };

    const generateComments = (count, comments) => (
      Array(count).fill({}).map(() => ({
        text: shuffle(comments)
          .slice(0, getRandomInt(1, MAX_ID_LENGTH - 1))
          .join(` `),
      }))
    );

    const generateOffers = (count, titles, categories, sentences, comments) => (
      Array(count).fill({}).map(() => ({
        category: getRandomSubarray(categories),
        picture: getPictureFileName(getRandomInt(PictureRestrict.min, PictureRestrict.max)),
        description: shuffle(sentences).slice(1, 5).join(` `),
        title: titles[getRandomInt(0, titles.length - 1)],
        type: Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)],
        sum: getRandomInt(SumRestrict.min, SumRestrict.max),
        comments: generateComments(getRandomInt(1, MAX_COMMENTS), comments),
      }))
    );

    const [count] = args;

    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const offers = generateOffers(countOffer, titles, categories, sentences, comments);

    const offerPromises = offers.map(async (offer) => {
      const offerModel = await Offer.create(offer, {include: [Aliase.COMMENTS]});
      await offerModel.addCategories(
        offer.category.map(name => categoryIdByName[name]));
    });
    await Promise.all(offerPromises);

  }
};
