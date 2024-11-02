import express from "express";
import middlewareControllers from '../middlewares/jwtVerify';
import userController from '../controllers/userController';
let router = express.Router();

let initwebRoutes = (app) => {
    router.get("/", (req, res) => {
        return res.send("hello")
    })
    //=====================API USER==========================//
    router.post('/api/create-new-user', userController.handleCreateNewUser)
    return app.use("/", router);
}

module.exports = initwebRoutes;