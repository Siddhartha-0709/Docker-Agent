import { Router } from "express";
import { getAllContainers, inspectContainer, removeContainer, restartContainer, startContainer, stopContainer } from "../controllers/container.controller.js";

const router = Router();

router.route('/getAll').get(getAllContainers);
router.route('/start').post(startContainer);
router.route('/stop').post(stopContainer);
router.route('/restart').post(restartContainer);
router.route('/remove').delete(removeContainer);
router.route('/inspect').get(inspectContainer);


export default router;