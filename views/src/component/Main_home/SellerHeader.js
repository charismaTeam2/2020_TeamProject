import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';


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

const sections = [ 
  //{ title: '사용자 메인', url: '/main/' },
  {  },
  {  },
  { title : '판매자 전용 페이지'  },
  {  },
  {  }
];

const login_paging = () =>{
  return(
    window.location.replace('/mypage/')
  );
}


export default function Header(props){
  const classes = useStyles();

  // 로그아웃.
  const logout = () =>{
    fetch('/user/logout')
    .then(res => res.json())
    .then(window.location.replace('/'));
}

/*
<IconButton>
          <SearchIcon />
      </IconButton>
 <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="left"
          style={{ fontWeight:"bold", fontSize:30 }}
          noWrap
          className={classes.toolbarTitle}
        >
          {props.title}
        </Typography>


         <img
          id="logo" 
          variant="outlined"
          src="/logo.png"
          noWrap
          align="right"
          className={classes.toolbarTitle}
          style={{ width: "5%", height:100}}
          ></img>
*/


  return (
    <React.Fragment>
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

        <Button variant="outlined" size="small" align="center" onClick={login_paging} style={{ marginRight : 20 }}>
          {props.user}님 페이지
        </Button>

        <Link
        component="button"
        variant="body2"
        color="secondary"
        onClick={logout}
        >
        로그아웃
        </Link>
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
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};