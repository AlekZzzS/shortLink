import shortid from 'shortid';
import { Request, Response } from 'express';
import { storageUrl } from './index';

class PostController {
    async create(req: Request, res: Response) {
        try {
            const { fullUrl, customAlias } = req.body;
            const isValidUrl = /^(ftp|http|https):\/\/[^ "]+$/.test(fullUrl);

            if (!isValidUrl) {
                return res.status(400).json({ error: 'Invalid URL' });
            }

            let alias = customAlias;
            if (!alias) {
                alias = shortid.generate();
            } else {
                if (storageUrl[alias]) {
                    return res.status(400).json({ error: 'Alias already in use' });
                }
            }

            storageUrl[alias] = fullUrl;
            res.json({ alias, fullUrl });
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }

    async redirect(req: Request, res: Response) {
        try {
            const { alias } = req.params;
            const fullUrl = storageUrl[alias];

            if (fullUrl) {
                res.redirect(fullUrl);
            } else {
                res.status(404).json({ error: 'URL not found' });
            }
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export default new PostController();