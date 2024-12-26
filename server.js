const uWS = require('uWebSockets.js');
const fs = require('fs');
const path = require('path');

const routesDir = {
  get: path.join(__dirname, 'routes', 'get'),
  post: path.join(__dirname, 'routes', 'post'),
};

function loadRoutes(app, method) {
  const folderPath = routesDir[method];
  function processFolder(currentFolder, currentRoute = '') {
    fs.readdirSync(currentFolder).forEach((entry) => {
      const entryPath = path.join(currentFolder, entry);
      if (fs.lstatSync(entryPath).isDirectory()) {
        const dynamicPart = entry.startsWith('_') ? `:${entry.slice(1)}` : entry;
        processFolder(entryPath, `${currentRoute}/${dynamicPart}`);
      } else if (entry.endsWith('.js')) {
        const routeName = `${currentRoute}/${entry.replace('.js', '')}`;
        const dynamicRoute = `${currentRoute}/${entry.replace('.js', '')}`
        .replace(/\/+/g, '/') // Replace multiple slashes with a single slash
        .replace(/_/g, ':')    // Replace `_` with `:`
        .replace(/\*/g, '/:dynamic'); // Handle dynamic paths
         console.log(`Loading handler for route: ${dynamicRoute} from file: ${entryPath}`);
        
        app[method](dynamicRoute, (res, req) => {
          const handler = require(entryPath);
          if (method === 'get') {
            const params = extractParams(routeName, req);
            const query = req.getQuery();
            handler({ params, query }, res);
          } else if (method === 'post') {
            let body = '';
            res.onData((chunk, isLast) => {
              body += Buffer.from(chunk).toString();
              if (isLast) {
                const params = extractParams(routeName, req);
                handler({ params, body: JSON.parse(body) }, res);
              }
            });
          }
        });
      }
    });
  }
  processFolder(folderPath);
}

function extractParams(route, req) {
  const routeParts = route.split('/').filter((part) => part.startsWith(':'));
  const params = {};
  routeParts.forEach((part, index) => {
    const key = part.replace(':', '');
    params[key] = req.getParameter(index);
  });
  return params;
}

const app = uWS.App();

loadRoutes(app, 'get');
loadRoutes(app, 'post');

app.listen(3000, (token) => {
  if (token) {
    console.log('Server listening on port 3000');
  } else {
    console.log('Failed to listen on port 3000');
  }
});
