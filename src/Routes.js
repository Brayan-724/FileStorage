const indexR = require('./routes/index');
const uploadR = require('./routes/upload');
const filesR = require('./routes/files');
const viewFileR = require('./routes/viewFile');
const removeR = require('./routes/remove');

module.exports = {
    indexR,
    uploadR,
    filesR,
    viewFileR,
    removeR,
}