import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    FlatList,
} from 'react-native';
import FooterButton from './components/FooterButton'

import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth'; //안쓰면 에러남
import Toast from 'react-native-easy-toast';
import firestore from '@react-native-firebase/firestore';

export default class MusicListScreen extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            MusicArr: [],
            user: null
        }
        this.ref = firebase.firestore().collection('user');
    }

    componentDidMount(){
        const user = firebase.auth().currentUser;
        if (user){
          this.setState({user: user._user.email});
          console.log('user email: ', this.state.user);
        }else{
          console.log('no user');
        }
        this.state.MusicArr = this.ref.doc(this.state.user).collection('music_info').get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
            });
        });
      }

    render(){
        this.state.MusicArr = ['default'];

        return( 
            <View style={styles.container}>
                    <FlatList
                    style={{backgroundColor: 'yellow'}}
                    keyExtractor={item => item.toString()}
                    data={this.state.MusicArr}
                    renderItem={({item}) => 
                        <TouchableOpacity onPress = {() => this.props.navigation.navigate('Main')}>
                            <Text>{item}</Text>
                        </TouchableOpacity>
                    }
                    />
            </View>
        )
      }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D8D8D8',
    },
});