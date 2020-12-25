import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faHeart,faCarrot } from '@fortawesome/free-solid-svg-icons';

// Input: liked:boolean
// Output: onClick

const Like = (props) => {
        return (
            <React.Fragment>
            <FontAwesomeIcon icon={props.liked?faHeart:faCarrot} onClick={props.onClick} style={{cursor:"pointer"}}/>
            </React.Fragment>
        );
}
 
export default Like;