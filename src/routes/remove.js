const { Router } = require("express");
const router = Router();
const { request } = require('../helpers/rest-req');

exports = module.exports = function() {
    router.get('/:fileName', (req, res) => {
        const fileName = req.params.fileName;
        res.render('remove', {
            fileName
        })
    });
    
    router.post('/:fileName', async (req, res) => {
        const fileName = req.params.fileName;
    
        await request("/file/remove", "POST", {
            guid: fileName
        });
    
        res.render('uploaded');
    });

    return router;
};

exports.r = router;
exports.thisRoute = "/r";
exports.allRoutes = ["/*"];