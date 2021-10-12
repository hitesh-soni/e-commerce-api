import multer from 'multer';
import path from 'path';
import fs from 'fs';
import constants from 'config/constants';
import { log } from 'helper';

const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        const default_path = constants.path.imagePath;
        if (!fs.existsSync(default_path)) {
            await fs.mkdirSync(default_path, { recursive: true });
        }
        cb(null, default_path);
    },
    filename: (req, file, cb) => {
        const uploadedFileName = `${Date.now()}_${file.originalname}`;

        cb(null, uploadedFileName);
    },
    onError: (error, next) => {
        log.error(null, error, path.join(__dirname, path.basename(__filename)));
        next(error);
    },
});

const upload = multer({
    storage,
    fileFilter(req, file, callback) {
        const ext = path.extname(file.originalname);
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            req.file_error = 'Only images are allowed';
            return callback(null, false);
        }
        callback(null, true);
    },
});

export default upload;
