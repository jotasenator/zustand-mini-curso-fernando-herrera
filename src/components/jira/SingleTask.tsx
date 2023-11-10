import { IoReorderTwoOutline } from "react-icons/io5";
import { Task } from "../../types";
import { useTaskStore } from "../../stores";
import Swal from "sweetalert2";

type Props = {
  task: Task;
};

const SingleTask = ({ task }: Props) => {
  const setDraggingTaskId = useTaskStore(state => state.setDraggingTaskId);
  const removeDraggingTaskId = useTaskStore(
    state => state.removeDraggingTaskId
  );
  const removeTask = useTaskStore(state => state.removeTask);

  const handleRemoveTask = async (taskId: string) => {
    await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(result => {
      if (result.isConfirmed) {
        removeTask(taskId);
        Swal.fire({
          title: "Deleted!",
          text: "Your task has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div
      draggable
      onDragStart={() => setDraggingTaskId(task.id)}
      onDragEnd={() => removeDraggingTaskId()}
      className="mt-5 flex items-center justify-between p-2"
    >
      <div className="flex items-center justify-center gap-2">
        <p className="text-base font-bold text-navy-700">{task.title}</p>
      </div>
      <span
        onClick={() => handleRemoveTask(task.id)}
        className=" h-6 w-6 text-navy-700 cursor-pointer"
      >
        <IoReorderTwoOutline />
      </span>
    </div>
  );
};

export default SingleTask;
