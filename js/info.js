class InfoPage {
    constructor() {
        this.action = 'info';
        this.link = '/info';
        this.title = 'Последние 10 записей';
        this.errorMsg = '';
        this.data = {};
        this.table = new Table();
    }
    loadData(data) {
        this.data = data;
    }
    getDataForRequest()
    {
        return {query: "?action=info", method: 'GET', params: {}};
    }
    render() {
        var table = this.table.getTableForPage(this.data.table);
        var total = this.table.getTotalForPage(this.data.total);
        var div = document.createElement("div");
        div.setAttribute('class', 'mb-3');
        div.appendChild(table);
        div.appendChild(total);
        return div;
    }
}