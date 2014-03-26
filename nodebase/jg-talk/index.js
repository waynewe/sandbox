// Generated by CoffeeScript 1.6.3
(function() {
  var Engine, bob, build, db, engine, http, level, multilevel, server;

  level = require('level');

  http = require('http');

  build = require('browserify');

  multilevel = require('multilevel');

  Engine = require('engine.io-stream');

  server = http.createServer(function(req, res) {
    switch (req.url) {
      case '/':
        return res.end('<script src="bundle.js"></script>');
      case '/bundle':
      case '/bundle.js':
        return build(__dirname + '/browser.js').bundle({
          debug: true
        }).pipe(res);
      default:
        return res.end('!!!');
    }
  });

  server.listen(8000);

  db = level(__dirname + '/data', {
    encoding: 'json'
  });

  engine = Engine(function(con) {
    return con.pipe(multilevel.server(db)).pipe(con);
  });

  engine.attach(server, '/engine');

  bob = {
    name: 'Bob',
    age: 40,
    sex: 'M'
  };

  db.put('person~1', bob, function(err) {
    return db.get('person~1', function(err, p) {
      return console.log("" + p.name + " is " + p.age + " years old");
    });
  });

}).call(this);