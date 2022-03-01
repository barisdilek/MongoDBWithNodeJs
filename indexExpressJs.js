const express = require('express');
const app = express();

app.get('/', (req, res) => {
	res.send('Hi Express.Js!');
    //res.json({ 'product': 'Apple', 'price': 3.50, 'currency': 'USD' });
    //Other Response types
    //https://expressjs.com/en/api.html#res.methods 
}); 

app.get('/category', (req, res) => {
	res.send('You are curently in Category page!');
});

app.get('/galery/:categoryUrl/:titleUrl', (req, res) => {
	const category = req.params.categoryUrl;
	const titleUrl = req.params.titleUrl;
	
	res.send(`You are viewing ${titleUrl} in ${category} `);
});

app.listen(3000, () => {
	console.log('App is running with Express...');
});