import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio';
import FavoriteIcon from '@material-ui/icons/Favorite';


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

  const handleExpandClick = () => {
    setExpanded(!expanded);
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
          옷 채택 : {props.number}
        </CardActions>
      
    </Card>
  );
}