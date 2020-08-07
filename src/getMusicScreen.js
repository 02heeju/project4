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
import DocumentPicker from 'react-native-document-picker';
import SoundPlayer from 'react-native-sound-player';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import Video from 'react-native-video';
import TrackPlayer from 'react-native-track-player';


//음악재생image 설정
const img_pause = require('./components/ui_pause.png');
const img_play = require('./components/ui_play.png');
const img_playjumpleft = require('./components/ui_playjumpleft.png');
const img_playjumpright = require('./components/ui_playjumpright.png');

//음악재생바
export default class getMusicScreen extends React.Component{

    constructor(props){
      super(props);
      this.state = {
        playState: 'paused', //playing, paused
        playSeconds: 0,
        duration: 0,
        timemark: 'default'
      }
      this.title = this.props.route.params.title;
      this.sliderEditing = false;
      this.musicUri = '';
      this.TAG = 'Musicbar/';
    }

    componentDidMount(){
        firebase.firestore().collection('performance').doc(this.title).get().then( function(doc) {
            // console.log(doc);
            this.musicUri = doc.data().musicUri;
            console.log('hhh: ', this.musicUri);
        });
          
    }
    play = () => {
        try {
            MyPlayer = SoundPlayer.playUrl(this.musicUri);
        } catch (e) {
            console.log(`cannot play the sound file`, e)
        }
    }
    // load = () => {
    //     try {
    //     // or play from url
    //     SoundPlayer.playUrl(this.musicUri);
    //     } catch (e) {
    //     console.log(`cannot play the sound file`, e)
    //     }
    // }

    render(){ 
        return(
            <View>
                <TouchableOpacity onPress = {this.play}>
                <Text>음악아 나와라라ㅏ라라</Text>
                </TouchableOpacity>
            </View>
        )
    }
}


//   onSliderEditStart = () => {
//     this.sliderEditing = true;
//   }
//   onSliderEditEnd = () => {
//     this.sliderEditing = false;
//   }
//   onSliderEditing = value => {
//     if(this.sound){
//         this.sound.seek(value);
//         this.setState({playSeconds:value});
//     }
//   }

//   componentDidMount(){
//       firebase.firestore().collection('performance').doc(this.title).get().then( function(doc) {
//         // console.log(doc);
//         this.musicUri = doc.data().musicUri;
//         console.log('hhh: ', this.musicUri);
//       });

    //   this.load();
      
    //   this.timeout = setInterval(() => {
    //       if(this.sound && this.sound.isLoaded() && this.state.playState == 'playing' && !this.sliderEditing){
    //           var seconds = this.sound.getInfo().currentTime;
    //           this.setState({playSeconds:seconds});
    //       }
    //   }, 100);
//   }
//   componentWillUnmount(){
//       if(this.sound){
//           this.sound.release();
//           this.sound = null;
//       }
//       if(this.timeout){
//           clearInterval(this.timeout);
//       }
//   }
//   load = () => {
//     try {
//         // or play from url
//         SoundPlayer.playUrl(this.musicUri);
//     } catch (e) {
//         console.log(`cannot play the sound file`, e)
//     }
      
    // SoundPlayer.playUrl(this.musicUri);
    //     ,(error) => {
    //     if (error) {
    //         console.log('failed to load the sound', error);
    //         Alert.alert('Notice', 'audio file error. (Error code : 1)');
    //         this.setState({playState:'paused'});
    //     }else{
    //         this.setState({playState:'playing', duration: SoundPlayer.getInfo().duration});
    //         this.sound.play(this.playComplete);
    //     }
    // });
//   }

//   play = async () => {
//     if(this.sound){
//         this.sound.play(this.playComplete);
//         this.setState({playState:'playing'});
//     }
//   }

//   playComplete = (success) => {
//       if(this.sound){
//           if (success) {
//               console.log('successfully finished playing');
//           } else {
//               console.log('playback failed due to audio decoding errors');
//               Alert.alert('Notice', 'audio file error. (Error code : 2)');
//           }
//           this.setState({playState:'paused', playSeconds:0});
//           this.sound.getInfo().currentTime = 0;
//       }
//   }

//   pause = () => {
//       if(this.sound){
//           this.sound.pause();
//       }
//       this.setState({playState:'paused'});
//   }

//   jumpPrev3Seconds = () => {this.jumpSeconds(-3);}
//   jumpNext3Seconds = () => {this.jumpSeconds(3);}
//   jumpSeconds = (secsDelta) => {
//       if(this.sound){
//         secs = this.sound.getInfo().currentTime;
          
//         let nextSecs = secs + secsDelta;
//         if(nextSecs < 0) nextSecs = 0;
//         else if(nextSecs > this.state.duration) nextSecs = this.state.duration;
//         this.sound.getInfo().currentTime = nextSecs;
//         this.setState({playSeconds:nextSecs});
          
//       }
//   }

//   getAudioTimeString(seconds){
//       const h = parseInt(seconds/(60*60));
//       const m = parseInt(seconds%(60*60)/60);
//       const s = parseInt(seconds%60);

//       //return ((h<10?'0'+h:h) + ':' + (m<10?'0'+m:m) + ':' + (s<10?'0'+s:s));
//       return ((m<10?'0'+m:m) + ':' + (s<10?'0'+s:s));
//   }
  
//   showBookMark = () => {
//     this.setState({timemark:this.getAudioTimeString(this.state.playSeconds)});
//     console.log(this.state.timemark);

//   }

//   render(){
//     try {
//         // or play from url
//         SoundPlayer.playUrl('content://com.android.providers.media.documents/document/audio%3A100');
//     } catch (e) {
//         console.log(`cannot play the sound file`, e)
//     }

//     return(
//         <View>
//             <Text>음악아 나와라라ㅏ라라</Text>
//         </View>
//     )
    
    //   const currentTimeString = this.getAudioTimeString(this.state.playSeconds);
    //   const durationString = this.getAudioTimeString(this.state.duration);

    //   return (
    //       <View style={{justifyContent:'center', backgroundColor:'black', flexDirection:'row'}}>
    //           <View style={{marginVertical:15, marginHorizontal:15, flexDirection:'column', backgroundColor:'blue'}}>
    //               <Text style={{color:'white', marginLeft:-5}}>{currentTimeString}</Text>
    //               <Slider
    //                   style={{marginVertical:80, width: 170, height: 20, transform: [{rotate: '90deg'}], marginLeft:-75}}
    //                   onTouchStart={this.onSliderEditStart}
    //                   onTouchEnd={this.onSliderEditEnd}
    //                   onValueChange={this.onSliderEditing}
    //                   value={this.state.playSeconds} 
    //                   maximumValue={this.state.duration} 
    //                   maximumTrackTintColor='gray' 
    //                   minimumTrackTintColor='white' 
    //                   thumbTintColor='white'
    //                   />
    //               <Text style={{color:'white', marginLeft:-5}}>{durationString}</Text>
    //               {this.state.playState == 'playing' && 
    //               <TouchableOpacity onPress={this.pause} style={{marginVertical:10, marginVertical:10}}>
    //                   <Image source={img_pause} style={{width:20, height:20}}/>
    //               </TouchableOpacity>}
    //               {this.state.playState == 'paused' && 
    //               <TouchableOpacity onPress={this.play} style={{marginVertical:10, marginVertical:10}}>
    //                   <Image source={img_play} style={{width:20, height:20}}/>
    //               </TouchableOpacity>}
    //               <TouchableOpacity onPress={this.jumpPrev3Seconds} style={{justifyContent:'center'}}>
    //                   <Image source={img_playjumpleft} style={{width:20, height:20}}/>
    //                   <Text style={{position:'absolute', marginTop:1, color:'white', fontSize:12, marginHorizontal:7}}>3</Text>
    //               </TouchableOpacity>
    //               <TouchableOpacity onPress={this.jumpNext3Seconds} style={{justifyContent:'center'}}>
    //                   <Image source={img_playjumpright} style={{width:20, height:20, marginVertical:7}}/>
    //                   <Text style={{position:'absolute', marginTop:1, color:'white', fontSize:12, marginHorizontal:7}}>3</Text>
    //               </TouchableOpacity>
    //           </View>
    //           <View style={{marginVertical:15, marginHorizontal:15, flexDirection:'column', backgroundColor:'red'}}>
    //               <TouchableOpacity onPress={this.showBookMark}>
    //                   <Text>move1</Text>
    //               </TouchableOpacity>
    //               <Text>{this.state.timemark}</Text>
    //           </View>
    //       </View>
    //   )
//   }
// }