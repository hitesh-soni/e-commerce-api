import fs from 'fs';
import { asyncForEach } from 'helper';

export const unlinkInvalidFiles = async (invalidFiles) => {
    await asyncForEach(invalidFiles, async (fl) => {
        // eslint-disable-next-line no-param-reassign
        fs.access(fl, fs.constants.F_OK, (err) => {
            if (err) {
                console.error(err);
                return false;
            }
            fs.unlink(fl, (er) => {
                console.log(er);
            });
        });
    });
    return true;
};
