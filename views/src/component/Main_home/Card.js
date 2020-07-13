import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { Link } from 'react-router-dom';


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

  //let src = 'C:/project/server/upload/'
  //let _to = "/board/" + props.number;
 
  //let src = './src/' + props.thum;
  //let _to = 'board/' + props.number;


  // 테스트
  const test_a = () =>{
    let test = props.number
    let user = props.s_user

    if(test === 47 && user === 'test'){
      return <FavoriteIcon />
    }else{
      return <FavoriteBorderIcon />
    }

  }

  return (
    <Card className={classes.root}>
      <Link to={props.src} user={props.user} >
      <CardMedia
        className={classes.media}
        image={'/images/' + props.thum}
        title="Paella dish"
      />
      </Link>
       <CardContent>
        <Typography variant="body2" color="textSecondary" component="span" align='left'>
          {props.name}
        </Typography>
      </CardContent>
      
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
         {props.text}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          {test_a()}
        </IconButton>     
        <Typography variant="body2" color="textSecondary" component="span" align="right"> 
          {props.user}
        </Typography>
      </CardActions>
      
    </Card>
  );
}