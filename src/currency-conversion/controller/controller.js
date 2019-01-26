const express = require('express');
const { split } = require('ramda');
const rules = require('../rules');
const converter = require('../services/converter');
const memoryCacheFn = require('../services/memory-cache');
const { date } = require('../../core/helpers');
const { cryptoCompare } = require('../../core/integrations');

const router = express.Router();


const _formatResponse = (amount, from, rates, converted) => ({
  amount: Number(amount),
  base: from,
  date: date.getToday(),
  rates,
  converted,
});

const conversion = async (req, res) => {
  const { from, to, amount } = req.query;
  const toSplited = split(',', to);
  try {
    const cryptoCachedFn = memoryCacheFn(cryptoCompare.request);
    const ratesByCoins = await cryptoCachedFn(from, toSplited);
    const convertedByRates = converter.calcAmountByRates(ratesByCoins, amount);
    const response = _formatResponse(amount, from, ratesByCoins, convertedByRates);
    res.json(response);
  } catch (_) {
    res.sendStatus(500);
  }
};


router.get('/', [...rules], conversion);
module.exports = router;
