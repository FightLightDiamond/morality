import React from 'react';

import TrashIcon from '../controls/icons/trash-icon/TrashIcon';

import './ChatTitle.scss';
interface IProps {
  selectedConversation: {
    title: string
  },
  onDeleteConversation(): void
}
const ChatTitle: React.FC<IProps> = ({ selectedConversation, onDeleteConversation }) => {
    let chatTitleContents = null;

    if (selectedConversation) {
        chatTitleContents = (
            <>
                <span>{ selectedConversation.title }</span>
                <div onClick={ () => { onDeleteConversation(); } } title="Delete Conversation">
                    <TrashIcon />
                </div>
            </>
        );
    }

    return (
        <div id="chat-title">
            { chatTitleContents }
        </div>
    );
}

export default ChatTitle;
