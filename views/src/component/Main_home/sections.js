import React, { Component } from 'react';
import Header from './Header';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Link from 'react-router-dom/Link';

const section = [
  { title: '오늘의 코디', url: '../Login/Login.js' },
  { title: '내 옷장', url: '#' },
  { title: '추천 코디 확인', url: '#' },
  { title: '옷 추천', url: '#' },
  { title: '판매 플랫폼', url: '#' }
]

class sections extends Component{
    render(){
        return(
            <Router>
                <Header title="為せば成る" />

            </Router>
    
            
        );
    }
}

export default sections;