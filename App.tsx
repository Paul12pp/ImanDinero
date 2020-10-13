/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar, TouchableOpacity,
  Image
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import { Icon } from 'react-native-elements'
import NotifServices from './src/services/NotifService';
import admob, { AdEventType, InterstitialAd } from '@react-native-firebase/admob';
import { BannerAd, BannerAdSize } from '@react-native-firebase/admob';

const unitId = 'ca-app-pub-6814305195151125/1343787550';
const unitIdInstertical ='ca-app-pub-6814305195151125/2584571246'

const interstitial = InterstitialAd.createForAdRequest(unitIdInstertical, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});
const App = () => {
  const notif = new NotifServices();
  const [press, setPress] = useState(styles.rounded);
  const [texted, setTexted] = useState(styles.textRound);
  const [isPress, setIsPress] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const onPress = () => {
    console.log('pressed');
    if (!isPress) {
      setPress(styles.roundedP)
      setTexted(styles.textRounded)
      setIsPress(true)
      if(loaded){
        interstitial.show();
      }
    } else {
      setPress(styles.rounded)
      setTexted(styles.textRound)
      setIsPress(false)
    }
  }
  useEffect(() => {
    const eventListener = interstitial.onAdEvent(type => {
      if (type === AdEventType.LOADED) {
        setLoaded(true);
      }
      if (type === AdEventType.CLOSED) {
        setLoaded(false);
       
        //reload ad 
        interstitial.load();
      }
    });

    // Start loading the interstitial straight away
    interstitial.load();
      notif.localSchedule();
      // Unsubscribe from events on unmount
      return () => {
        eventListener();
      };
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="rgb(25, 172, 45)" />
      <SafeAreaView style={styles.container}>
        <View style={styles.logo}>
          <Icon
            type='font-awesome'
            color='rgb(25, 172, 45)'
            name='magnet' />
          <Text style={styles.logoText}>Imán de Dinero</Text>
        </View>
        <View style={styles.body}>
          {isPress &&
            <Image resizeMode='cover' style={{ position: 'absolute', height: 500 }} source={require('./src/assets/img/rain.gif')} />
          }
          <TouchableOpacity style={press} onPress={onPress}>
            <Text style={texted}>{!isPress ? 'Encender Imán' : 'Apagar Imán'}</Text>
          </TouchableOpacity>
        </View>
        <View>
          <BannerAd
            unitId={unitId}
            size={BannerAdSize.SMART_BANNER}
            onAdFailedToLoad={() => console.log('failed')}
            onAdLoaded={() => console.log('loaded')}
            onAdClosed={()=>console.log('closed')}
            onAdOpened={()=>console.log('opened')}
            onAdLeftApplication={()=>console.log('left app')} />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  body: {
    backgroundColor: Colors.white,
    justifyContent: 'center',
    flex: 1
  },
  roundedP: {
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 4,
    padding: 5,
    height: 200,
    width: 200,  //The Width must be the same as the height
    borderRadius: 400, //Then Make the Border Radius twice the size of width or Height   
    borderColor: 'green',
    borderWidth: 1,
    backgroundColor: 'rgb(25, 172, 45)',
    //backgroundColor: '#D3ECD6',
    alignSelf: 'center',
    justifyContent: 'center'
  },
  rounded: {
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 4,
    padding: 5,
    height: 200,
    width: 200,  //The Width must be the same as the height
    borderRadius: 400, //Then Make the Border Radius twice the size of width or Height   
    borderColor: 'green',
    borderWidth: 1,
    backgroundColor: '#D3ECD6',
    alignSelf: 'center',
    justifyContent: 'center'
  },
  textRounded: {
    alignSelf: 'center',
    padding: 5,
    color: 'white',
    fontWeight: 'bold'
  },
  textRound: {
    alignSelf: 'center',
    padding: 5,
    color: 'rgb(25, 172, 45)',
    fontWeight: 'bold'
  },
  logo: {
    margin: 10,
    padding: 10,
    //flexDirection: 'row',
    backgroundColor: '#D3ECD6',
    alignSelf: 'center',
    borderRadius: 25
  },
  logoText: {
    color: 'rgb(25, 172, 45)'
  }
});

export default App;
