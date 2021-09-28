import React, { useCallback, useEffect, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { v4 as uuidv4 } from 'uuid'

import styles from './KanBan.module.sass'

interface TaskType {
  id: string
  content: string
}

type TaskStateType = TaskType[][]

const DEFAULT_STATE: TaskStateType = [
  [
    { id: uuidv4(), content: 'Review portfolio' },
    { id: uuidv4(), content: 'Stand up and applaud' },
    { id: uuidv4(), content: 'Daydream about Zac' },
    { id: uuidv4(), content: 'Contact Zac' },
    { id: uuidv4(), content: 'Hire Zac' },
    { id: uuidv4(), content: 'Succeed in life' },
  ],
  [],
  []
]

const reorder = (
  tasks: TaskType[],
  startIndex: number,
  endIndex: number
) : TaskType[] => {

  const result = Array.from(tasks)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result

}

const move = (
  source: any,
  destination: any,
  droppableSource: any,
  droppableDestination: any
) => {

  const sourceClone = Array.from(source)
  const destClone = Array.from(destination)
  const [removed] = sourceClone.splice(droppableSource.index, 1)

  destClone.splice(droppableDestination.index, 0, removed)

  const result: any = {}
  result[droppableSource.droppableId] = sourceClone
  result[droppableDestination.droppableId] = destClone
  return result

}

interface Props {}

const KanBan: React.FC<Props> = () => {

  const [labels, setLabels] = useState(['To Do', 'In Progress', 'Complete'])
  const [tasks, setTasks] = useState<TaskStateType>(DEFAULT_STATE)

  const addTask = useCallback((colIndex: number, newTask: TaskType) => {
    const newTasks = [...tasks]
    newTasks[colIndex] = [...newTasks[colIndex], newTask]
    setTasks(newTasks)
  }, [tasks])

  const onDragEnd = (result: any) => {

    if (!result.destination) {
      return
    }
    const prevDestinationId = result.source.droppableId
    const newDestinationId = result.destination.droppableId
    const prevDestinationTasks = tasks[prevDestinationId]
    const newDestinationTasks = tasks[newDestinationId]
    const prevIndex = result.source.index
    const newIndex = result.destination.index

    if(prevDestinationId === newDestinationId) {

      setTasks(prev => {
        const items = reorder(tasks[prevDestinationId], prevIndex, newIndex)
        const newState = [...prev]
        newState[prevDestinationId] = items
        return newState
      })

    } else {

      const sourceClone = Array.from(prevDestinationTasks)
      const destClone = Array.from(newDestinationTasks)
      const [removed] = sourceClone.splice(prevIndex, 1)

      destClone.splice(newIndex, 0, removed)

      setTasks(prev => {

        const newTasks: any = move(
          prev[prevDestinationId],
          prev[newDestinationId],
          result.source,
          result.destination
        )

        const newState = [...prev]
        newState[prevDestinationId] = newTasks[prevDestinationId]
        newState[newDestinationId] = newTasks[newDestinationId]
        return newState//.filter(group => group.length)


      })

    }

  }

  useEffect(() => {console.log('updated state!', tasks)}, [tasks])

  return (
    <div className={styles.root}>
      <DragDropContext onDragEnd={onDragEnd}>
        {tasks.map((colTasks, index) => (
          <KanBanTaskColumn
            key={index}
            id={index}
            label={labels[index]}
            addTask={addTask}
            tasks={colTasks}
          />
        ))}
      </DragDropContext>
    </div>
  )
}

interface ColumnProps {
  addTask: Function
  id: number
  label: string
  tasks: TaskType[]
}

const KanBanTaskColumn: React.FC<ColumnProps> = props => {

  const getListStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? 'rgba(var(--accent-rgb), .1)' : undefined,
    borderColor: isDraggingOver ? 'var(--accent)': undefined
  })

  const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    userSelect: 'none',
    background: isDragging ? 'var(--accent)' : undefined,
    color: isDragging ? 'var(--background-secondary)' : undefined,
    ...draggableStyle,
  })

  return (
    <div className={styles.column}>
      <div className={styles.header}>
        <h2>{props.label} <em>({props.tasks.length})</em></h2>
        <button type="button" onClick={() => {
          props.addTask(props.id, { id: uuidv4(), content: 'Hello mate' })
        }}>+</button>
      </div>
      <Droppable droppableId={props.id.toString()} direction="vertical">
        {(provided, snapshot) => (
          <div
            className={styles.tasks}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
            {...provided.droppableProps}
          >
            {props.tasks.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    className={styles.task}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                  >
                    {item.content}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )

}

export default KanBan
