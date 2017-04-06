var path = require('path');
var webpack = require('webpack');
var express = require('express');
import bodyParser from 'body-parser'
//var config = require('./webpack.config');
var config = require('./webpack.config')
import routes from './src/api/routes'

var app = express();
var compiler = webpack(config);

app.set('port',(process.env.PORT || 1234))
app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
  noInfo : true,
  hot : true
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(bodyParser.json());
app.use('/api',routes);

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});


app.listen(app.get('port'), function(err) {
  if (err) {
    return console.error(err);
  }

  console.log('Listening at http://localhost:1234/');
})
