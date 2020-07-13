import React, {Component} from 'react';
import './App.css';
import Blog from './component/Main_home/Blog';
//import Main from './component/Main';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Link from 'react-router-dom/Link';
//import { Home, About } from './component/Page/index';
import Login from './component/Login/Login';
import Sign_in from './component/Sign_in/Sign_in';
import BoardWrite from './component/BoardWrite/BoardWrite';
import Board from './component/Board/Board';
import UserMain from './component/Main_home/UserMain';
import Boarding from './component/Board/Boarding';
import Mypage from './component/Mypage/Mypage';
import UserPage from './component/UserPage/UserPage';
import Clothes from './component/Clothes/Clothes';
import MY_cody from './component/My_cody/My_cody';
import Cody from './component/Cody_recommend/Cody_main';
import test from './component/at/Clothes';
import Sale from './component/Sale/Sale';
import Sale_boarding from './component/Sale_boarding/Boarding';
import Seller from './component/Seller/Seller';


class App extends Component {



  componentDidMount(){

  }
  
  render(){
    
    
    return(
      <Router>

          <Route exact path="/" component={Blog} />
          <Route exact path="/main" component={UserMain} />
          <Route path="/login" component={Login} />
          <Route path="/sign_in" component={Sign_in} />
          <Route path="/board_write" component={BoardWrite} />
          <Route exact path="/board" component={Board} />
          <Route path="/board/boarding" component={Boarding} />
          <Route path="/mypage" component={Mypage} />
          <Route path="/userpage" component={UserPage} />
          <Route path="/clothes" component={Clothes} />
          <Route path="/recommend" component={MY_cody} />
          <Route path="/cody" component={Cody} />
          <Route path="/clothess" component={test} />
          <Route exact path='/sale' component={Sale} />
          <Route path='/sale/boarding' component={Sale_boarding} />
          <Route path='/seller' component={Seller} />
          



      </Router>
    );
  }



}



export default App;
