const { Router } = require("express");
const router = Router();
const fileUpload = require('express-fileupload');
const fs = require('fs');
const { request } = require("../helpers/rest-req");

/**
 * 
 * @param {fileUpload.UploadedFile} File 
 * @returns {Promise<{success: boolean, data: any}>}
 */
function SaveFile(File) {
    return new Promise(async (res) => {
        const path = "./src/public/UPLOAD/" + File.name;

        await (() => new Promise((res) => {
            File.mv(path, res);
        }));

        const [req] = await request("/upload", "POST", {
            file: fs.createReadStream(path),
            private: "false",
            name: ""
        });

        if(req.status >= 200 && req.status <= 299) {
            res({success: true});
        } else {
            res({success: false});
        }
    });
}


exports = module.exports = function() {
    router.get('/', (req, res) => {
        res.render('upload');
    });
    
    router.post("/", async (req, res) => {
        const File = req.files.file;

        let sf = await SaveFile(File);
    
        if(sf.success) {
            res.status(200).render('uploaded');
        } else {
            res.status(500).render('error', {message: sf?.err?.message, error: sf?.err})
        };
    });

    return router;
};

exports.r = router;
exports.thisRoute = "/u";
exports.allRoutes = [""];