import { DragEvent, useState } from "react";
import Swal from "sweetalert2";
import { useTaskStore } from "../../stores";
import { TaskStatus } from "../../types";

export const useTaskHook = (status: TaskStatus) => {
  const isDragging = useTaskStore(state => !!state.draggingTaskId);

  const onTaskDrop = useTaskStore(state => state.onTaskDrop);

  const addTask = useTaskStore(state => state.addTask);

  // const changeTaskStatus = useTaskStore(state => state.changeTaskStatus);
  // const draggingTaskId = useTaskStore(state => state.draggingTaskId);

  const [onDragOver, setOnDragOver] = useState(false);

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setOnDragOver(true);
  };
  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setOnDragOver(false);
  };
  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setOnDragOver(false);
    // changeTaskStatus(draggingTaskId!, value);
    onTaskDrop(status);
  };
  const handleAddTask = async () => {
    const resp = await Swal.fire({
      title: "Nueva tarea",
      input: "text",
      inputLabel: "Nombre de la tarea",
      inputPlaceholder: "Ingrese el nombre de la tarea",
      showCancelButton: true,
      inputValidator: value => {
        if (!value) {
          return "Debe ingresar un nombre para la tarea";
        }
      },
    });
    addTask(resp.value, status);
  };
  return {
    isDragging,
    onDragOver,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleAddTask,
  };
};
