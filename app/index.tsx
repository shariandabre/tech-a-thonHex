import { StatusBar } from 'expo-status-bar';
import { Image, ImageBackground, KeyboardAvoidingView, Platform, Text, View } from 'react-native';
import {Link, router} from 'expo-router'
import { Button, TextInput } from 'react-native-paper';
import firebase from '~/utils/firebase';
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore"
import { getAuth, } from "firebase/auth";
import addData from '~/utils/firestore/addData';
import { useEffect, useState } from 'react';
import signUp from '~/utils/auth/signup';
import signIn from '~/utils/auth/signin';
import { useAuthentication } from '~/context/AuthContext';
export default function Login() {
  const { user } = useAuthentication();
  const [email, setemail] = useState("");
  const [pass, setPass] = useState("");
  const [login,setlogin]=useState(false)
  const [signup,setSignup]=useState(false)
  const [img,setDisplayimg]=useState('')
  const auth = getAuth(firebase)

  function toggleLogin(){
    setlogin(!login)
  }

  function toggleSignUp(){
    setSignup(!signup)
  }

  async function logup() {
    const result = await signIn(email,pass);
    if(user&&user.uid){
      router.push("/(tabs)")
    }

  }

  async function register() {
    let x = Math.floor(Math.random() * (25-1+1)) + 1;
  setDisplayimg(`https://xsgames.co/randomusers/assets/avatars/pixel/${x}.jpg`)
    const result = await signUp(email,pass);
    if (user&&user.uid) {
      
      await addData("users", user.uid, {
        uid: user.uid,
        dispalyname:user.displayName,
        email:user.email,
        photourl:user.photoURL,
        balance:1000,
        cypto:[],
        stocks:[],
        otc:[],
        fx:[],
        indices:[],
        badges:[{src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjloHklsBF8rK0LhRGS9_oRUnHDDMUFXQUEg&usqp=CAU"},{src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjloHklsBF8rK0LhRGS9_oRUnHDDMUFXQUEg&usqp=CAU"},{src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjloHklsBF8rK0LhRGS9_oRUnHDDMUFXQUEg&usqp=CAU"},{src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjloHklsBF8rK0LhRGS9_oRUnHDDMUFXQUEg&usqp=CAU"},{src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjloHklsBF8rK0LhRGS9_oRUnHDDMUFXQUEg&usqp=CAU"},{src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjloHklsBF8rK0LhRGS9_oRUnHDDMUFXQUEg&usqp=CAU"},{src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjloHklsBF8rK0LhRGS9_oRUnHDDMUFXQUEg&usqp=CAU"},{src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjloHklsBF8rK0LhRGS9_oRUnHDDMUFXQUEg&usqp=CAU"}],
        quiz:[],
        shop:[],
        displayimg:img
      })
      await addData("leaderboard","ZdYIDjCCGW8VKam3lbVY", {})
      router.push("/(tabs)")
    }
  }

  return (
    <View className={styles.container}>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      <View className='flex-1 w-full flex justify-center items-center '>
      <ImageBackground
    source={require('../assets/background_dot.png')}
    resizeMode="repeat"
    style={{
      flex: 1,
      width: '100%',
    }}
  >
    <KeyboardAvoidingView style={{    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',}} behavior="padding">
       <Image source={require('../assets/logo.png')} style={{ width: 128,
       borderRadius:25,
    height: 128,
    marginBottom: 12}} />
  <Text style={{fontSize: 26,
    color: "#600EE6",
    fontWeight: 'bold',
    paddingVertical: 14,}}>Money Smart</Text>

    <Text style={{
      fontSize: 16,
      lineHeight: 26,
      color: "#414757",
      textAlign: 'center',
      marginBottom: 14,
    }}>The only app you need to learn finance</Text>

    {login&&<View className=' w-full flex flex-col gap-4'> 
      <TextInput
      className='w-full'
      label="Email"
      value={email}
      onChangeText={email => setemail(email)}
    />
     <TextInput
     className='w-full'
      label="Password"
      value={pass}
      onChangeText={pass=> setPass(pass)}
    />
    </View>}

    {!signup&&<Button
    className='w-full'
    style={{
       width: '100%',
    marginVertical: 10,
    backgroundColor:"#600EE6",
    }}
    labelStyle={{fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 26,}}
    mode="contained"
    onPress={()=>{!login?toggleLogin():logup()}}
  ><Text>
    Login</Text>
  </Button>}

  {signup&&<View className=' w-full flex flex-col gap-4'> 
      <TextInput
      className='w-full'
      label="Email"
      value={email}
      onChangeText={email => setemail(email)}
    />
     <TextInput
     className='w-full'
      label="Password"
      value={pass}
      onChangeText={pass=> setPass(pass)}
    />
    </View>}

  {!login&&<Button
    className='w-full'
    style={{
       width: '100%',
    marginVertical: 10,
    }}
    labelStyle={{fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 26,}}
    mode="outlined"
    onPress={()=>{!signup?toggleSignUp():register()}}
  >
    <Text>
    SignUp</Text>
  </Button>}

    </KeyboardAvoidingView>
  </ImageBackground>
      </View>

    </View>
  );
}

const styles = {
  container: `items-center flex-1 justify-center`,
  separator: `h-[1px] my-7 w-4/5 bg-gray-200`,
  title: `text-xl font-bold`,
};
