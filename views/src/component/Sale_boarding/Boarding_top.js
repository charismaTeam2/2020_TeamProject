import React, {Component } from 'react';
import { Grid } from '@material-ui/core';



class Boarding_top extends Component{


componentDidMount() {
    
}



  render(){
      let image = this.props.image
      /*
      let temp_image = this.props.image;
      let image = [];
      for(let i=0; i<temp_image.length; i++){
          image[i] = temp_image[i].board_image_path
      }
      */
      //console.log(image[0]);
      
 
    return(
        <React.Fragment>
            <Grid container>
                <Grid xs={12} align="center">
                    <img src={'/sale/' + image} widht="100%" height="400" />
                </Grid>
               

  
                
               



            </Grid>
        </React.Fragment>
        

    );
  }

}


export default Boarding_top;