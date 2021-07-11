import { INode } from "./redux/notesReducer"

export const ADD_NOTE = "ADD_NOTE"
export const SET_NOTES = "SET_NOTES"

export type IAction = {
  type: string
  payload: any
}

export const addNote = (note: INode): IAction => ({
  type: ADD_NOTE, payload: note
})

export const setNotes = (notes: Array<INode>): IAction => ({
  type: SET_NOTES, payload: notes
})