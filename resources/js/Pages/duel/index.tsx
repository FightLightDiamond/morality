import React, { useState } from "react"
import Layout from "../../components/common/layout"
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DroppableProvided,
  DroppableStateSnapshot, DragStart
} from "react-beautiful-dnd"

import result from "postcss/lib/result"

import { Wrapper } from "./styles"
import { DragHandle } from "@material-ui/icons"


import clsx from "clsx"
import { makeStyles } from "@material-ui/core/styles"
import Drawer from "@material-ui/core/Drawer"
import Button from "@material-ui/core/Button"
import List from "@material-ui/core/List"
import Divider from "@material-ui/core/Divider"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import InboxIcon from "@material-ui/icons/MoveToInbox"
import MailIcon from "@material-ui/icons/Mail"

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
})

type Anchor = "top" | "left" | "bottom" | "right";
const itemsFromBackend = [
  {
    id: "first",
    content: "Happier",
    type: "demon",
    img: "http://img.zing.vn/upload/yugi/source/Hero3Q/BaiDungHop/quai%20thu%20chimera.png"
  },
  {
    id: "second",
    content: "Lá chắn phản đòn",
    type: "trap",
    img: "http://img.zing.vn/upload/yugi/source/Hero3Q/BaiDungHop/tay%20kiem%20lua%20thieng.png"
  },
  {
    id: "third",
    content: "Phù thủy áo đen",
    type: "demon",
    img: "http://img.zing.vn/upload/yugi/source/Hero3Q/BaiDungHop/ky%20si%20bau%20troi.png"
  },
  {
    id: "fourth",
    content: "Hồi sinh",
    type: "trap",
    img: "http://img.zing.vn/upload/yugi/source/Hero3Q/BaiDungHop/ky%20si%20lua%20den.png"
  },
  {
    id: "fifth",
    content: "Tăng công",
    type: "trap",
    img: "http://img.zing.vn/upload/yugi/source/Hero3Q/BaiDungHop/paladin%20bong%20toi.png"
  },
  {
    id: "first1",
    content: "Happier",
    type: "demon",
    img: "http://img.zing.vn/upload/yugi/source/Hero3Q/BaiDungHop/quai%20thu%20chimera.png"
  },
  {
    id: "second1",
    content: "Lá chắn phản đòn",
    type: "trap",
    img: "http://img.zing.vn/upload/yugi/source/Hero3Q/BaiDungHop/tay%20kiem%20lua%20thieng.png"
  },
  {
    id: "third1",
    content: "Phù thủy áo đen",
    type: "demon",
    img: "http://img.zing.vn/upload/yugi/source/Hero3Q/BaiDungHop/ky%20si%20bau%20troi.png"
  },
  {
    id: "fourth1",
    content: "Hồi sinh",
    type: "trap",
    img: "http://img.zing.vn/upload/yugi/source/Hero3Q/BaiDungHop/ky%20si%20lua%20den.png"
  },
  {
    id: "fifth1",
    content: "Tăng công",
    type: "trap",
    img: "http://img.zing.vn/upload/yugi/source/Hero3Q/BaiDungHop/paladin%20bong%20toi.png"
  },
  {
    id: "third12",
    content: "Phù thủy áo đen",
    type: "demon",
    img: "http://img.zing.vn/upload/yugi/source/Hero3Q/BaiDungHop/ky%20si%20bau%20troi.png"
  },
  {
    id: "fourth12",
    content: "Hồi sinh",
    type: "trap",
    img: "http://img.zing.vn/upload/yugi/source/Hero3Q/BaiDungHop/ky%20si%20lua%20den.png"
  },
  {
    id: "fifth12",
    content: "Tăng công",
    type: "trap",
    img: "http://img.zing.vn/upload/yugi/source/Hero3Q/BaiDungHop/paladin%20bong%20toi.png"
  },
  {
    id: "third121",
    content: "Phù thủy áo đen",
    type: "demon",
    img: "http://img.zing.vn/upload/yugi/source/Hero3Q/BaiDungHop/ky%20si%20bau%20troi.png"
  },
  {
    id: "fourth121",
    content: "Hồi sinh",
    type: "trap",
    img: "http://img.zing.vn/upload/yugi/source/Hero3Q/BaiDungHop/ky%20si%20lua%20den.png"
  },
  {
    id: "fifth121",
    content: "Tăng công",
    type: "trap",
    img: "http://img.zing.vn/upload/yugi/source/Hero3Q/BaiDungHop/paladin%20bong%20toi.png"
  },
]

const columnsFromBackend = {
  ["begin"]: {
    name: "Requested",
    items: []
  },
  ["demon"]: {
    name: "Demon",
    items: []
  },
  ["trap"]: {
    name: "Trap",
    items: []
  },
  ["war"]: {
    name: "Done",
    items: itemsFromBackend
  }
}

/**
 * Mộ bài Sân chơi Bẫy phép
 *   5
 * 2 5 6
 *
 *
 * 2 5 6
 *   5
 */

const DuelPage: React.FC = () => {
  const [columns, setColumns] = useState(columnsFromBackend)

  const onDS = (result: any) => {
    console.log("")
    console.log("OnDS", result)
  }

  const onDragEnd = (result: any, columns: any, setColumns: any) => {
    console.log("result", result)
    if (!result.destination) return
    const { draggableId, source, destination } = result

    console.log("draggableId", draggableId)
    console.log("source", source)
    console.log("destination", destination)

    /**
     * Get sources
     */
    const sourceColumn = columns[source.droppableId]
    const sourceItems = [...sourceColumn.items]
    const [removed] = sourceItems.splice(source.index, 1)

    console.log("removed", removed)
    if (source.droppableId !== "begin") {
      alert("Not change")
      return
    }

    if (source.droppableId !== destination.droppableId) {
      console.log("Change")

      const destColumn = columns[destination.droppableId]
      const destItems = [...destColumn.items]

      console.log("destination.index", destination.index)
      console.log("source.index", source.index)

      destItems.splice(destination.index, 0, removed)

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
      })
    } else {
      console.log("Sort")
      const column = columns[source.droppableId]
      const copiedItems = [...column.items]
      const [removed] = copiedItems.splice(source.index, 1)
      copiedItems.splice(destination.index, 0, removed)
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems
        }
      })
    }
  }

  /**
   * display: flex|inline-flex
   * flex-direction: row|column
   * flex-wrap: nowrap|wrap|wap-reverse => cùng hàng, để xuống dòng, nhảy lên trên
   * flex-basis: length => kích thướng main size theo chiều ngang hoặc dọc, theo %
   * justify-content: flex-start|flex-end|center|space-between|space-around => căn phương hướng cho cha
   * justify-self: flex-start|flex-end|center => nó bắt đầu từ đâu cho item
   * align-content: flex-start|flex-end|center => giống justify theo chiều khác
   * align-self: flex-start|flex-end|center => giống justify cho item theo chiều khác
   * flex-grow: number => tăng kích thước main site
   * flex-shrink: number => thu nhỏ lại
   * flex: => cú pháp viết ngắn. flex-grow: 1; flex-shrink: 1; flex-basis: auto;
   * order: number => thứ tự flex item
   * flex-flow: => cú phát viết ngắn: row wrap;
   */

  const classes = useStyles()
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  })

  const toggleDrawer = (anchor: Anchor, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return
    }

    setState({ ...state, [anchor]: open })
  }

  const list = (anchor: Anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom"
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  )

  return (
    <Layout title={"Duel"}>
      <Wrapper>
        <DragDropContext onDragEnd={(result: DropResult) => onDragEnd(result, columns, setColumns)}>
          {
            Object.entries(columns).map(([id, column]) => (
                <div className={"area"}>
                  <Droppable droppableId={id} key={id} direction="horizontal">
                    {
                      (dropProvided: DroppableProvided, dropSnapshot: DroppableStateSnapshot) => (
                        <div className={"parties"}
                             {...dropProvided.droppableProps}
                             ref={dropProvided.innerRef}
                             style={{
                               background: dropSnapshot.isDraggingOver ? "lightblue" : "lightgrey",
                               padding: 4,
                               minHeight: 200
                             }}
                        >
                          <h2>{column.name}</h2>
                          {
                            column.items.map((item: any, index: number) => (
                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                  {
                                    (dragProvided, dragSnapshot) => (
                                      <div className={"item"}
                                           ref={dragProvided.innerRef}
                                           {...dragProvided.draggableProps}
                                           {...dragProvided.dragHandleProps}
                                           style={{
                                             userSelect: "none",
                                             margin: "0 0 8px 0",
                                             minHeight: "50px",
                                             backgroundColor: dragSnapshot.isDragging ? "lightgreen" : "silver",
                                             ...dragProvided.draggableProps.style
                                           }}
                                      >
                                        <DragHandle {...dragProvided.dragHandleProps} />
                                        <img className={"img-fluid"} src={item.img} alt={item.content} />
                                      </div>
                                    )
                                  }
                                </Draggable>
                              )
                            )
                          }
                          {dropProvided.placeholder}
                        </div>
                      )
                    }
                  </Droppable>
                </div>
              )
            )
          }
        </DragDropContext>
        <div>
          {(["left", "right", "top", "bottom"] as Anchor[]).map((anchor) => (
            <React.Fragment key={anchor}>
              <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
              <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                {list(anchor)}
              </Drawer>
            </React.Fragment>
          ))}
        </div>
      </Wrapper>
    </Layout>
  )
}

export default DuelPage
