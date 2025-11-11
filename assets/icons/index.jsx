import { View, Text } from 'react-native'
import React from 'react'
import {theme} from '../../constants/theme'
import Home from './Home'
import Mail from './Mail'
import Lock from './Lock'
import User from './User'
import Logout from './Logout'
import ArrowLeft from './ArrowLeft'
import Heart from './Heart'
import Plus from './Plus'

  const icons ={
        home: Home,
        mail: Mail,
        lock: Lock,
        user: User,
        heart: Heart,
        plus: Plus,
        // search: Search,
        // location: Location,
        // call: Call,
        // camera: Camera,
        // edit:Edit,
          arrowLeft: ArrowLeft,
        // threeDotsCircle: ThreeDotsCircle,
        // threeDotsHorizontal: ThreeDotsHorizontal,
        // comment: Comment,
        // share: Share,
        // send: Send,
        // delete: Delete,
        Logout: Logout,
        // image: Image,
        // video:Video,
    }

const Icon = ({name, ...props}) => {
  const IconComponent = icons[name]
  return (
    <IconComponent 
    height={props.size || 24}
    width={props.size || 24}
    strokeWidth={props.strokeWidth || 1.9}
    color={theme.colors.textLight}
    {...props}
    />
  )
}

export default Icon