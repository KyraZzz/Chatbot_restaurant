import React from "react";
import normal from '../../icons/normal.png';
import bp from '../../icons/phong.png';
import texture from '../../icons/texture.png';
import bump from '../../icons/bump.png';
import displacement from '../../icons/displacement.png';
import "./LinkList.css";

const LinkList = ({num}) => {
  const options = [
    { 
      text: "Normal model", 
      url: normal,
      id: 1 
    },
    { text: "Blinn-phong model", 
      url: bp, 
      id: 2 },
      { text: "Texture Mapping", 
      url: texture, 
      id: 3 },
      { text: "Bump Mapping", 
      url: bump, 
      id: 4 },
      { text: "Displacement Mapping",
      url: displacement, 
      id: 5 }
  ];
  const linkMarkup = ((options.filter(link => link.id === num[num.length-1]).map((link) => (
    <li key={link.id} className="link-list-item">
      <img
        src={link.url}
        alt={link.text}
        width = "200"
        className="link-list-item-url"
      />
    </li>
  ))));

  return <ul className="link-list">{linkMarkup}</ul>;
};

export default LinkList;