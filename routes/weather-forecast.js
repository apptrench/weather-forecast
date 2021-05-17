const express = require('express');
const router = express.Router();
const validator = require('express-joi-validation').createValidator({})
const Joi = require('joi');
const dataFetcher = require('../lib/fetch-forecast');
const transform = require('../lib/transform-result');

const querySchema = Joi.object({
  city: Joi.string().required(),
  orderBy: Joi.string().default("asc").valid("asc", "desc")
})

router.get('/', validator.query(querySchema), async (req, res, next) => {

  try {
    const forecastResult = await dataFetcher(req.query.city);
    return res
      .send(transform(forecastResult, req.query.orderBy))

  } catch (error) {
    next(error)
  }

});

module.exports = router;
