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
  CATEGORIES,
  SENTENCES,
  TITLES,
  OfferType,
  PictureRestrict,
  SumRestrict,
  MAX_COUNT,
  ExitCode
} = require(`../../constants`);

module.exports = {
  name: `--generate`,
  async run(args, process) {
    const generateOffers = (count) => (
      Array(count).fill({}).map(() => ({
        category: shuffle(CATEGORIES).slice(getRandomInt(1, CATEGORIES.length - 1)),
        picture: getPictureFileName(getRandomInt(PictureRestrict.min, PictureRestrict.max)),
        description: shuffle(SENTENCES).slice(1, 5).join(` `),
        title: TITLES[getRandomInt(0, TITLES.length - 1)],
        type: Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)],
        sum: getRandomInt(SumRestrict.min, SumRestrict.max),
      }))
    );
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    if (countOffer > MAX_COUNT) {
      console.info(`Не больше 1000 объявлений`);
      return process.exit(ExitCode.success);
    }
    const content = JSON.stringify(generateOffers(countOffer));
    try {
      await fs.writeFile(FILE_NAME, content);
      return console.info(chalk.green(`Файл создан.`));
    } catch (err) {
      console.error(chalk.red(`Не смог записать данные в файл.`));
      return process.exit(ExitCode.failure);
    }
  }
};
