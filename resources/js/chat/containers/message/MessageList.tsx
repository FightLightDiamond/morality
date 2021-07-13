import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { messagesRequested } from '../../store/actions';
import Message from '../../components/message/Message';
import './MessageList.scss';

interface IProps {
  conversationId: string,
  getMessagesForConversation(conversationId: string): any,
  loadMessages(conversationId: string, lastMessageId?: number): void
}

const MessageList: React.FC<IProps> = ({ conversationId, getMessagesForConversation, loadMessages }) => {
    const messageDetails = getMessagesForConversation(conversationId);
    const messages = messageDetails ? messageDetails.messages: null;
    let messageItems = null;

    useEffect(() => {
        if (!messageDetails) {
            loadMessages(conversationId, 1);
        }
    }, [messageDetails, loadMessages, conversationId])

    if (messages && messages.length > 0) {
        messageItems = messages.map((message: any, index: number) => {
            return <Message
                key={index}
                isMyMessage={message.isMyMessage}
                message={message} />;
        });
    }

    return (
        <div id="chat-message-list">
            {messageItems}
        </div>
    );
}

const mapStateToProps = (state: any) => {
    const getMessagesForConversation = (conversationId: string) => {
        return state.messagesState.messageDetails[conversationId];
    }

    return {
        getMessagesForConversation
    }
}

const mapDispatchToProps = (dispatch: any) => {
    const loadMessages = (conversationId: string , lastMessageId?: any) => {
        dispatch(messagesRequested(conversationId, 5, lastMessageId));
    }

    return { loadMessages };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MessageList);
