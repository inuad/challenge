require('dotenv').config();

const express = require('express');
const app = new express();

const middlewares = require('./middlewares/middlewareIndex');
app.use(middlewares);

const routes = require('./routes/routeIndex');
app.use(routes);

app.listen(3000, () => {
	console.log('Authentication Server Started')
})