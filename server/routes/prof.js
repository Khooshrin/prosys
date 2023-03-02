const express = require('express')

// controller
const { signupProf, loginProf , getProfs , dissmissProf, appointHOD} = require('../controllers/profController')

const router = express.Router()

// login
router.post('/login', loginProf)

// signup
router.post('/signup', signupProf)

router.post('/', getProfs)

router.post('/dissmiss', dissmissProf)

router.post('/appoint', appointHOD)

module.exports = router