const { Router } = require("express");

const router = Router();

exports = module.exports = function() {
    router.get("/Design", (req, res) => {
        res.render("NewDesignTest");
    })

    return router;
};

exports.r = router;
exports.thisRoute = "/test";
exports.allRoutes = ["/Design"];