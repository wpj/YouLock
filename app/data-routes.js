module.exports = function(router) {

  router.get('/data', function(req, res) {
    res.render(__dirname + '/../public/data/data');
  });

  router.get('/', function(req, res) {
    res.render(__dirname + '/../public/portal/portal');
  });
};