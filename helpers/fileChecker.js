const uuid = require('uuid/v1');
const fs = require('fs-extra');
const {resolve: resolvePath} = require('path');

const ControllerError = require('../error/ControllerError');
const {PHOTOS} = require('../constants/mimeTypes');

module.exports = async (files, id, type) => {
    try {
        const {photo, file} = files;
        if (!photo || Array.isArray(photo)) {
            throw new Error('File must be file');
        }

        const {name, mimetype, size} = photo;
        if (!PHOTOS.includes(mimetype)) {
            throw new Error('Photo must have correct mime-type');
        }
        if (size > 3 * 1024 * 1024 || size < 512) {
            throw new Error('Size must be less then 3mb');
        }

        await fs.mkdir(resolvePath(`${appRoot}/public/${type}/${id}`), {recursive: true});

        const photoName = uuid() + '.' + name.split('.').pop();

        photo.path = `${type}/${id}/${photoName}`;
        photo.name = photoName;

        return {
            file,
            photo
        }

    } catch (e) {
        throw new ControllerError(e.message, e.status, 'fileChecker');
    }
};
