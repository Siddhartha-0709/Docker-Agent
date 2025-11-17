import { Router } from 'express';
import { getContainerPorts, getContainerNetworkInfo, listNetworks, inspectNetwork } from '../controllers/network.controller.js';

const router = Router();

router.route('/ports').get(getContainerPorts);
router.route('/network-info').get(getContainerNetworkInfo);
router.route('/networks').get(listNetworks);
router.route('/inspect').get(inspectNetwork);

export default router;