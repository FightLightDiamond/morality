import makeUID from "../common/makeUID.js";

const CreateComponent = {
    data: function () {
        return {
            taskName: ""
        }
    },
    template: `
    <div>
        <h2>Create new Task</h2>
        <div class="input-group mb-3">
            <input type="text" class="form-control" v-model="taskName" placeholder="Enter task name">
            <div class="input-group-append">
                <button class="btn btn-primary" type="button" @click="onCreate()">Add</button>
            </div>
        </div>
    </div>
        `,
    methods: {
        onCreate() {
            // this.tasks = [...this.tasks, {id: this.makeUId(), title: this.taskName, active: 0}]
            this.$emit('event-create-from-child', {id: makeUID(), title: this.taskName, active: 0})
            this.taskName = ''
        },
    }
}

export default CreateComponent