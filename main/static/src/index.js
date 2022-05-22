window.onload = function () {
    function fetchTasks(filter) {
        const host = "http://localhost:8000";
        $.ajax({
            url: host + '/api/task/',
            method: 'GET',
            data: {},
            success: function (tasks, status) {
                taskFilter(tasks, filter);
                printCounter(counter,checkboxes);
            },
            error: function (response, status) {
                console.log(response);
                console.log(status);
            }
        });
    }

    function taskFilter(tasks, status) {
            if(status == 'completed') {
                filterTasks(tasks, true);
            }
            if(status == 'active') {
                filterTasks(tasks, false);
            }
            if (status == 'all') {
                filterTasks(tasks, 'nothing');
            }
        }

    function filterTasks(tasks,status){
        for(let i=0; i < tasks.length; i++) {
            if(tasks[i].is_active == status){
                const todoItem = new TodoItem(tasks[i].title, tasks[i].is_active, tasks[i].id);
                body.append(todoItem.getHtmlElement());
            }
            if(status == 'nothing'){
                const todoItem = new TodoItem(tasks[i].title, tasks[i].is_active, tasks[i].id);
                body.append(todoItem.getHtmlElement());
            }
        }
    }

    function printCounter(counter, checkboxes) {
        [activeTasks, allTasks] = tasksCounter(checkboxes);
        counter.innerText = 'Active: ' + activeTasks + ' | All: ' + allTasks;
    }

    function tasksCounter(filterValue) {
        let activeTasks = 0;
        let allTasks = 0;
        activeTasks = Object.values(filterValue).filter(todoItemCheckbox => todoItemCheckbox.checked == false).length;
        allTasks = filterValue.length;
        return [activeTasks, allTasks]
    }

    function resetFilter() {
        all.classList.remove("active");
        active.classList.remove("active");
        completed.classList.remove("active");
    }

    function cleanTodo() {
        while (body.children.length) {
            body.removeChild(body.children[0])
        }
    }



    const addButton = document.getElementsByClassName("add_button")[0];
    const addInput = document.getElementsByClassName("add_input")[0];
    const body = document.getElementsByClassName('body')[0];
    const counter = document.getElementsByClassName("counter")[0];
    const all = document.getElementsByClassName('all')[0];
    const active = document.getElementsByClassName('active')[0];
    const completed = document.getElementsByClassName('completed')[0];
    const checkboxes = document.getElementsByClassName('item_checkbox');

    fetchTasks('all');

    addButton.onclick = () => {
        const todo = new TodoItem(addInput.value, true, undefined, addInput)
        todo.createTodoItem(body);
    }

    all.onclick = () => {
        resetFilter();
        cleanTodo();
        all.classList.add("active");
        fetchTasks('all');
        printCounter(counter, checkboxes);
    }

    active.onclick = () => {
        resetFilter();
        cleanTodo();
        active.classList.add("active");
        fetchTasks('active');
        printCounter(counter, checkboxes);
    }

    completed.onclick = () => {
        resetFilter(completed);
        cleanTodo();
        completed.classList.add("active");
        fetchTasks('completed');
        printCounter(counter, checkboxes);
    }
}