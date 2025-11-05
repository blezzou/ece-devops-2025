const express = require('express');
const redis = require('redis');

const app = express();

const client = redis.createClient({
  url: \`redis://\${process.env.REDIS_HOST || 'localhost'}:\${process.env.REDIS_PORT || 6379}\`
});

client.connect().catch(console.error);

app.get('/', async (req, res) => {
  const visits = await client.incr('visits');
  res.send(\`Number of visits: \${visits}\`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(\`Server running on port \${PORT}\`));
