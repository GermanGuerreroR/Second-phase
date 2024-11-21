"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apprenticeRoutes = void 0;
const express_1 = __importDefault(require("express"));
const apprentice_controller_1 = require("../../application/controllers/apprentice-controller");
const apprenticeRoutes = () => {
    const router = express_1.default.Router();
    const apprenticeCtrl = new apprentice_controller_1.ApprenticeController();
    router.post("/apprentices", (req, res) => {
        const { personalInfo, apprenticeInfo, customTrainingGoalInfo } = req.body;
        apprenticeCtrl
            .add(personalInfo, apprenticeInfo, customTrainingGoalInfo)
            .then((result) => {
            const status = (result === null || result === void 0 ? void 0 : result.ok) === true ? 200 : 400;
            res.status(status).send(result);
        })
            .catch((error) => {
            res.status(500).send(error);
        });
    });
    router.get("/apprentices", async (_, res) => {
        try {
            const result = await apprenticeCtrl.getAll();
            res.send(result);
        }
        catch (error) {
            res.status(500).send(error);
        }
    });
    router.get("/apprentices/:id", async (req, res) => {
        try {
            const idApprentice = req.params.id;
            const result = await apprenticeCtrl.getId(parseInt(idApprentice));
            const status = result.ok === true ? 200 : 404;
            res.status(status).send(result);
        }
        catch (error) {
            res.status(500).send(error);
        }
    });
    //TODO update
    router.delete("/apprentices/:id", async (req, res) => {
        try {
            const idApprentice = req.params.id;
            const result = await apprenticeCtrl.delete(parseInt(idApprentice));
            const status = result.ok === true ? 200 : 404;
            res.status(status).send(result);
        }
        catch (error) {
            res.status(500).send(error);
        }
    });
    // router.put("/coaches/:id", async (req, res) => {
    //     try {
    //         const idApprentice = req.params.id;
    //         const { infoPerson, properApprenticeInfo } = req.body;
    //         const result = await apprenticeCtrl.update(infoPerson, properApprenticeInfo, parseInt(idApprentice));
    //         res.status(400).send(result);
    //     } catch (error) {
    //         res.status(500).send(error);
    //     }
    // })
    return router;
};
exports.apprenticeRoutes = apprenticeRoutes;
