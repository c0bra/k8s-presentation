const os = require('os');
const app = require('express')();

app.get('/', (req, res) => {
  res.send(os.hostname());
});

const port = process.env.PORT || '3000';

const server = app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

function shutdown() {
  console.log('Shutting down!');
  server.close(function () {
    process.exit(0);
  });
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
