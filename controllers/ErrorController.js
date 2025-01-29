const ErrorController = {
  index(req, res) {
    res.render('error', { title: 'Erro' });
  },
};

export default ErrorController;
