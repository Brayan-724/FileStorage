const { Router } = require("express");
const { request } = require("../helpers/rest-req");


function Resolve(data) {
    console.log(data, data.guid);
    return {
        guid: data.guid,
        name: data.file.name
    }
}

/**
 * 
 * @param {String} Label 
 */
function removeLastDot(Label) {
    if(Label.indexOf("min") !== -1) {
        return Label.split(".").splice(0, Label.length - 2).join("");
    } else {
        return Label.split(".").splice(0, Label.length - 1).join("");
    }
}

/**
 * 
 * @param {Document[]} data 
 */
function SortAZ(data) {
    return data.sort((a, b) => {
        const A = removeLastDot(a.fileName);
        const B = removeLastDot(b.fileName);

        if(A.length < B.length) {
            return -1;
        } else 
        if(A.length > B.length) {
            return 1;
        } else {
            return B - A;
        }
    })
};

function Sorting(files, mode) {
    if(mode !== "NONE") {
        if(mode === "AZ") {
            files = SortAZ(files);
        } else 
        if(mode === "ZA") {
            files = SortAZ(files).reverse();
        }
    };

    return files;
}

async function requestAll() {
    const [req] = await request("/files/getAll", "GET", {});
    
    return req.data;
}

const router = Router();

exports = module.exports = function() {
    router.get("/", async (req, res) => {
        
        const r = await requestAll();

        console.log(r);

        if(r.success) {
            const query = req.query;
            query.only = query.only && query.only !== "null" ? query.only.split("_") : "ALL";
            query.sort = query.sort || "NONE";
    
            const files =  r.data;
            let outFiles = files;
    
            if(query.only !== "ALL") {
                outFiles = outFiles.filter(e => {
                    return query.only.find(t => {
                        return e.file.type === t;
                    }) ? true : false
                });
            }
            Sorting(outFiles)
    
            res.locals.files = outFiles.map(Resolve);
            res.status(200);
            res.render('files');
        } else {
            res.locals.message = "Error";
            res.locals.error = r.data;
    
            res.status(r.data.status);
            res.render("error");
        }
    });
    
    router.get("/c/:path(*)", async (req, res) => {})
};

exports.r = router;
exports.thisRoute = "/fl";
exports.allRoutes = ["", "/c/*"];