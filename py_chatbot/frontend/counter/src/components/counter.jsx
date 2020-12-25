import React, { Component } from 'react';

class Counter extends Component {

    style = {
        fontSize:15,
        frontWeight: "bold"
    };
    /*
    renderTags(){
        if (this.state.tags.length === 0){
            return <p>There are no tags</p>
        }
        return <ul>{this.state.tags.map(tag => <li key = {tag}>{tag}</li>)}</ul>
    }
    */

    componentDidUpdate(prevPros, prevState){
        console.log('prevProps',prevPros);
        console.log('preState',prevState);
    }


    render() {
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-1"><span style = {this.style} className = {this.getBadgeClasses()}>{this.formatCount()}</span></div>
                    <div className="col"><button onClick={() => this.props.onIncrement(this.props.counter)} className="btn btn-secondary btn-sm">+</button>
                <button onClick={() => this.props.onDecrement(this.props.counter)} disabled={this.props.counter.value===0?'disabled':""} className="btn btn-secondary btn-sm m-2">-</button>
                <button onClick={() => this.props.onDelete(this.props.counter.id)} className="btn btn-danger btn-sm m-2">Delete</button></div>       
                {/*
                <div>
                    {this.state.tags.length === 0 && <p>Please create some tags.</p>} 
                    {this.renderTags()}
                </div>
                */}
                </div>
            </React.Fragment>
        );
    }

    
    getBadgeClasses() {
        let classes = "badge m-2";
        classes += (this.props.counter.value === 0) ? "badge-warning" : "badge-primary";
        return classes;
    }

    formatCount() {
        const {value} = this.props.counter;
        return value === 0? 'zero' : value;
    }
    
}
 
export default Counter;