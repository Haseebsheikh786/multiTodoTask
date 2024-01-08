import { IoIosRemove, IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Modal, ModalBody } from "reactstrap";
import React, { useState, useEffect } from "react";
import {
    addUser,
    deleteUser,
    fetchUsers,
    updateUser,
} from "../store/crudAction";
import { useDispatch, useSelector } from "react-redux";

function Home() {
    const [modal, setModal] = useState(false);
    const [todo, setTodo] = useState({ title: "", tasks: [""] });
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const Alltodos = useSelector((state) => state.todos.todos);
    const dispatch = useDispatch();

    const handleTitleChange = (value) => {
        setTodo({ ...todo, title: value });
    };

    const handleTaskChange = (index, value) => {
        const newTasks = [...todo.tasks];
        newTasks[index] = value;
        setTodo({ ...todo, tasks: newTasks });
    };

    const handleAddTask = () => {
        setTodo({ ...todo, tasks: [...todo.tasks, ""] });
    };

    const handleRemoveTask = (index) => {
        const newTasks = [...todo.tasks];
        newTasks.splice(index, 1);
        setTodo({ ...todo, tasks: newTasks });
    };

    const handleAddToFirebase = async () => {
        if (todo.title && todo.tasks) {
            await dispatch(addUser(todo));
            setTodo({ title: "", tasks: [""] });
        }
    };

    const handleDeleteTask = async (id) => {
        dispatch(deleteUser(id));
    };

    const handleUpdateTask = (id) => {
        const selectedTodo = Alltodos.find((todo) => todo.id === id);
        if (selectedTodo) {
            setTodo({
                title: selectedTodo.title,
                tasks: [...selectedTodo.tasks],
            });
            setSelectedTaskId(id);
            setModal(true);
        }
    };

    const handleUpdate = () => {
        const isFirstInputBoxNonEmpty = todo.title.trim() !== "";

        const nonEmptyTasks = todo.tasks.filter((task) => task.trim() !== "");

        if (isFirstInputBoxNonEmpty && nonEmptyTasks.length > 0) {
            if (selectedTaskId) {
                dispatch(
                    updateUser({
                        id: selectedTaskId,
                        todo: { ...todo, tasks: nonEmptyTasks },
                    })
                );
                setTodo({ title: "", tasks: [""] });
                setSelectedTaskId(null);
                setModal(false);
            }
        }
    };

    useEffect(() => {
        const getTasks = async () => {
            try {
                await dispatch(fetchUsers());
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        getTasks();
    }, [dispatch, todo, Alltodos]);

    return (
        <>
            <div className="card container">
                <div className="card-body">
                    <h2 className="card-title m-2 text-center">DoMeLater</h2>
                    <form>
                        <div className="m-2">
                            <h5>Title:</h5>
                            <input
                                className="py-1"
                                type="text"
                                value={todo.title}
                                onChange={(e) =>
                                    handleTitleChange(e.target.value)
                                }
                                required
                            />
                        </div>
                        <h5 className="m-2">Task:</h5>
                        {todo.tasks.map((task, index) => (
                            <div key={index} className="m-2">
                                <div>
                                    <input
                                        className="mb-1 py-1"
                                        type="text"
                                        value={task}
                                        onChange={(e) =>
                                            handleTaskChange(
                                                index,
                                                e.target.value
                                            )
                                        }
                                        required
                                    />
                                    {index === todo.tasks.length - 1 && (
                                        <>
                                            <button
                                                type="button"
                                                className="btn btn-light mx-2"
                                                onClick={handleAddTask}
                                            >
                                                <IoMdAdd />
                                            </button>
                                            {todo.tasks.length > 1 && (
                                                <button
                                                    type="button"
                                                    className="btn btn-danger"
                                                    onClick={() =>
                                                        handleRemoveTask(index)
                                                    }
                                                >
                                                    <IoIosRemove />
                                                </button>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                        <button
                            type="button"
                            className="btn btn-primary mx-2"
                            onClick={handleAddToFirebase}
                        >
                            Add
                        </button>
                    </form>
                </div>
                {Alltodos
                    ? Alltodos?.map((e) => {
                          return (
                              <div key={e.id} className="card-body">
                                  <h4 className="mx-2">
                                      {e.customId}:{e?.title}
                                  </h4>
                                  {e?.tasks?.map((task, index) => (
                                      <p key={index} className="mx-4">
                                          {index}: {task}
                                      </p>
                                  ))}
                                  <div className="mx-4">
                                      <button
                                          className="btn btn-secondary mx-2"
                                          onClick={() => handleUpdateTask(e.id)}
                                      >
                                          {" "}
                                          <FaEdit />
                                      </button>
                                      <button
                                          className="btn btn-warning"
                                          onClick={() => handleDeleteTask(e.id)}
                                      >
                                          {" "}
                                          <MdDelete />
                                      </button>
                                  </div>
                              </div>
                          );
                      })
                    : null}
            </div>
            <Modal isOpen={modal} toggle={() => setModal(!modal)}>
                <ModalBody className="mx-5">
                    <h2 className="card-title mb-4">Edit Mission</h2>
                    <form>
                        <div className="m-2">
                            <h5>Title:</h5>
                            <input
                                type="text"
                                value={todo.title}
                                onChange={(e) =>
                                    handleTitleChange(e.target.value)
                                }
                            />
                        </div>
                        <div className="m-2">
                            <h5>Task:</h5>
                            {todo.tasks.map((task, index) => (
                                <div key={index}>
                                    <input
                                        className="mb-2"
                                        type="text"
                                        value={task}
                                        onChange={(e) =>
                                            handleTaskChange(
                                                index,
                                                e.target.value
                                            )
                                        }
                                    />
                                    {index === todo.tasks.length - 1 && (
                                        <>
                                            <button
                                                type="button"
                                                className="btn btn-secondary mx-2"
                                                onClick={handleAddTask}
                                            >
                                                <IoMdAdd />
                                            </button>
                                            {todo.tasks.length > 1 && (
                                                <button
                                                    type="button"
                                                    className="btn btn-danger"
                                                    onClick={() =>
                                                        handleRemoveTask(index)
                                                    }
                                                >
                                                    <IoIosRemove />
                                                </button>
                                            )}
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                        <button
                            type="button"
                            className="btn btn-primary mx-2"
                            onClick={handleUpdate}
                        >
                            Update
                        </button>
                    </form>
                </ModalBody>
            </Modal>
        </>
    );
}

export default Home;
