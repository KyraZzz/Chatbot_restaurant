import React, {Component} from 'react';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import "./RestName.css";
import axios from "axios";
import * as settings from '../../setting';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 2.4 + ITEM_PADDING_TOP,
      width: 230,
    },
  },
};
const SelectProps = {
    MenuProps
}

class RestName extends Component{
    constructor(props){
        super(props)
        this.state = {
            choice : {text:"",url:""},
            options: []
        }
    }

    handleChange = (event) => {
        let newUrl = "#"
        for (let item of this.state.options){
            if (item.text === event.target.value){
                newUrl = item.url
                break
            }
        }
        this.setState({choice:{text:event.target.value, url:newUrl}}); 
    };

    
    componentDidMount(){
        let url = settings.API_SERVER + '/restaurants/name';
        axios.get(url).then(data => {
          let options = data["data"]["output"];
            this.setState((state) => ({
              ...state,
              options
            }))
        })
    }
    

    render () {
        return (
        <React.Fragment>
            <TextField
                id="outlined-select-currency"
                select 
                label="Select"
                value={this.state.choice.text}
                name={this.state.choice.url}
                onChange={this.handleChange}
                helperText="Please confirm after selection."
                variant="outlined"
                size="small"
                SelectProps = {SelectProps}
            >
                {this.state.options.map((options, index) => (
                    <MenuItem className="select-items" key={options.id} value={options.text}> {options.text}</MenuItem>
                ))}
            </TextField>
            <Button variant="contained" color="primary" onClick={() => this.props.actionProvider.handleConfirm(this.state.choice)}>
                CONFIRM
            </Button>
        </React.Fragment>
        );
    };
}

 
export default RestName;
