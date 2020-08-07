import React from 'react';
import {
  StyleSheet, View, FlatList, Text, TouchableOpacity, TextInput,
} from 'react-native';
// import {COLORS} from '../values/Colors';
// import {FONTS} from '../values/Fonts';
// firebase
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import DocumentPicker from 'react-native-document-picker';


export default class PerformList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            newTitle: '',
            newMusic: '',
            currentDate: '',
            noteList: [
            {
                title: "...",
                music: "...",
                date: "...",
                musicUri: "...",
            }
            ]
        }
        this.newMusicUri = '';
        this.TAG = 'PerformList/';
        this.getNotes();
    }

    componentDidMount() {
        //현재시간 받기
        var that = this;
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year

        //글자수 맞춰주기
        if (date < 10){ date = '0' + date;}
        if (month < 10){month = '0' + month;}

        that.setState({
            //Setting the value of the date time
            currentDate:
            year +'.' + month + '.' + date,
        });
    }

    //데이타베이스 전체의 정보 받아오기
    getNotes() {
        console.log(this.TAG + "getNotes");
        const firebaseRef = firestore().collection('performance');
        firebaseRef.get().then((doc) => {

            var _noteList = [];
            doc.forEach((queryDocumentSnapshot) => {
                const _title = queryDocumentSnapshot.id;
                const _music = queryDocumentSnapshot.data().music;
                const _date = queryDocumentSnapshot.data().date;
                const _musicUri = queryDocumentSnapshot.data().musicUri;
                _noteList.push({title: _title, music: _music, date: _date, musicUri: _musicUri});
            });
            //   console.log('???: ', _noteList);
            this.setState({noteList: _noteList});
        })
    }

    chooseMusic = async () => {
        // Pick a single file
        try {
            const res = await DocumentPicker.pick({type: [DocumentPicker.types.audio],});
            this.newMusicUri = res.uri;
        }catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker, exit any dialogs or menus and move on
            } else {
                throw err;
            }
        }
    }

  //새로운 퍼포먼스 만들기 (아직 데이터베이스 연동 전)
  addNew = () => {
    var tempList = this.state.noteList;
    tempList.push({title: this.state.newTitle, music: this.state.newMusic, date: this.state.currentDate, musicUri: this.newMusicUri});
    this.setState({noteList: tempList});
  }

  //다음 페이지로 넘어가면서 데이터베이스에 수정된 정보 올리기
  moveToMyScreen = (item) => {
    console.log('I will move to My page');
    firebase.firestore().collection('performance').doc(item.title).set({
        music: item.music,
        date: item.date,
        musicUri: item.musicUri,
    })
    
    this.props.navigation.navigate('My', {title: item.title});
  }


  render() {
    return (

        <View style={styles.container}>
            <FlatList
            data={this.state.noteList}
            renderItem={({item}) => {
            return (
                <TouchableOpacity onPress={() => this.moveToMyScreen(item)}>
                    <View style={styles.rowContainer}>
                        <Text numberOfLines={1} style={styles.title}>{item.title}</Text>
                        <View style={styles.columnContainer}>
                            <Text numberOfLines={1} style={styles.music}>{item.music}</Text>
                            <Text numberOfLines={1} style={styles.date}>{item.date}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )
            }}
            keyExtractor={(index) => index.toString()}/>
            <View style = {{flexDirection:'row', backgroundColor: 'white', justifyContent: 'space-between'}}>
                <TextInput 
                    placeholder = 'Type title here'
                    onChangeText = {(newTitle) => this.setState({newTitle})}></TextInput>
                <TextInput
                    placeholder = 'Type music here'
                    onChangeText = {(newMusic) => this.setState({newMusic})}></TextInput>
                <TouchableOpacity style = {{backgroundColor: 'black'}} onPress={this.chooseMusic}>
                    <Text style={{ color:'white', fontSize:40, elevation:30, backgroundColor:'blue', alignSelf:'flex-end'}}>♫</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {{backgroundColor: 'black'}} onPress={this.addNew}>
                    <Text style={{ color:'black', fontSize:40, elevation:20, backgroundColor:'yellow', alignSelf:'flex-end'}}> + </Text>
                </TouchableOpacity>
            </View>

      </View>
    );
  }
};
const styles = StyleSheet.create({
  container: {
    height: '100%', 
    width: '100%',
    flex: 1,
    backgroundColor: 'gray',
  },
  rowContainer: {
    flexDirection:'row',
    flex: 1,
    justifyContent: 'space-between',
    marginLeft: 15,
    marginRight: 15,
    padding: 9,
    borderBottomWidth: 0.8,
    borderBottomColor: 'gray',
  },
  columnContainer: {
    flexDirection:'column',
    alignItems: 'flex-end',
  },
  title: {
    color: 'white', 
    fontSize:18,
    flex: 1,
    // fontFamily: FONTS.binggrae2_bold,
  },
  music: {
    color: 'red', 
    fontSize:12,
    width: 250,
    paddingLeft: 10,
    textAlign: 'right',
    // fontFamily: FONTS.binggrae2,
  },
  date: {
    color: 'white', 
    fontSize:12,
    paddingLeft: 10,
    // fontFamily: FONTS.binggrae2,
  }
});