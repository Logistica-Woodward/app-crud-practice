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

		// const newTodos = [todo, ...todos]
		// setTodos(newTodos)
		// console.log(todo, ...todos);
		axios.post(`${URL_API}create/todos`, {
			title,
			status: true,
		})
		.then(result => {
			setTodos(result.data.result)
		})
		.catch((err) => {
			console.log(err)
		});
	};

	//const updateTodo = (todoId, newValue) => {
	//	if(!newValue.text || /^\s*$/.test(newValue.text)) {
	//		return;
	//	}
	const updateTodo = (todo, newValue ) => {
		if(!newValue.text || /^\s*$/.test(newValue.text)) {
			return;
			console.log(newValue)
		}
		const {
			title,
			status,
			id
		} = newValue

		axios.post('http://update/todos',{
			newValue,
			//status: true,
		})
		
		.then(result => {
			setTodos(result.data.result)
		})
		.catch((err) => {
			console.log(err)
		});
	};



		//setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item))
		//);


	const removeTodo = id => {
		axios.get(`${URL_API}delete/todos/${id}`)
		.then(result => {
			console.log(result)
		})
		.catch((err) => {
			console.log(err)
		});
	}

	const completeTodo = id => {
		let updatedTodos = todos.map(todo => {
			if (todo.id === id) {
				todo.isComplete = !todo.isComplete
			}
			return todo 
		})
		setTodos(updatedTodos);

	}

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
				completeTodo = {completeTodo}
				removeTodo = {removeTodo}
				updateTodo={updateTodo}
			/>
		</div>
	);
}

export default TodoList;
