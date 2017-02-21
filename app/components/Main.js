var React = require('react');
var mainStyles = require('../styles/main.scss');
var Footer = require('./Footer.js');

var Main = React.createClass({
  render: function() {
    return (
      <div className="main main-container">
        <nav className="navbar navbar-default" role="navigation">
          <div className="container">
            <img className="logop" src="/dist/images/logo.png" alt="prodigious" />
          </div>
        </nav>
        <div className="wrapper container">
         {this.props.children}
        </div>
        <Footer></Footer>
      </div>
    )
  }
});

module.exports = Main;