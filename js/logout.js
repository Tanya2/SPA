class LogoutPage {
    constructor() {
        this.action = 'logout';
        this.link = '/logout';
        this.data = {};
    }
    loadData(data) {
        this.data = data;
    }
    getDataForRequest()
    {
        var params = new FormData();
        params.append('action', 'logout');
        return {query: '', method: 'POST', params: params};
    }
    render() {
        return '';
    }
    getErrorMessage() {
        return '';
    }
}