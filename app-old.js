require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')

/* 구조분해할당으로 가져오기 */
const { Sequelize, Model, DataTypes, sequelize } = require('./modules/connect')

/* 실행하기 */
app.listen(process.env.PORT, () => {
	console.log('http://127.0.0.1:'+process.env.PORT);
});

/* 첫번째 인자는 테이블명/두번째는 테이블속성 즉 필드정보/세번째 옵션*/
const SeqBoard = sequelize.define('SeqBoard', {
	title: {
		type: Sequelize.STRING(255),
		allowNull: false,
	},
	writer: {
		type: Sequelize.STRING(50),
	},
	content: {
		type: Sequelize.TEXT(),
	},
}, {
	timestamps: true,
	charset: 'utf8',
	tableName: 'seq-board'
})

sequelize.sync()

app.get('/create', async (req, res, next) => {
	try {
		const result = await SeqBoard.create({
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

app.get(['/list', '/list/:page'], async (req, res, next) => {
	try {
		const limit = 3
		const page = req.params.page || 1
		const offset = (page - 1) * limit;
		const result = await SeqBoard.findAll({ //모든데이터를 가져와
			order: [['id', 'asc'], ['title', 'asc']],
			limit,
			offset,
			// where: { 'id': 3 },
		}) 
		res.json(result) //res.json로 result뿌려서 결과를 보여줘.
	}
	catch(e) {
		next(e)
	}
})

app.use((err, req, res, next) => {
	console.log(err);
})