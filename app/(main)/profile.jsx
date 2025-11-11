import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
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

      // Clear auth state in context
      setAuth(null);

      // Redirect to welcome page
    //   router.replace('/Welcome');
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
      <Header title="Profile" showBackButton={true} />
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogOut}>
        <Icon name="Logout" color={theme.colors.rose} />
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
























