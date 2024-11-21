"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    router.get("/apprentices", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield apprenticeCtrl.getAll();
            res.send(result);
        }
        catch (error) {
            res.status(500).send(error);
        }
    }));
    router.get("/apprentices/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const idApprentice = req.params.id;
            const result = yield apprenticeCtrl.getId(parseInt(idApprentice));
            const status = result.ok === true ? 200 : 404;
            res.status(status).send(result);
        }
        catch (error) {
            res.status(500).send(error);
        }
    }));
    router.delete("/apprentices/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const idApprentice = req.params.id;
            const result = yield apprenticeCtrl.delete(parseInt(idApprentice));
            const status = result.ok === true ? 200 : 404;
            res.status(status).send(result);
        }
        catch (error) {
            res.status(500).send(error);
        }
    }));
    return router;
};
exports.apprenticeRoutes = apprenticeRoutes;
//# sourceMappingURL=apprentice-routes.js.map