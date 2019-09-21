const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const session = require('express-session');
const cors = require('cors');

const mongoose = require('mongoose');
const usersRouter = require('./users/users.routes');
const postsRouter = require('./posts/posts.routes');
const upLoadRouter = require('./uploads/uploads.routes');

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb+srv://Admin:Chz9p7VX5nQia4gL@cluster0-l9py8.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true }, (e) => {
    if (e) {
        throw e;
    }
    else {
        const app = express();

        app.use(express.static('public'));
        app.use(bodyParser.json());
        app.use(cors({
            origin: ["*"],
            credentials: true,
            methods: ['GET', 'PUT', 'POST'],
            allowedHeaders: ['Content-Type', 'Authorization'],
        }));
        app.use(session({
            secret: 'homquaemdentruong',
            resave: false,
            saveUninitialized: true,
            cookie: { secure: false },
        }));
        app.use('/users', usersRouter);
        app.use('/posts', postsRouter);
        app.use('/uploads', upLoadRouter);

        app.get('/test-deployment', (req,res)=>{
            res.json({
                success: true,
            });
        })

        app.listen(process.env.PORT || 3001, (error) => {
            if (error) {
                console.log(error);
            }
            else {
                console.log('Dang nghe o cong 3001...');
            }
        });
    }
});


