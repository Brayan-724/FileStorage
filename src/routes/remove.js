const { Router } = require("express");
const CTRL = require('../models/file/controller');
const router = Router();

exports = module.exports = function() {
    router.get('/:fileName', (req, res) => {
        const fileName = req.params.fileName;
        res.render('remove', {
            fileName
        })
    });
    
    router.post('/:fileName', async (req, res) => {
        const fileName = req.params.fileName;
    
        const a = await CTRL.getBy({fileName: fileName});
        if(a.success && a.data.length > 0) {
            a.data.forEach(e => {
                CTRL.remove(e._id);
            })
        }
    
        res.render('uploaded');
    });

    return router;
};

exports.r = router;
exports.thisRoute = "/r";
exports.allRoutes = ["/*"];