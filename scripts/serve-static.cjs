const http = require('node:http')
const fs = require('node:fs')
const path = require('node:path')
const root = path.resolve(__dirname, '../out')
if (!fs.existsSync(root)) throw new Error('Run npm run build before starting the static preview.')
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.txt': 'text/plain', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.woff2': 'font/woff2' }
http.createServer((req, res) => {
  if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405); return res.end() }
  let pathname
  try { pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname) }
  catch { res.writeHead(400); return res.end() }
  let file = path.resolve(root, '.' + pathname)
  if (file !== root && !file.startsWith(root + path.sep)) { res.writeHead(403); return res.end() }
  try {
    if (fs.statSync(file).isDirectory()) {
      if (!pathname.endsWith('/')) { res.writeHead(308, { Location: pathname + '/' }); return res.end() }
      file = path.join(file, 'index.html')
    }
    if (!fs.statSync(file).isFile()) throw new Error('Not a file')
  } catch { res.statusCode = 404; file = path.join(root, '404.html') }
  res.setHeader('Content-Type', types[path.extname(file)] || 'application/octet-stream')
  if (req.method === 'HEAD') return res.end()
  const stream = fs.createReadStream(file)
  stream.on('error', () => { res.statusCode = 404; res.end('Not found') })
  stream.pipe(res)
}).listen(Number(process.env.PORT || 3000), '127.0.0.1', () => console.log(`Static preview: http://127.0.0.1:${process.env.PORT || 3000}`))
