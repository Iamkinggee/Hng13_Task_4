// import { View, Text, ScrollView, StyleSheet, Pressable, Alert } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import ScreenWrapper from '../../components/ScreenWrapper'
// import Avatar from '../../components/Avatar'
// import { Image } from 'expo-image'
// import { theme } from '../../constants/theme'
// import { wp, hp } from '../../helpers/common'
// import Header from '../../components/Header'
// import  Button  from '../../components/Button'
// import { useAuth } from '../../contexts/AuthContext';
// import { getUserImageSrc } from '../../services/imageService';
// import Icon from '../../assets/icons'
// import Input from '../../components/input';
// import { useRouter } from 'expo-router'
// import  * as imagePicker from 'expo-image-picker '

// // import { updateUser } from '../../services/userService'

// const EditProfile = () => {
//     const {user: currentUser, setUserData} = useAuth();
//     const [loading, setLoading] = useState(false);
//     const router = useRouter ();

//     const [user, setUser] = useState({
//         name: '',
//         phoneNumber: '',
//         image: null,
//         bio: '',
//         addresss: ''
//     });

//     useEffect(()=>{
//         if(currentUser){
//             setUser({
//                 name:currentUser.name || '',
//                 phoneNumber: currentUser.phoneNumber || '',
//                 image: currentUser.image || null,
//                 address: currentUser.address || '',
//                 bio: currentUser.bio || '',
//             });
//         }
//     }, [currentUser]);

//     //  const onPickImage = async ()=>{

//     //  }


//     const onsubmit = async ()=>{
//         let userData = { ...user};
//         let{ name, phoneNumber, address, image, bio} = userData;
//         if(!name || !phoneNumber || !address || !bio){
//             Alert.alert('Profile', "Please Fill all the fields");
//             return;
//         }
//         setLoading(true);

//         const res = await updateUser(currentUser?.id, userData);
//         setLoading(false);
      
//         if(res.success){
//             setUserData({...currentUser, ...userData});
//             router.back();
//         }
//     }







// // const onsubmit = async () => {
// //   let userData = { ...user };
// //   const { name, phoneNumber, address, image, bio } = userData;








//   if (!name || !phoneNumber || !address || !bio) {
//     Alert.alert('Profile', "Please fill all the fields");
//     return;
//   }

//   if (!currentUser?.id) {
//     Alert.alert("Error", "User ID not found. Please log in again.");
//     return;
//   }

//   setLoading(true);
//   const res = await updateUser(currentUser.id, userData);
//   setLoading(false);

//   if (res.success) {
//     setUserData({ ...currentUser, ...userData });
//     router.back();
//   } else {
//     Alert.alert("Error", res.msg);
//   }
// };

























//     let imageSource = getUserImageSrc(user.image)
//   return (
//     <ScreenWrapper bg="white">
//         <View style={styles.container}>
//             <ScrollView style={{flex:1}}>
//                 <Header title="Edit Profile"/>



//                 {/* form */}
//                 <View style={styles.form}> 
//                     {/* <View style={styles.AvatarContainer}>
//                         <Image source={imageSource} style={styles.avatar}/>
//                         <Pressable style={styles.cameraIcon} onPress={onPickImage}>
//                             <Icon name="camera" size={20} strokeWidth={2.5}/> 
//                         </Pressable>
//                     </View> */}

//                     <Text style={{fontSize: hp(1.5), color: theme.colors.text}}>
//                         Please Fill your profile Details
//                     </Text>

//                     <Input
//                     icon={<Icon name="user"/>}
//                     placeholder='Enter your Name'
//                     value={user.name}
//                     onChangeText={value =>setUser({...user, name: value})}              
//                     />
//                     <Input
//                     icon={<Icon name="call"/>}
//                     placeholder='Enter your phone Number'
//                     value={user.phoneNumber}
//                     onChangeText={value =>setUser({...user, phoneNumber: value})}              
//                     />
//                     <Input
//                     icon={<Icon name="location"/>}
//                     placeholder='Enter your Address'
//                     value={user.address}
//                     onChangeText={value =>setUser({...user, address: value})}              
//                     />
//                     <Input
             
//                     placeholder='Enter your Bio'
//                     value={user.bio}
//                     multiline={true}
//                     containerStyle={styles.bio}
//                     onChangeText={value =>setUser({...user, bio: value})}              
//                     />

//                     <Button title="Update" loading={loading} onPress={onsubmit}/>
//                 </View>
//             </ScrollView>
//         </View>
//     </ScreenWrapper>
//   )
// }

// export default EditProfile



// const styles = StyleSheet.create({
//     container:{
//         flex: 1,
//         paddingHorizontal: wp(4)
//     },
//     AvatarContainer:{
//         height: hp(14),
//         width: hp(14),
//         alignSelf: 'center'
//     },
//     avatar:{
//         width: '100%',
//         height: '100%',
//         borderRadius: theme.radius.xxl*1.8,
//         borderCurve: 'continuous',
//         borderWidth: 1,
//         borderColor: theme.colors.darkLight
//     },
//     cameraIcon:{
//         position: 'absolute',
//         bottom: 0,
//         right: -10,
//         padding: 8,
//         borderRadius: 50,
//         backgroundColor: 'white',
//         shadowColor: theme.colors.textLight,
//         shadowOffset: {width: 0, height: 4},
//         shadowOpacity: 0.4,
//         shadowRadius: 5,
//         elevation:7

// },
// form:{
//     gap: 18,
//     marginTop: 20
// },
// input:{
//     flexDirection: 'row',
//     borderWidth: 0.4
// },
// bio:{
//     flexDirection: 'row',
//     height: hp(15),
//     alignItems: 'flex-start',
//     paddingVertical: 15,
// }
// })








































import { View, Text, ScrollView, StyleSheet, Pressable, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import ScreenWrapper from '../../components/ScreenWrapper';
import { Image } from 'expo-image';
import { theme } from '../../constants/theme';
import { wp, hp } from '../../helpers/common';
import Header from '../../components/Header';
import Button from '../../components/Button';
import { useAuth } from '../../contexts/AuthContext';
import { getUserImageSrc, uploadFile } from '../../services/imageService';
import Icon from '../../assets/icons';
import Input from '../../components/input';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { updateUser } from '../../services/userService'; // <-- Make sure this exists

const EditProfile = () => {
  const { user: currentUser, setUserData } = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [user, setUser] = useState({
    name: '',
    phoneNumber: '',
    image: null,
    bio: '',
    address: '',
  });

  useEffect(() => {
    if (currentUser) {
      setUser({
        name: currentUser.name || '',
        phoneNumber: currentUser.phoneNumber || '',
        image: currentUser.image || null,
        address: currentUser.address || '',
        bio: currentUser.bio || '',
      });
    }
  }, [currentUser]);

  // Image Picker Function
  const onPickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Please allow access to your photo library.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setUser({ ...user, image: result.assets[0] });
    }
  };

  // Submit Handler
  const onSubmit = async () => {
    const { name, phoneNumber, address, bio, image } = user;

    if (!name || !phoneNumber || !address || !bio || !image) {
      Alert.alert('Profile', 'Please fill all the fields');
      return;
    }

    if (!currentUser?.id) {
      Alert.alert('Error', 'User ID not found. Please log in again.');
      return;
    }

    setLoading(true);

    if(typeof image == 'object'){
        let imageRes = await uploadFile('profiles', image?.uri, true);
        if(imageRes.success) userData.image = imageRes.data;
        else userData.image = null;
    }




    try {
      const res = await updateUser(currentUser.id, user);
      if (res.success) {
        setUserData({ ...currentUser, ...user });
        router.back();
      } else {
        Alert.alert('Error', res.msg || 'Failed to update profile');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const imageSource = user.image ? { uri: user.image } : getUserImageSrc(currentUser?.image);
  // const imageSource = user.image && typeof user.image == 'object'? user.image.uri : getUserImageSrc(user.image);
  return (
    <ScreenWrapper bg="white">
      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }}>
          <Header title="Edit Profile" />

          {/* Avatar */}
          <View style={styles.AvatarContainer}>
            <Image source={imageSource} style={styles.avatar} />
            <Pressable style={styles.cameraIcon} onPress={onPickImage}>
              <Icon name="camera" size={20} strokeWidth={2.5} color={theme.colors.text} />
            </Pressable>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <Text style={{ fontSize: hp(1.5), color: theme.colors.text }}>
              Please fill your profile details
            </Text>

            <Input
              icon={<Icon name="user" />}
              placeholder="Enter your Name"
              value={user.name}
              onChangeText={(value) => setUser({ ...user, name: value })}
            />
            <Input
              icon={<Icon name="call" />}
              placeholder="Enter your Phone Number"
              value={user.phoneNumber}
              onChangeText={(value) => setUser({ ...user, phoneNumber: value })}
              keyboardType="phone-pad"
            />
            <Input
              icon={<Icon name="location" />}
              placeholder="Enter your Address"
              value={user.address}
              onChangeText={(value) => setUser({ ...user, address: value })}
            />
            <Input
              placeholder="Enter your Bio"
              value={user.bio}
              multiline={true}
              containerStyle={styles.bio}
              onChangeText={(value) => setUser({ ...user, bio: value })}
            />

            <Button title="Update" loading={loading} onPress={onSubmit} />
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(4),
  },
  AvatarContainer: {
    height: hp(14),
    width: hp(14),
    alignSelf: 'center',
    marginTop: hp(2),
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: theme.radius.xxl * 1.8,
    borderCurve: 'continuous',
    borderWidth: 1,
    marginTop: 15,
    
    borderColor: theme.colors.darkLight,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: -10,
    padding: 8,
    borderRadius: 50,
    backgroundColor: 'white',
    shadowColor: theme.colors.textLight,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 7,
  },
  form: {
    gap: 18,
    marginTop: 100,
  },
  bio: {
    height: hp(15),
    alignItems: 'flex-start',
    paddingVertical: 15,
  },
});















