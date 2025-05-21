import express from 'express'
import cors from 'cors'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import multer from 'multer'

import db from './config/mongoose-connection.js'

import postModel from './models/post.js'
import userModel from './models/user.js'

const app = express();
const PORT = 3000;

const upload = multer({ dest: 'uploads/' });

dotenv.config();

app.use(cors({credentials: true, origin: 'http://localhost:5173'}));
app.use(express.json());
app.use(cookieParser());

app.post('/logout', (req, res) => {
    res.cookie('token', '');
    res.json('OK');
});

app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = await userModel.create({
            username,
            email,
            password: await bcrypt.hash(password, 10),
        });
        res.json(user);
    }
    catch (err) {
        console.log(err);
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await userModel.findOne({ username });
        if (!user) {
            return res.status(404).json('User Not Found!');
        }
        const passOk = await bcrypt.compare(password, user.password);
        if (passOk) {
            const token = jwt.sign({username, email: user.email, id: user._id}, process.env.SECRET_KEY);
            res.cookie('token', token).json({
                username,
                email: user.email,
                id: user._id,
            });
        } else {
            return res.status(400).json('Incorrect Credentials');
        }
    } catch (err) {
        console.log(err);
    }
});

app.get('/profile', (req, res) => {
    try {
        const { token } = req.cookies;
        const user = jwt.verify(token, process.env.SECRET_KEY);
        res.json(user);
    } catch(err) {
        console.error(err);
    }
});

app.post('/create', upload.single('image'), async (req, res) => {
    const { title, content } = req.body;
    const image = req.file ? req.file.filename : null;
    const user = jwt.verify(req.cookies.token, process.env.SECRET_KEY);
    try {
        const post = await postModel.create({
            title,
            content,
            image,
            author: user.id,
        });
        res.json(post);
    } catch (err) {
        console.log(err);
    }
});

app.get('/getposts', async (req, res) => {
    const { token } = req.cookies;
    const user = jwt.verify(token, process.env.SECRET_KEY);
    try {
        const posts = await postModel.find({ author: user.id }).populate('author');
        res.json(posts);
    } catch (err) {
        console.log(err);
    }
});

app.listen(PORT);