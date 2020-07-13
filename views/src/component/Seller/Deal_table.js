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
  }else if(deal.stat === 4){
      re_stat = "배송 완료"
  }else if(deal.stat === 5){
      re_stat = "종료된 거래"
  }

  const stat_up = () =>{
    const number = deal.number;
    const temp_stat = deal.stat;

    const send_param = {
      headers:headers,
      number : number,
      temp_stat : temp_stat
    };
  
  fetch('/sale/restat',{
    method: "POST",
    headers: {
        'Content-Type' : 'application/json'
                },
    body : JSON.stringify(send_param)
  }).then(res => res.json())
  .then(data => {
    //console.log(data);
    if(data.message == true){
        alert("갱신 완료");
        window.location.replace('/seller');
  
    }else if(data.message == false){
        alert("오류");
  
    }
  });
    

  }

  /*
   node에서 굳이 처리할 필요없이. 여기서 외부키를 선별한 다음 다시 백으로 전송해서 값을 추출하는 방식도 있음.
  */

  let test_number = deal.p_number
  let image =''
  let text = ''
  if(test_number === 1){
    image = './sale/test.png'
    text = '반팔 판매'
  }else if(test_number === 3){
    image = './sale/test3.jpg'
    text = '분홍 티셔츠'
  }

  let temp = deal.date
  let s_date = temp.substr(0,10);

 

  return (
        <TableBody>
            <TableRow key={deal.number}>
              <TableCell component="th" scope="row">
                {deal.number}
              </TableCell>
              <TableCell align="right">{text}</TableCell>
              <TableCell align="right"><img src={image} style={{width:80, height:80}}/></TableCell>
              <TableCell align="right">{deal.user}</TableCell>
              <TableCell align="right">{deal.count}</TableCell>
              <TableCell align="right">{deal.price}</TableCell>
              <TableCell align="right">
                {<Button 
                  variant="contained" 
                  color="secondary" 
                  onClick={stat_up}>
                    {re_stat}
               </Button>}

              
              </TableCell>
              <TableCell align="right">{s_date}</TableCell>

            </TableRow>
        </TableBody>
  );
}