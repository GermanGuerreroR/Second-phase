"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("./infrastructure/repositories/config/data-source");
const express_1 = __importDefault(require("express"));
const middleware_1 = __importDefault(require("./infrastructure/modules/middleware/middleware"));
const index_router_1 = require("./infrastructure/routes/index-router");
const createServer = async () => {
    const app = (0, express_1.default)(); // Se crea la instancia del servidor
    // Middleware: Para parsear el json de las solicitudes
    app.use(express_1.default.json());
    // Generación del primero recurso:
    // Endpoint o url: http://localhost:3000/hola-mundo
    app.get("/api", (req, res) => {
        res.send({ msg: "Gym management main service" });
    });
    /// Importar la rutas
    app.use("/api/v1", (0, index_router_1.routes)());
    app.use(middleware_1.default);
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        console.log(`Servidor Api-Rest ejecutando: http://localhost:${PORT}`);
    });
};
createServer();
console.log(data_source_1.configOption);
