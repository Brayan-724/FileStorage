const index = require("./profile/index");

module.exports = require("../helpers/Routes/exports")("/p", function(router, Auth, AdminAuth) {
	/** @type {import("../a").Routes.pFunc} */
    function exec(v) {v(Auth, AdminAuth)};

	exec(index);
	router.use(index.thisRoute, index.r);
})