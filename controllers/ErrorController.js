const ErrorController = {
  index(req, res) {
    res.render('error', { title: 'Erro' });
  },
  notFound(req, res) {
    res.render('error404', { title: 'Página não encontrada' });
  },
};

export default ErrorController;
