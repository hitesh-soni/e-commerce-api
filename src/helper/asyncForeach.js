const asyncForEach = async (array, callback) => {
    if (array.length) {
        for (let index = 0; index < array.length; index++) {
            // eslint-disable-next-line no-await-in-loop
            await callback(array[index], index, array);
        }
    } else {
        const keys = Object.keys(array);
        for (let index = 0; index < keys.length; index++) {
            // eslint-disable-next-line no-await-in-loop
            await callback(array[keys[index]], keys[index], array);
        }
    }
};

export default asyncForEach;
