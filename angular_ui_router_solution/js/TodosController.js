(function() {
	'use strict';

	angular.module("todoApp")
		.controller("TodosController", TodosController);

	function TodosController(){
		var vm = this;

		vm.todoList = [
			{task: "build an awesome todo app", done: false},
			{task: "get super good at Angular", done: false},
			{task: "party on code", done: false},
			{task: "tackle the bonus challenges for this lesson", done: false},
			{task: "take a nap", done: false}
		];
		vm.addTodo = addTodo;
		vm.deleteTodo = deleteTodo;
		vm.completedTodos = completedTodos;
		vm.remainingTodos = remainingTodos;

		//function that allows us to add new todos to our todoList
		function addTodo(){
			vm.todoList.push({task: vm.text, done: false});
			vm.text = null;
		}

		//function that allows us to delete specific todos from our todoList
		function deleteTodo($index){
			vm.todoList.splice($index, 1);
		}

		//returns a count of the tasks that have been marked as done
		function completedTodos(){
			return vm.todoList.filter(function(x){ return x.done == true; })
		}

		//returns a count of the tasks that have not been marked as done
		function remainingTodos(){
			return vm.todoList.filter(function(x){ return x.done == false; })
		}
	}
}());
