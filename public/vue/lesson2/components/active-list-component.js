import TableComponent from "./table-component.js";

const ActiveListComponent = {
    props: ['tasks'],
    data: function () {
        return {

        }
    },
    components: {
      'table-component': TableComponent
    },
    template: `
    <div>
        <h2>List Active</h2>
        <table-component>
            <tr v-for="task in tasks" v-if="task.active">
                <td>{{task.title}}</td>
                <td class="text-right">
                    <button @click="onRemove(task.id)" class="btn btn-sm btn-danger">Remove</button>
                </td>
            </tr>
        </table-component>
    </div>
        `,
    methods: {
        onRemove(id) {
            const index = this.findIndexTaskById(id)
            this.removeTaskByIndex(index)
            this.$emit('event-remove-from-child', this.tasks)
        },
        findIndexTaskById(id) {
            return this.tasks.findIndex((obj => obj.id === id))
        },
        removeTaskByIndex(index) {
            this.tasks.splice(index, 1)
        },
    }
}

export default ActiveListComponent