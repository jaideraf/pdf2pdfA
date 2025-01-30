const DownloadController = {
  index(req, res) {
    // res.set(
    //   'Content-Disposition',
    //   `attachment; filename="${genPdfA.filename}.pdfa.pdf"`,
    // );
    // res.send(data);
    res.render('download', { title: 'Download' });
  },
};

export default DownloadController;
