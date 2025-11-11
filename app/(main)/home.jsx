// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import ScreenWrapper from '../../components/ScreenWrapper'
// import { Button } from '@react-navigation/elements'
// import { useAuth } from '../../contexts/AuthContext'
// // import {supabase}  from '../lib/superbase';
// import {supabase}  from '../../constants/index';

// export default function Home() {
//   const {user, setAuth} = useAuth();

//   console.log('user: ', user)

//   const onLogout = async()=>{

//     ///////
//     setAuth(null);

//     //////
//     const{error} = await supabase.auth.signOut();
//       if(error){
//         Alert.alert('sign out', "Error signing out!")
//       }
//   }


//   return (
//     <ScreenWrapper>
//       <Text>Hommeeee</Text>
//       <Button title='logout' onPress={onLogout}/>
//     </ScreenWrapper>
//   )
// }

// const styles = StyleSheet.create({})


















import { StyleSheet, Text, View, Alert, Pressable } from 'react-native';
import React from 'react';
import ScreenWrapper from '../../components/ScreenWrapper';
import { Button } from '@react-navigation/elements';
import { useAuth } from '../../contexts/AuthContext';
// import { supabase } from '../../constants/index';
import { supabase } from '../../lib/superbase';

import { useRouter } from 'expo-router';
import { theme } from '../../constants/theme';
import Icon from '../../assets/icons'
import {wp, hp} from '../../helpers/common'
import Avatar from '../../components/Avatar';

export default function Home() {
  const { user, setAuth } = useAuth();
  const router = useRouter();

  console.log('user: ', user);

  const onLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        Alert.alert('Sign out', 'Error signing out!');
        return;
      }

      // Clear auth state in context
      setAuth(null);

      // Redirect to welcome page
      router.replace('/Welcome');
    } catch (err) {
      console.error('Logout error:', err);
      Alert.alert('Sign out', 'Unexpected error occurred');
    }
  };

  return (
    <ScreenWrapper bg="white">
      <View style={styles.container}>
       {/*header  */}
       <View style={styles.header}>
        <Text style={styles.title}>Framez</Text>
        <View style={styles.icons}>
          <Pressable onPress={()=> router.push('notifications')}>
              <Icon name="heart" size={hp(3.2)} strokeWidth={2} color={theme.colors.text}/>
          </Pressable>
          <Pressable onPress={()=> router.push('newPost')}>
              <Icon name="plus" size={hp(3.2)} strokeWidth={2} color={theme.colors.text}/>
          </Pressable>
          <Pressable onPress={()=> router.push('profile')}>
              {/* <Icon name="user" size={hp(3.2)} strokeWidth={2} color={theme.colors.text}/> */}

              <Avatar
              url={user?.image}
              size={hp(4.3)}
              rounded={theme.radius.sm}
              style={{borderWidth: 2}}
              
              />
          </Pressable>
        

        </View>



       </View>




  
      </View>
            {/* <Button title="Logout" onPress={onLogout} /> */}
    </ScreenWrapper>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  text: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
  },
  header:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '10',
    marginHorizontal: wp(4)
  },
  title:{
    color: theme.colors.text,
    fontSize: hp(3.2),
    fontWeight: theme.fonts.bold
  },
  avatarImage: {
    height: hp(4.3),
    width: hp(4.3),
    borderRadius: theme.radius.sm,
    borderCurve: 'continuous',
    borderColor: theme.colors.gray,
    borderWidth: 3
  },
  icons:{
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 18,
  },
  listStyle: {
    paddingTop: 20,
    paddingHorizontal: wp(4),
  },
  noPosts:{
    fontSize: hp(2),
    textAlign: 'center',
    color: theme.colors.text
  },
  pill: {
    position: 'absolute',
    right: -10,
    top:-4
  }
});
