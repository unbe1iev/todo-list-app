function getToday() {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    return today;
}

const newDate = document.getElementById('newTodoDate');
newDate.setAttribute('min', getToday());

window.addEventListener('load', () => {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    const addTodoForm = document.querySelector('#addTodoForm')

    const params = {
        content: "",
        date1: "",
        date2: ""
    }

    localStorage.setItem('searchParams', JSON.stringify(params));

    addTodoForm.addEventListener('submit', e => {
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

    const searchTodoForm = document.querySelector('#searchTodoForm')

    searchTodoForm.addEventListener('submit', e => {
        e.preventDefault();

        const params = {
            content: e.target.elements.searchTodoContent.value,
            date1: e.target.elements.searchTodoDate1.value,
            date2: e.target.elements.searchTodoDate2.value
        }

        localStorage.setItem('searchParams', JSON.stringify(params));

        displayTodos();
    })

    displayTodos()
})

function displayTodos() {
    const todoList = document.querySelector('#todoList');

    todoList.innerHTML = '';

    let searchParams = JSON.parse(localStorage.getItem('searchParams')) || [];
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    let filteredTodos;

    if ((searchParams.content === "") && (searchParams.date1 === "") && (searchParams.date2 === "")) {
        filteredTodos = todos;
    } else {
        todos = todos
            .filter(td => td.content.toLowerCase().includes(searchParams.content.toLowerCase()))
            .filter(td => td.date >= searchParams.date1 || td.date === "");
        filteredTodos = todos;

        if (searchParams.date2 !== "") {
            todos = todos.filter(td => td.date <= searchParams.date2 || td.date === "");
            filteredTodos = todos;
        }
    }

    filteredTodos.forEach(todo => {

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

        if (searchParams.content !== "") {
            let index1 = todoContent.value.indexOf(searchParams.content)
            let index2 = index1 + searchParams.content.length;

            const searchToEditSpan = document.createElement('span');
            searchToEditSpan.innerHTML = "<span style='color: green; font-weight: bold'>Found: </span>" +
                todoContent.value.substring(0, index1) + "<span style='background-color: yellow'>" + todoContent.value.substring(index1, index2) + "</span>" +
                todoContent.value.substring(index2, todoContent.value.length)

            todoContentTd.appendChild(searchToEditSpan);
        }

        todoContent.readOnly = true;

        const todoDateTd = document.createElement('td');
        todoDateTd.classList.add('todoDate');
        const todoDate = document.createElement('input');
        todoDate.setAttribute('type', 'date');
        todoDate.setAttribute('readonly', true);
        todoDate.value = todo.date;

        const todoActionsTd = document.createElement('td');
        todoActionsTd.classList.add('todoDate');
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('deleteButton');
        deleteButton.innerHTML = 'Delete';

        //............................

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

        checkbox.addEventListener('change', e => {
            todo.done = e.target.checked;
            localStorage.setItem('todos', JSON.stringify(todos));

            if (todo.done) {
                todoItemTr.classList.add('done');
            } else {
                todoItemTr.classList.remove('done');
            }

            displayTodos();
        })

        todoContent.addEventListener('click', e => {
            todoContent.removeAttribute('readonly');

            todoContent.addEventListener('blur', e => {

                if ((e.target.value.length >= 3) && (e.target.value.length <= 255)) {
                    todo.content = e.target.value;
                    localStorage.setItem('todos', JSON.stringify(todos));
                } else alert("Edited length of content must be in the range [3, 255]!");

                todoContent.setAttribute('readonly', true);
                displayTodos();
            })
        })

        todoDate.addEventListener('click', e => {
            todoDate.removeAttribute('readonly');

            todoDate.addEventListener('blur', e => {

                todo.date = e.target.value;
                localStorage.setItem('todos', JSON.stringify(todos));

                todoDate.setAttribute('readonly', true);
                displayTodos();
            })
        })

        deleteButton.addEventListener('click', e => {
            todos = todos.filter(t => t !== todo);
            localStorage.setItem('todos', JSON.stringify(todos));

            displayTodos();
        })
    })
}