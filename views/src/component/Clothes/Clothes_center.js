import React, {Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Switch from '@material-ui/core/Switch';
const headers = { withCredentials: true };



const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: "100%",
      margin : 0
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  }));
  
  export default function RecipeReviewCard(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [state, setState] = React.useState({
        show: props.show
    });


    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
        
        const number = props.number;
        const show = props.show;

        const send_param = {
            headers:headers,
            number : number,
            show : show
        };
        fetch('/clothes/show',{
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
    };

    let div_text = "";
    if(props.division === 1){
        div_text = "상의";
    }else if(props.division === 2){
        div_text = "하의";
    }else if(props.division === 3){
        div_text = "점퍼";
    }

    let stat_text = "";
    if(props.stat === 1){
        stat_text = "입을 수 있음";
    }else if(props.stat === 2){
        stat_text = "세탁 필요";
    }else if(props.stat === 3){
        stat_text = "입을 수 없음"
    }

    //let temp_show;

  
  
    return (
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={'/clothes/' + props.image}
          title="clothes"
        />
         <CardContent>
          <Typography variant="body2" color="textSecondary" component="p" align='left'>
            의상 구분 : {div_text}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" align='left'>
            의상 이름 : {props.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" align='left'>
            색상 : {props.color}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" align='left'>
            상태 : {stat_text}
          </Typography>

        </CardContent>
 
        <CardActions disableSpacing>
            <Switch
                checked={state.show}
                onChange={handleChange}
                name="show"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
            

        </CardActions>
        
      </Card>
    );
  }