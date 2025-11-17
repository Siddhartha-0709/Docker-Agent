import Docker from 'dockerode';


const getContainerPorts = async (req, res) => {
  try {
    const host = req.query.host;
    const docker = new Docker({ host: `http://${host}`, port: 2375 });
    const container = docker.getContainer(req.query.id);
    const data = await container.inspect();

    res.json(data.NetworkSettings.Ports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getContainerNetworkInfo = async (req, res) => {
  try {
    const host = req.query.host;
    const docker = new Docker({ host: `http://${host}`, port: 2375 });
    const container = docker.getContainer(req.query.id);
    const data = await container.inspect();

    res.json(data.NetworkSettings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const listNetworks = async (req, res) => {
  try {
    const host = req.query.host;
    const docker = new Docker({ host: `http://${host}`, port: 2375 });
    const networks = await docker.listNetworks();
    res.json(networks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const inspectNetwork = async (req, res) => {
  try {
    const host = req.query.host;
    const docker = new Docker({ host: `http://${host}`, port: 2375 });
    const network = docker.getNetwork(req.query.id);
    const data = await network.inspect();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export {
  getContainerPorts,
  getContainerNetworkInfo,
  listNetworks,
  inspectNetwork
};
