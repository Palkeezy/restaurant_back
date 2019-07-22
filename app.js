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
const commentsRouter = require('./routes/commentsRouter');
const doctorRouter = require('./routes/doctorRouter');
const departmentRouter = require('./routes/departmentRouter');

app.get('/', function (req, res) {

    res.json({
        success: true,
        msg: 'home page'
    });
});


app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/comments', commentsRouter);
app.use('/doctor', doctorRouter);
app.use('/department', departmentRouter);



app.use('*', (req, res) => {
    res.status(404).json('Oupsss');
});

app.listen(3000, function (err) {
    if (err) console.log(err);
    console.log('SERVER is UP...');
});
