const { Router } = require("express");
const fileUpload = require("express-fileupload");
const CTRL = require('../models/file/controller');
const MD = require('../models/file/model');
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
 * @param {String} mimeType
 * 
 * @returns {String[]} 
 */
function parseType(mimeType) {
    const types = [
        {
            q: ["image\/*"],
            o: "img"
        },
        {
            q: ["text\/*"],
            o: "script"
        },
        {
            q: ["audio\/*"],
            o: "audio"
        }
    ];

    const out = [];
    types.forEach((e) => {
        const rex = new RegExp(e.q, "");
        if(rex.test(mimeType)) {
            out.push(e.o);
        }
    });

    return out;
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

        const a = await CTRL.getBy({fileName: File.name});
        if(a.success && a.data.length > 0) {
            a.data.forEach(e => {
                CTRL.remove(e._id);
            })
        }

        const m = await CTRL.add({
            url: '/f/' + File.name,
            fileName: File.name,
            smType: parseType(File.mimetype),
            file: new MD.File({
                data: File.data,
                name: File.name,
                type: File.mimetype
            }),
            proyect: {
                path: Path,
                name: 'NoName'
            }
        });
        if(!m.success) {
            console.error(m.data);
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
    File.name = req.body.dirName + "." + (File.name.split('.').slice(1).join('.'));

    const PATH = `./src/public/UPLOAD/`;
    let sf;
    if(Array.isArray(File)) sf = await SaveFiles(PATH, File);
    else sf = await SaveFile(PATH, File);

    if(sf.up) {
        res.status(200).render('uploaded');
    } else {
        res.status(500).render('error', {message: sf.err.message, error: sf.err})
    };
});

module.exports = router;