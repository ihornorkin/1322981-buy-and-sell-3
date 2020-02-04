'use strict';

const fs = require(`fs`);
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
  run(args, process) {
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
    return fs.writeFile(FILE_NAME, content, (err) => {
      if (err) {
        console.error(`Не смог записать данные в файл.`);
        return process.exit(ExitCode.failure);
      }

      return console.info(`Файл создан.`);
    });
  }
};
