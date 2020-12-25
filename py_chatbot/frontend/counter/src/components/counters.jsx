import React, { Component } from 'react';
import Counter from './counter';
import Movies from './movies';

class Counters extends Component {

    render() { 
        const {onReset,onDelete,onIncrement,counters, onDecrement} = this.props;
        return ( 
        <div>
            <button onClick={onReset} className="btn btn-primary btn-sm m-2">Reset</button>
            {counters.map(counter => 
                <Counter key = {counter.id} 
                counter = {counter} 
                selected = {true} 
                onDelete = {onDelete} 
                onIncrement = {onIncrement}
                onDecrement = {onDecrement}>
                    <h4>Counter#{counter.id}</h4>
                </Counter>)}
            <Movies />
        </div> );
    }
}
 
export default Counters;