import React, { Component } from 'react';
import { render } from 'react-dom';
import './App.css';
import Counters from './components/counters';
import NavBar from './components/navbar';

class App extends Component{
  state = { 
    counters: [
        {id: 1, value: 0},
        {id: 2, value: 9},
        {id: 3, value: 7},
        {id: 4, value: 5},
    ]
  }

  constructor(){
    super();
    console.log('App-constructor');
  }

  componentDidMount(){
    // Ajax Call
    console.log('App-mounted');
  }

handleDelete = (counterId) => {
    const counters = this.state.counters.filter(c => c.id !== counterId);
    this.setState({counters:counters});
}

handleReset = () => {
    const counters = this.state.counters.map(c => {
        c.value = 0;
        return c;
    })

    this.setState({counters});

}

handleIncrement = (counter) => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = {...counter};
    counters[index].value++;
    this.setState({counters});
}

handleDecrement = (counter) => {
  const counters = [...this.state.counters];
  const index = counters.indexOf(counter);
  counters[index] = {...counter};
  counters[index].value--;
  this.setState({counters});
}
  render() {
    console.log('App-rendered');
  return (
    <React.Fragment>
    <NavBar totalCounters = {this.state.counters.filter(c => c.value > 0).length}/>
    <main className = "container">
      <Counters onReset = {this.handleReset} 
                onDelete = {this.handleDelete} 
                onIncrement = {this.handleIncrement} 
                counters = {this.state.counters}
                onDecrement = {this.handleDecrement}/>
    </main>
    </React.Fragment>
  );
}
}

export default App;
