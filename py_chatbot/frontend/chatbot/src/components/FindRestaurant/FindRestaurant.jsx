import axios from "axios";
import React, {useState, useEffect} from 'react';
import './FindRestaurant.css';
import * as settings from '../../setting';

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
    <li key={link.id} className="link-list-item">
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="link-list-item-url"
      >
        {link.text}
      </a>
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