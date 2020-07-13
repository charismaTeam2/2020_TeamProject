import React, {Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
const headers = { withCredentials: true };


const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));




class Boarding_center extends Component{


 
componentDidMount() {



}

_test = () =>{
  const user = this.props.user;
  const p_number = this.props.product.product_number;
  const p_price = this.props.product.product_price;
  const seller = this.props.seller;

  const send_param = {
    headers:headers,
    user : user,
    p_number : p_number,
    p_price : p_price,
    seller : seller
};

fetch('/sale/deal_add',{
  method: "POST",
  headers: {
      'Content-Type' : 'application/json'
              },
  body : JSON.stringify(send_param)
}).then(res => res.json())
.then(data => {
  if(data.message == true){
      alert("거래 완료");

  }else if(data.message == false){
      alert("거래 실패");

  }
  //console.log(data);
  //console.log(send_param.id);
});

}

_deal = () =>{
  //alert('거래');
  const user = this.props.user;
  const p_number = this.props.product.product_name;
  const p_price = this.props.product.product_price;
  const seller = this.props.seller;

 
       const url = 'http://192.168.17.3/sale/deal/deal_add.php';
       const opt = {
           method: "POST",
           headers: {
               'Content-Type' : 'application/x-www-form-urlencoded'
           },
           body : `user=${user}&p_number=${p_number}&p_price=${p_price}&seller=${seller}`
       }

       fetch(url, opt)
       .then(res => res.json())
       .then(data => {
           if(data.message == 'success'){
            alert("거래 성공");
           }else if(data.message == 'fail'){
            alert("에러");
           }
       });
}


  render(){
    let temp_date = this.props.create  + ""
    let date = temp_date.substr(0,10)
    let product = this.props.product
    //let temp_date = this.props.create;
    //console.log(date);
    //let date = temp_date.substr(0,9);

    const src = `/userpage/${this.props.user}`

    return(
        <React.Fragment>
          <Grid container>
            <Grid item xs={6}><h2>제목 : {this.props.title}</h2> </Grid>

          </Grid>

            <Grid container>
                <Grid item xs={6}><label style={{ fontSize:20, fontWeight:"bold" }}>판매자 : {this.props.seller} </label></Grid>
            </Grid>


          <Grid container>
            <Grid item xs={6}><label style={{ fontSize:20, fontWeight:"bold" }}>날짜 : {date}</label></Grid>

          </Grid>
          <Grid container>
            <Grid item xs={12}><label style={{ fontSize:20, fontWeight:"bold" }}>제품명 : {product.product_name}</label></Grid>
          </Grid>
          <Grid container style={{ height:130 }}></Grid>
          <Grid container>
            <Grid item xs={12}><label style={{ fontSize:20, fontWeight:"bold" }}>가격 : {product.product_price}</label></Grid>
            <Grid item xs={12}><label style={{ fontSize:20, fontWeight:"bold" }}>재고 : {product.product_stock}</label></Grid>
          </Grid>
          <Grid container>
            
            <Button 
            variant="contained" 
            color="secondary" 
            style={{width:'100%'}}
            onClick={this._test}>
              구매하기
            </Button>

          </Grid>

        </React.Fragment>
        


    );
  }

}


export default Boarding_center;