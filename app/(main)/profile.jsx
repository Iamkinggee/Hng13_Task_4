
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Pressable,
} from 'react-native';
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

  const handleLogOut = () => {
    Alert.alert('Confirm', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: onLogOut },
    ]);
  };

  return (
    <ScreenWrapper bg="white">
      <View style={styles.container}>
        <Header title="Profile" />
        
        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogOut}>
          <Icon name="Logout" color={theme.colors.rose} size={24} />
        </TouchableOpacity>

        {/* Main Content */}
        <View style={styles.content}>
          {/* Avatar */}
          <View style={styles.avatarWrapper}>
            <Avatar
              url={user?.image}
              size={hp(16)}
              rounded={theme.radius.xxl * 1.8}
            />
            <Pressable
              style={styles.editIcon}
              onPress={() => router.push('editProfile')}
            >
              <Icon name="edit" size={20} strokeWidth={2.5} color={theme.colors.text} />
            </Pressable>
          </View>

          {/* Name & Address */}
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user?.name || 'User'}</Text>
            <Text style={styles.infoText}>{user?.address || 'No address'}</Text>
          </View>

          {/* Contact Info */}
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Icon name="mail" size={20} color={theme.colors.textLight} />
              <Text style={styles.infoText}>{user?.email || 'No email'}</Text>
            </View>

            {user?.phoneNumber && (
              <View style={styles.infoRow}>
                <Icon name="call" size={20} color={theme.colors.textLight} />
                <Text style={styles.infoText}>{user.phoneNumber}</Text>
              </View>
            )}

            {user?.bio && (
              <Text style={[styles.infoText, styles.bioText]}>{user.bio}</Text>
            )}
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Profile;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: wp(5),
  },
  content: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    paddingTop: hp(10),
  },
  logoutButton: {
    position: 'absolute',
    top: hp(0.5),
    right: wp(5),
    padding: 10,
    borderRadius: theme.radius.lg,
    backgroundColor: '#fee2e6',
    zIndex: 10,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: hp(2),
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: -12,
    padding: 8,
    borderRadius: 50,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: theme.colors.primary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: hp(5),
  },
  userName: {
    fontSize: hp(6.2),
    fontWeight: '600',
    // color: theme.colors.textDark,
    // color: theme.colors.textDark,
    textAlign: 'center',
  },
  infoContainer: {
    width: '100%',
    maxWidth: 380,
    gap: 34,
    paddingHorizontal: wp(2),
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  infoText: {
    fontSize: hp(3),
    color: theme.colors.textLight,
    fontWeight: '50',
    
  },
  bioText: {
    // textAlign: 'center',
    marginTop: hp(1),
    lineHeight: hp(10.4),
  },
});

















