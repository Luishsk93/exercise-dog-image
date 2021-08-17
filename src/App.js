import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storedDogs: [],
      loading: true,
      dogURL: '',
    };

    this.getDog = this.getDog.bind(this);
    this.saveDog = this.saveDog.bind(this);
  }

  componentDidMount() {
    this.getDog();
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { dogURL } = this.state;
    if (dogURL.includes('terrier')) {
      console.log('terrier')
      return false;
    } return true;
  }

  async getDog() {
    this.setState(
      { loading: true },
      async () => {
        const request = await fetch('https://dog.ceo/api/breeds/image/random');
        const requestObject = await request.json();
        this.setState({
          loading: false,
          dogURL: requestObject.message,
        });
      })
  }

  saveDog() {
    const { storedDogs, dogURL } = this.state;
    this.setState({
      storedDogs: [...storedDogs, dogURL],
    });
    this.getDog();
  }

  renderDog() {
    const { dogURL } = this.state;
    return (
      <>
        <div>
          <img src={ dogURL } alt="a" />
        </div>
        <button type="button" onClick={ this.saveDog }>Outro dog</button>
      </>
    )
  }



  render() {
    const loadingelement = <span>Loading...</span>;
    const { storedDogs, loading } = this.state;
    return (
      <div>
        {
          storedDogs
            .map(
              (dog) => {
                return (
                  <p key={ dog }>
                    <img src={ dog } alt="a" />
                  </p>
                );
              },
            )
        }
        <p>
          {loading ? loadingelement : this.renderDog()}
        </p>
      </div>
    );
  }
}

export default App;
