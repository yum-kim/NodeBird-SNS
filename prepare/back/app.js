const express = require('express');
const app = express();
const postRouter = require('./routes/post');

app.get('/', (req, res) => {
    res.send('hello express');
});

app.get('/api', (req, res) => {
    res.send('hello api');
});

//앞에 post 붙여주면 Prefix로 붙음
app.use('/post', postRouter);

app.listen(3065, () => {
    console.log('서버 실행 중');
});