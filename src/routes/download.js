const express = require('express');
const fs = require('fs');
const { resolve, join } = require('path');
const router = express.Router();

exports = module.exports = function() {
    router.get('/:fileName', async (req, res) => {
        //res.render("index");
    
        const fileName = req.params.fileName;
        const file = await getBy({"guid": fileName});
    
        if(file.success && file.data.length > 0) {
            const tmpName = `FILE-${new Array(15).fill(0).map((e, i, a) => {
                const isUpper = Math.random() > .5;
                const letter = Math.floor(Math.random() * 26);
                const Letter = isUpper ? letter + 65 : letter + 97;
                return String.fromCharCode(Letter);
            }).join("")}-${file.data[0].file.name}`;
    
            const fileURL = resolve(__dirname, join("..", "public", "tmp", tmpName));
    
            fs.writeFile(fileURL, file.data[0].file.data, (err) => {
                if(err) res.status(500).render('error', {message: 'Something error', error: err});

                setTimeout(fs.unlinkSync, 10000, fileURL);
    
                res.locals.file = {
                    name: fileName,
                    url: "/tmp/" + tmpName
                };
                res.render("download");
            })
        } else {
            res.status(500).render('error', {message: 'No exist', error: file.data});
        }
    });

    return router;
};

exports.r = router;
exports.thisRoute = "/d";
exports.allRoutes = ["/*"];