import React, { Component } from 'react';
// import Particles from 'react-particles-js';
import ParticlesBg from 'particles-bg'
import Clarifai from 'clarifai';
import ImageOutput from './components/ImageOutput/ImageOutput';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';
import Prediction from './components/Prediction/Prediction'
import Footer from './components/Footer/Footer';

//You must add your own API key here from Clarifai.
const app = new Clarifai.App({
  // apiKey: 'YOUR API KEY HERE'
  apiKey: '348067f3d03f408fba3df5bc04ce73d0'

  // apiKey: '8bbb6abc1e53488f9fdbc1d530f96e1a'
  // apiKey: '8df114baec0d4e87a42d2b919cae5374'
});

// No Longer need this. Updated to particles-bg
// const particlesOptions = {
//   particles: {
//     number: {
//       value: 30,
//       density: {
//         enable: true,
//         value_area: 800
//       }
//     }
//   }
// }

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      name1: 'abc',
      value1: 0,
      name2: 'abc',
      value2: 0,
      name3: 'abc',
      value3: 0,
      name4: 'abc',
      value4: 0,
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
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

  // calculateFaceLocation = (data) => {
  //   const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
  //   const image = document.getElementById('inputimage');
  //   const width = Number(image.width);
  //   const height = Number(image.height);
  //   return {
  //     leftCol: clarifaiFace.left_col * width,
  //     topRow: clarifaiFace.top_row * height,
  //     rightCol: width - (clarifaiFace.right_col * width),
  //     bottomRow: height - (clarifaiFace.bottom_row * height)
  //   }
  // }

  setFood = (response) => {
    // this.setState({ box: box });
    this.setState({
      name1: response.outputs[0].data.concepts[0].name,
      value1: response.outputs[0].data.concepts[0].value,
      name2: response.outputs[0].data.concepts[1].name,
      value2: response.outputs[0].data.concepts[1].value,
      name3: response.outputs[0].data.concepts[2].name,
      value3: response.outputs[0].data.concepts[2].value,
      name4: response.outputs[0].data.concepts[3].name,
      value4: response.outputs[0].data.concepts[3].value,
    })
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models
      // .predict(
        // HEADS UP! Sometimes the Clarifai Models can be down or not working as they are constantly getting updated.
        // A good way to check if the model you are using is up, is to check them on the clarifai website. For example,
        // for the Face Detect Mode: https://www.clarifai.com/models/face-detection
        // If that isn't working, then that means you will have to wait until their servers are back up. Another solution
        // is to use a different version of their model that works like the ones found here: https://github.com/Clarifai/clarifai-javascript/blob/master/src/index.js
        // so you would change from:
        // .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
        // to:
        // .predict('53e1df302c079b3db8a0a36033ed2d15', this.state.input)
        // Clarifai.FACE_DETECT_MODEL,
        // this.state.input)
      .predict('bd367be194cf45149e75f01d59f77ba7', this.state.input)
      .then(response => {
        console.log('hi', response)
        // console.log(response.outputs[0].data.concepts.length)
        // console.log(response.outputs[0].data.concepts[0])
        // console.log(response.outputs[0].data.concepts[0].name)
        // console.log(response.outputs[0].data.concepts[0].value)
        // this.setState({
        //   name1: response.outputs[0].data.concepts[0].name,
        //   value1: response.outputs[0].data.concepts[0].value,
        //   name2: response.outputs[0].data.concepts[1].name,
        //   value2: response.outputs[0].data.concepts[1].value,
        //   name3: response.outputs[0].data.concepts[2].name,
        //   value3: response.outputs[0].data.concepts[2].value,
        //   name4: response.outputs[0].data.concepts[3].name,
        //   value4: response.outputs[0].data.concepts[3].value,
        // })
        this.setFood(response)
        
        if (response) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count })) // Object.assign() is used to make sure that the username doesn't change every time we press detect
            })
        }
        // this.displayFaceBox(this.calculateFaceLocation(response))
        // this.setFood(response)
      })
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({ isSignedIn: false })
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route });
  }

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">
        <ParticlesBg type="cobweb" bg={true} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        
        {/* <div>
          <Logo />
          <Rank
            name={this.state.user.name}
            entries={this.state.user.entries}
          />
          <ImageLinkForm
            onInputChange={this.onInputChange}
            onButtonSubmit={this.onButtonSubmit}
          />
          <p> </p>
          <Prediction
            name1={this.state.name1}
            value1={this.state.value1}
            name2={this.state.name2}
            value2={this.state.value2}
            name3={this.state.name3}
            value3={this.state.value3}
            name4={this.state.name4}
            value4={this.state.value4}
          />
          <FaceRecognition imageUrl={imageUrl} />
          <Footer />
        </div> */}

        { route === 'home'
          ? <div>
              <Logo />
              <Rank
                name={this.state.user.name}
                entries={this.state.user.entries}
              />
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
              />
              <p> </p>
              <Prediction
                name1={this.state.name1}
                value1={this.state.value1}
                name2={this.state.name2}
                value2={this.state.value2}
                name3={this.state.name3}
                value3={this.state.value3}
                name4={this.state.name4}
                value4={this.state.value4}
              />
              <ImageOutput imageUrl={imageUrl} />
              <Footer />
            </div>
          : (
             route === 'signin'
             ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
             : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            )
        }
      </div>
    );
  }
}

export default App;
