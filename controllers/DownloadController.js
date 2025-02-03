const DownloadController = {
  async index(req, res) {
    // res.set(
    //   'Content-Disposition',
    //   `attachment; filename="${converter.filename}-pdfa.pdf"`,
    // );
    // res.send(data);
    res.render('download', { title: 'Download' });
  },
};

export default DownloadController;
