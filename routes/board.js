const express = require('express')
const router = express.Router()
const { Board } = require('../models')

router.get('/create', async (req, res, next) => {
	try {
		const result = await Board.create({
			title: '아버지를 아버지라...',
			writer: '홍길동',
			content: '아버지를 아버지라...형을 형이라...'
		})
		res.json(result);
	}
	catch(e) {
		next(e)
	}
})

router.get(['/list', '/list/:page'], async (req, res, next) => {
	try {
		const limit = 3
		const page = req.params.page || 1
		const offset = (page - 1) * limit;
		const result = await Board.findAll({
			order: [['id', 'asc'], ['title', 'asc']],
			limit,
			offset,
			// where: { 'id': 3 },
		})
		res.json(result)
	}
	catch(e) {
		next(e)
	}
})

module.exports = router