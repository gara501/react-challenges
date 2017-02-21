var React = require('react');
var Main = require('../components/Main');
var Login = require('../components/Login');
var Home = require('../components/Home');
var Applications = require('../components/Applications');
var Router = require('react-router');
var Route = Router.Route;
var IndexRoute = Router.IndexRoute;

module.exports = (
  <Route path="/" component={Main}>
    <IndexRoute component={Login} />
    <Route path="/challenges" component={Home} />
    <Route path="/challenge:id" component={Applications} />
  </Route>
);