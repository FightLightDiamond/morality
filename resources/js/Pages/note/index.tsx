import React, {useState, useEffect} from "react"
import Layout from "../../components/common/layout";
import NewNoteInput from "./new-note-input"
import {connect, useSelector, useDispatch} from "react-redux"
import {INode} from "../../stores/redux/notesReducer"
import {addNote, setNotes, fetchNotes} from "../../stores/actions"
import { decrement, increment, selectCount } from "../../stores/counter/counterSlice"

import {RootState} from '../../stores/store'
import { useAppSelector } from "../../stores/hooks"

interface Props {
  count: number
  notes: Array<INode>,
  addNote(note: INode): void
  setNotes(notes?: Object): void,
  fetchNotes(): void
  increment(): void,
  decrement(): void,
}

const NotePage: React.FC<Props> = (
  {
    count,
    notes,
    addNote, setNotes,
    fetchNotes,
    increment,
    decrement
  }
) => {
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

  // const count = useSelector((state: RootState) => state.counter.value)
  // const dispatch = useDispatch()

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
      <div>
        <div>
          <button
            aria-label="Increment value"
            onClick={increment}
          >
            Increment
          </button>
          <span>{useAppSelector(selectCount)}</span>
          <button
            aria-label="Decrement value"
            onClick={decrement}
          >
            Decrement
          </button>
        </div>
      </div>
    </Layout>
  )
}

const mapStateToProps = (state: any) => {
  return {
    notes: state.notes.items,
    count: state.counter.value
  }
}

/**
 * Tự động dispatch
 * const addNote = (note: string) => {
 *  dispatch(addNote(note))
 * }
 */
const mapActionToProps = {
  addNote,
  setNotes,
  fetchNotes,
  increment,
  decrement
}

/**
 * Detail dispatch
 * @param dispatch
 */
// const mapActionToProps = (dispatch: any) => ({
//   addNote: (note: INode) => dispatch(addNote(note)),
//   setNotes: (notes: Array<INode>) => dispatch(setNotes(notes)),
//   /**
//    * Call Api by Action props
//    */
//   // fetchNotes: async () => {
//   //   const res = await axios.get('/api/tags');
//   //   console.log(res.data)
//   //   /**
//   //    * Dispatch set to do
//   //    */
//   //   dispatch(setNotes(res.data))
//   // }
//
//   fetchNotes: () => dispatch(fetchNotes())
// })

export default connect(mapStateToProps, mapActionToProps)(NotePage)
