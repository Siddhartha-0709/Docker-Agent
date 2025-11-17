import { Router } from "express";
import { getAllImages, deleteImage, runImage } from "../controllers/image.controller.js";

const router = Router();

router.route('/listImages').get(getAllImages);
router.route('/deleteImage').delete(deleteImage);
router.route('/runImage').post(runImage);

export default router;