const InactiveListComponent = {
    props: ['tasks'],
    data: function () {
        return {

        }
    },
    template: `
    <div>
        <h2>List inactive</h2>
        <table class="table table-bordered">
            <tr>
                <th>Title</th>
                <th style="width: 10%"></th>
            </tr>
            <tr v-for="task in tasks" v-if="!task.active">
                <td>{{task.title}}</td>
                <td class="text-right">
                    <button @click="onActive(task.id)" class="btn btn-sm btn-success">Active</button>
                </td>
            </tr>
        </table>
    </div>
        `,
    methods: {
        onActive(id) {
            const index = this.findIndexTaskById(id)
            this.activeTaskByIndex(index)
            this.$emit('event-active-from-child', this.tasks)
        },
        findIndexTaskById(id) {
            return this.tasks.findIndex((obj => obj.id === id))
        },
        activeTaskByIndex(index) {
            this.tasks[index].active = 1
        }
    }
}

export default InactiveListComponent