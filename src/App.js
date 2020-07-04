import React, { Component } from 'react';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImagenLinkForm from './components/ImagenLinkForm/ImagenLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Registrer from './components/Registrer/Registrer';
import Rank from './components/Rank/Rank';

import './App.css';
import 'tachyons'
import Particles from 'react-particles-js';

const particlesObtion = {
  particles: {
    numeber: {
      value: 1600,
      density: {
        enable: true,
        value_area: 100
      }
    }
  }
}

const initialState = {
  input: '',
  imagenUrl: '',
  box: {},
  route: 'signin',
  isSingnedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  calculeteFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }
  displayFaceBox = (box) => {
    this.setState({ box: box });
  }
  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onButtonSumit = () => {
    this.setState({ imagenUrl: this.state.input });
    fetch('https://flannel-leaf-91869.herokuapp.com/imageUrl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('https://flannel-leaf-91869.herokuapp.com/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => { this.setState(Object.assign(this.state.user, { entries: count })) })
            .catch(console.log)
        }
        this.displayFaceBox(this.calculeteFaceLocation(response))
      }).catch(err => console.log(err))
  };

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else {
      this.setState({ isSingnedIn: true })
    }
    this.setState({ route: route });
  }
  render() {
    const { isSingnedIn, imagenUrl, route, box } = this.state;
    return (
      <div className="App">
        <Particles className='particles'
          params={{ particlesObtion }}
        />
        <Navigation isSingnedIn={isSingnedIn} onRouteChange={this.onRouteChange} />
        {route === 'home'
          ? <div>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ImagenLinkForm
              onInputChange={this.onInputChange}
              onButtonSumit={this.onButtonSumit} />
            <FaceRecognition box={box} imagenUrl={imagenUrl} />
          </div>
          : (
            route === 'signin'
              ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />//<Signin onRouteChange={this.onRouteChange} />
              : <Registrer loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          )
        }
      </div>
    );
  }
}
export default App;





