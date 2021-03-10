const indexR = require('./routes/index');
const uploadR = require('./routes/upload');
const filesR = require('./routes/files');
const viewFileR = require('./routes/viewFile');
const removeR = require('./routes/remove');
const downloadR = require('./routes/download');
const tmpR = require('./routes/tmp.js');

module.exports = {
    indexR,
    uploadR,
    filesR,
    viewFileR,
    removeR,
    downloadR,
    tmpR
}