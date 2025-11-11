import {StyleSheet, View, Text } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';
import BackButton from './BackButton';
import { theme } from '../constants/theme';
import { wp, hp} from '../helpers/common'

const Header = ({title, showBackButton = true, mb=10}) => {
    const router = useRouter();
  return (
    <View style={[styles.container, {marginButtom:mb}]}>
    {
       showBackButton && (
    <View style={styles. BackButton}>
        <BackButton router={router}/>
    </View>
)

}


<Text  style={styles.title}>
    {title || ""}
</Text>





    </View>
  )
}

export default Header


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
        marginTop: 5,
        gap:10
    },
    title:{
        fontSize: hp(2.7),
        fontWeight: theme.fonts.semibold,
        color: theme.colors.textDark
    },
    BackButton:{
        position: 'absolute',
        left: 0
    }
})