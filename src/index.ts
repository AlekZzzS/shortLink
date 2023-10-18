import express from 'express';
import bodyParser from 'body-parser';
import PostController  from './PostController';
import uiRoute from './uiRoute';

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(uiRoute);

const storageUrl: { [key: string]: string } = {};

app.post('/shorten', PostController.create);
app.get('/:alias', PostController.redirect);

const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

export { app, server, storageUrl }