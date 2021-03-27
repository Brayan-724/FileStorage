const index = require("./profile/index");
const newProyect = require("./profile/newProyect");

module.exports = require("../helpers/Routes/exports")("/p", function(router, Auth, AdminAuth) {
	/** @type {import("../a").Routes.pFunc} */
    function exec(v) {v(Auth, AdminAuth)};

	function use(v) {router.use(v.thisRoute, v.r)};

	exec(index);
	exec(newProyect);

	use(index);
	use(newProyect);
})