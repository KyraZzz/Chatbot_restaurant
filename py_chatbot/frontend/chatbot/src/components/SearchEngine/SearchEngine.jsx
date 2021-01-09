import React from "react";
import "./SearchEngine.css";
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

const LinkList = ({searchRes}) => {
  const linkMarkup = ((searchRes.map((link) => (
    <li key={link.title} className="link-list-item-url">
      <StyledButton variant="contained" color="primary" size="small" fullWidth="true" href={link.url} target="_blank" >
      {link.title}
      </StyledButton>
    </li>
  ))));

  return <ul className="link-list">{linkMarkup}</ul>;
};

export default LinkList;