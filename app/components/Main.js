var React = require('react');
var mainStyles = require('../styles/main.scss');
var Footer = require('./Footer.js');

class Main extends React.Component {
  render() {
    return (
      <div className="main main-container">
        <nav className="navbar navbar-default" role="navigation">
          <div className="container">
            <a href="/">
              <img className="logop" src="/dist/images/logo.png" alt="prodigious" />
            </a>
          </div>
        </nav>
        <div className="wrapper container">
         {this.props.children}
        </div>
        <Footer></Footer>
      </div>
    )
  }
}

module.exports = Main;
