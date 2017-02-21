var React = require('react');
var challengeStyles = require('../styles/challenge.scss');

var Challenge = React.createClass({
  render: function() {
    return (
      <div className="challenge">
        <h4>{this.props.name}</h4>
        <p>{this.props.description}</p>
        <applications challengeId="1" ></applications>
      </div>
    )
  }
});

module.exports = Challenge;