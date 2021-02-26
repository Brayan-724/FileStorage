const express = require('express');
const fs = require('fs');
const { getBy } = require('../models/file/controller');
const router = express.Router();

router.get('/:fileName', async (req, res) => {
    //res.render("index");

    const fileName = req.params.fileName;
    const file = await getBy({fileName: fileName});

    if(file.success && file.data.length > 0) {
        const tmpName = `FILE-${new Array(10).fill(0).map((e, i, a) => {
            const isUpper = Math.random() > .5;
            const letter = Math.floor(Math.random() * 27);
            const Letter = isUpper ? letter + 65 : letter + 97;
            return String.fromCharCode(Letter);
        }).join("")}`;

        //res.type(file.data[0].file.type);
        res.locals.file = {
            name: fileName,
            type: file.data[0].file.type,
            buffer: file.data[0].file.data
        };
        res.render("download");
    } else {
        res.status(500).render('error', {message: 'No exist', error: file.data});
    }
})

module.exports = router;