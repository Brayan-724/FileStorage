const { Router } = require("express");

/** @type {import("../../a").Routes._exports} */
module.exports = function(route, callback) {

    const router = Router();
    
    function toReturn(Auth, AdminAuth) {
        callback(router, Auth, AdminAuth);
    };

    toReturn.r = router;
    toReturn.thisRoute = route;

    return toReturn;
}