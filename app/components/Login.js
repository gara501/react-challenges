var React = require('react');
var loginStyles = require('../styles/login.scss');

class Login extends React.Component {
  authenticate(e) {
    e.preventDefault();
    location.href = '/auth/github';
  }

  getUser() {
    return fetch('/api/user', { credentials: 'include' }).
      then(response => response.json()).
      then((json) => {
        return json.user;
      });
  }

  componentDidMount() {
    this.getUser().then((user) => {
      if (user) {
        location.hash = '#challenges';
      }
    });
  }

  render() {
    return (
      <div className="login">
        <div className="row">
          <div className="col-xs-8 col-sm-6 col-md-6 col-lg-6 col-xs-offset-2 col-sm-offset-3 col-md-offset-3 col-lg-offset-3">
            <div className="logo">
              <img src="/dist/images/octocat.png" alt="github" />
            </div>

            <h4>To enter, please login with your Github Account</h4>

            <p>
              (If you don't have one, please go to <a href="https://github.com/">Github </a> and create an account)
            </p>

            <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.authenticate}>Sign in</button>
          </div>
        </div>
      </div>
    )
  }
}

module.exports = Login;
