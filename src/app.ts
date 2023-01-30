import { app } from './config/zodios'
import express from 'express'
import bodyParser from 'body-parser'
import { verifyAuthentication } from './middlewares/authentication-middleware'

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/users', verifyAuthentication('CREATE_USER'), (req, res) => {
	res.status(201).json({
		data: {
			id: 'awesome_id',
			mail: 'awesome_email@gmail.com',
			role_id: 'awesome_role_id'
		}
	})
})

app.listen(3000, () => {
	console.log('🚀 Server is running on port 3000')
})
