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
    if(data.success) {
        res.locals.files = data.map(Resolve);
        res.status(200);
        res.render('files');
    } else {
        res.locals.message = "Error";
        res.locals.error = data.data;
        res.status(data.data.status);
        res.render("error");
    }
})

module.exports = router;