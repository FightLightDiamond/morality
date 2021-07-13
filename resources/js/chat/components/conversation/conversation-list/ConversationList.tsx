import React from 'react';

import ConversationItem from '../conversation-item/ConversationItem';
import './ConversationList.scss';

interface IProps {
  conversations: any,
  selectedConversation: any,
  onConversationItemSelected: any
}

const ConversationList: React.FC<IProps> = ({ conversations, selectedConversation, onConversationItemSelected }) => {
    const conversationItems = conversations.map((conversation: any) => {
        const conversationIsActive = selectedConversation && conversation.id === selectedConversation.id;

        return <ConversationItem
            key={ conversation.id }
            onConversationItemSelected={ onConversationItemSelected }
            isActive={ conversationIsActive }
            conversation={ conversation } />;
    });

    return (
        <div id="conversation-list">
            {conversationItems}
        </div>
    );
}

export default ConversationList;
