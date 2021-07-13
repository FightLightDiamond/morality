const initialState = {
    messageDetails: {}
}

const messagesReducer = (state: any = initialState, action: any) => {
    switch(action.type) {
        case 'MESSAGES_LOADED':
            const { conversationId, messages, hasMoreMessages, lastMessageId } = action.payload;
            const currentConversationMapEntry = state.messageDetails[conversationId];
            const newConversationMapEntry: any = { hasMoreMessages, lastMessageId, messages: [] };

            if (currentConversationMapEntry) {
                newConversationMapEntry.messages = [...currentConversationMapEntry.messages];
            }

            newConversationMapEntry.messages = [...newConversationMapEntry.messages, ...messages];

            const newMessageDetails = { ...state.messageDetails };
            newMessageDetails[conversationId] = newConversationMapEntry;

            return { messageDetails: newMessageDetails };
        default:
            return state;
    }
}

export default messagesReducer;
