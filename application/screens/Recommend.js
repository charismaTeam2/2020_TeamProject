import React, { Component } from "react";
import { StyleSheet, View, Text, ScrollView, Button, TouchableOpacity, Image } from "react-native";
import WeaderMain from './WeaderMain';
import Cody_situ from './Cody_situ';

// 옷추천페이지
// 여기서 weatherapi 사용.
// 중요도 높음. 개발 완료. 디자인 수정작업 필요.

export default class Recommend extends Component {

        state = {
                board_check: "",
                situ_cody: [],
                rows1 : [],
                rows2 : [],
                rows3 : [],
                rows4 : [],
                score1 : "",
                score2 : ""
        }

        componentDidMount() {

                

        }

        _reco_button = () => {
                this.setState({
                        board_check: 1
                });

                fetch('http://192.168.17.3:5000/recommend/a_reco')
                        .then(response => response.json())
                        .then(data => this.setState({
                                rows1 : data.rows1[0],
                                rows2 : data.rows2[0],
                                rows3 : data.rows3[0],
                                rows4 : data.rows4[0],
                                score1: data.temp,
                                score2 : data.temp2
                        }));
        };

        _cody_button = () => {
                this.setState({
                        board_check: 2
                });

                fetch('http://192.168.17.3:5000/recommend/a_situ')
                        .then(response => response.json())
                        .then(data => this.setState({
                                situ_cody: data.rows
                        }));

        };

        render() {
                let board_check = this.state.board_check
                let info_form = () => {
                        if (board_check == 1) {
                                let src = "http://192.168.17.3:3000/clothes/" + this.state.rows1.c_image;
                                let src2 = "http://192.168.17.3:3000/clothes/" + this.state.rows2.c_image;

                                let src3 = "http://192.168.17.3:3000/clothes/" + this.state.rows3.c_image;
                                let src4 = "http://192.168.17.3:3000/clothes/" + this.state.rows4.c_image;

                                return (
                                        <View>
                                                
                                        <View style={{
                                                marginTop: 30, borderBottomWidth: 0.5, justifyContent: 'flex-start',
                                                alignItems: 'flex-start', flexDirection: 'row'
                                        }}>
                                                <Text style={{ marginRight: 240, textAlign: 'left' }}>의상</Text>
                                                <Text style={{ marginRight: 80, textAlign: 'right' }}>추천 점수</Text>
                                        </View>
                                        
                                        <View style={{ alignItems: 'flex-start', flexDirection: 'row', marginTop:15, borderTopWidth:0.5, borderTopColor:'red', borderBottomWidth:0.5, borderBottomColor:'red'}}>
                                                <View style={{ marginRight: 20}}>

                                                <Image 
                                                source={{ uri: src }}
                                                style={{ height:100, width:80}}  />
                                                </View>

                                                <View style={{ marginRight: 83}}>
                                                <Image 
                                                source={{ uri: src2 }} 
                                                style={{ height:100, width:80 }} />
                                                </View>

                                                <Text>{this.state.score1}</Text>
                                        </View>

                                        <View style={{ alignItems: 'flex-start', flexDirection: 'row', marginTop:15, borderTopWidth:0.5, borderTopColor:'red', borderBottomWidth:0.5, borderBottomColor:'red'}}>
                                                <View style={{ marginRight: 20}}>

                                                <Image 
                                                source={{ uri: src3 }}
                                                style={{ height:100, width:80}}  />

                                                </View>

                                                <View style={{ marginRight: 83}}>

                                                <Image 
                                                source={{ uri: src4 }} 
                                                style={{ height:100, width:80 }} />
                                                </View>

                                                <Text style={{ marginRight: 50}}>{this.state.score2}</Text>
                                        </View>

                                  



                                        </View>
                                );
                        } else if (board_check == 2) {
                                return (
                                        <View>


                                        <View style={{
                                                marginTop: 30, borderBottomWidth: 0.5, justifyContent: 'flex-start',
                                                alignItems: 'flex-start', flexDirection: 'row'
                                        }}>
                                                <Text style={{ marginRight: 240, textAlign: 'left' }}>의상</Text>
                                                <Text style={{ marginRight: 80, textAlign: 'right' }}>상황</Text>
                                                
                                        </View>
                                        {
                                        this.state.situ_cody.map(c =>{
                                        let t_src = 'http://192.168.17.3:3000/clothes/' + c.top_image;
                                        let b_src = 'http://192.168.17.3:3000/clothes/' + c.bottom_image;
                                        let select
                                        if(c.comment_number === 1){
                                                select = "외출"
                                              }else if(c.comment_number === 2){
                                                select = "파티"
                                              }else if(c.comment_number === 3){
                                                select = "등교"
                                              }
                                        //console.log(select);
                                        //console.log(t_src);

                                        return(

                                        <Cody_situ key={c.my_cody_number} t_name={c.top_name} ta_src={t_src} b_name={c.bottom_name} ba_src={b_src} select={select}/> 
                                
                                        );
                                        })
                                }
                                        
                                        </View>      
                                );
                        }
                }

                return (
                        <ScrollView>
                                <View style={{ width: '100%', height: 200 }}>
                                        <WeaderMain />
                                </View>
                                <View style={{paddingTop: 20}}>
                                        <TouchableOpacity
                                                onPress={this._reco_button}>
                                                <Text style={{ fontSize: 20, color: 'white', textAlign: 'center', backgroundColor:'#9999CC', height:40 }}>
                                                        코디 추천</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                                onPress={this._cody_button}>
                                                <Text style={{ fontSize: 20, color: 'white', textAlign: 'center', backgroundColor:'#66CCCC', height:40 }}>
                                                        상황 코디 확인</Text>
                                        </TouchableOpacity>
                                </View>

                                {info_form()}


                        </ScrollView>



                )
        }

}