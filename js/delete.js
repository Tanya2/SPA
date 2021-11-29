class DeletePage {
    constructor(rowId) {
        this.action = 'delete';
        this.link = '/delete';
        this.data = {};
        this.rowId = rowId;
    }
    loadData(data) {
        this.data = data;
    }
    getDataForRequest()
    {
        var params = new FormData();
        params.append('action', 'delete');
        params.append('id', this.rowId);
        return {query: '', method: 'POST', params: params};
    }
    render() {
        return '';
    }
    getErrorMessage() {
        return '';
    }
}