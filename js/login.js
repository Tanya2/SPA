class LoginPage {
    constructor() {
        this.action = 'login';
        this.link = '/login';
        this.title = 'Авторизация';
        this.errorMsg = 'Неверный логин или пароль';
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
        if (params.get('login') && params.get('password')) {
            params.append('action', 'login');
            return {query: '', method: 'POST', params: params};
        } else {
            return {};
        }
    }
    render() {
        return this.form.generateAuthForm("login", 'Войти', this.getErrorMessage());
    }
    getErrorMessage() {
        return this.data.error ? this.errorMsg : '';
    }
}
