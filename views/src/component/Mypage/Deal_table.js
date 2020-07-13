import React from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Button } from '@material-ui/core';
const headers = { withCredentials: true };


export default function SimpleTable(props) {
  const deal = props;
  //console.log(message);
  //let temp_date = deal.date + "";
  //let date = temp_date.substr(0,10);

  //let d_text = ""

  let re_stat = ""

  if(deal.stat === 1){
    re_stat = "입금 확인중"
}else if(deal.stat === 2){
    re_stat = "배송 준비 중"
}else if(deal.stat === 3){
    re_stat = "배송 중"
}else if(deal.stat === 5){
    re_stat = "종료된 거래"
}

const _con = () =>{
  //alert('adfasdf');
  const number = deal.product;
  //console.log(number);

  const send_param = {
    headers:headers,
    number : number
};

fetch('/sale/con',{
  method: "POST",
  headers: {
      'Content-Type' : 'application/json'
              },
  body : JSON.stringify(send_param)
}).then(res => res.json())
.then(data => {
  if(data.message == true){
      alert("완료");

  }else if(data.message == false){
      alert("오류");

  }
  //console.log(data);
  //console.log(send_param.id);
});
}

const _test = () =>{
  if(deal.stat === 4){
    re_stat = "배송 완료"
    return(
      <Button 
      variant="contained" 
      color="secondary" 
      onClick={_con}>
      {re_stat}
    </Button>
    );
    }
  }

  let test_number = deal.p_number
  let image =''
  let text = ''
  if(test_number === 1){
    image = '/sale/test.png'
    text = '반팔 판매'
  }else if(test_number === 3){
    image = '/sale/test3.jpg'
    text = '분홍 티셔츠'
  }
  let temp = deal.date
  let s_date = temp.substr(0,10);


  return (
        <TableBody>
            <TableRow key={deal.number}>
              <TableCell component="th" scope="row">
                {text}
              </TableCell>
              <TableCell align="right"><img src={image} style={{width:80, height:80}}/></TableCell>
              <TableCell align="right">{deal.count}</TableCell>
              <TableCell align="right">{deal.price}</TableCell>
              <TableCell align="right">{re_stat} {_test()}</TableCell>
              <TableCell align="right">{s_date}</TableCell>

            </TableRow>
        </TableBody>
  );
}