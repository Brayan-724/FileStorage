const express = require('express');
const fs = require('fs');
const join = require('path').join;


/**
 * 
 * @param {Response} res 
 * @param {string} file 
 */
function RENDER(res, file, header = "html") {
    const urlFile = join(__dirname, file);
    fs.readFile(urlFile, (err, data) => {
        if(err) {
            res.statusCode = 404;
            res.redirect(`/Errors/404/index.html?file=${encodeURIComponent(file.split("/").splice(1).join("/"))}`);
        } else {
            res.type(header)
            res.statusCode = 200;
            res.write(data);
            res.end();
        }
    });
};

function SEND(res, file) {
    RENDER();
}

/**
 * 
 * @param {express.Express} app 
 */
module.exports = function(app) {
    const router = express.Router();

    router.get("/", (req, res) => {
        RENDER(res, "");
    })

    router.get("/:name/r", (req, res) => {
        const name = req.params.name;
        RENDER(res, `public/${name}0/index.html`);
    });

    /*\
    |*| Error Getters
    \*/

    router.get("/Errors/:code/index.html", (req, res) => {
        const code = req.params.code;
        RENDER(res, `Errors/${code}/index.html`)
    });

    router.get("/Errors/:code/js/:name", (req, res) => {
        const code = req.params.code, name = req.params.name;
        RENDER(res, `Errors/${code}/${name}.js`, "js");
    })

    app.use("/", router);
}