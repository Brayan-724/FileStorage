/** @type {import("./a").Routes.Route[]} */
const rts = [
    require('./routes/index'),
    require('./routes/upload'),
    require('./routes/files'),
    require('./routes/viewFile'),
    require('./routes/remove'),
    require('./routes/download'),
    require('./routes/tmp.js'),
    require('./routes/tests.js'),
]

/** @type {import("./Routes")} */
module.exports = function Routes(App, Auth, AdminAuth) {
    /** @type {import("./a").Routes.pFunc} */
    function exec(v) {v(Auth, AdminAuth)};

    /** @type {import("./a").Routes.relFunc} */
    function rel(v) {
        const rt = v.thisRoute;
        const rts = v.allRoutes;

        return rts.map((v) => rt + v);
    }

    const r = {};

    /** @type {string[]} */
    let allRoutes = [];

    for (const Route of rts) {
        exec(Route);
        App.use(Route.thisRoute, Route.r);

        allRoutes = [...allRoutes, ...rel(Route)]
    }

    r.allRoutes = allRoutes;

    console.log(r);

    return r;
}