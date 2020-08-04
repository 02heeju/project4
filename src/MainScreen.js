/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {
  Text, 
  TouchableOpacity, 
  View, 
  Alert,
  Image,
  TextInput,
  FlatList,
  Platform
} from 'react-native';
import Sound from 'react-native-sound';
import Slider from '@react-native-community/slider';

// import Item from './component/Item';

class Items extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      arr: this.props.item,
      index: this.props.idx,
      text: ''
    }
  }
  render(){
    this.state.arr.splice(this.state.index, 1, this.state.text.split('\n'));
    console.log('splicing lyrics into two (index):' + this.state.index);

    return (
      <View>
        <TextInput 
          placeholder = 'Type here'
          onChangeText = {(text) => this.setState({text})} 
          multiline={true}/>
          <FlatList
          keyExtractor={item => item.toString()}
          data={this.state.arr}
          renderItem={({item}) => <Text>{item}</Text>}
          />
      </View>
    );
  }
}

//textinput 연습
class Testarray extends React.Component{
  constructor(){
    super();
    this.state = {
      text: '',
      lyricsArr: []
    }
    this.currentIndex = 0;
    this.updateIndex = this.updateIndex.bind(this);
    this.viewabilityConfig = {itemVisiblePercentThreshold: 50};
  }

  updateIndex({viewableItems}){
    this.currentIndex = viewableItems[0].index;
  }

  splitText(){
    // tempArr=[];
    // tempArr = this.state.text.split('\n');
    // this.state.lyricsArr.splice(this.currentIndex, 0, tempArr.slice(1));
    // this.state.lyricsArr[this.currentIndex] = tempArr[0];
    // console.log('current Index: ' + this.currentIndex);
    // console.log('tempArr: ' + tempArr[1]);
    this.state.lyricsArr = this.state.text.split('\n');
  }

  render(){

    const line = this.splitText();

    return( 
      <View style={{alignItems: 'center', backgroundColor:'yellow'}}>
        <TextInput 
          placeholder = 'Type here'
          onChangeText = {(text) => this.setState({text})} 
          multiline={true}/>
        <FlatList
          index={0}
          onViewableItemsChanged={this.updateIndex}
          viewabilityConfig={this.viewabilityConfig}
          keyExtractor={item => item.toString()}
          data={this.state.lyricsArr}
          renderItem={({item}) => <TextInput>{item}</TextInput>}
        />
      </View>
    )
  }
}


//음악재생image 설정
const img_pause = require('./components/ui_pause.png');
const img_play = require('./components/ui_play.png');
const img_playjumpleft = require('./components/ui_playjumpleft.png');
const img_playjumpright = require('./components/ui_playjumpright.png');

//음악재생바
class Musicbar extends React.Component{

  constructor(){
      super();
      this.state = {
          playState:'paused', //playing, paused
          playSeconds:0,
          duration:0,
          timemark: 'default'
      }
      this.sliderEditing = false;
  }

  componentDidMount(){
      this.play();
      
      this.timeout = setInterval(() => {
          if(this.sound && this.sound.isLoaded() && this.state.playState == 'playing' && !this.sliderEditing){
              this.sound.getCurrentTime((seconds, isPlaying) => {
                  this.setState({playSeconds:seconds});
              })
          }
      }, 100);
  }
  componentWillUnmount(){
      if(this.sound){
          this.sound.release();
          this.sound = null;
      }
      if(this.timeout){
          clearInterval(this.timeout);
      }
  }

  onSliderEditStart = () => {
      this.sliderEditing = true;
  }
  onSliderEditEnd = () => {
      this.sliderEditing = false;
  }
  onSliderEditing = value => {
      if(this.sound){
          this.sound.setCurrentTime(value);
          this.setState({playSeconds:value});
      }
  }

  play = async () => {
      if(this.sound){
          this.sound.play(this.playComplete);
          this.setState({playState:'playing'});
      }else{
          //const filepath = this.props.navigation.state.params.filepath;
          //const filepath = 'file:///Phone/sdcard/Music/madclown.mp3';
          const filepath = Sound.MAIN_BUNDLE;
          console.log('[Play]', filepath);
  
          this.sound = new Sound('madclown.mp3',filepath, (error) => {
              if (error) {
                  console.log('failed to load the sound', error);
                  Alert.alert('Notice', 'audio file error. (Error code : 1)');
                  this.setState({playState:'paused'});
              }else{
                  this.setState({playState:'playing', duration:this.sound.getDuration()});
                  this.sound.play(this.playComplete);
              }
          });    
      }
  }
  playComplete = (success) => {
      if(this.sound){
          if (success) {
              console.log('successfully finished playing');
          } else {
              console.log('playback failed due to audio decoding errors');
              Alert.alert('Notice', 'audio file error. (Error code : 2)');
          }
          this.setState({playState:'paused', playSeconds:0});
          this.sound.setCurrentTime(0);
      }
  }

  pause = () => {
      if(this.sound){
          this.sound.pause();
      }

      this.setState({playState:'paused'});
  }

  jumpPrev3Seconds = () => {this.jumpSeconds(-3);}
  jumpNext3Seconds = () => {this.jumpSeconds(3);}
  jumpSeconds = (secsDelta) => {
      if(this.sound){
          this.sound.getCurrentTime((secs, isPlaying) => {
              let nextSecs = secs + secsDelta;
              if(nextSecs < 0) nextSecs = 0;
              else if(nextSecs > this.state.duration) nextSecs = this.state.duration;
              this.sound.setCurrentTime(nextSecs);
              this.setState({playSeconds:nextSecs});
          })
      }
  }

  getAudioTimeString(seconds){
      const h = parseInt(seconds/(60*60));
      const m = parseInt(seconds%(60*60)/60);
      const s = parseInt(seconds%60);

      //return ((h<10?'0'+h:h) + ':' + (m<10?'0'+m:m) + ':' + (s<10?'0'+s:s));
      return ((m<10?'0'+m:m) + ':' + (s<10?'0'+s:s));
  }
  
  showBookMark = () => {
    this.setState({timemark:this.getAudioTimeString(this.state.playSeconds)});
    console.log(this.state.timemark);

  }
  

  render(){

      const currentTimeString = this.getAudioTimeString(this.state.playSeconds);
      const durationString = this.getAudioTimeString(this.state.duration);

      return (
          <View style={{justifyContent:'center', backgroundColor:'black', flexDirection:'row'}}>
              <View style={{marginVertical:15, marginHorizontal:15, flexDirection:'column', backgroundColor:'blue'}}>
                  <Text style={{color:'white', marginLeft:-5}}>{currentTimeString}</Text>
                  <Slider
                      style={{marginVertical:80, width: 170, height: 20, transform: [{rotate: '90deg'}], marginLeft:-75}}
                      onTouchStart={this.onSliderEditStart}
                      onTouchEnd={this.onSliderEditEnd}
                      onValueChange={this.onSliderEditing}
                      value={this.state.playSeconds} 
                      maximumValue={this.state.duration} 
                      maximumTrackTintColor='gray' 
                      minimumTrackTintColor='white' 
                      thumbTintColor='white'
                      />
                  <Text style={{color:'white', marginLeft:-5}}>{durationString}</Text>
                  {this.state.playState == 'playing' && 
                  <TouchableOpacity onPress={this.pause} style={{marginVertical:10, marginVertical:10}}>
                      <Image source={img_pause} style={{width:20, height:20}}/>
                  </TouchableOpacity>}
                  {this.state.playState == 'paused' && 
                  <TouchableOpacity onPress={this.play} style={{marginVertical:10, marginVertical:10}}>
                      <Image source={img_play} style={{width:20, height:20}}/>
                  </TouchableOpacity>}
                  <TouchableOpacity onPress={this.jumpPrev3Seconds} style={{justifyContent:'center'}}>
                      <Image source={img_playjumpleft} style={{width:20, height:20}}/>
                      <Text style={{position:'absolute', marginTop:1, color:'white', fontSize:12, marginHorizontal:7}}>3</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.jumpNext3Seconds} style={{justifyContent:'center'}}>
                      <Image source={img_playjumpright} style={{width:20, height:20, marginVertical:7}}/>
                      <Text style={{position:'absolute', marginTop:1, color:'white', fontSize:12, marginHorizontal:7}}>3</Text>
                  </TouchableOpacity>
              </View>
              <View style={{marginVertical:15, marginHorizontal:15, flexDirection:'row', backgroundColor:'red'}}>
                  <TouchableOpacity onPress={this.showBookMark}>
                      <Text>move1</Text>
                  </TouchableOpacity>
                  <Text>{this.state.timemark}</Text>
              </View>
          </View>
      )
  }
}

//main structure
export default class MainScreen extends React.Component{
  render(){
    return(
      <View style={{flex:1, justifyContent:'center', backgroundColor:'black', flexDirection:'row'}}>
        <Musicbar></Musicbar>
        <Testarray></Testarray>
      </View>
    )
  }
}
