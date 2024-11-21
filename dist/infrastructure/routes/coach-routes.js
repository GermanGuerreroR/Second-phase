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
exports.coachRoutes = void 0;
const express_1 = __importDefault(require("express"));
const coach_controller_1 = require("../../application/controllers/coach-controller");
const coachRoutes = () => {
    const router = express_1.default.Router();
    const coachCtrl = new coach_controller_1.CoachController();
    router.post("/coaches", (req, res) => {
        const { personalInfo, coachInfo, certificationInfo, specialityInfo } = req.body;
        coachCtrl
            .add(personalInfo, coachInfo, certificationInfo, specialityInfo)
            .then((result) => {
            if (result.ok)
                res.status(200).send(result);
            if (result.ok === false)
                res.status(400).send(result);
            return;
        })
            .catch((error) => {
            res.status(500).send(error);
        });
    });
    router.get("/coaches", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield coachCtrl.getAll();
            res.send(result);
        }
        catch (error) {
            res.status(500).send(error);
        }
    }));
    router.get("/coaches/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const result = yield coachCtrl.getId(parseInt(id));
            const status = result.ok === true ? 200 : 404;
            res.status(status).send(result);
        }
        catch (error) {
            res.status(500).send(error);
        }
    }));
    router.put("/coaches/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const { infoPerson, properInfoCoach, certificationInfo, specialityInfo } = req.body;
            const result = yield coachCtrl.update(infoPerson, properInfoCoach, certificationInfo, specialityInfo, parseInt(id));
            res.status(400).send(result);
        }
        catch (error) {
            res.status(500).send(error);
        }
    }));
    router.delete("/coaches/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const result = yield coachCtrl.delete(parseInt(id));
            res.send(result);
        }
        catch (error) {
            res.status(500).send(error);
        }
    }));
    return router;
};
exports.coachRoutes = coachRoutes;
//# sourceMappingURL=coach-routes.js.map