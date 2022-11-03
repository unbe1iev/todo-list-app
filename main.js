window.addEventListener('load', () => {
    todos = JSON.parse(localStorage.getItem('todos')) || [];
    const nameInput = document.querySelector('#name');
    const newTodoForm = document.querySelector('#addTodoForm')

   newTodoForm.addEventListener('submit', e => {
       e.preventDefault();

       const todo = {
           content: e.target.elements.addTodoContent.value,
           date: e.target.elements.addTodoDate.value,
           done: false,
           createdAt: new Date().getTime()
       }

       todos.push(todo);

       localStorage.setItem('todos', JSON.stringify(todos));

       e.target.reset();

       displayTodos();
   })

    displayTodos()
})

function displayTodos() {
    
}