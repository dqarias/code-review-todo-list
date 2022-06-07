import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import './style.css';

import {
  addTodo, editTodo, deleteTodo, getTodo, deleteAllTodo,
} from './modules/action.js';
import statusTodo from './modules/status.js';

const todos = document.querySelector('.todos__list');
const btnRemoveAll = document.querySelector('.btn-remove-all');
const formAdd = document.querySelector('.todos__add');


const todoHtml = (todo) => {

  let attClass='';
  let marked='';

  if (todo.completed) {
    attClass = 'todo_list checked__list';
    marked = 'checked';
    } else {
      attClass = 'todo_list';
    marked = '';
    }

   todos.innerHTML += `<li id="${todo.index}" class="${attClass}">
   
     <div>
       <input class="checkbox-input" type="checkbox" id="todo${todo.index}" name="todo${todo.index}" ${marked}>
       <label for="todo${todo.index}">${todo.description}</label>
     </div>
    <button type="submit" id="${todo.index}" class="btn btn-remove">
       <i class="fa-solid fa-trash"></i>
    </button>
  
   </li>`;

  // Add Event Listener for edit each single todo

  const todoList = document.querySelectorAll('.todo_list');
  todoList.forEach((singleTodo) => {
    singleTodo.addEventListener('dblclick', () => {
      const editSingleTodo = getTodo();
      const editIndex = singleTodo.getAttribute('id');
      singleTodo.innerHTML = `
 <li class= "edit_list" id= "edit${editIndex}"> 
       <div>
       <i class="icon fa-solid fa-check"></i>
         <input class="edit_list-input" id="input-edit${editIndex}" type="text"  value="${editSingleTodo[editIndex - 1].description}">
       </div>
       <button id="btn-edit${editIndex}" type ="submit" class="btn" > <i class="fa-solid fa-pen"></i></button>
</li>
 `;

      const todoEdit = document.querySelector(`#btn-edit${editIndex}`);
      todoEdit.addEventListener('click', (e) => {
        e.preventDefault();
        const inputEdit = document.querySelector(`#input-edit${editIndex}`);
        editTodo(editIndex, inputEdit.value);
        renderTodo();
      });
    });
  });

  // Add Event Listener for delete each single todo
  const removeBtn = document.querySelectorAll('.btn-remove');
  removeBtn.forEach((singleTodo) => {
    singleTodo.addEventListener('click', () => {
      deleteTodo(singleTodo.getAttribute('id'));
    });
  });

  // Add Event Listener for Checkbox

  const checkboxStatus = document.querySelectorAll('.checkbox-input');
  checkboxStatus.forEach((checkboxTodo) => {
    checkboxTodo.addEventListener('change', () => {
      const todoIndex = checkboxTodo.getAttribute('id');
      const todoId = todoIndex.slice(4);
      statusTodo(checkboxTodo, todoId);
    });
  });

  // Add Event Listener for delete all todos completed
};

const renderTodo = () => {
  const todoData = getTodo();
  todos.innerHTML = '';
  todoData.forEach((todo) => {
    todoHtml(todo);
  });
};

renderTodo();

btnRemoveAll.addEventListener('click', () => {
  deleteAllTodo();
});

formAdd.addEventListener('click', () => {
  addTodo();
}); 

export { renderTodo, todoHtml };
