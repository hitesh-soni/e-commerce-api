import fs from 'fs';
import moment from 'moment';
import { response } from 'helper';

class Logger {
    /**
     * Class default constructor
     */
    constructor() {
        const dir = './logs';

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
    }

    /**
     * @returns {object} reflection object
     */
    error = (res, body, dirName = '') => {
        try {
            fs.appendFile(`logs/${moment().format('MMMMDoYYYY')}.txt`, `\n\nError : ${moment().format()} : ${dirName} | ${body.toString()}`, (err) => {
                (err) ? console.log(body.toString()) : false;
            });
            if (res && !res.headersSent) {
                response.res500(res);
            }
        } catch (e) {
            console.log('Exception', e);
        }
    }

    /**
     * @returns {object} reflection object
     */
    debug = (body, dirName = '') => {
        try {
            fs.appendFile(`logs/${moment().format('MMMMDoYYYY')}.txt`, `\n\nDebug : ${moment().format()} : ${dirName} | ${body.toString()}`, (err) => {
                (err) ? console.log(body.toString()) : false;
            });
        } catch (e) {
            console.log('Exception', e);
        }
    }

    /**
     * @returns {object} reflection object
     */
    info = (body, dirName = '') => {
        try {
            fs.appendFile(`logs/${moment().format('MMMMDoYYYY')}.txt`, `\n\nInfo : ${moment().format()} : ${dirName} | ${body.toString()}`, (err) => {
                (err) ? console.log(body.toString()) : false;
            });
        } catch (e) {
            console.log('Exception', e);
        }
    }

    /**
     * @returns {object} reflection object
     */
    warning = (body, dirName = '') => {
        try {
            fs.appendFile(`logs/${moment().format('MMMMDoYYYY')}.txt`, `\n\nWarning : ${moment().format()} : ${dirName} | ${body.toString()}`, (err) => {
                (err) ? console.log(body.toString()) : false;
            });
        } catch (e) {
            console.log('Exception', e);
        }
    }
}
export default new Logger();
