import React, { useState, useEffect} from 'react';
import axios from 'axios';

import TodoForm from './TodoForm';
import Todo from './Todo';

const URL_API = 'https://api-todo-woodward.herokuapp.com/';

function TodoList() {
	const [todos, setTodos] = useState([]);

	const addTodo = todo => {
		const {
			title,
		} = todo;

		if(!title || /^\s*$/.test(title)) {
			return
		}

		axios.post(`${URL_API}create/todos`, {
			title,
			status: false,
		})
		.then(result => {
			setTodos(result.data.result)
		})
		.catch((err) => {
			console.log(err)
		});
	};

	const updateTodo = (id, newValue ) => {
		const {
			title,
		} = newValue;

		if(!title || /^\s*$/.test(title)) {
			return;
		}

		axios.post(`${URL_API}update/todos`,{
			title,
			id,
		});
	};

	const removeTodo = id => {
		axios.get(`${URL_API}delete/todos/${id}`)
		.then(result => {
			console.log(result)
		})
		.catch((err) => {
			console.log(err)
		});
	}

	const completeTodo = id => (
		axios.post(`${URL_API}update/todos/status`, {
			status: true,
			id,
		})
	);

	useEffect(() => {
		axios.get(`${URL_API}read/todos`)
		.then(result => {
			setTodos(result.data.result)
		})
		.catch((err) => {
			console.log(err)
		})
	})

	return (
		<div>
			<h1>What's the plan for today?</h1>
			<TodoForm onSubmit={addTodo} />
			<Todo 
				todos={todos} 
				completeTodo={completeTodo}
				removeTodo={removeTodo}
				updateTodo={updateTodo}
			/>
		</div>
	);
}

export default TodoList;
