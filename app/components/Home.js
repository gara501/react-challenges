var React = require('react');
var homeStyles = require('../styles/home.scss');

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      challenges: []
    };
  }

  getChallenges() {
    return fetch('/graphql?',
      {
        method: 'post',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          query: '{ challenges { id, title, description, icon, solutions { url, user } } }'
        })
      })
      .then(function(response) {
        return response.json();
      });
  }

  getChallengeURL(challenge) {
    return `#challenge:${challenge.id}`;
  }

  componentDidMount() {
    this.getChallenges().then((response) => {
      if (response.data && response.data.challenges) {
        this.setState({
          challenges: response.data.challenges
        });
      }
    });
  }

  render() {
    const challenges = this.state.challenges.map((challenge) =>
      <div className="card" key={ challenge.id }>
        <a href={ this.getChallengeURL(challenge) }>
          <img src={ challenge.icon } alt="challenge" />

          <h5>{ challenge.title }</h5>

          <p>{ challenge.description }</p>
        </a>
      </div>
    );

    return (
      <div className="home">
        <h4>Challenges</h4>

        <p>Click on the challenge that you want to see</p>

        <div className="grid">
          { challenges }
        </div>
      </div>
    )
  }
}

module.exports = Home;
