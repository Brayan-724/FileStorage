module.exports = require("../../helpers/Routes/exports")("/join", (router, Auth, AdminAuth) => {
	router.get("/", (req, res) => {
		res.render("acount/join");
	})

	router.post("/", (req, res) => {
		const userInfo = {
			username: req.body.user,
			email: req.body.email,
			password: req.body.password
		};

		
		res.render("index");
	})
})