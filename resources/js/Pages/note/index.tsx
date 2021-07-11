import React, {useState, useEffect} from "react"
import Layout from "../../components/common/layout";
import NewNoteInput from "./new-note-input"
import { connect } from "react-redux"
import {INode} from "../../stores/redux/notesReducer"
import { addNote, setNotes } from "../../stores/actions"
import axios from "axios"

interface Props {
  notes: Array<INode>,
  addNote(note: INode): void
  setNotes(notes?: Object): void
}

const NotePage: React.FC<Props>= ({notes, addNote, setNotes}) => {
  // const [text, setText] = useState('')

  useEffect(() => {
    axios.get('http://localhost/api/tags')
    // axios.get('http://localhost/api/tags-list')
    .then( res => {
      // console.log(typeof Object.values(res.data))
      // console.log( Object.values(res.data))
      //setNotes(res.data)
      setNotes(res.data)
    })
  }, [])

  return (
    <Layout title={'Notes'}>
      <div className={'row'}>
        <NewNoteInput add={addNote}/>
        <hr/>
        <ul>
          {/*{JSON.stringify(notes)}*/}
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
const mapActionToProps = {
  addNote: addNote,
  setNotes: setNotes
}

export default connect(mapStateToProps, mapActionToProps)(NotePage)
