import mongoose from 'mongoose';
import path from 'path';
import log from '../helper/logger';

const connect = () => {
    try {
        mongoose.Promise = global.Promise;
        mongoose
            .connect(process.env.MONGO_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            .then(() => {
                console.log('MongoDB Connected...');
            })
            .catch((err) => log.error(null, err, path.join(__dirname, path.basename(__filename))));
    } catch (e) {
        log.error(null, e, path.join(__dirname, path.basename(__filename)));
    }
};

export default ({ connect });
