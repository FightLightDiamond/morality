import {Action} from "../actions"

export interface INoteState {
  notes: Array<string>
}

const initialState = {
  notes: []
}

export const notesReducer = (state: INoteState = initialState, action: Action) => {
  switch (action.type) {
    case "ADD_NOTE": {
      return {
        ...state,
        notes: [...state.notes, action.payload]
      }
    }
    default: return state
  }
}