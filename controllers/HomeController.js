const HomeController = {
  index(req, res) {
    res.render('home', { title: 'Página inicial' });
  },
};

export default HomeController;
