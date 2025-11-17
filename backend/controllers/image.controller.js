import Docker from 'dockerode';

// Controller to list all Images

const getAllImages = async (req, res) => {
    try {
        const host = req.query.host;
        const docker = new Docker({ host: `http://${host}`, port: 2375 });
        const images = await docker.listImages();
        res.json(images);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteImage = async (req, res) => {
    try {
        const host = req.query.host;
        const docker = new Docker({ host: `http://${host}`, port: 2375 });
        const imageId = req.query.id;
        const image = docker.getImage(imageId);
        await image.remove();
        res.json({ message: `Image ${imageId} deleted successfully.` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const runImage = async (req, res) => {
    try {
        const host = req.query.host;
        const docker = new Docker({ host: `http://${host}`, port: 2375 });
        const imageId = req.query.id;
        const container = await docker.createContainer({ Image: imageId });
        await container.start();
        res.json({ message: `Image ${imageId} is running in a new container.` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export {
    getAllImages,
    deleteImage,
    runImage
};