const { Router } = require("express")
const { join } = require('path');

const router = Router();

exports = module.exports = function() {
    router.get("/:file", (req, res) => {
        const fileName = req.params.file;
        res.sendFile(join(__dirname, "tmp", fileName));
    });

    return router;
};

exports.r = router;
exports.thisRoute = "/tmp";
exports.allRoutes = ["/*"];