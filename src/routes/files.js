const { Router } = require("express");
const { getAll } = require('../models/file/controller');


function Resolve(data) {
    return {
        url: data.url,
        name: data.file.name
    }
}

const router = Router();
router.get("/", async (req, res) => {
    const data = (await getAll()).data;
    res.locals.files = data.map(Resolve);

    res.status(200);
    res.render('files');
})

module.exports = router;