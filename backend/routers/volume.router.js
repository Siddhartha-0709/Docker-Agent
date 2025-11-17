import { Router } from "express";
import { listVolumes, deleteVolume } from "../controllers/volume.controller.js";

const router = Router();

router.route('/list').get(listVolumes);
router.route('/delete').delete(deleteVolume);

export default router;