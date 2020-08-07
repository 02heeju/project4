import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import FooterButton from './components/FooterButton'

import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth'; //안쓰면 에러남
import Toast from 'react-native-easy-toast';
import firestore from '@react-native-firebase/firestore';


export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            email: '',
            password: '',
            loading: false,
        }
    }
    handleLogin = () => {
        const { email, password } = this.state; //id = this.state.id
        this.setState({loading: true});
        firebase
            .auth()
            .signInWithEmailAndPassword(email.trim(), password)
            .then(() => {
                this.setState({loading: false})
                this.props.navigation.navigate('MusicList')
        })
            .catch(error => {
                this.setState({loading: false})
                this.refs.toast.show('잘못된 로그인 정보입니다. 다시 로그인해 주세요.', 1000);
                console.log(error)
            });
    }

    render() {
        return (
            <View style={styles.container}> 
                <Text style={styles.welcomeText}>Welcome</Text>
                <TextInput
                    style={styles.textInputButton}
                    onChangeText={(email) => this.setState({email})}
                    placeholder='이메일'
                    autoCorrect={false}
                />
                <TextInput
                    style={styles.textInputButton}
                    onChangeText={(password) => this.setState({password})}
                    placeholder='비밀번호'
                    autoCorrect={false}
                    secureTextEntry={true}
                />
                {
                    this.state.loading
                    ? <ActivityIndicator style={styles.loginButton} size="small" />
                    : <FooterButton 
                        buttonText="로그인"
                        style={styles.loginButton}
                        onPress={this.handleLogin}
                        />
                     
                }
                
                <Text style={styles.noAccountText}>계정이 없으신가요?</Text>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('SignUp')}
                >
                    <Text style={styles.makeAccountText}>계정 만들기</Text>
                </TouchableOpacity>
                <Toast ref="toast" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D8D8D8',
    },
    welcomeText: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10,
    },
    textInputButton: {
        width: 288,
        borderColor: 'gray',
        paddingVertical: 10,
        borderWidth: 0.3,
        paddingHorizontal: 5,
        borderRadius: 2,
        backgroundColor: 'white',
        height: 50,
    },
    loginButton: {
        width: 315,
        height: 50,
        marginTop: 20,
    },
    activityIndicator: {
        width: 315,
        height: 50,
        marginTop: 50,
    },
    noAccountText: {
        marginTop: 10,
        fontSize: 12,
        color: '#5B5A5A',
    },
    makeAccountText: {
        fontSize: 12,
        color: '#9013FE',
    },
});