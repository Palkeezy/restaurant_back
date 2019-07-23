const express = require('express');

const app = express();

const cors = require('cors');
app.use(cors());

const dataBase = require('./dataBase').getInstance();
dataBase.setModels();

app.use(express.urlencoded({extended: true}));
app.use(express.json());


const userRouter = require('./routes/userRouter');
const authRouter = require('./routes/authRouter');
const restaurantRouter = require('./routes/restaurantRouter');


app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/restaurant', restaurantRouter);




app.use('*', (req, res) => {
    res.status(404).json('Oupsss');
});

app.listen(3000, function (err) {
    if (err) console.log(err);
    console.log('SERVER is UP...');
});
