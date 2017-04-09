const express = require('express')
const router = new express.Router()

import {getTotalMatches, getMatchDeliveries} from './fakeDb'


router.get('/',(req,res) => {
  res.status(200).json(getTotalMatches())
})
router.get('/deliveries/:id',(req,res) => {
  res.status(200).json(getMatchDeliveries(req.params.id))
})
export default router
