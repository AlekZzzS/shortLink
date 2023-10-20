import express from 'express';
import bodyParser from 'body-parser';
import PostController  from './PostController';
import uiRoute from './uiRoute';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb+srv://Aleks:qwerty123456@cluster0.v4hy8xl.mongodb.net/?retryWrites=true&w=majority';

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(uiRoute);

app.post('/shorten', PostController.create);
app.get('/:alias', PostController.redirect);

async function startApp() {
    try {
        await mongoose.connect(MONGODB_URI);
        const server = app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`))
        return server
    } catch (error) {
        console.log(error)
    }
}

startApp()

export { app, startApp }