import express from 'express';
import favicon from 'serve-favicon';
import log from './utils/logger.js';
import routes from './routes/index.js';
import AppController from './controllers/AppController.js';

const app = express();

app.use(express.static('public'));
app.use(favicon('public/img/cropped-favicon-32x32.png'));
app.set('view engine', 'ejs');
app.use(routes);
app.use(AppController.notFound);
app.use(AppController.handleError);

app.listen(8080, () => {
  log('Server is running on http://localhost:8080');
});
