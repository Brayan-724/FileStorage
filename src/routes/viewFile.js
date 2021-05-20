const express = require('express');
const router = express.Router();
const { request } = require('../helpers/rest-req');


exports = module.exports = function() {
    router.get('/:fileName', async (req, res) => {
        const fileName = req.params.fileName;
        const [file] = await request(`/file/${fileName}/0`, "GET", {});

        if(file.status == 200) {
            console.log(Buffer.from(file.data.file.data.data));
            res.contentType(file.data.file.type).status(200).send(Buffer.from(file.data.file.data.data));
        } else {
            console.log(file);
            res.status(500).render('error', {message: 'No exist', error: file.data});
        }
    });

    return router;
};

exports.r = router;
exports.thisRoute = "/f";
exports.allRoutes = ["/*"];