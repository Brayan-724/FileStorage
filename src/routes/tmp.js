const { Router } = require("express")
const { join } = require('path');

const router = Router();

router.get("/:file", (req, res) => {
    const fileName = req.params.file;
    res.sendFile(join(__dirname, "tmp", fileName));
});

module.exports = router;