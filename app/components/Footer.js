var React = require('react');
var mainStyles = require('../styles/footer.scss');

var Footer = React.createClass({
  render: function() {
    return (
      <div className="footer main-container">
        <div className="container">
          <div className="col-lg-12 col-md-12 col-xs-12">
            <p>Powered By Prodigious™ - Prodigious Challenges</p>    
          </div>
        </div>
      </div>
    )
  }
});

module.exports = Footer;