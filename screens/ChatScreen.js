import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native'
import Header from '../assets/components/Header'
import ChatList from '../assets/components/ChatList'

const ChatScreen = () => {
  return (
    <SafeAreaView>
      <Header title="Chat"/>
      <ChatList/>
    </SafeAreaView>
  )
}

export default ChatScreen