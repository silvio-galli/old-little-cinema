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
    let events = this.state.events
    .filter(event => event.public )
    .map(event => {
      if (event.kind === 'review')
        return <div><h1>Review</h1></div>
      else
        return <PremierHome key={event._id} event={event} />
    })
    
    return (

      <div className="container Home">
        {/* <h1>Home</h1>
        <p>This is a sample project with the MERN stack</p> */}
        <div className="row">
          { events }
        </div>
      </div>
    )
  }
}

export default Home;
