const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const _File = new Schema({
    name: String,
    data: Buffer,
    type: String,
});
const File = mongoose.model('saveFile_File', _File, 'Files');

const _Proyect = new Schema({
    path: String,
    name: String,
});
const Proyect = mongoose.model('saveFile_Proyect', _Proyect, 'Files');

const _Model = new Schema({
    url: String,
    fileName: String,
    file: _File,
    proyect: _Proyect
});
const Model = mongoose.model('file', _Model, 'Files');

// const Model = new Schema({
//     url: String,
//     fileName: String,
//     file: {
//         name: String,
//         data: Buffer,
//         type: String
//     },
//     proyect: {
//         path: String,
//         name: String,
//     }
// });


exports = {File, Proyect, Model};

module.exports = exports;