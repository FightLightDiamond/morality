import React from "react";

const initialState = {
  conversations: [],
  selectedConversation: {}
};

initialState.selectedConversation = initialState.conversations[1];

interface IConversation {
  id: string
  messages: any
}

interface IMessage {
  imageUrl: string | null
  imageAlt: string | null
  messageText: string
  createdAt: string
  isMyMessage: boolean
}

interface IState {
  conversations: Array<IConversation> | []
  selectedConversation: {
    id: string
    messages: Array<IMessage>
  } | {} | null
}

interface IAction {
  type: string,
  conversationId: string
  textMessage: string
  payload: {
    conversations: Array<IConversation> | []
    selectedConversation: {
      id: string
      messages: Array<IMessage>
    } | {} | null
  }
}


const conversationsReducer = (state: IState = initialState, action: IAction) => {
  switch (action.type) {
    case 'CONVERSATIONS_LOADED': {
      const newState = {...state};
      newState.conversations = action.payload.conversations ? action.payload.conversations : [];
      newState.selectedConversation = action.payload.selectedConversation;

      return newState;
    }
    case 'SELECTED_CONVERSATION_CHANGED': {
      const newState: any = {...state};
      newState.selectedConversation =
        newState.conversations.find(
          (conversation: any) => conversation.id === action.conversationId
        );

      return newState;
    }
    case 'DELETE_CONVERSATION': {
      if (state.selectedConversation) {
        const newState: any = {...state};

        let selectedConversationIndex =
          newState.conversations.findIndex((c: IConversation) => c.id === newState.selectedConversation.id);
        newState.conversations.splice(selectedConversationIndex, 1);

        if (newState.conversations.length > 0) {
          if (selectedConversationIndex > 0) {
            --selectedConversationIndex;
          }

          newState.selectedConversation = newState.conversations[selectedConversationIndex];
        } else {
          newState.selectedConversation = null;
        }

        return newState;
      }

      return state;
    }
    case 'NEW_MESSAGE_ADDED': {
      if (state.selectedConversation) {
        const newConversation = {
          imageUrl: '',
          imageAlt: 'null',
          messageText: action.textMessage,
          createdAt: 'Apr 16',
          isMyMessage: true
        }
        const newState: any = {...state};
        newState.selectedConversation = {...newState.selectedConversation};
        // newState.selectedConversation.messages = {newConversation,...newState.selectedConversation.messages};
        newState.selectedConversation.messages = {newConversation,...newState.selectedConversation.messages};
        console.log('newState.selectedConversation.messages', newState.selectedConversation.messages)
        // console.log('newState', newState)
        // newState.selectedConversation.messages.unshift(
        //   newConversation
        // )
        state = newState
        // return newState;
      }

      return state;
    }
    default:
      return state;
  }
}

export default conversationsReducer;
