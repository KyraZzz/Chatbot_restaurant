import React from 'react'
import { ReactComponent as ChattyBotIcon } from "../../icons/robot.svg";

const ChattyBotAvatar = () => {
    return (
        <div className="react-chatbot-kit-chat-bot-avatar">
            <div className="react-chatbot-kit-chat-bot-avatar-container">
            <ChattyBotIcon className="react-chatbot-kit-chat-bot-avatar-icon" />
            </div>
        </div>
        );
}
 
export default ChattyBotAvatar;