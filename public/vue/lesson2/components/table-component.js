const TableComponent = {
    template: `
        <table class="table table-bordered">
            <tr>
                <th>Title</th>
                <th style="width: 10%"></th>
            </tr>
            <slot></slot>
        </table>
        `
}

export default TableComponent