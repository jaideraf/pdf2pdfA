import compression from 'compression';
import express from 'express';
import helmet from 'helmet';
import favicon from 'serve-favicon';

import AppController from './controllers/AppController.js';
import routes from './routes/index.js';

const app = express();

app.use(compression({ threshold: 0 }));
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.static('public'));
app.use(favicon('public/img/favicon.png'));
app.set('view engine', 'ejs');
app.use(routes);
app.use(AppController.notFound);
app.use(AppController.handleError);

export default app;
