import React, { useState } from "react"
import Layout from "../../components/common/layout"
import { Wrapper } from "./styles"
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DroppableProvided,
  DroppableStateSnapshot
} from "react-beautiful-dnd"
import { v4 as uuid } from "uuid"
import result from "postcss/lib/result"
import { DragHandle } from "@material-ui/icons"

interface IItem {
  id: string
  content: string
}

const itemsFromBackend = [
  { id: uuid(), content: "First task" },
  { id: uuid(), content: "Second task" },
  { id: uuid(), content: "Third task" },
  { id: uuid(), content: "Fourth task" },
  { id: uuid(), content: "Fifth task" }
]

interface IColumn {
  name: string,
  items: Array<IItem>
}

const columnsFromBackend = {
  [uuid()]: {
    name: "Requested",
    items: itemsFromBackend
  },
  [uuid()]: {
    name: "To do",
    items: []
  },
  [uuid()]: {
    name: "In Progress",
    items: []
  },
  [uuid()]: {
    name: "Done",
    items: []
  }
}


const onDragEnd = (result: any, columns: any, setColumns: any) => {
  console.log("result", result)
  if (!result.destination) return
  const { source, destination } = result

  if (source.droppableId !== destination.droppableId) {
    console.log("Change")
    const sourceColumn = columns[source.droppableId]
    const destColumn = columns[destination.droppableId]
    const sourceItems = [...sourceColumn.items]
    const destItems = [...destColumn.items]
    const [removed] = sourceItems.splice(source.index, 1)
    console.log("removed", removed)
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

/**
 * Mộ bài Sân chơi Bẫy phép
 *   5
 * 2 5 6
 *
 *
 * 2 5 6
 *   5
 */

const DNDPage: React.FC = () => {
  const [columns, setColumns] = useState(columnsFromBackend)
  const [todo, setTodo] = useState(itemsFromBackend)

  const oDE = (result: DropResult) => {
    const { source, destination } = result
    if (!destination) return

    const items = Array.from(todo)

    const srcI = source.index
    const desI = destination.index
    const [a] = items;
    console.log('a', a);
    console.log('is', items.splice(srcI, 1));

    const [newOrder] = items.splice(srcI, 1)
    //items.splice(srcI, 1)[0];
    items.splice(desI, 0, newOrder)

    setTodo(items)
  }

  const onDE = (result: DropResult) => {
    const { source, destination } = result
    const srcI = source.index
    // const desI = destination.index

  }

  return (
    <Layout title={"DND"}>
      <div>
        <DragDropContext onDragEnd={oDE}>
          <Droppable droppableId={"todo"}>
            {
              (dropProvided) => (
                <div className={"todo"} {...dropProvided.droppableProps} ref={dropProvided.innerRef}>
                  {
                    todo.map(({ id, content }, index) =>
                      (
                        <Draggable key={id} draggableId={id} index={index}>
                          {
                            (dragProvided, dragSnapshot) => (
                              <div ref={dragProvided.innerRef}
                                   {...dragProvided.draggableProps}
                                   {...dragProvided.dragHandleProps}
                              >
                                <DragHandle {...dragProvided.dragHandleProps} />
                                {content}
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
        </DragDropContext>
      </div>
      <Wrapper>
        {/*-Navbar-*/}
        <div className={"nav"} style={{ display: "flex" }}>
          <ul className={"nav-list"}>
            <li className={"nav-item"}>A</li>
            <li className={"nav-item"}>B</li>
            <li className={"nav-item"}>C</li>
          </ul>
          <ul className={"nav-list"}>
            <li className={"nav-item"}>C</li>
            <li className={"nav-item"}>D</li>
          </ul>
        </div>
        {/*Form*/}
        <div className={"form-container"}>
          <form action="" className={"form"}>
            <div className={"form__row"}>
              <label htmlFor="name" className={"form__label"}>Name</label>
              <input type="text" className={"form__input"} />
            </div>
            <div className={"form__row"}>
              <label htmlFor="password" className={"form__label"}>Password</label>
              <input type="password" className={"form__input"} />
            </div>
          </form>
        </div>

        <div className={"feature-layout"}>
          <div className={"feature-item"}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A blanditiis
            consequuntur cum dignissimos error, fugit magnam rem. Aliquid dignissimos explicabo facere illum totam!
            Accusantium laudantium, molestiae praesentium saepe sequi voluptatibus?
          </div>
          <div className={"feature-item"}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A blanditiis
            consequuntur cum dignissimos error, fugit magnam rem. Aliquid dignissimos explicabo facere illum totam!
            Accusantium laudantium, molestiae praesentium saepe sequi voluptatibus?
          </div>
          <div className={"feature-item"}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A blanditiis
            consequuntur cum dignissimos error, fugit magnam rem. Aliquid dignissimos explicabo facere illum totam!
            Accusantium laudantium, molestiae praesentium saepe sequi voluptatibus?
          </div>
        </div>

        <div className={"wrap-layout"}>
          <div className={"wrap-layout__item"}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur
            magni minima praesentium quasi soluta tempora tempore vitae! Autem deleniti excepturi facere, illo iste,
            libero minus pariatur perspiciatis reiciendis tenetur unde?
          </div>
          <div className={"wrap-layout__item"}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur
            magni minima praesentium quasi soluta tempora tempore vitae! Autem deleniti excepturi facere, illo iste,
            libero minus pariatur perspiciatis reiciendis tenetur unde?
          </div>
          <div className={"wrap-layout__item"}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur
            magni minima praesentium quasi soluta tempora tempore vitae! Autem deleniti excepturi facere, illo iste,
            libero minus pariatur perspiciatis reiciendis tenetur unde?
          </div>
          <div className={"wrap-layout__item"}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur
            magni minima praesentium quasi soluta tempora tempore vitae! Autem deleniti excepturi facere, illo iste,
            libero minus pariatur perspiciatis reiciendis tenetur unde?
          </div>
          <div className={"wrap-layout__item"}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur
            magni minima praesentium quasi soluta tempora tempore vitae! Autem deleniti excepturi facere, illo iste,
            libero minus pariatur perspiciatis reiciendis tenetur unde?
          </div>
          <div className={"wrap-layout__item"}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur
            magni minima praesentium quasi soluta tempora tempore vitae! Autem deleniti excepturi facere, illo iste,
            libero minus pariatur perspiciatis reiciendis tenetur unde?
          </div>
        </div>

        <div className={"chart-layout"}>
          <div className={"chart-layout__item"}>1</div>
          <div className={"chart-layout__item"}>1</div>
          <div className={"chart-layout__item"}>1</div>
          <div className={"chart-layout__item"}>1</div>
          <div className={"chart-layout__item"}>1</div>
          <div className={"chart-layout__item"}>1</div>
          <div className={"chart-layout__item1"}>1</div>
        </div>

        <div className={"the-end"}>
          <div className={"the-end__first"}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet commodi consectetur consequatur consequuntur
            corporis culpa, debitis deserunt eius excepturi harum incidunt iste iusto maxime mollitia numquam repellat
            similique, vel velit!
          </div>
          <div className={"the-end__second"}>
            <div className={"the-end__second-one"}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda
              consectetur cum cumque laborum mollitia nisi non perspiciatis quia reiciendis. Aut blanditiis dicta
              doloribus est illo modi nemo reiciendis unde, vel!
            </div>
            <div className={"the-end__second-two"}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda
              consectetur cum cumque laborum mollitia nisi non perspiciatis quia reiciendis. Aut blanditiis dicta
              doloribus est illo modi nemo reiciendis unde, vel!
            </div>
          </div>
        </div>

        <div className={"column-layout"}>
          <div className={"column-item sidebar-one"}>
            <h2>tomb</h2>
          </div>
          <div className={"column-item main-column"}>
            <div className={"area"}>
              <div className={"parties"}>
                <div className={"item"}>
                  <img className={"img-fluid"}
                       src="https://upload.wikimedia.org/wikipedia/en/thumb/2/2b/Yugioh_Card_Back.jpg/250px-Yugioh_Card_Back.jpg"
                       alt="" />
                </div>
                <div className={"item"}>
                  <img className={"img-fluid"}
                       src="https://upload.wikimedia.org/wikipedia/en/thumb/2/2b/Yugioh_Card_Back.jpg/250px-Yugioh_Card_Back.jpg"
                       alt="" />
                </div>
                <div className={"item"}>
                  <img className={"img-fluid"}
                       src="https://upload.wikimedia.org/wikipedia/en/thumb/2/2b/Yugioh_Card_Back.jpg/250px-Yugioh_Card_Back.jpg"
                       alt="" />
                </div>
                <div className={"item"}>
                  <img className={"img-fluid"}
                       src="https://upload.wikimedia.org/wikipedia/en/thumb/2/2b/Yugioh_Card_Back.jpg/250px-Yugioh_Card_Back.jpg"
                       alt="" />
                </div>
                <div className={"item"}>
                  <img className={"img-fluid"}
                       src="https://upload.wikimedia.org/wikipedia/en/thumb/2/2b/Yugioh_Card_Back.jpg/250px-Yugioh_Card_Back.jpg"
                       alt="" />
                </div>
              </div>
              <div className={"parties"}>
                <div className={"item"}>
                  <img className={"img-fluid"} src="https://sportzor.com/images/ygo_cardback_sleeves19.jpg" alt="" />
                </div>
                <div className={"item"}>
                  <img className={"img-fluid"} src="https://sportzor.com/images/ygo_cardback_sleeves19.jpg" alt="" />
                </div>
                <div className={"item"}>
                  <img className={"img-fluid"} src="https://sportzor.com/images/ygo_cardback_sleeves19.jpg" alt="" />
                </div>
                <div className={"item"}>
                  <img className={"img-fluid"} src="https://sportzor.com/images/ygo_cardback_sleeves19.jpg" alt="" />
                </div>
                <div className={"item"}>
                  <img className={"img-fluid"} src="https://sportzor.com/images/ygo_cardback_sleeves19.jpg" alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className={"column-item sidebar-two"}>
            <h2>Trap</h2>
          </div>
        </div>
      </Wrapper>

      <div style={{ display: "flex", justifyContent: "space-between", height: "100%" }}>
        <DragDropContext onDragEnd={(result: DropResult) => onDragEnd(result, columns, setColumns)}>
          {
            Object.entries(columns).map(([id, column]) => {
              return (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }} key={id}>
                  <h2>{column.name}</h2>
                  <div style={{ margin: 8 }}>
                    <Droppable droppableId={id} key={id}>
                      {(dropProvided: DroppableProvided, dropSnapshot: DroppableStateSnapshot) => {
                        return (
                          <div {...dropProvided.droppableProps}
                               ref={dropProvided.innerRef}
                               style={{
                                 background: dropSnapshot.isDraggingOver ? "lightblue" : "lightgrey",
                                 width: 250,
                                 padding: 4,
                                 minHeight: 500
                               }}
                          >
                            {/*{JSON.stringify(column)}*/}
                            {column.items.map((item: any, index: number) => {
                              return (
                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                  {
                                    (dragProvided, dragSnapshot) => {
                                      return (
                                        <div ref={dragProvided.innerRef}
                                             {...dragProvided.draggableProps}
                                             {...dragProvided.dragHandleProps}
                                             style={{
                                               userSelect: "none",
                                               padding: 16,
                                               margin: "0 0 8px 0",
                                               minHeight: "50px",
                                               backgroundColor: dragSnapshot.isDragging ? "lightgreen" : "silver",
                                               ...dragProvided.draggableProps.style
                                             }}
                                        >
                                          {item.content}
                                        </div>
                                      )
                                    }
                                  }
                                </Draggable>
                              )
                            })}
                            {dropProvided.placeholder}
                          </div>
                        )
                      }}
                    </Droppable>
                  </div>
                </div>
              )
            })
          }
        </DragDropContext>
      </div>
    </Layout>
  )
}

export default DNDPage