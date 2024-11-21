"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware404 = (0, express_1.default)();
middleware404.use((req, res, next) => {
    res.status(404).send({ ok: false, message: "Ruta no encontrada" });
});
exports.default = middleware404;
//# sourceMappingURL=middleware.js.map