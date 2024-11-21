import express from "express";
import { CoachController } from "../../application/controllers/coach-controller";


export const coachRoutes = () => {
  const router = express.Router();

  const coachCtrl = new CoachController();

  router.post("/coaches", (req, res) => {
    const { personalInfo, coachInfo, certificationInfo, specialityInfo } = req.body;
    coachCtrl
      .add(personalInfo, coachInfo, certificationInfo, specialityInfo)
      .then((result) => {
        if (result.ok) res.status(200).send(result);
        if (result.ok === false) res.status(400).send(result);
        return;
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  });

  router.get("/coaches", async (_, res) => {
    try {
      const result = await coachCtrl.getAll();
      res.send(result);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  router.get("/coaches/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const result = await coachCtrl.getId(parseInt(id));
      const status = result.ok === true ? 200 : 404;
      res.status(status).send(result);
    } catch (error) {
      res.status(500).send(error);
    }
  })

  router.put("/coaches/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const { infoPerson, properInfoCoach, certificationInfo, specialityInfo } = req.body;
      const result = await coachCtrl.update(infoPerson, properInfoCoach, certificationInfo, specialityInfo, parseInt(id));
      res.status(400).send(result);

    } catch (error) {
      res.status(500).send(error);
    }
  })


  router.delete("/coaches/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const result = await coachCtrl.delete(parseInt(id))
      res.send(result);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  return router;
}