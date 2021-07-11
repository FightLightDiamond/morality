import {IAction, ADD_NOTE, SET_NOTES} from "../actions"

export interface INode {
  id: number
  name: string
}

export interface INoteState {
  items: Array<INode>
}

const initialState = {
  items: [],
}

export const notesReducer = (state: INoteState = initialState, action: IAction) => {
  switch (action.type) {
    case ADD_NOTE: {
      return {
        ...state,
        items: [...state.items, action.payload]
      }
    }
    case SET_NOTES: {
      return {
        ...state,
        items: action.payload
      }
    }
    default: return state
  }
}