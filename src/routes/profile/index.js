module.exports = require("../../helpers/Routes/exports")("/", (router, Auth, AdminAuth) => {
	router.get("/:name", async (req, res) => {
		res.render("profile/index", {user: {
			name: req.params.name
		}});
	});
});
