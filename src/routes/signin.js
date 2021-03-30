module.exports = require("../helpers/Routes/exports")("/signin", (router, Auth, AdminAuth) => {
	router.get("/", (req, res) => {
		res.render("signin")
	});

	router.post("/", (req, res) => {
		const userInfo = {
			name: req.body.user,
			password: req.body.password
		};
		let land = req.query.land;
		land = land.replace("{user}", userInfo.name);
		res.redirect(land);
	})
})