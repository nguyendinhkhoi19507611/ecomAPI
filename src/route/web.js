import express from "express";
import middlewareControllers from '../middlewares/jwtVerify';

let router = express.Router();

let initwebRoutes = (app) => {
    router.get("/", (req, res) => {
        return res.send("hello")
    })
    return app.use("/", router);
}

module.exports = initwebRoutes;