/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import firebase from '@react-native-firebase/app';

const credentials = {
    clientId: '1005282678722-84r16j38bqj9466kks0u180bfhl725in.apps.googleusercontent.com',
    appId: 'iman-dinero',
    apiKey: 'AIzaSyDRQb-rY1FWXnWU29Y5IukTK4zMBfVf3e4',
    databaseURL: 'https://iman-dinero.firebaseio.com',
    storageBucket: 'iman-dinero.appspot.com',
    messagingSenderId: '1005282678722',
    projectId: 'iman-dinero',
};
!firebase.apps.length ? firebase.initializeApp(credentials) : firebase.app();
AppRegistry.registerComponent(appName, () => App);