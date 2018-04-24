const os = require('os');
const app = require('express')();
const redis = require('redis');

const client = redis.createClient({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || '6379',
});
const port = process.env.PORT || '3000';

app.get('/', (req, res) => {
  client.get('requests', (err, val) => {
    val = val || 1;
    res.send(`Foobar2 - ${os.hostname()} - ${val}`);

    client.set('requests', ++val);
  });
});


const server = app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

function shutdown() {
  console.log('Shutting down!');
  server.close(function () {
    const p = client.quit();
    console.log('P', p);
    process.exit(0);
  });
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
