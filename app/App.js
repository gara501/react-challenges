var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var CreateHashHistory = require('history').createHashHistory;
var RouterHistory = require('react-router').useRouterHistory;
var routes = require('./config/routes');

const appHistory = RouterHistory(CreateHashHistory)();

ReactDOM.render(
    <Router history={appHistory}>{routes}</Router>,
    document.getElementById('app')
);