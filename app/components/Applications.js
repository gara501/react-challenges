var React = require('react');
var applicationsStyles = require('../styles/applications.scss');

var Applications = React.createClass({
  render: function() {
    return (
      <div className="applications">
        <h1>Basic Layout</h1>
        <div className="dates">
          <p>Created on: February 01 2017</p>
          <p>Open Until: March 01 2017</p>
        </div>
        <p>This challenge is about a simple layout, use your knowledge to construct a basic layout, this layout should have 5 sections</p>
        <ul>
          <li>Header</li>
          <li>Footer</li>
          <li>Content</li>
          <li>Lateral Menu (aside)</li>
        </ul>
        <p>The layout must be responsive in 3 breakpoints, mobile, tablet and Desktop (340px, 768px, 1200px)</p>
        <div className="form">
          <div className="form-group open-challenge">
            <label htmlFor="repo">Repo URL</label>
            <input type="text" className="form-control" id="repo" placeholder="Repo URL" />
          </div>
          <button type="button" className="btn btn-default">Send my Repo</button>
        </div>
        <h3>Participants</h3>
        <div className="home">
          <div className="grid">
            <div className="card second">
                <a href="http://github.com/gara501">
                  <img src="https://avatars3.githubusercontent.com/u/1091674?v=3&s=460" alt="callenge" />
                  <span className="date">Sent 2017/03/02 02:20 PM </span>
                  <h5>John Doe</h5>
                  <p>Second Place</p>
                </a>
                <img className="award" src="images/second.png" alt="callenge" />
            </div>
            <div className="card first">
                <a href="http://github.com/gara501">
                  <img src="https://avatars3.githubusercontent.com/u/1091674?v=3&s=460" alt="callenge" />
                  <span className="date">Sent 2017/03/02 02:20 PM </span>
                  <h5>John Doe</h5>
                  <p>First Place</p>
                </a>
                <img className="award" src="images/first.png" alt="callenge" />
            </div>
            <div className="card third">
                <a href="http://github.com/gara501">
                  <img src="https://avatars3.githubusercontent.com/u/1091674?v=3&s=460" alt="callenge" />
                  <span className="date">Sent 2017/03/02 02:20 PM </span>
                  <h5>John Doe</h5>
                  <p>Third Place</p>
                </a>
                <img className="award" src="images/third.png" alt="callenge" />
            </div>
            <div className="card ">
                <a href="http://github.com/gara501">
                <img src="https://avatars3.githubusercontent.com/u/1091674?v=3&s=460" alt="callenge" />
                <span className="date">Sent 2017/03/02 02:20 PM </span>
                <h5>John Doe</h5>
                </a>
            </div>
            <div className="card">
                <a href="">
                <img src="images/svg/wrench.svg" alt="callenge" />
                <h5>John Doe</h5>
                </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = Applications;