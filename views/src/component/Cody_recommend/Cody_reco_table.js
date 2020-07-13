import React, {Component } from 'react';
import Button from '@material-ui/core/Button';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
const headers = { withCredentials: true };


class Cody_reco_table extends Component{
    
componentDidMount() {

}

_save = () =>{
        const number = this.props.number
        const top_number = this.props.t_number
        const top_name = this.props.t_name
        const top_image = this.props.t_image
        const bottom_number = this.props.b_number
        const bottom_name = this.props.b_name
        const bottom_image = this.props.b_image
        const select = this.props.select
        const reco_user = this.props.reco_user

        const send_param = {
            headers:headers,
            top_number : top_number,
            top_name : top_name,
            top_image : top_image,
            bottom_number : bottom_number,
            bottom_name : bottom_name,
            bottom_image : bottom_image,
            select : select,
            reco_user :reco_user,
            number : number
        };
        //console.log(send_param);

        fetch('/recommend/save/',{
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
                        },
            body : JSON.stringify(send_param)
        }).then(res => res.json())
        .then(data => {
            if(data.message == true){
                window.location.reload();
            }else if(data.message == false){
                alert("에러");
                window.location.replace('/');
            }
        });

}

_delete = () =>{
        const number = this.props.number

        const send_param = {
            headers:headers,
            number : number
        };
        //console.log(send_param);

        fetch('/recommend/delete/',{
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
                        },
            body : JSON.stringify(send_param)
        }).then(res => res.json())
        .then(data => {
            if(data.message == true){
                window.location.reload();
            }else if(data.message == false){
                alert("삭제 실패");
                window.location.replace('/');
            }
        });

}

  render(){
    //const board = this.props;
    //let temp_date = board.date + "";
    //let date = temp_date.substr(0,10);

    const recommend = this.props;
    let t_src = '/clothes/' + recommend.t_image;
    let b_src = '/clothes/' + recommend.b_image;

    let select = ""
    if(recommend.select === 1){
      select = "외출"
    }else if(recommend.select === 2){
      select = "파티"
    }else if(recommend.select === 3){
      select = "등교"
    }


    return(
        <TableBody>
            <TableRow >
              <TableCell align="letf"> {recommend.reco_user} </TableCell>
              <TableCell align="right"> {select}</TableCell>
              <TableCell align="right"> <img src={t_src} style={{ width:100, height:100 }} /> </TableCell>
              <TableCell align="right"> <img src={b_src} style={{ width:100, height:100 }} /> </TableCell>
              <TableCell align="right"> {recommend.t_name} / {recommend.b_name}</TableCell>
              <TableCell align="right"> 
                <Button
                    id="b_1"
                    color="primary"
                    onClick={this._save}
                >저장 </Button>
                <Button
                    id="b_2"
                    color="secondary"
                    onClick={this._delete}
                >삭제 </Button>
              </TableCell>
            </TableRow>
        </TableBody>
    
    );
  }

}

export default Cody_reco_table;