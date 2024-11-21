"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const coach_routes_1 = require("./coach-routes");
const apprentice_routes_1 = require("./apprentice-routes");
const routes = () => {
    const router = express_1.default.Router();
    router.use((0, coach_routes_1.coachRoutes)());
    router.use((0, apprentice_routes_1.apprenticeRoutes)());
    return router;
};
exports.routes = routes;
