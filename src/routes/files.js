const { Router } = require("express");
const { parse: urlParse } = require("url");
const { getAll } = require('../models/file/controller');


function Resolve(data) {
    return {
        url: data.url,
        name: data.fileName
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
}

const router = Router();
router.get("/", async (req, res) => {
    const r = (await getAll());
    if(r.success) {
        const query = urlParse(req.url, true).query;
        query.only = query.only && query.only !== "null" ? query.only.split("_") : "ALL";
        query.sort = query.sort || "NONE";

        const files =  r.data;
        let outFiles = files;

        if(query.only !== "ALL") {
            outFiles = outFiles.filter(e => {
                return query.only.find(t => {
                    return e.smType ? e.smType.find(r => {
                        return r ===  t;
                    }) ? true : false 
                    : false
                }) ? true : false
            });
        }
        if(query.sort !== "NONE") {
            if(query.sort === "AZ") {
                outFile = SortAZ(outFiles);
            } else 
            if(query.sort === "ZA") {
                outFiles = SortAZ(outFiles).reverse();
            }
        }

        res.locals.files = outFiles.map(Resolve);
        res.status(200);
        res.render('files');
    } else {
        res.locals.message = "Error";
        res.locals.error = r.data;

        res.status(r.data.status);
        res.render("error");
    }
})

module.exports = router;