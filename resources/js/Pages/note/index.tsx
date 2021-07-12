import React, {useState, useEffect} from "react"
import Layout from "../../components/common/layout";
import NewNoteInput from "./new-note-input"
import { connect } from "react-redux"
import {INode} from "../../stores/redux/notesReducer"
import { addNote, setNotes, fetchNotes } from "../../stores/actions"
import axios from "axios"

interface Props {
  notes: Array<INode>,
  addNote(note: INode): void
  setNotes(notes?: Object): void,
  fetchNotes(): void
}

const NotePage: React.FC<Props>= ({notes, addNote, setNotes, fetchNotes}) => {
  useEffect(() => {
    /**
     * Call Api by life circle
     */
    // axios.get('/api/tags')
    // .then( res => {
    //   setNotes(res.data)
    // })
    fetchNotes()
  }, [fetchNotes])

  return (
    <Layout title={'Notes'}>
      <div className={'row'}>
        <NewNoteInput add={addNote}/>
        <hr/>
        <ul>
          {
            notes.map((note, index) => {
              return <li key={note.id}>{note.name}</li>
            })
          }
        </ul>
      </div>
    </Layout>
  )
}

const mapStateToProps = (state: any) => {
  return {
    notes: state.notes.items
  }
}

/**
 * Tự động dispatch
 * const addNote = (note: string) => {
 *  dispatch(addNote(note))
 * }
 */
// const mapActionToProps = {
//   addNote: addNote,
//   setNotes: setNotes,
//   fetchNotes: fetchNotes
// }

/**
 * Detail dispatch
 * @param dispatch
 */
const mapActionToProps = (dispatch: any) => ({
  addNote: (note: INode) => dispatch(addNote(note)),
  setNotes: (notes: Array<INode>) => dispatch(setNotes(notes)),
  /**
   * Call Api by Action props
   */
  // fetchNotes: async () => {
  //   const res = await axios.get('/api/tags');
  //   console.log(res.data)
  //   /**
  //    * Dispatch set to do
  //    */
  //   dispatch(setNotes(res.data))
  // }

  fetchNotes: () => dispatch(fetchNotes())
})

export default connect(mapStateToProps, mapActionToProps)(NotePage)
