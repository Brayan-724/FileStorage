const { Router } = require("express");
const fileUpload = require("express-fileupload");
const router = Router();
const fs = require('fs');


function DExist(Path) {
    return new Promise((res, rej) => {
        fs.access(Path, (err) => {
            if(err) res(false);
            res(true);
        })
    });
}
/**
 * 
 * @param {string} Path 
 * @param {fileUpload.UploadedFile} File 
 */
function SaveFile(Path, File) {
    return new Promise(async (res) => {
        const e = await DExist(Path);
        if(e) {
            console.log(Path);
        }

        File.mv(Path + File.name, (err) => {
            if(err) return res({err, up: false});
            res({err: null, up: true});
        });
    });
}

/**
 * 
 * @param {string} Path 
 * @param {fileUpload.UploadedFile[]} Files 
 */
function SaveFiles(Path, Files) {
    return new Promise(async (res) => {
        let t;

        for(let File of Files) {
            t = await SaveFile(Path, File);
            if(t.up) res({err: t.err, up: true});
        }

        res({err: null, up: true});
    })
}

router.get('/', (req, res) => {
    res.render('upload');
});

router.post("/", async (req, res) => {
    const File = req.files.file;
    const PATH = `./src/public/UPLOAD/`;
    let sf;
    if(Array.isArray(File)) sf = await SaveFiles(PATH, File);
    else sf = await SaveFile(PATH, File);

    if(sf.up) {
        res.status(200).send('Great');
    } else {
        res.status(500).send({message: sf.err});
    };
});

module.exports = router;