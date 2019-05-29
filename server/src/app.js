import express from 'express';
import bodyParser from 'body-parser';
import p from 'path';

import routes from './routes';

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes);

app.use(express.static(p.join(__dirname, '../../client/build')));

app.get('*', function(req, res) {
  res.sendFile(p.join(__dirname, '../../client/build', 'index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
