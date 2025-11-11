import { View, Text, TouchableOpacity, StyleSheet, Alert, Pressable } from 'react-native';
import React from 'react';
import Avatar from '../../components/Avatar';
import ScreenWrapper from '../../components/ScreenWrapper';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'expo-router';
import Header from '../../components/Header';
import Icon from '../../assets/icons';
import { theme } from '../../constants/theme';
import { wp, hp } from '../../helpers/common';
import { supabase } from '../../lib/superbase';



const Profile = () => {
  const { user, setAuth } = useAuth();
  const router = useRouter();

  const onLogOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        Alert.alert('Sign out', 'Error signing out!');
        return;
      }

      setAuth(null);
    router.replace('/Welcome');

    } catch (err) {
      console.error('Logout error:', err);
      Alert.alert('Sign out', 'Unexpected error occurred');
    }
  };

  const handleLogOut = async () => {
    Alert.alert('Confirm', 'Are you sure you want to log out?', [
      {
        text: 'Cancel',
        onPress: () => console.log('modal cancelled'),
        style: 'cancel',
      },
      {
        text: 'Logout',
        onPress: () => onLogOut(),
        style: 'destructive',
      },
    ]);
  };

  return (
    <ScreenWrapper bg="white">
      <UserHeader user={user} router={router} handleLogOut={handleLogOut} />
    </ScreenWrapper>
  );
};

const UserHeader = ({ user, router, handleLogOut }) => {
  return (
    <View style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: wp(4) }}>
      <View>
        <Header title="Profile" mb={30}/>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogOut}>
        <Icon name="Logout" color={theme.colors.rose} />
      </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View style={{gap:15}}>
            <View style={styles.avatarContainer}>

            </View>
            <Avatar
            url={user?.image}
            size={hp(12)}
            rounded={theme.radius.xxl*1.4}
            
            
            />
            <Pressable style={styles.editIcon}
            onPress={()=> router.push('editProfile')}>
                <Icon 
                name="edit"
                strokeWidth={2.5}
                size={20}
                />
            </Pressable>

        </View>

        <View style={{alignItems: 'center', gap: 4}}>
            <Text style={styles.userName}>{user && user.name}</Text>
            <Text style={styles.infoText}>{user && user.address}</Text>
          
        </View>


        <View style={{gap:10}}>
            <View style={styles.info}>
                <Icon name='mail' size={20} color={theme.colors.textLight}/>
                <Text styles={styles.infoText}>
                    {user && user.email}
                </Text>

            </View>
            {
                user && user.phoneNumber && (

               
            <View style={styles.info}>
                <Icon name='call' size={20} color={theme.colors.textLight}/>
                <Text styles={styles.infoText}>
                    {user && user.phoneNumber}
                </Text>

            </View>



                )
            }

            {
                user && user.bio && (
                    <Text style={styles.infoText}>{user.bio}</Text>
                )
            }

        </View>

      </View>
    </View>
    
  );
};

export default Profile;














const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer:{
    marginHorizontal:wp(4),
    marginBottom: 20

  },

  headerShape:{
    width: wp(100),
    height:hp(20)
  },
  avatarContainer:{
    height: hp(12),
    width: hp(12),
    alignSelf: 'center'
  },
  editIcon:{
    position: 'absolute',
    bottom: 0,
    right:-12,
    padding:7,
    borderRadius: 50,
    backgroundColor: 'white',
    shadowColor: theme.colors.textLight,
    shadowOffset: {width: 0, height:4},
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 7
  },
  userName:{
    fontSize: hp(3),
    fontWeight: '500',
    color: theme.colors.textDark,
  },
  info:{
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  infoText:{
   fontSize: hp(1.6),
   fontWeight: '500',
   color: theme.colors.textLight
  },
  logoutButton: {
    position: 'absolute',
    right: wp(4),
    top: hp(1),
    padding: 8,
    borderRadius: theme.radius.sm,
    backgroundColor: '#fee2e2',
  },

});
























