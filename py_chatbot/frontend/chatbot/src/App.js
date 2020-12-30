import React, {Component} from 'react';
import './App.css';
import Chatbot from 'react-chatbot-kit';

import ActionProvider from './ActionProvider';
import MessageParser from './MessageParser';
import config from './config';

class App extends Component {
  
  render() { 
    return (
      <div className="App">
        <header className="App-header">
          <Chatbot config={config} actionProvider = {ActionProvider} messageParser = {MessageParser}/>
        </header>
      </div>
    );
  }
}
 
export default App;
