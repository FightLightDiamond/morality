import React from "react"
import Layout from "../../components/common/layout"
import NewNoteInput from "./new-note-input"
import { connect } from "react-redux"
import { INode } from "../../stores/note/notesReducer"
import { addNote } from "../../stores/actions"
import { decrement, increment, selectCount } from "../../stores/counter/counterSlice"
import { useAppSelector } from "../../stores/hooks"
import { useGetTagsQuery } from "../../services/tagService"


interface Props {
  count: number
  notes: Array<INode>

  addNote(note: INode): void

  setNotes(notes?: Object): void

  fetchNotes(): void

  increment(): void

  decrement(): void
}

const NotePage: React.FC<Props> = (
  {
    addNote,
    increment,
    decrement
  }
) => {
  const { data, error, isLoading } = useGetTagsQuery("")

  return (
    <Layout title={"Notes"}>
      <div className={"row"}>
        <NewNoteInput add={addNote} />
        <hr />
        {
          error ? (
            <>Oh no, there was an error</>
          ) : isLoading ? (
            <>Loading...</>
          ) : data ? <ul>
            {
              data.map((note: any, index: number) => {
                return <li key={note.id}>{note.name}</li>
              })
            }
          </ul> : ""
        }
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
    // notes: state.notes.items,
    // count: state.counter.value
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
  // setNotes,
  // fetchNotes,
  increment,
  decrement
}

export default connect(mapStateToProps, mapActionToProps)(NotePage)
