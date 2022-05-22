window.onload = function () {
    function getTask(filter) {
        const host = "http://localhost:8000";
        $.ajax({
            url: host + '/api/task/',
            method: 'GET',
            data: {},
            success: function (task, status) {
                outputQuantity(task, filter);
                printCounter(counter,checkboxes);
            },
            error: function (response, condition) {
                console.log(response);
                console.log(condition);
            }
        });
    }

    function filterTasks(task,condition){
        for(let i=0; i < task.length; i++) {
            if(task[i].is_active == condition){
                const todoItem = new TodoItem(task[i].title, task[i].is_active, task[i].id);
                body.append(todoItem.getHtmlElement());
            }
            if(condition == 'nothing'){
                const todoItem = new TodoItem(task[i].title, task[i].is_active, task[i].id);
                body.append(todoItem.getHtmlElement());
            }
        }
    }

    function outputQuantity(task, condition) {
            if(condition == 'completed') {
                filterTasks(task, true);
            }
            if(condition == 'active') {
                filterTasks(task, false);
            }
            if (condition == 'all') {
                filterTasks(task, 'nothing');
            }
        }

    function printCounter(counter, checkboxes) {
        [activeTasks, allTasks] = countTask(checkboxes);
        counter.innerText = 'Active: ' + activeTasks + ' | All: ' + allTasks;
    }

    function countTask(filterValue) {
        let activeTasks = 0;
        let allTasks = 0;
        activeTasks = Object.values(filterValue).filter(todoItemCheckbox => todoItemCheckbox.checked == false).length;
        allTasks = filterValue.length;
        return [activeTasks, allTasks]
    }

    function clean() {
        while (body.children.length) {
            body.removeChild(body.children[0])
        }
    }

    function reset() {
        all.classList.remove("active");
        active.classList.remove("active");
        completed.classList.remove("active");
    }

    const addButton = document.getElementsByClassName("add_button")[0];
    const addInput = document.getElementsByClassName("add_input")[0];
    const body = document.getElementsByClassName('body')[0];
    const counter = document.getElementsByClassName("counter")[0];
    const all = document.getElementsByClassName('all')[0];
    const active = document.getElementsByClassName('active')[0];
    const completed = document.getElementsByClassName('completed')[0];
    const checkboxes = document.getElementsByClassName('item_checkbox');

    getTask('all');

    addButton.onclick = () => {
        const todo = new TodoItem(addInput.value, true, undefined, addInput)
        todo.createTodoItem(body);
    }

    all.onclick = () => {
        reset();
        clean();
        all.classList.add("active");
        getTask('all');
        printCounter(counter, checkboxes);
    }

    active.onclick = () => {
        reset();
        clean();
        active.classList.add("active");
        getTask('active');
        printCounter(counter, checkboxes);
    }

    completed.onclick = () => {
        reset(completed);
        clean();
        completed.classList.add("active");
        getTask('completed');
        printCounter(counter, checkboxes);
    }
}