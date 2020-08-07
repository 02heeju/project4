import React, {Component} from 'react';
import {
    Text, 
    TouchableOpacity, 
    View, 
    Alert,
    Image,
    TextInput,
    FlatList,
    Platform,
    Linking
  } from 'react-native';

import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

export default class MyScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          performance: '2019spring',
          choreoNote: [{
            lyrics: "사람들이 움직이는 게 ", 
            choreo: ["업락", "다운락", "다운락", "다운락", "다운락", "다운락"],
            time: 0,
          }, {
            lyrics: "신기해", 
            choreo: ["스쿠바", "스쿠바2"],
            time: 10,
          },{
            lyrics: "팔다리가 앞뒤로 막 움 움 움 움직이는 게", 
            choreo: ["스쿠비두"],
            time: 20,
          }],
          date:'2020',
          music: '',
          positionList: [
                    [
                      {posx: 10, posy:0, time: 0},
                      {posx: 20, posy:0, time: 10},
                      {posx: 30, posy:0, time: 20},
                    ],
                    [
                      {posx: 10, posy:0, time: 0},
                      {posx: 20, posy:0, time: 10},
                      {posx: 30, posy:0, time: 20},
                    ],
                ],
          user: null,
        }
      }

    //데이타베이스에 정보 업로드 하기
    makeNewProject = () => {

        // console.log('hh:', this.state.performance, ', kk:', this.state.musictitle, ' ee:', this.state.choreoNote);
        firebase.firestore().collection('performance').doc(this.state.performance).set({
            music: this.state.music,
            choreoNote:  this.state.choreoNote,
            date: this.state.date
          })
        
        for (var i = 0; i < this.state.positionList.length; i++) {
            // console.log('ggg : ',this.state.positionList[i]);
            firebase.firestore().collection('performance').doc(this.state.performance).collection('positionList').doc(i.toString()).set({
                pos: this.state.positionList[i]
            })
        }
        
    }
    //performance이름으로 데이타베이스의 정보 받아오기
    getProject = () => {
        firebase.firestore().collection('performance').doc(this.state.performance).get().then( function(doc) {
            // console.log(doc);
            this.setState({ performtitle: doc.data().performtitle,
                            musictitle: doc.data().musictitle,
                            date: doc.data().date,
                            choreoNote: doc.data().choreoNote},()=>{console.log("choreo : "+ this.state.choreoNote[0].choreo)});
        }.bind(this));

        
        firebase.firestore().collection('performance').doc(this.state.performance).collection('positionList').get().then(function(posdoc) {
            var tempPos=[];
            posdoc.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                // console.log(" => ", doc.data().pos);
                tempPos.push(doc.data().pos);
                console.log('pos: ',tempPos);
            });
            this.setState({positionList: tempPos}, ()=>{console.log("pos : "+ this.state.positionList[0][0].posx)});
        }.bind(this));
    }

    render(){
        return(
            <View>
                <TextInput
                    placeholder = 'Type performance name here'
                    onChangeText = {(performance) => this.setState({performance})} 
                    multiline={true}>{this.state.performance}</TextInput>
                <TextInput
                    placeholder = 'Type Music_title here'
                    onChangeText = {(musictitle) => this.setState({musictitle})} 
                    multiline={true}>{this.state.musictitle}</TextInput>
                <TouchableOpacity onPress={this.makeNewProject}>
                      <Text>Upload on DataBase</Text>
                  </TouchableOpacity>
                <TouchableOpacity onPress={this.getProject}>
                    <Text>get from DataBase</Text>
                </TouchableOpacity>
                <Text style={{color: 'blue'}}
                    onPress={() => Linking.openURL('http://youtube.com')}>YoutubeURL</Text>
            </View>
        )
    }
}