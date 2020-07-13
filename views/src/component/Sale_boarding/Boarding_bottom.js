import React, {Component } from 'react';
import { Grid } from '@material-ui/core';



class Boarding_bottom extends Component{


componentDidMount() {
    
}



  render(){
      let image = this.props.image
      let product = this.props.product
      /*
      let temp_image = this.props.image;
      let image = [];
      for(let i=0; i<temp_image.length; i++){
          image[i] = temp_image[i].board_image_path
      }
      */
     //console.log(image.s_board_image);
      //console.log(image[0]);
      
 
    return(
        <React.Fragment>
            <Grid container>
                <Grid xs={12} align="center">
                    <img src={'/sale/' + image.s_board_image} style={{ width:'100%' }} />
                </Grid>
               

            </Grid>
            <Grid container>

                <Grid xs={12} align="center">
                    <Grid item xs={6}><label style={{ fontSize:10, fontWeight:"bold" }}>제품 상세설명 : {product.product_produce}</label></Grid>
                </Grid>
               

            </Grid>

        </React.Fragment>
        

    );
  }

}


export default Boarding_bottom;