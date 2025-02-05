import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import favicon from 'serve-favicon';
import routes from './routes/index.js';
import AppController from './controllers/AppController.js';

const app = express();

app.use(compression({ threshold: 0 }));
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.static('public'));
app.use(favicon('public/img/cropped-favicon-32x32.png'));
app.set('view engine', 'ejs');
app.use(routes);
app.use(AppController.notFound);
app.use(AppController.handleError);

export default app;
