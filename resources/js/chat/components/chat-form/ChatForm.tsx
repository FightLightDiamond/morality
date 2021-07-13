import React, {useState} from 'react';

import FormButton from '../controls/buttons/FormButton';
import AttachmentIcon from '../controls/icons/attachment-icon/AttachmentIcon';

import './ChatForm.scss';

const isMessageEmpty = (textMessage: string): boolean => {
  return adjustTextMessage(textMessage).length === 0;
}

const adjustTextMessage = (textMessage: string) => {
  return textMessage.trim();
};

interface IProps {
  selectedConversation: boolean,
  onMessageSubmitted(textMessage: string): void
}

const ChatForm: React.FC<IProps> = ({selectedConversation, onMessageSubmitted}) => {
  const [textMessage, setTextMessage] = useState('');
  const disableButton = isMessageEmpty(textMessage);
  let formContents = null;

  const handleFormSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!isMessageEmpty(textMessage)) {
      onMessageSubmitted(textMessage);
      setTextMessage('');
    }
  };

  if (selectedConversation) {
    formContents = (
      <>
        <div title="Add Attachment">
          <AttachmentIcon/>
        </div>
        <input
          type="text"
          placeholder="type a message"
          value={textMessage}
          onChange={(e) => {
            setTextMessage(e.target.value);
          }}/>
        <FormButton disabled={disableButton}>Send</FormButton>
      </>
    );
  }


  return (
    <form id="chat-form" onSubmit={handleFormSubmit}>
      {formContents}
    </form>
  );
}

export default ChatForm;
