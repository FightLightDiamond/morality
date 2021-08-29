import React, { useState } from "react"
import Layout from "../../components/common/layout"
import { connect } from "react-redux"
import { LinearProgress } from "@material-ui/core"
import { useIndexQuery } from "../../services/video.service"

const NotePage: React.FC<any> = (
  {}
) => {
  const { data, error, isLoading } = useIndexQuery("")
  //
  // /**
  //  * View render
  //  */
  if (isLoading) return (<LinearProgress />)

  if (error) {
    console.log('error',error)
    console.log("data", data)
    return <div>Something went wrong</div>
  }

  return (
    <Layout title={"Video"}>
      {
        data?.data.map(
          (item: any) =>
          <div className={'col-sm-3 pb-3'} key={item.id}>
            <div className={'card shadow-sm'}>
              <div className="card-body">{item.description}</div>
            </div>
          </div>
        )
      }
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
const mapActionToProps = {}

export default connect(mapStateToProps, mapActionToProps)(NotePage)
