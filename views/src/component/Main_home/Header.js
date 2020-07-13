import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import Router_Link from 'react-router-dom/Link';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
}));

const sections = [ // 세션 부분 사용을 위해 분리 예정. (Navagation Menu)
  {  },
  {  },
  { title: '옷 자랑 게시판', url: '/' },
  { title: '판매 플랫폼', url: '/sale' },
  {  },
  {  },
];

const login_paging = () =>{
  return(
    window.location.replace('/login')
  );
}


export default function Header(props){
  const classes = useStyles();
  
  return (
    <React.Fragment>
      <Router>
      <Toolbar className={classes.toolbar}>
      <Typography
          color="inherit"
          align="left"
          className={classes.toolbarTitle}
        >
          <img
          id="logo" 
          src="/logo.png"
          style={{ width:150 }}
          ></img>
        </Typography>

        <Button variant="outlined" size="small" onClick={login_paging}>
          <Link to="/login"> 로그인/회원가입 </Link>
        </Button>
      </Toolbar>
      <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            className={classes.toolbarLink}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
      </Router>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};