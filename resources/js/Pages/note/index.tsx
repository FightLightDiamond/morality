import React from "react"
import Layout from "../../components/common/layout"
import NewNoteInput from "./new-note-input"
import { connect } from "react-redux"
import { INode } from "../../stores/note/notesReducer"
import { addNote } from "../../stores/actions"
import {
  decrement,
  increment,
  selectCount,
  incrementAsync,
  incrementSaga
} from "../../stores/counter/counterSlice"
import { useAppSelector } from "../../stores/hooks"
import { useGetTagsQuery } from "../../services/tagService"


interface Props {
  count: number
  notes: Array<INode>

  addNote(note: INode): void

  setNotes(notes?: Object): void

  fetchNotes(): void

  increment(number: number): void

  decrement(number: number): void

  incrementAsync(number: number): void

  incrementSaga(number: number): void
}

const NotePage: React.FC<Props> = (
  {
    addNote,
    increment,
    decrement,
    incrementAsync,
    incrementSaga
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
            aria-label="incrementAsync value"
            onClick={() => incrementAsync(9)}
          >incrementAsync
          </button>

          <button
            aria-label="increment Saga value"
            onClick={() => incrementSaga(2)}
          >increment Saga
          </button>

          <button
            aria-label="Increment value"
            onClick={() => increment(3)}
          >
            Increment
          </button>

          <span>{useAppSelector(selectCount)}</span>
          <button
            aria-label="Decrement value"
            onClick={() => decrement(3)}
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
  decrement,
  incrementSaga,
  incrementAsync
}

export default connect(mapStateToProps, mapActionToProps)(NotePage)
