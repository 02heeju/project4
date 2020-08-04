import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    TextInput,
    ActivityIndicator,
} from 'react-native';

import FooterButton from './components/FooterButton';
import firebase from '@react-native-firebase/app';


export default class SignupScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
    }

    handleSignUp = () => {
        const { email, password } = this.state;
        firebase.auth()
        .createUserWithEmailAndPassword(email.trim(), password)
        .then(() => this.props.navigation.navigate('Main'))
        .catch(error => console.log(error));
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.swicthText}>계정 만들기</Text>
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
                <Text style={styles.descriptionText}>회원가입 시 이용약관에 동의한 것으로 간주합니다.</Text> 
                {
                    this.state.loading
                    ? <ActivityIndicator size="small" style={styles.signupButton} />
                    : <FooterButton
                        style={styles.signupButton}
                        buttonText="회원가입"
                        onPress={this.handleSignUp}
                        />
                }
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
    swicthText: {
        fontSize: 16,
        color: '#5B5A5A',
        marginTop: 5,
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
    descriptionText: {
        marginTop: 20,
        fontSize: 12,
        color: '#5B5A5A',
        fontWeight: '200',
    },
    signupButton: {
        marginTop: 10,
    }
});