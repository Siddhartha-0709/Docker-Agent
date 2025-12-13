import Docker from 'dockerode';

const listVolumes = async (req, res) => {
  try {
    const host = req.query.host;
    const docker = new Docker({ host: `http://${host}`, port: 2375 });
    const volumes = await docker.listVolumes();
    res.status(200).json(volumes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteVolume = async (req, res) => {
  const { volumeName } = req.query;
  try {
    const host = req.query.host;
    const docker = new Docker({ host: `http://${host}`, port: 2375 });
    const volume = docker.getVolume(volumeName);
    await volume.remove();
    res.status(200).json({ message: `Volume ${volumeName} deleted successfully.` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { listVolumes, deleteVolume };