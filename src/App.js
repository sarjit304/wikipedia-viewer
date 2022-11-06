import React, { Component } from 'react';
import './App.css';
import wikipediaLogo from './img/Wikipedia-logo_ka.png'



class App extends Component {
  state = {  } 

  searchWiki = () => {
    //console.log("search wiki called.");
    let userInput = document.querySelector('#userInput');
    //console.log(userInput.value);
    let url = 'https://en.wikipedia.org/w/rest.php/v1/search/page?q='+ userInput.value +'&limit=10';
    let request = new XMLHttpRequest();
    request.open('GET', url + '&origin=*'); // to avoid CORS error
    console.log('[+] Request url: ', url);
    request.send();
    request.onload = () => {
      if (request.status === 200) {
        let response = JSON.parse(request.response);
        console.log('[+] Response: ', response);
        this.updateState(response);
        console.log("state: ", this.state);
        console.log('type of newState: ', typeof this.state.newState, this.state.newState);
        //console.log('this.state.response.pages', this.state.response.pages);
      } else {
        console.log(`[-] error ${request.status} ${request.statusText}`);
        console.log(request.response);
      }
    }
  }

  updateState = obj => {
    let newState = [];
    for (let i=0; i<obj.pages.length; i++) {
      let temp = [];
      let articleLink = 'https://en.wikipedia.org/wiki/' + obj.pages[i]['key'];
      console.log('pages content: ', obj.pages[i]);
      temp.push(obj.pages[i]['title']);
      temp.push(obj.pages[i]['description']);
      temp.push(articleLink);
      temp.push(obj.pages[i]['thumbnail']);
      //temp.push(obj.pages[i]['excerpt']);

      newState.push(temp);
    }
    console.log('newState', newState);
    this.setState({ newState });
    console.log('img url ', this.state.newState[0][3]['url']);
  }

  render() { 
    return (
      <div>
        <div className='main-search-input-wrap'>
          <h1>Search Wiki</h1>
          <div className='main-search-input fl-wrap'>
            <div className='main-search-input-item'>
              <input id="userInput" defaultValue="Rainbow"></input>
            </div>
            <button className='main-search-button' onClick={this.searchWiki}>Search</button>
          </div>
        </div>
        <div className='results-block'>{this.state.newState? this.state.newState.map((key, idx) =>(
          <a href={key[2]}>
            <div className='searchResult' id={idx}>
              <div className='table'>
                <div className='thumbnail'><img src={key[3]? key[3]['url']: wikipediaLogo} alt='Thumbnail' height='100' width='100'></img></div>
                <div className='description'>{key[0]} <br></br> <br></br>
                {key[1]} <br></br></div> 
              </div>
            </div>
          </a>
        )): null}
        </div>
      </div>
    );
  }
}
 
export default App;
