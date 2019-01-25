const express = require('express');
const { cryptoCompare } = require('../../core/integrations');

const router = express.Router();


const _verifyCryptoCompare = async () => {
  const from = 'USD';
  const to = ['USD'];
  try {
    await cryptoCompare.makeRequest({ from, to })();
    return true;
  } catch (_) {
    return false;
  }
};

const health = async (_req, res) => {
  const hasAccessToCryptoCompare = await _verifyCryptoCompare();
  if (!hasAccessToCryptoCompare) {
    res.status(503);
  }
  res.json({
    api: true,
    integrations: {
      cryptoCompare: hasAccessToCryptoCompare,
    },
  });
};


router.get('/', health);
module.exports = router;
