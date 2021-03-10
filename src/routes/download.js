const express = require('express');
const fs = require('fs');
const { join } = require('path');
const timers = require("timers");
const { getBy } = require('../models/file/controller');
const router = express.Router();

router.get('/:fileName', async (req, res) => {
    //res.render("index");

    const fileName = req.params.fileName;
    const file = await getBy({fileName: fileName});

    if(file.success && file.data.length > 0) {
        const tmpName = `FILE-${new Array(50).fill(0).map((e, i, a) => {
            const isUpper = Math.random() > .5;
            const letter = Math.floor(Math.random() * 27);
            const Letter = isUpper ? letter + 65 : letter + 97;
            return String.fromCharCode(Letter);
        }).join("")}-${fileName}`;

        const fileURL = join(__dirname, "tmp", tmpName);

        fs.writeFile(fileURL, file.data[0].file.data, (err) => {
            if(err) res.status(500).render('error', {message: 'Something error', error: err});

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

module.exports = router;