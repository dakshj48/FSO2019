import React from 'react'
import { Message } from 'semantic-ui-react'

const Notification = ({ message }) => {
  if (message.length === 0) {
    return null
  }
  else if(message[1] === 'success')
    return <Message content={message[0]} success />
  return <Message content={message[0]} error />
}

export default Notification
