import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {RichEditor, RichToolbar, actions} from 'react-native-pell-rich-editor',
import { theme } from '../constants/theme'

export default function RichTextEditor({
    editotRef,
    onChange
}) {
  return (
    <View style={{minHeight:285}}>
      <RichToolbar
      actions={
        [
            actions.setStrikethrough,
            actions.removeFormat,
            actions.setBold,
            actions.setItalics,
            actions.insertOrderedList,
            actions.alignLeft,
            actions.blockquote,
            actions.alignCenter,
            actions.alignRight,
            actions.code,
            actions.line,
            actions.heading4
        ]
      }

      iconMap={{
        [actions.heading1]: ({tintColor}) => <Text style={{color:tintColor}}>H1</Text>,
        [actions.heading1]: ({tintColor}) => <Text style={{color:tintColor}}>H4</Text>
      }}

      style={styles.richBar}    
      selectedIconTint={theme.colors.primaryDark}
      flatContainerStyle={styles.flatStyle}
      editor={editotRef}
      disabled={false}
    
      />

      <RichEditor
      ref={editorRef}
      flatContainerStyle={styles.rich}
      editorStyle={styles.contentStyle}
      placeholder={"What's on your mind?"}
      onChange={onChange}
      
      />
    </View>
  )
}

const styles = StyleSheet.create({
    richBar: {
        borderTopRightRadius: theme.radius.xl,
        borderTopLeftRadius: theme.radius.xl,
        backgroundColor: theme.color.gray
    },
    rich:{
        minHeight: 240,
        flex: 1,
        borderWidth: 1.5,
        borderTopWidth: 0,
        borderBottomLeftRadius: theme.radius.xl,
        borderBottomRightRadius: theme.radius.xl,
        padding: 5,
        borderColor: theme.colors.gray,
    },
    contentStyle: {
        color: theme.colors.textDark,
        placeholderColor: 'gray',
    },
    flatStyle:{
        paddingHorizontal: 20,
        gap:3,
    }
}) 