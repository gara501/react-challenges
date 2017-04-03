var React = require('react');
var applicationsStyles = require('../styles/applications.scss');

class Applications extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      challenge: null,
      explanation: '',
      solutionURL: ''
    };

    this.handleSolutionChange = this.handleSolutionChange.bind(this);
    this.addSolution = this.addSolution.bind(this);
  }

  addSolution() {
    if (!this.state.user) {
      location.hash = '/';
    }

    fetch('/api/solution',
      {
        method: 'post',
        credentials: 'include',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          challenge: this.state.challenge.id,
          type: 'solution',
          url: this.state.solutionURL,
          user: this.state.user.username,
          avatar: this.state.user._json.avatar_url,
          name: this.state.user._json.name
        })
      })
      .then((response) => {
        this.getChallenge(this.state.challenge.id).then((response) => {
          this.updateChallenge(response);
        });
      });
  }

  getUser() {
    return fetch('/api/user', { credentials: 'include' }).
      then(response => response.json()).
      then((json) => {
        return json.user;
      });
  }

  getChallenge(id) {
    return fetch('/graphql?',
      {
        method: 'post',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          query: '{ challenges(id: "' + id +
            '") { id, title, description, icon, start, end, explanation, solutions { ' +
            'url, user, name, avatar, date } } }'
        })
      })
      .then(response => response.json());
  }

  getExplanation(challenge) {
    return fetch(challenge.explanation)
      .then((response) => response.text())
      .then((text) => text);
  }

  formatDate(stringDate) {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };

    const date = new Date(stringDate);

    return date.toLocaleDateString(navigator.language, options);
  }

  handleSolutionChange(event) {
    this.setState({
      solutionURL: event.target.value
    });
  }

  updateChallenge(response) {
    if (response.data && response.data.challenges) {
      this.setState({
        challenge: response.data.challenges[0]
      });

      this.getExplanation(response.data.challenges[0]).then((html) => {
        this.setState({
          explanation: html
        });
      });
    }
  }

  componentDidMount() {
    const id = this.props.params.id.slice(1);

    this.getUser().then((user) => {
      this.setState({
        user
      });
    });

    this.getChallenge(id).then((response) => {
      this.updateChallenge(response);
    });
  }

  createMarkup(html) {
    return {__html: html};
  }

  render() {
    if (!this.state.challenge) {
      return false;
    }

    const solutions = this.state.challenge.solutions.map((solution) =>
      <div className="card" key={ solution.url }>
        <a href={ solution.url }>
          <img src={ solution.avatar } alt="challenge" />
          <span className="date">Sent { this.formatDate(solution.date) }</span>
          <h5>{ solution.name }</h5>
        </a>
      </div>
    );

    return (
      <div className="applications">
        <h1>{ this.state.challenge.title } - { this.state.challenge.description }</h1>

        <div className="dates">
          <p>Created on: { this.formatDate(this.state.challenge.start) }</p>
          <p>Open Until: { this.formatDate(this.state.challenge.end) }</p>
        </div>

        <div dangerouslySetInnerHTML={ this.createMarkup(this.state.explanation) }></div>

        <div className="form">
          <div className="form-group open-challenge">
            <label htmlFor="repo">Repo URL</label>

            <input type="text" className="form-control" id="repo" placeholder="Repo URL"
                   value={ this.state.solutionURL }
                   onChange={ this.handleSolutionChange }/>
          </div>

          <button type="button" className="btn btn-default"
                  disabled={ !this.state.solutionURL }
                  onClick={ this.addSolution }>Send my Repo</button>
        </div>

        <h3>{ this.state.challenge.solutions.length ? 'Participants': '' }</h3>

        <div className="home">
          <div className="grid">
            { solutions }
          </div>
        </div>
      </div>
    )
  }
}

module.exports = Applications;
