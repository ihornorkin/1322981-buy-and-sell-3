"use strict";

const {Model} = require(`sequelize`);
const defineCategory = require(`./category`);
const defineComment = require(`./comment`);
const defineOffer = require(`./offer`);
const Aliase = require(`./aliase`);

class offerCategory extends Model {}

const define = (sequelize) => {
  const Category = defineCategory(sequelize);
  const Comment = defineComment(sequelize);
  const Offer = defineOffer(sequelize);

  Offer.hasMany(Comment, {as: Aliase.COMMENTS, foreignKey: `offerId`});
  Comment.belongsTo(Offer, {foreignKey: `offerId`});

  offerCategory.init({}, {sequelize});

  Offer.belongsToMany(Category, {through: offerCategory, as: Aliase.CATEGORIES});
  Category.belongsToMany(Offer, {through: offerCategory, as: Aliase.OFFERS});
  Category.hasMany(offerCategory, {as: Aliase.OFFER_CATEGORIES});

  return {Category, Comment, Offer, offerCategory};
}

module.exports = define;
