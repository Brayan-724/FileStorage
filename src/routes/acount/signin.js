module.exports = require("../../helpers/Routes/exports")("/signin", (router, Auth, AdminAuth) => {
	router.get("/", (req, res) => {
		res.render("acount/signin")
	});

	router.post("/", (req, res) => {
		const userInfo = {
			username: req.body.user,
			password: req.body.password
		};
		let land = req.query.land || "https://file-storage-0.herokuapp.com";
		land = land.replace("{user}", userInfo.username);
		res.redirect(land);
	})
})