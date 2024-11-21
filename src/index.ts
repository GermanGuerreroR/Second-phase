import { configOption } from "./infrastructure/repositories/config/data-source";
import { Request, Response } from "express";
import Express from "express";
import middleware404 from "./infrastructure/modules/middleware/middleware";
import { routes } from "./infrastructure/routes/index-router";

const createServer = async () => {
    const app = Express(); // Se crea la instancia del servidor

    // Middleware: Para parsear el json de las solicitudes
    app.use(Express.json());

    // Generación del primero recurso:
    // Endpoint o url: http://localhost:3000/hola-mundo
    app.get("/api", (req, res) => {
        res.send({ msg: "Gym management main service" });
    });

    /// Importar la rutas
    app.use("/api/v1", routes());

    app.use(middleware404);

    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        console.log(`Servidor Api-Rest ejecutando: http://localhost:${PORT}`);
    });
};

createServer();


