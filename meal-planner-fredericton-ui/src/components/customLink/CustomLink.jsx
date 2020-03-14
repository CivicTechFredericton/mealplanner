import React, { useState } from 'react';
import Link from "@material-ui/core/Link";
import Proptypes from "prop-types";
import { withRouter } from 'react-router';

const CustomLink = (props) => {
  const {name, link, history} = props;
  const onClick  = () => {
    history.push(link);
  };
  return(
    <Link href={link} onClick={onClick} >
      {name}
    </Link>
  );
};

CustomLink.proptype = {
  name:Proptypes.string.isRequired,
  link:Proptypes.string.isRequired
};
export default withRouter(CustomLink)
