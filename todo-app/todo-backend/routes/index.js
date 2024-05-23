const express = require('express');
const redis = require('../redis');

const router = express.Router();

const configs = require('../util/config')

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits
  });
});

const statisticsRouter = express.Router();
statisticsRouter.get('/', async (req, res) => {
  const counter = await redis.getAsync('counter') || 0
  res.json({
    "added_todos": counter
  })
})

router.use('/statistics', statisticsRouter)

module.exports = router;
