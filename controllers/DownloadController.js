const DownloadController = {
  index(req, res) {
    res.render('download', { title: 'Download' });
  },
};

export default DownloadController;
