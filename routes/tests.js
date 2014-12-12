module.exports = function(app, reqs) {
  app.get('/tests', function(req, res) {
    var obj = {};
    var fn = reqs.jade.compileFile('./views/tests.jade', {});
    res.send(fn(obj));
  });
};
