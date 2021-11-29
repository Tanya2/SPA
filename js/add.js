class AddPage {
    constructor() {
        this.action = 'add';
        this.link = '/add';
        this.title = 'Добавление записи';
        this.errorMsg = 'Запись не добавлена';
        this.request = new Request();
        this.data = {};
        this.form = new Form();
    }
    loadData(data) {
        this.data = data;
    }
    getDataForRequest()
    {
        var params = this.form.getFormValues();
        if (params.get('amount') && params.get('type') && params.get('comment')) {
            params.append('action', 'add');
            return {query: '', method: 'POST', params: params};
        } else {
            return {};
        }
    }
    render() {
        return this.form.generateAddForm("add", 'Добавить', this.getErrorMessage());
    }
    getErrorMessage() {
        return this.data.error ? this.errorMsg : '';
    }
}