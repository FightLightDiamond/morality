import { INode } from "./note/notesReducer"
import axios from "axios";
export const ADD_NOTE = "ADD_NOTE"
export const SET_NOTES = "SET_NOTES"
export const FETCH_NOTES = "FETCH_NOTES"
import { Dispatch } from "redux"


export type TAction = {
  type: string
  payload: any
}

export const addNote = (note: INode): TAction => ({
  type: ADD_NOTE, payload: note
})

export const setNotes = (notes: Array<INode>): TAction => ({
  type: SET_NOTES, payload: notes
})

export const fetchNotes = () => async (dispatch: Dispatch) => {
  const res = await axios.get('/api/tags');
  /**
   * Dispatch set to do
   */
  dispatch(setNotes(res.data))
}
