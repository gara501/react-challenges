var React = require('react');
var homeStyles = require('../styles/home.scss');

var Home = React.createClass({
  render: function() {
    return (
      <div className="home">
      <h4>Challenges</h4>
      <p>Click on the challenge that you want to see</p>
        <div className="grid">
          <div className="card">
            <a href="challenge:1">
              <img src="images/svg/canvas.svg" alt="callenge" />
              <h5>Make an animation</h5>
              <p>CSS Challenge</p>
            </a>
          </div>
          <div className="card ">
            <a href="challenge:2">
              <img src="images/svg/coding.svg" alt="callenge" />
              <h5>Find the var</h5>
              <p>Js Challenge</p>
            </a>
          </div>
          <div className="card ">
            <a href="challenge:3">
              <img src="images/svg/coding.svg" alt="callenge" />
              <h5>Auto Function</h5>
              <p>Js Challenge</p>
            </a>
          </div>
          <div className="card ">
            <a href="challenge:4">
              <img src="images/svg/coding.svg" alt="callenge" />
              <h5>Observer</h5>
              <p>Js Challenge</p>
            </a>
          </div>
          <div className="card">
            <a href="challenge:5">
              <img src="images/svg/gamepad.svg" alt="callenge" />
              <h5>Jump!</h5>
              <p>Js Game</p>
            </a>
          </div>
          <div className="card">
            <a href="challenge:6">
              <img src="images/svg/coding.svg" alt="callenge" />
              <h5>Find the alien</h5>
              <p>Js Challenge</p>
            </a>
          </div>
          <div className="card">
            <a href="challenge:7">
              <img src="images/svg/diamond.svg" alt="callenge" />
              <h5>Special Challenge</h5>
              <p>Full Stack Challenge</p>
            </a>
          </div>
          <div className="card">
            <a href="challenge:8">
              <img src="images/svg/wrench.svg" alt="callenge" />
              <h5>Create a Library</h5>
              <p>Tool Js Challenge</p>
            </a>
          </div>
          <div className="card">
            <a href="challenge:9">
              <img src="images/svg/wrench.svg" alt="callenge" />
              <h5>Create a Library</h5>
              <p>Tool Js Challenge</p>
            </a>
          </div>
          <div className="card">
            <a href="challenge:10">
              <img src="images/svg/wrench.svg" alt="callenge" />
              <h5>Create a Library</h5>
              <p>Tool Js Challenge</p>
            </a>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = Home;