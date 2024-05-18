'use strict';

// selectors
const todoInput = document.querySelector('.wrapper__input');
const todoBtn = document.querySelector('.wrapper__btn');
const todoList = document.querySelector('.todo-container__list');
const filterOptions = document.querySelector('.filter-todo');

// event listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOptions.addEventListener('click', filterTodo);

// functions
function addTodo(event) {
	event.preventDefault();

	// todo li
	const todoDiv = document.createElement('li');
	todoDiv.classList.add('todo-container__item');
	// todo span
	const todoText = document.createElement('span');
	todoText.classList.add('todo-container__text');
	todoText.textContent = todoInput.value;
	// todo check
	const todoComplete = document.createElement('button');
	todoComplete.innerHTML = '<i class="fas fa-check"></i>';
	todoComplete.classList.add('todo-container__complete');

	// todo button
	const todoBtn = document.createElement('button');
	todoBtn.classList.add('todo-container__btn');
	todoBtn.innerHTML = '<i class="fas fa-trash"></i>';

	// local storage
	saveLocalTodos(todoInput.value, false);

	// append text
	todoDiv.append(todoText);
	// append buttonComplete
	todoDiv.append(todoComplete);
	// append Button
	todoDiv.append(todoBtn);
	// append ul
	todoList.append(todoDiv);

	// clear input
	todoInput.value = '';
}

function deleteCheck(event) {
	const item = event.target;

	// delete
	if (item.classList.contains('todo-container__btn')) {
		const todo = item.parentElement;
		// animate
		todo.classList.add('fall');
		// remove local storage
		removeLocalStorage(todo);
		todo.addEventListener('transitionend', () => {
			todo.remove();
		});
	}

	// check
	if (item.classList.contains('todo-container__complete')) {
		const todoComplete = item.parentElement;
		todoComplete.classList.toggle('completed');
		updateLocalStorage(todoComplete);
	}
}

function filterTodo(event) {
	const todos = todoList.childNodes;

	todos.forEach((todo) => {
		switch (event.target.value) {
			case 'all':
				todo.style.display = 'flex';
				break;
			case 'completed':
				if (todo.classList.contains('completed')) {
					todo.style.display = 'flex';
				} else {
					todo.style.display = 'none';
				}
				break;
			case 'uncompleted':
				if (!todo.classList.contains('completed')) {
					todo.style.display = 'flex';
				} else {
					todo.style.display = 'none';
				}
				break;
		}
	});
}

function saveLocalTodos(todoText, completed) {
	let todos;

	if (localStorage.getItem('todos') === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem('todos'));
	}

	todos.push({ text: todoText, completed: completed });
	localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
	let todos;

	if (localStorage.getItem('todos') === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem('todos'));
	}

	todos.forEach((todo) => {
		// todo li
		const todoDiv = document.createElement('li');
		todoDiv.classList.add('todo-container__item');
		if (todo.completed) {
			todoDiv.classList.add('completed');
		}
		// todo span
		const todoText = document.createElement('span');
		todoText.classList.add('todo-container__text');
		todoText.textContent = todo.text;
		// todo check
		const todoComplete = document.createElement('button');
		todoComplete.innerHTML = '<i class="fas fa-check"></i>';
		todoComplete.classList.add('todo-container__complete');

		// todo button
		const todoBtn = document.createElement('button');
		todoBtn.classList.add('todo-container__btn');
		todoBtn.innerHTML = '<i class="fas fa-trash"></i>';

		// append text
		todoDiv.append(todoText);
		// append buttonComplete
		todoDiv.append(todoComplete);
		// append Button
		todoDiv.append(todoBtn);
		// append ul
		todoList.append(todoDiv);
	});

	console.log(todos);
}

function removeLocalStorage(todo) {
	let todos;

	if (localStorage.getItem('todos') === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem('todos'));
	}

	const todoIndex = todo.children[0].textContent;
	todos.splice(
		todos.findIndex((todo) => todo.text === todoIndex),
		1
	);

	localStorage.setItem('todos', JSON.stringify(todos));
}

function updateLocalStorage(todo) {
	let todos;

	if (localStorage.getItem('todos') === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem('todos'));
	}

	const todoIndex = todo.children[0].textContent;
	const todoObj = todos.find((todo) => todo.text === todoIndex);
	todoObj.completed = todo.classList.contains('completed');

	localStorage.setItem('todos', JSON.stringify(todos));
}
