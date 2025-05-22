import express from 'express'
import cors from 'cors'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import multer from 'multer'
import crypto from 'crypto'
import { fileURLToPath } from 'url'
import path from 'path'

import db from './config/mongoose-connection.js'

import postModel from './models/post.js'
import userModel from './models/user.js'

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/');
    },
    filename: function (req, file, cb) {
        crypto.randomBytes(16, (err, buf) => {
            if (err) return cb(err);
            const filename = buf.toString("hex") + path.extname(file.originalname);
            cb(null, filename);
        });
    }
});

const upload = multer({ storage: storage });

dotenv.config();

app.use(cors({credentials: true, origin: 'http://localhost:5173'}));
app.use(express.static(path.join(__dirname, 'public')));
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

app.get('/profile/', (req, res) => {
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
    try {
        const posts = await postModel.find().populate('author');
        res.json(posts);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
});

app.get('/posts/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const post = await postModel.findById(id).populate('author');
        res.json(post);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to fetch post' });
    }
});

app.put('/edit/:id', upload.single('image'), async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
        const existingPost = await postModel.findById(id);
        if (!existingPost) {
            return res.status(404).json({ error: 'Post not found' });
        }

        const updatedFields = {
            title,
            content,
            image: req.file ? req.file.filename : existingPost.image,
        };

        const post = await postModel.findByIdAndUpdate(id, updatedFields, { new: true });
        res.json(post);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to update post' });
    }
});

app.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const post = await postModel.findByIdAndDelete(id);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json({ message: 'Post deleted successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to delete post' });
    }
});

app.get('/gay', (req, res) => {
    res.send(`
        <html>
            <body style="margin:0;padding:0;display:flex;justify-content:center;align-items:center;height:100vh;">
                <img src="https://i.imgflip.com/9utb3r.jpg" alt="Image" style="max-width:100%;max-height:100vh;">
            </body>
        </html>
    `);
});

app.listen(PORT);