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
    const todoList = document.querySelector('#todoList');

    todoList.innerHTML = '';

    todos.forEach(todo => {

        // Generating elements in tbody (table body):
        const todoItemTr = document.createElement('tr');
        todoItemTr.classList.add('todoItem')

        const todoLabelTd = document.createElement('td');
        todoLabelTd.classList.add('todoLabel')

        const label = document.createElement('label');
        const checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.checked = todo.done;
        const bubbleSpan = document.createElement('span');
        bubbleSpan.classList.add('bubble');

        const todoContentTd = document.createElement('td');
        todoContentTd.classList.add('todoContent');
        const todoContent = document.createElement('input');
        todoContent.setAttribute('type', 'text');
        todoContent.value = todo.content;
        todoContent.readOnly = true;

        const todoDateTd = document.createElement('td');
        todoDateTd.classList.add('todoDate');
        const todoDate = document.createElement('input');
        todoDate.setAttribute('type', 'date');

        const todoActionsTd = document.createElement('td');
        todoActionsTd.classList.add('todoDate');
        const editButton = document.createElement('button');
        editButton.classList.add('editButton');
        editButton.innerHTML = 'Edit';
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('deleteButton');
        deleteButton.innerHTML = 'Delete';

        //............................

        todoActionsTd.appendChild(editButton);
        todoActionsTd.appendChild(deleteButton);

        todoDateTd.appendChild(todoDate);

        todoContentTd.appendChild(todoContent);

        label.appendChild(checkbox);
        label.appendChild(bubbleSpan);
        todoLabelTd.appendChild(label);

        todoItemTr.appendChild(todoLabelTd);
        todoItemTr.appendChild(todoContentTd);
        todoItemTr.appendChild(todoDateTd);
        todoItemTr.appendChild(todoActionsTd);

        todoList.appendChild(todoItemTr);

        //............................

        if (todo.done) {
            todoItemTr.classList.add('done');
        }

        //............................

        checkbox.addEventListener('change', (e) => {
            todo.done = e.target.checked;
            localStorage.setItem('todos', JSON.stringify(todos));

            if (todo.done) {
                todoItemTr.classList.add('done');
            } else {
                todoItemTr.classList.remove('done');
            }

            displayTodos();
        })

        editButton.addEventListener('click', (e) => {
            const input = todoContent.querySelector('input');
            input.removeAttribute('readonly');
            input.focus();
            input.addEventListener('blur', (e) => {
                input.setAttribute('readonly', true);
                todo.content = e.target.value;
                localStorage.setItem('todos', JSON.stringify(todos));
                displayTodos()
            })
        })

        deleteButton.addEventListener('click', (e) => {
            todos = todos.filter(t => t !== todo);
            localStorage.setItem('todos', JSON.stringify(todos));
            displayTodos();
        })
    })
}