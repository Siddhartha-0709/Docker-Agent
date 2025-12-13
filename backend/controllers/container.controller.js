import Docker from 'dockerode';
import 'dotenv/config'
import { WebSocketServer } from 'ws';



// Controller to list all containers

const getAllContainers = async (req, res) => {
    try {
        const host = req.query.host;
        const docker = new Docker({ host: `http://${host}`, port: 2375 });
        const containers = await docker.listContainers({ all: true });
        res.json(containers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const startContainer = async (req, res) => {
    try {
        const host = req.query.host;
        const docker = new Docker({ host: `http://${host}`, port: 2375 });
        const containerId = req.query.id;
        const container = docker.getContainer(containerId);
        await container.start();
        res.json({ message: `Container ${containerId} started successfully.` });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const stopContainer = async (req, res) => {
    try {
        const host = req.query.host;
        const docker = new Docker({ host: `http://${host}`, port: 2375 });
        const containerId = req.query.id;
        const container = docker.getContainer(containerId);
        await container.stop();
        res.json({ message: `Container ${containerId} stopped successfully.` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const restartContainer = async (req, res) => {
    try {
        const host = req.query.host;
        const docker = new Docker({ host: `http://${host}`, port: 2375 });
        const containerId = req.query.id;
        const container = docker.getContainer(containerId);
        await container.restart();
        res.json({ message: `Container ${containerId} restarted successfully.` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const removeContainer = async (req, res) => {
    try {
        const host = req.query.host;
        const docker = new Docker({ host: `http://${host}`, port: 2375 });
        const containerId = req.query.id;
        const container = docker.getContainer(containerId);
        await container.remove({ force: true });
        res.json({ message: `Container ${containerId} removed successfully.` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const inspectContainer = async (req, res) => {
    try {
        const host = req.query.host;
        const docker = new Docker({ host: `http://${host}`, port: 2375 });
        const containerId = req.query.id;
        const container = docker.getContainer(containerId);
        const data = await container.inspect();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


// Container Log streaming via WebSocket

const wss = new WebSocketServer({ port: 3001 });


wss.on('connection', async (ws, req) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const containerId = url.searchParams.get('id');
    const host = url.searchParams.get('host');

    const docker = new Docker({
        host,      // e.g. "210.79.128.250"
        port: 2375
    });

    if (!containerId) {
        ws.send('Error: container id not provided');
        ws.close();
        return;
    }

    try {
        const container = docker.getContainer(containerId);
        const logStream = await container.logs({
            follow: true,
            stdout: true,
            stderr: true,
            tail: 50, // optional: get last 50 lines too
        });

        logStream.on('data', chunk => ws.send(chunk.toString()));
        ws.on('close', () => logStream.destroy());
    } catch (err) {
        ws.send(`Error: ${err.message}`);
        ws.close();
    }
});


export { getAllContainers, startContainer, stopContainer, restartContainer, removeContainer, inspectContainer };


