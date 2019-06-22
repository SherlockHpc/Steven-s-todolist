var ENTER_KEY = 13;

var utility = new Untility();

var Steven_todo = {
    init : function () {
        // 0 for all, 1 for active, 2 for completed
        this.state_code = 0;
        this.active_todos = [];
        this.completed_todos = [];
        this.todos = utility.load('Steven-todolist');
        console.log(this.todos);

        this.todo_template = Handlebars.compile($('#todo-template').html());

        this.bind_events();

        this.render();
    },
    
    render : function () {
        $('#new-todo').focus();
        utility.store('Steven-todolist', this.todos);

        let count = this.active_count();
        document.getElementById("todo-count").innerHTML = count.toString() + (count > 1? " items" : " item") + " left";

        switch (this.state_code) {
            case 0:
                $('#todo-list').html(this.todo_template(this.todos));
                break;
            case 1:
                this.set_active();
                $('#todo-list').html(this.todo_template(this.active_todos));
                break;
            case 2:
                this.set_completed();
                $('#todo-list').html(this.todo_template(this.completed_todos));
                break;
        }
    },

    bind_events: function () {
        $('#todo-list').on('click', '.delete-btn', this.delete_todo.bind(this));
        $('#new-todo').on('keyup', this.createByKeyUp.bind(this));
        $('#submit-new-todo').on('click', this.createBySubmit.bind(this));
        // $('.todo-check-box').on('change', this.check.bind(this));
        $('#todo-list').on('change', '.todo-check-box', this.check.bind(this));
        $('#complete-all').on('change', this.check_all.bind(this));
        // $('#active').on('click', this.view_active());
        // $('#completed').on('click', this.view_completed());
        // $('#all').on('click', this.view_all());
        $('#btn-list')
            .on('click', '#all', this.view_all.bind(this))
            .on('click', '#active', this.view_active.bind(this))
            .on('click', '#completed', this.view_completed.bind(this));
        $('#clear-completed').on('click', this.clear_completed.bind(this));
    },
    
    delete_todo: function (event) {
        let id = event.target.closest('li').id;
        // get index in the todo list
        let index = this.get_index(id);
        // delete from the todo list
        this.todos.splice(index, 1);
        // re-render
        this.render();
    },

    createByKeyUp: function (event) {
        let input = $(event.target);
        let value = input.val().trim();

        if(event.which !== ENTER_KEY){
            return;
        }else{
            this.create(input, value);
        }
    },
    
    createBySubmit: function (event) {
        let input = $(event.target).closest('div').find('#new-todo');
        console.log(event.target);
        console.log($(event.target));
        let value = input.val().trim();

        this.create(input, value);
    },

    create(input, value){
        if(value.length<1){
            alert("todo is empty");
            return;
        }

        this.todos.push({
            content: value,
            id: utility.uuid(),
            completed: false,
        });
        input.val('');
        this.render();
    },
    
    check:function (event) {
        let id = event.target.closest('li').id;
        // console.log(id);
        let index = this.get_index(id);
        // console.log(index);
        this.todos[index].completed = !this.todos[index].completed;
        // console.log(this.todos[index]);
        this.render();
    },

    check_all: function(event){
        for(let i = 0; i<this.todos.length; i++){
            this.todos[i].completed = true;
        }
        this.render();
    },

    // get todo index by li-id
    get_index: function (id) {
        for(let i = 0; i<this.todos.length; i++){
            if(id === this.todos[i].id){
                return i;
            }
        }
        return -1;
    },

    set_active: function () {
        this.active_todos = [];
        for(let i = 0; i<this.todos.length; i++){
            if(!this.todos[i].completed){
                this.active_todos.push(this.todos[i]);
            }
        }
    },
    
    set_completed:function () {
        this.completed_todos = [];
        for(let i = 0; i<this.todos.length; i++){
            if(this.todos[i].completed){
                this.completed_todos.push(this.todos[i]);
            }
        }
    },
    
    view_active: function () {
        // $('#active').className = 'selected';
        document.getElementById('all').className = '';
        document.getElementById('completed').className = '';
        document.getElementById('active').className = 'selected';
        this.state_code = 1;
        this.render();
    },

    view_all:function () {
        document.getElementById('active').className = '';
        document.getElementById('completed').className = '';
        document.getElementById('all').className = 'selected';
        this.state_code = 0;
        this.render();
    },

    view_completed:function () {
        document.getElementById('active').className = '';
        document.getElementById('all').className = '';
        document.getElementById('completed').className = 'selected';
        this.state_code = 2;
        this.render();
    },
    
    clear_completed: function () {
        for(let i = 0; i<this.todos.length; i++){
            if(this.todos[i].completed){
                this.todos.splice(i, 1);
                i--;
            }
        }
        this.render();
    },

    active_count: function () {
        let count = 0;
        for (let i = 0; i<this.todos.length; i++){
            if(!this.todos[i].completed)
                count++;
        }
        return count;
    },

    edit: function (event) {
        let input = $(event.target).closest('li').addClass('editing');

    },
};

Steven_todo.init();