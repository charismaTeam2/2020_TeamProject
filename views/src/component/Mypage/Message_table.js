import React from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Button } from '@material-ui/core';
const headers = { withCredentials: true };


export default function SimpleTable(props) {
  const message = props;
  //console.log(message);
  let temp_date = message.date + "";
  let date = temp_date.substr(0,10);

  let d_text = ""

  const follow_add = () =>{
    const following = message.send;
    const number = message.number;

  const send_param = {
    headers:headers,
    user : following,
    number : number
  };
  fetch('/mypage/following',{
    method: "POST",
    headers: {
        'Content-Type' : 'application/json'
                },
    body : JSON.stringify(send_param)
}).then(res => res.json())
.then(data => {
    if(data.message == true){
        alert("수락하였습니다.");
        window.location.reload();
    }else if(data.message == false){
        alert("거부되었습니다.");
        window.location.replace('/');
    }
});

  }

  const follow_form = () =>{
    if(message.division === 1){
      return(
        <TableCell align="right">
          <Button
            id="button1"
            color="primary"
            onClick={follow_add}
            variant="contained"
            >수락 </Button>
            <Button
            id="button1"
            color="secondary"
            onClick=""
            variant="contained"
            >거절 </Button>
        </TableCell>

        );

    }
  }

  if(message.division === 0){
      d_text = "     일반"
  }else if(message.division === 1){
      d_text = "팔로워 신청"
  }else if(message.division === 2){
      d_text = "     거래"
  }else if(message.division === 3){
      d_text = "     공지"
  }

 


  return (
        <TableBody>
            <TableRow key={message.number}>
              <TableCell component="th" scope="row">
                {message.send}
              </TableCell>
              <TableCell align="right">{message.text}</TableCell>
              <TableCell align="right">{d_text}</TableCell>
              <TableCell align="right">{date}</TableCell>
              {follow_form()} 
              

            </TableRow>
        </TableBody>
  );
}