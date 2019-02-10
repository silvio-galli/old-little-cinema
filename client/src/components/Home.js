import React, { Component } from 'react';
import api from '../api'
import PremierHome from './PremiereHome'
import './Home.css'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      events: []
    }
  }

  componentDidMount() {
    api.getEvents()
    .then(events => {
      console.log("EVENTS' LIST --->", events)
      this.setState({
        events: [...this.state.events, ...events]
      })
    })
  }

  render() {
    let premieres = this.state.events
    .filter(event => event.kind === 'premiere' && event.public)
    .reverse()
    .map(premiere => {
      return <PremierHome key={premiere._id} event={premiere} />
    })
    
    return (

      <div className="container Home">
        {/* <h1>Home</h1>
        <p>This is a sample project with the MERN stack</p> */}
        <div className="row">
          { premieres }
        </div>
      </div>
    )
  }
}

export default Home;
