class RegisterPage {
    constructor() {
        this.action = 'register';
        this.link = '/register';
        this.title = 'Регистрация';
        this.errorMsg = 'Пользователь уже существует';
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
            params.append('action', 'register');
            return {query: '', method: 'POST', params: params};
        } else {
            return {};
        }
    }
    render() {
        return this.form.generateAuthForm("register", 'Зарегистрироваться', this.getErrorMessage());
    }
    getErrorMessage() {
        return this.data.error ? this.errorMsg : '';
    }
}