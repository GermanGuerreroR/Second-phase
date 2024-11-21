import  Express from "express";
import {coachRoutes} from "./coach-routes"
import { apprenticeRoutes } from "./apprentice-routes";

export const routes = () => {
    const router = Express.Router();
    router.use(coachRoutes());
    router.use(apprenticeRoutes());
    return router;
}