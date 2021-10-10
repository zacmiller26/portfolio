import React, { useCallback, useEffect, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { v4 as uuidv4 } from 'uuid'

import Modal from '../../modals/Modal'
import TextArea from '../formComponents/TextArea'
import usePortal from '../../hooks/usePortal'
import styles from './KanBan.module.sass'

interface TaskType {
  id: string
  content: string
}

type TaskStateType = TaskType[][]

const DEFAULT_STATE: TaskStateType = [
  [
    { id: uuidv4(), content: 'Wake up @ 5:30' },
    { id: uuidv4(), content: 'Make coffee, feed Tegan' },
    { id: uuidv4(), content: 'Go for a run 🏃🏻‍♂️' },
    { id: uuidv4(), content: 'Start oatmeal, hop in shower' },
    { id: uuidv4(), content: 'Load up oatmeal with berries and eat up 😋' },
    { id: uuidv4(), content: 'Start working ☕️' },
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

  const [labels, _setLabels] = useState(['To Do', 'In Progress', 'Complete'])
  const [tasks, setTasks] = useState<TaskStateType>(DEFAULT_STATE)

  const addTask = useCallback((colIndex: number, newTask: TaskType) => {
    setTasks(prev => {
      const newTasks = [...prev]
      newTasks[colIndex] = [...newTasks[colIndex], newTask]
      return newTasks
    })
  }, [])

  const removeTask = useCallback((colIndex: number, id: string) => {
    setTasks(prev => {
      const newTasks = [...prev]
      const colTasks = newTasks[colIndex]
      const index = colTasks.findIndex(t => t.id === id)
      newTasks[colIndex] = [
        ...colTasks.slice(0, index),
        ...colTasks.slice(index + 1, colTasks.length)
      ]
      return newTasks
    })
  }, [])

  const updateTask = useCallback(
    (colIndex: number, id: string, content: string) => {

    setTasks(prev => {
      const newTasks = [...prev]
      const index = newTasks[colIndex].findIndex(t => t.id === id)
      newTasks[colIndex][index].content = content
      return newTasks
    })
    // update
  }, [])

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

  return (
    <div className={styles.root}>
      <DragDropContext onDragEnd={onDragEnd}>
        {tasks.map((colTasks, index) => (
          <KanBanTaskColumn
            key={index}
            id={index}
            label={labels[index]}
            addTask={addTask}
            removeTask={removeTask}
            updateTask={updateTask}
            tasks={colTasks}
          />
        ))}
      </DragDropContext>
    </div>
  )
}

interface ColumnProps {
  addTask: Function
  removeTask: Function
  updateTask: Function
  id: number
  label: string
  tasks: TaskType[]
}

const KanBanTaskColumn: React.FC<ColumnProps> = props => {

  const [task, setTask] = useState<null | TaskType>(null)
  const [textareaVal, setTextareaVal] = useState('')

  const getListStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? 'rgba(var(--accent-rgb), .1)' : undefined,
    borderColor: isDraggingOver ? 'var(--accent)': undefined
  })

  const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    userSelect: 'none',
    background: isDragging ? 'var(--accent)' : undefined,
    color: isDragging ? 'var(--background-secondary)' : undefined,
    position: isDragging ? 'fixed' : undefined,
    ...draggableStyle
  })

  useEffect(() => {
    if(task === null) setTextareaVal('')
    else setTextareaVal(task.content)
  }, [task])

  return (
    <>
      <div className={styles.column}>
        <div className={styles.header}>
          <h2>{props.label} <em>({props.tasks.length})</em></h2>
          <button type="button" onClick={() => {
            const newTask = { id: uuidv4(), content: '' }
            props.addTask(props.id, newTask)
            setTask(newTask)
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
                    <PortalAwareTask isDragging={snapshot.isDragging}>
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
                        <span>
                          {item.content}
                        </span>
                        <button
                          type="button"
                          onClick={() => setTask(item)}
                        >
                          Edit
                        </button>
                      </div>
                    </PortalAwareTask>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
      {task !== null && <Modal
        title={
          task.content.length > 1 ?
          `Edit Task`: `New Task in ${props.label}`
        }
        close={() => setTask(null)}
        isOpen={(task !== null)}
        footer={
          <>
            <div>
              <button
                type="button"
                onClick={() => {
                  props.updateTask(props.id, task.id, textareaVal)
                  setTask(null)
                }}>
                Save Changes
              </button>
            </div>
            <div>
              <button
                type="button"
                onClick={() => {
                  props.removeTask(props.id, task.id)
                  setTask(null)
                }}
              >
                Delete Task
              </button>
            </div>
          </>
        }
      >
        <TextArea
          onChange={e => {
            if(e?.currentTarget?.value) {
              setTextareaVal(e.currentTarget.value)
            }
          }}
          focusOnInit={true}
          minRows={1}
          placeholder="Details about your task!"
          value={textareaVal}
          name="task-content"
          id="id-task-content"
        />
      </Modal>}
    </>
  )

}

interface PortalTaskProps {
  children: React.ReactNode
  isDragging: boolean
}

const PortalAwareTask: React.FC<PortalTaskProps> = props => {

  const { makePortal } = usePortal()

  return props.isDragging ? (
    <>{makePortal(props.children)}</>
  ) : <>{props.children}</>

}

export default KanBan
