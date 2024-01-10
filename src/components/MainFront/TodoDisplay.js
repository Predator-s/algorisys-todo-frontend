import React, { useContext, useEffect, useState } from 'react';
import TodoCard from './TodoCard';
import addLogo from '../../assets/add-btn.svg';
import TodoContext from '../../context/Todo/TodoContext';
import Spinner from '../Spinner';
import SpinnerContext from '../../context/Spinner/SpinnerContext';
import { useCookies } from 'react-cookie';
import { useLocation, useNavigate } from 'react-router-dom';
import Search from '../Search';

const TodoDisplay = ({ setShowTodoModal, setShowEditTodoModal, todoToEdit }) => {
  const todoContext = useContext(TodoContext);
  const spinnerContext = useContext(SpinnerContext);
  const { getTodos, todos } = todoContext;
  const navigate = useNavigate();
  const { isLoading, setIsLoading } = spinnerContext;
  const [cookies] = useCookies();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const todosPerPage = 5;

  useEffect(() => {
    if (!cookies.token) {
      console.log('first');
      navigate('/signup');
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 500);

    getTodos();
  }, [cookies.token]);

  const handleAdd = () => {
    setShowTodoModal(true);
  };

  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

  const renderTodos = () => {
    if (isLoading || currentTodos.length === 0) {
      return (
        <div className='absolute top-[50%] sm:left-[50%]'>
          {currentTodos.length === 0 && <h1 className='text-[#fd77a1] font-bold'>No todos</h1>}
          <Spinner isLoading={true} />
        </div>
      );
    }

    return currentTodos.map(element => (
      <TodoCard key={element._id} todo={element} setShowEditTodoModal={setShowEditTodoModal} todoToEdit={todoToEdit} />
    ));
  };

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(todos.length / todosPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <div className='h-[95vh] w-[100vw] sm:w-[80vw] flex flex-col items-center justify-center bg-[#191920] relative'>
        <Search />

        <div className='flex flex-wrap gap-[20px] sm:gap-[80px] my-20 mt-8 mb-10 w-[80%] h-[90vh] justify-center py-10 overflow-y-scroll'>
          {renderTodos()}
        </div>

        {/* Pagination */}
        {pageNumbers.length > 1 && (
          <ul className='flex space-x-4'>
            {pageNumbers.map(number => (
              <li key={number} className='cursor-pointer'>
                <button
                  className={`border border-white px-3 py-1 rounded-full text-white ${
                    currentPage === number ? 'bg-white text-[#191920]' : ''
                  }`}
                  onClick={() => paginate(number)}>
                  {number}
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* add button */}
        <button
          onClick={handleAdd}
          className='bg-[#fd77a1] rounded-[50%] px-4 py-4 absolute right-6 sm:right-20 bottom-2 sm:bottom-6 duration-200 ease-in-out hover:bg-[#ac2e56]'>
          <img className='invert h-[20px] sm:h-[40px]' src={addLogo} alt='' />
        </button>
      </div>
    </>
  );
};

export default TodoDisplay;
