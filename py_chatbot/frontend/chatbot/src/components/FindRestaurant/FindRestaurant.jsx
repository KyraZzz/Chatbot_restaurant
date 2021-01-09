import axios from "axios";
import React, {useState, useEffect} from 'react';
import './FindRestaurant.css';
import * as settings from '../../setting';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const StyledButton = withStyles({
    root: {
      background: '#82b2b8',//'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      borderRadius: 3,
      border: 0,
      color: 'white',
      padding: '0 30px',
      boxShadow: '0 3px 5px 2px',
    },
    label: {
      textTransform: 'capitalize',
    },
  })(Button);

const FindRestaurant = ({
    category,price,scrollIntoView
}) => {

    const [output,setOutput] = useState([]);
    
    useEffect(() =>{
        const getRestaurant = async () => {
            let url = settings.API_SERVER + '/restaurants/fetch';
            let response = await axios.post(url, {"category":category,"price":price});
            let result = response.data["output"];
            if (result) {
                return setOutput(result);
            }
            return setOutput([]);
        };
        getRestaurant();
    },[category,price]);

    useEffect(() => scrollIntoView());

   const linkMarkup = output.map((link, index) => (
    <li key={link.id} className="link-list-item-url">
      <StyledButton
        variant="contained" color="primary" fullWidth="true"
        href={link.url}
        target="_blank"
        className="link-list-item-url"
      >
        {link.text}
      </StyledButton>
    </li>
    ));

    if (linkMarkup.length === 0){
        return (
            <div className="single-flight-container">There are no such restaurants. Please try again.</div>
        );
    }
    else{
        return (
    <ul className="link-list">{linkMarkup}</ul>
   );
        }
}
 
export default FindRestaurant;