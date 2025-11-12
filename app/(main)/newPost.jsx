import { View, Text, ScrollView , StyleSheet} from 'react-native'
import React, { useState } from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import Header from '../../components/Header'
import { hp, wp } from '../../helpers/common'
import { theme } from '../../constants/theme'
import { useAuth } from '../../contexts/AuthContext'
import Avatar from '../../components/Avatar'
import RichTextEditor from '../../components/RichTextEditor'
import { useRef } from 'react'
import { useRouter } from 'expo-router'

const NewPost = () => {
  const bodyRef = useRef("");
  const editorRef = useRef(null);
  const {user} = useAuth();
    const router = useRouter();
    const[loading, setLoading] = useState(false);
    const[file, setFile] = useState(file);
  return (
 <ScreenWrapper bg="white">
  <View style={StyleSheet.container}>
    <Header tile="Create Post"/>
    <ScrollView contentContainerStyle={{gap:20}}>
      <View style={StyleSheet.header}>
        <Avatar
        uri={user?.image}
        size={hp(6.5)}
        rounded={theme.radius.xl}
        />
        <View  style={{gap:2}}>
          <Text style={styles.username}>
            {
                 user && user.name
            }
          </Text>
          <Text style={styles.publicText}>
          public
          </Text>

        </View>
      </View>


      <View style={styles.textEditor}>
        <RichTextEditor editorRef={editorRef} onChange={body=> bodyRef.current = body}/>

      </View>

    </ScrollView>

  </View>

 </ScreenWrapper>
  )
}

export default NewPost



const styles = StyleSheet.create({
  container: {
    flex:1,
    marginBottom: 30,
    paddingHorizontal: wp(4),
    gap:15,
  },
  title: {
    fontSize: hp(2.5),
    fontWeight: theme.fonts.semibold,
    color: theme.fonts.semibold,
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap:12,
  },
  username: {
    fontSize: hp(2.2),
    fontWeight: theme.fonts.semibold,
    color: theme.colors.text,
  },
  avatar: {
    height: hp(6.5),
    width: hp(6.5),
    borderRadius: theme.radius.xl,
    borderCurve: 'continuous',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)'
  },
  publicText:{
    fontSize: hp(1.7),
    fontWeight: theme.fonts.medium,
    color: theme.colors.textLight,
  },
  media:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems: 'center',
    borderWidth: '1.5',
    padding: 12,
    paddingHorizontal: 18,
    borderRadius: theme.radius.xl,
    borderCurve: 'continuous',
    borderColor: theme.colors.gray
  },
  mediaIcons:{
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15
  }
})