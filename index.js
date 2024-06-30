const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3038;

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        // json generator
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        const filePath = path.join(__dirname, 'generator.html');
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end('<h1>Failed to read file</h1>');
                return;
            }
            res.end(data);
        });
    } else if (req.url === '/collection') {
        // nudity collection
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        const filePath = path.join(__dirname, 'hydra.json');
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end(JSON.stringify({ error: 'Failed to read file' }));
                return;
            }
            res.end(data);
        });
    } else {
        // Handle 404 for other routes
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('404 Not Found');
    }
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
