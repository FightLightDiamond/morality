import React from 'react';
import classNames from 'classnames';
import './ConversationItem.scss';

interface IProps {
  conversation: any,
  isActive: boolean,
  onConversationItemSelected(id: number): void
}

const ConversationItem: React.FC<IProps> = ({ conversation, isActive, onConversationItemSelected }) => {
    const className = classNames('conversation', {
        'active': isActive
    });

    return (
        <div className={className} onClick={() => onConversationItemSelected(conversation.id)}>
            <img src={conversation.imageUrl} alt={conversation.imageAlt} />
            <div className="title-text">{conversation.title}</div>
            <div className="created-date">{conversation.createdAt}</div>
            <div className="conversation-message">
                {conversation.latestMessageText}
            </div>
        </div>
    );
}

export default ConversationItem;
