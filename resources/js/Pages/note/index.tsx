import React, { ChangeEvent, useEffect, useState } from "react"
import Layout from "../../components/common/layout";
import { Inertia } from "@inertiajs/inertia"
import route from "ziggy-js"
import { InertiaLink } from "@inertiajs/inertia-react"
import NewNoteInput from "./new-note-input"
import { connect, useDispatch, useSelector } from "react-redux"
import {INoteState} from "../../stores/redux/notesReducer"
import {addNote} from "../../stores/actions"



interface Props {
  notes: INoteState[],
  addNote(note: string): void
  // onAddNote(note: string): void
}

const NotePage: React.FC<Props>= ({notes, addNote}) => {
  // const notes = useSelector<INoteState, INoteState["notes"]>((state) => state.notes)
  // const dispatch = useDispatch();
  // const onAddNote = (note: string) => {
  //   dispatch(addNote(note))
  // }

  return (
    <Layout title={'Notes'}>
      <div className={'row'}>
        <NewNoteInput add={addNote}/>
        <hr/>
        <ul>
          {
            notes.map((note, index) => {
              return <li key={index}>{note}</li>
            })
          }
        </ul>
      </div>
    </Layout>
  )
}

const mapStateToProps = (state: any) => {
  return {
    notes: state.notes.notes
  }
}

const mapActionToProps = {
  addNote: addNote
}

export default connect(mapStateToProps, mapActionToProps)(NotePage)

// export default NotePage
