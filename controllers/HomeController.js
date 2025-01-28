const HomeController = {
  index(req, res) {
    res.render('home', { title: 'Home' });
  },
};

export default HomeController;
