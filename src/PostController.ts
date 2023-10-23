import shortid from 'shortid';
import { Request, Response } from 'express';
import { UrlDocument, UrlModel } from './models/UrlModel';

class PostController {
    async create(req: Request, res: Response) {
        try {
            const { fullUrl, customAlias } = req.body;
            const isValidUrl = /^(ftp|http|https):\/\/[^ "]+$/.test(fullUrl);

            if (!isValidUrl) {
                return res.status(400).json({ error: 'Invalid URL' });
            }

            let alias = customAlias || shortid.generate();

            const url: UrlDocument = await UrlModel.create({ alias, fullUrl });
            res.json({ alias: url.alias, fullUrl: url.fullUrl });
        } catch (error: any) {
            if (error.code === 11000) {
                return res.status(400).json({ error: 'Alias already in use' });
            }
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async redirect(req: Request, res: Response) {
        const alias = req.params.alias;
        try {
            const url = await UrlModel.findOne({ alias });

            if (url) {
                res.redirect(url.fullUrl);
            } else {
                res.status(404).send('URL not found');
            }
        } catch (error) {
          console.error('Error:', error);
          res.status(500).send('Internal Server Error');
        }
    }
}

export default new PostController();