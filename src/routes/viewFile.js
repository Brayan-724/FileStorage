const express = require('express');
const { getBy } = require('../models/file/controller');
const router = express.Router();

router.get('/:fileName', async (req, res) => {
    const fileName = req.params.fileName;
    const file = await getBy({fileName: fileName});
    if(file.success && file.data.length > 0) {
        res.type(file.data[0].file.type).status(200).send(file.data[0].file.data);
    } else {
        res.status(500).render('error', {message: 'No exist', error: file.data});
    }
})

module.exports = router;