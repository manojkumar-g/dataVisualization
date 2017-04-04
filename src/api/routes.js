const express = require('express')
const router = new express.Router()

import {getTotalMatches} from './fakeDb'


router.get('/',(req,res) => {
  res.status(200).json(getTotalMatches())
})
export default router
