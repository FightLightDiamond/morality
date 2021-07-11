import React, { ChangeEvent, useEffect, useState } from "react"

interface Props {
  add(note: string): void
}

const NewNoteInput: React.FC<Props> = ({ add }) => {
  const [note, setNote] = useState("")

  const update = (event: ChangeEvent<HTMLInputElement>) => {
    setNote(event.target.value)
  }

  const handleAddClick = () => {
    add(note)
    setNote("")
  }
  return (

    <div className={"col-md-12"}>
      <input
        onChange={update}
        value={note}
        type="text" name={"note"} placeholder={"Note"} />
      <button onClick={handleAddClick}>Add</button>
    </div>
  )
}

export default NewNoteInput
