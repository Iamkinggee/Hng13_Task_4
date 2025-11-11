import { View, Text, StatusBar , StyleSheet, Pressable, Alert} from 'react-native'
import React,{useRef, useState} from 'react'
import Icon from '../assets/icons'
import ScreenWrapper from '../components/ScreenWrapper'
import BackButton from '../components/BackButton'
import { useRouter } from 'expo-router'
import {theme} from '../constants/theme'
import { wp, hp} from '../helpers/common'
import Input from '../components/input'
import  Button  from '../components/Button'
import { supabase } from '../lib/superbase';




const SignUp = () => {
  const router = useRouter();
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const nameRef = useRef("");
  const [loading, setLoading] = useState(false)

  const onSubmit= async()=>{
    if(!emailRef.current || !passwordRef.current){
      Alert.alert('Sign Up', 'Please fill all the fields');
      return;
    }


    let name = nameRef.current.trim();
    let email = emailRef.current.trim();
    let password = passwordRef.current.trim();

    setLoading(true);


// wo

    const { data, error } = await supabase.auth.signUp({
  email,
  password,
  options: {
    data: {
      name: nameRef.current.trim(),
    },
  },
});


console.log('data:', data);
console.log('error:', error);

if (error) {
  Alert.alert('Sign Up Error', error.message);
} else {
  Alert.alert(
    'Sign Up Successful',
    'Please check your email to verify your account before logging in.'
  );
}






//   const { data, error } = await supabase.auth.signUp({
//   email,
//   password,
//   options: {
//     data: {
//       name: nameRef.current.trim(),
//     },
//   },

  
// });










    // const {data: {session},error} =  await supabase.auth.signUp({
    //   email,
    //   password,
    //   // options:{
    //   //   data:{
    //   //     name
    //   //   }
    //   // }
    // });
    
    setLoading(false);

    console.log('session: ', session);
    console.log('error: ', error);
    if(error){
      Alert.alert('Sign up', error.message);
    }




  }




















  
  return (
       <ScreenWrapper bg="white">
      <StatusBar styles="dark"/>
      <View style={styles.container}>
        <BackButton router={router} />
   
      
      {/* welcome */}
      <View>
        <Text style={styles.welcomeText}>Let's </Text>
        <Text style={styles.welcomeText}>Get Started</Text>
      </View>

      <View style={styles.form}>
        <Text style={{fontSize: hp(1.5), color: theme.colors.text}}>
          Fill the field to Create a new Account
        </Text>


         <Input 
        icon={<Icon name='user' size={26} strokeWidth={1.6}/>}
        placeholder="Enter your username"
        onChangeText={value=>nameRef.current = value} 
        />

        <Input 
        icon={<Icon name='mail' size={26} strokeWidth={1.6}/>}
        placeholder="Enter your email"
        onChangeText={value=>emailRef.current = value} 
        />
     
        <Input 
        icon={<Icon name='lock' size={26} strokeWidth={1.6}/>}
        placeholder="Enter your password"
        secureTextEntry 
        onChangeText={value=>passwordRef.current = value} 
        />

      

        <Button title={'Sign Up'} loading={loading} onPress={onSubmit}/>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Already have an account? 

        </Text>
        <Pressable onPress={()=>router.push('login')}>
          <Text style={[styles.footerText, {color: theme.colors.primaryDark, fontWeight: theme.fonts.semibold}]}>
            Sign In
          </Text>
        </Pressable>
      </View>







      </View>
    </ScreenWrapper>
    
  )
}

export default SignUp


const styles = StyleSheet.create({
  container:{
    flex: 1,
    gap:45,
    paddingHorizontal: wp(5),
  },
  welcomeText:{
    fontSize: hp(5),
    fontWeight: theme.fonts.bold,
    color: theme.colors.text
  },
  form:{
    gap:25,
  },
  forgotPassword:{
    textAlign:"right",
    fontWeight: theme.fonts.semibold,
    color: theme.colors.text

  },
  footer:{
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  }, 
  footerText:"center",
  color: theme.colors.text,
  fontSize:hp(1.6)
})


