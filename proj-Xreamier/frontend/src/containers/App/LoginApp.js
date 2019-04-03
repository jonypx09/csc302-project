import React, { Component } from 'react';
import './LoginApp.css';
import appRoutes from 'routes/app.jsx';
import {
    Header, Footer, Sidebar
} from 'components';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={require('assets/img/University_of_Toronto.png')} width='120' height='130'/>
          <h1 className="App-title">University of Toronto</h1>
          <h1 className="App-title">Graduate Ticket Manager</h1>

          <form id="form" class="login" action="/dashboard">
            <p id="title" class="title">Log in</p>

            <input id="user" name="user" type="text" placeholder="Username" autoFocus/>
            <input id="password" name="password" type="password" placeholder="Password" />
            <button>
              <i class="spinner"></i>
              <span class="state">Submit</span>
            </button>
          </form>
        </header>
        <Footer></Footer>
      </div>
    );
  }
}

export default App;
