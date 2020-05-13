import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainContent from './components/MainContent';
import AsteroidInfo from './components/AsteroidInfo';
import './App.css';

class App extends React.Component {
  state = {
    asteroid: null,
    errorMessage: '',
}
 
  getAsteroids = (id) => {
    // clear error
    this.state.errorMessage && this.clearError();

    fetch(`https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=BaRACLIpzrBuifwHnIZsgeZm29xGe2kG5aFGybRG`)
    .then(res => res.json())
    .then(res => 
      this.setState({
      asteroid: res
  })
  )
  .catch((err) => {
    console.error(err)
    this.setError()
  })
}


getRandomAsteroids = () => {
    fetch(`https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=BaRACLIpzrBuifwHnIZsgeZm29xGe2kG5aFGybRG`)
    .then(res => res.json())
    .then(res => {
        if (res) {
          const randomIndex = this.getRandomNumber(res.near_earth_objects.length);
         this.setState({
             asteroid: res.near_earth_objects[randomIndex]
         }, () => this.getAsteroids(res.near_earth_objects[randomIndex].id));
        }
     })
}

setError = () => {
  const errorMessage = `Asteroids not found`;

  this.setState({
    errorMessage,
  })
}

clearError = () => {
  this.setState({
    errorMessage: '',
  })
}

getRandomNumber = (max) => {
  return Math.round(Math.random() * max);
}

clearAsteroid = () => {
  this.setState({
    asteroid: null
  })
}

render() {

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' render={(props) =>        
             <MainContent 
                getAsteroids={this.getAsteroids} 
                getRandomAsteroids={this.getRandomAsteroids} 
                asteroid={this.state.asteroid}
                error={this.state.errorMessage}
                {...props}
            />}
            />
          <Route exact path='/asteroid-info' render={(props) => 
            <AsteroidInfo 
                asteroid={this.state.asteroid} 
                clearAsteroid={this.clearAsteroid}
                {...props} 
            />
          }
          />
      </Switch>
     </Router>
    </div>
  );
}
}

export default App;
