module.exports = require("../../helpers/Routes/exports")("/", (router, Auth, AdminAuth, w) => {
	router.get("/:name/n", async (req, res) => {
		res.render("profile/newProyect", {user: {
			name: req.params.name
		}});
	});

	router.post("/:name/n", async (req, res) => {
		const name = req.params.name;
		const proyect = {
			name: req.body.proyectName,
			visibility: req.body.visibility
		};
		console.log(proyect);
		
		const r = w(res, "index", "/p/" + name);

		setTimeout(()=>{
			r();
		}, 5000);
	});
});
