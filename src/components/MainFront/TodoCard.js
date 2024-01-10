import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TrashLogo from '../../assets/trash.svg';
import EditLogo from '../../assets/edit.png';
import TodoContext from '../../context/Todo/TodoContext';
import TaskContext from '../../context/Task/TaskContext';
import SpinnerContext from '../../context/Spinner/SpinnerContext';
import { toast } from 'react-hot-toast';

const TodoCard = ({ todo, setShowEditTodoModal, todoToEdit }) => {
  const spinnerContext = useContext(SpinnerContext);
  const { isLoading, setIsLoading } = spinnerContext;

  const navigate = useNavigate();
  const todoContext = useContext(TodoContext);
  const taskContext = useContext(TaskContext);
  const { deleteTodo } = todoContext;

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleClickOnTodo = () => {
    navigate(`/${todo._id}/${todo.title}`);
  };

  const handleDelete = (todoId) => {
    // Open the confirmation modal
    setShowConfirmationModal(true);
  };

  const confirmDelete = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    deleteTodo(todo._id);
    toast.success('TODO DELETED successfully');

    // Close the confirmation modal after deletion
    setShowConfirmationModal(false);
  };

  const cancelDelete = () => {
    // Close the confirmation modal without deletion
    setShowConfirmationModal(false);
  };

  const handleEdit = () => {
    setShowEditTodoModal(true);
    todoToEdit.current = todo;
  };

  return (
    <div className='cursor-pointer flex flex-col bg-[#21202a] w-[150px] h-[160px] sm:w-[230px] sm:h-[230px] rounded-2xl relative group'>
      <div className='absolute right-3 mt-2 ml-2 sm:group-hover:block sm:hidden z-10'>
        <button onClick={handleEdit} className='hover:bg-[#191920] p-1 rounded-xl'>
          <img className='h-[16px] sm:h-[20px] ' src={EditLogo} alt='' />
        </button>
        <button onClick={() => handleDelete(todo._id)} className='hover:bg-[#191920] p-1 rounded-xl sm:ml-0 ml-4'>
          <img className='h-[16px] sm:h-[20px] ' src={TrashLogo} alt='' />
        </button>
      </div>

      <div className='w-[150px] h-[160px] sm:w-[230px] sm:h-[230px]' onClick={handleClickOnTodo}>
        <div className='top-[30%] sm:top-[40%] absolute w-full sm:group-hover:top-[10%]  ease-in-out duration-300'>
          <h1
            style={{
              fontSize: '14px',
              textAlign: 'center',
              fontWeight: 'bold',
              color: '#fd77a1',
              transition: 'ease-in-out 300ms',
              opacity: '1',
            }}
          >
            {todo.title.length > 15 ? todo.title.slice(0, 14).concat('...') : todo.title}
          </h1>
          <div
            style={{
              marginLeft: 'auto',
              marginRight: 'auto',
              width: '10px',
              height: '10px',
              borderRadius: '8px',
              backgroundColor: `bg-${todo.color}-500`,
            }}
          ></div>
        </div>

        <div
          style={{
            marginTop: '7px',
            marginBottom: '0',
            fontSize: '10px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            top: '40%',
            position: 'absolute',
            width: '100%',
            color: 'white',
            transition: 'ease-in-out 300ms',
            opacity: '0',
          }}
        >
          <h4 style={{ color: '#cc9258', fontWeight: 'bold' }}>
            Tasks: <span style={{ fontWeight: '600' }}>{todo.tasks.length}</span>
          </h4>
          <h4 style={{ color: '#419796', fontWeight: 'bold' }}>
            In Progress: <span style={{ fontWeight: '600' }}>{todo.tasks.filter((e) => !e.checked).length}</span>
          </h4>
          <h4 style={{ color: '#3aab75', fontWeight: 'bold' }}>
            Completed: <span style={{ fontWeight: '600' }}>{todo.tasks.filter((e) => e.checked).length}</span>
          </h4>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmationModal && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            zIndex: '1000',
          }}
        >
          <p style={{ marginBottom: '20px', fontSize: '16px' }}>Are you sure you want to delete this task?</p>
          <button
            style={{
              cursor: 'pointer',
              backgroundColor: '#4caf50',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '4px',
              fontSize: '14px',
              marginRight: '10px',
            }}
            onClick={confirmDelete}
          >
            Yes
          </button>
          <button
            style={{
              cursor: 'pointer',
              backgroundColor: '#aaa',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '4px',
              fontSize: '14px',
            }}
            onClick={cancelDelete}
          >
            No
          </button>
        </div>
      )}
    </div>
  );
};

export default TodoCard;
