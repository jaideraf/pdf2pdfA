const ErrorController = {
  index(req, res) {
    res.render('error', { title: 'Error' });
  },
};

export default ErrorController;
