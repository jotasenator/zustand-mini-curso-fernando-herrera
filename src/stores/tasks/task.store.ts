import { StateCreator, create } from "zustand"
import { Task, TaskStatus } from "../../types"
import { devtools, persist } from "zustand/middleware"

import { v4 as uuidv4 } from 'uuid';


type TaskState = {
    // tasks: {
    //     'ID': { id: 'ID', 'title': Task }
    // }
    tasks: Record<string, Task>
    getTaskByStatus: (status: TaskStatus) => Task[];

    draggingTaskId?: string;
    setDraggingTaskId: (taskId: string) => void;
    removeDraggingTaskId: () => void;

    changeTaskStatus: (taskId: string, status: TaskStatus) => void;
    onTaskDrop: (status: TaskStatus) => void;

    addTask: (title: string, status: TaskStatus) => void;

    removeTask: (taskId: string) => void;
}

const storeApi: StateCreator<TaskState> = (set, get) => ({
    draggingTaskId: undefined,
    tasks: {
        'ABC-1': { id: 'ABC-1', title: 'Task 1', status: 'open' },
        'ABC-2': { id: 'ABC-2', title: 'Task 2', status: 'in-progress' },
        'ABC-3': { id: 'ABC-3', title: 'Task 3', status: 'open' },
        'ABC-4': { id: 'ABC-4', title: 'Task 4', status: 'open' },
        'ABC-5': { id: 'ABC-5', title: 'Task 5', status: 'open' },
    },
    getTaskByStatus: (state: TaskStatus) => {

        return Object.values(get().tasks).filter(x => x.status === state);

    },

    setDraggingTaskId: (taskId: string) => {
        set({ draggingTaskId: taskId })
    },
    removeDraggingTaskId: () => {
        set({ draggingTaskId: undefined })
    },
    changeTaskStatus: (taskId: string, status: TaskStatus) => {
        const task = get().tasks[taskId]
        task.status = status

        set((state) => ({
            tasks: {
                ...state.tasks,
                [taskId]: task,
            }
        }))

    },
    onTaskDrop: (status: TaskStatus) => {
        const taskId = get().draggingTaskId;
        if (!taskId) return

        get().changeTaskStatus(taskId, status)
        get().removeDraggingTaskId()
    },
    addTask: (title: string, status: TaskStatus) => {
        const newTask = { id: uuidv4(), title, status }
        set(state => ({
            tasks: {
                ...state.tasks,
                [newTask.id]: newTask

            }
        }))
    },
    removeTask: (taskId: string) => {
        set(state => {
            const newTasks = { ...state.tasks }
            delete newTasks[taskId]
            return { tasks: newTasks }
        })
    }
})

export const useTaskStore = create<TaskState>()(devtools(persist(storeApi, {
    name: 'task-storage',
})))