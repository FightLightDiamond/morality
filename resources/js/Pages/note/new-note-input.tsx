import React, { ChangeEvent, useEffect, useState } from "react"
import { INode } from "../../stores/note/notesReducer"

interface Props {
  add(note: INode): void
}

const NewNoteInput: React.FC<Props> = ({ add }) => {
  const [note, setNote] = useState("")

  const update = (event: ChangeEvent<HTMLInputElement>) => {
    setNote(event.target.value)
  }

  const handleAddClick = () => {
    add(
      {
        id: Math.floor(Math.random() * 99000) + 1,
        name: note
      }
    )
    setNote("")
  }

  return (
    <div className={"col-md-12"}>
      <input
        onChange={update}
        value={note}
        type="text" name={"note"}
        placeholder={"Note"}
      />
      <button onClick={handleAddClick}>Add</button>
    </div>
  )
}

export default NewNoteInput
