const { Router } = require("express");

const router = Router();

router.get("/Design", (req, res) => {
    res.render("NewDesignTest");
})

module.exports = router;