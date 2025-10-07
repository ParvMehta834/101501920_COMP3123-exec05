const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());

const userRouter = require('./routes/users');

app.use('/api/v1/user', userRouter);


app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'home.html'));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Server Error');
});

app.use((req, res) => {
  res.status(404).send('Route not found');
});

app.listen(process.env.port || 8081);
console.log('Web Server is listening at port '+ (process.env.port || 8081));