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
    const r = (await getAll());
    if(r.success) {
        res.locals.files = r.data.map(Resolve);
        res.status(200);
        res.render('files');
    } else {
        res.locals.message = "Error";
        res.locals.error = r.data;

        console.log(r);

        res.status(r.data.status);
        res.render("error");
    }
})

module.exports = router;