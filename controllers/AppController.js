import log from '../utils/logger.js';

const AppController = {
  notFound(req, res, next) {
    const err = new Error('404: Page Not Found');
    err.status = 404;
    next(err);
  },
  // eslint-disable-next-line no-unused-vars
  handleError(err, req, res, next) {
    if (err.status !== 404) log(err.stack);
    res.status(err.status || 500).json({ error: err.message });
  },
};

export default AppController;
