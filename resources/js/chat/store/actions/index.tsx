export const conversationChanged = (conversationId: string) => ({
  type: 'SELECTED_CONVERSATION_CHANGED',
  conversationId
});

export const conversationsRequested = () => ({
  type: 'CONVERSATIONS_REQUESTED'
});

export const conversationDeleted = () => ({
  type: 'DELETE_CONVERSATION'
});


export const newMessageAdded = (textMessage: string) => ({
  type: 'NEW_MESSAGE_ADDED',
  textMessage
});

export const messagesRequested = (conversationId: string, numberOfMessages: number, lastMessageId?: number | null) => ({
  type: 'MESSAGES_REQUESTED',
  payload: {
    conversationId,
    numberOfMessages,
    lastMessageId
  }
});

export const messagesLoaded = (conversationId: string, messages: any, hasMoreMessages: any, lastMessageId?: number | null) => ({
  type: 'MESSAGES_LOADED',
  payload: {
    conversationId,
    messages,
    hasMoreMessages,
    lastMessageId
  }
});
