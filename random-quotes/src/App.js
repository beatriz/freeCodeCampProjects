import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import logo from './logo.svg';
import NewQuote from './NewQuote';
import Tweet from './Tweet';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      quote: "",
      author: ""
    }
  }
  componentWillMount() {
    this.handleClickNewQuote();
  }
  render() {
    const tweetLink = 'https://twitter.com/intent/tweet?hashtags=quote&related=freecodecamp&text="' + this.state.quote + '"' + this.state.author;
    return (
      <Grid className="container">
        <Row>
          <Col md={4} mdOffset={4}>
            <div className="quote text-center">"{this.state.quote}"</div>
            <div className="author text-right">- {this.state.author}</div>
            <Row className="buttons-container">
              <Col md={4}>
                <Tweet tweetLink={tweetLink} />
              </Col>
              <Col md={4} mdOffset={4}>
                <NewQuote onClick={() => this.handleClickNewQuote()} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>
    );
  }
  handleClickNewQuote() {
    getQuote()
    .then(data => this.setState({
      quote: data.quote, 
      author: data.author
    }));
  }
}

export default App;

function getQuote(){
  const url = "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=movies";
  const headers = new Headers({
                        "X-Mashape-Key": "NymgRnAy5tmshpclIJ4EOUYf4cv2p13a1hVjsn6n6YLmHPNdz4",
                        "Content-Type": "application/x-www-form-urlencoded",
                        "Accept": "application/json"
                      });
  return fetch(url, {
    method: 'POST',
    headers: headers
  }).then(response => response.json())
  .catch(e => console.log("Error: "+ e));
}