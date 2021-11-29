class Page {
    constructor(page, action, id) {
        this.rowId = id;
        this.data = {};
        this.loaded = true;
        this.page = page;
        this.action = action;
        this.currentPage = this.getCurrentPage(action);
        this.navbar = new Navbar();
        this.request = new Request();
    }
    loadData() {
        var requestData = this.currentPage.getDataForRequest();
        if (requestData.method) {
            this.sendRequest(requestData)
        } else {
            this.updatePage();
        }
    }
    sendRequest(requestData)
    {
        this.request.sendRequest(requestData.query, requestData.method, requestData.params, this);
        this.loaded = false;
    }
    setData(response)
    {
        var me = this;
        me.data =
            {
                action: response.action,
                table: response.table ? response.table : [],
                total: response.total ? response.total : [],
                error: response.error
            };
        me.loaded = true;
        if ('logout' == me.currentPage.action ||
            'logout' == me.data.action ||
            'login' == me.data.action ||
            'register' == me.data.action
        ) {
            clearSession();
        }
        if (me.data.action != me.currentPage.action) {
            me.chengePage(me.data);
        } else {
            this.currentPage.loadData(me.data)
            me.updatePage();
        }
    }
    ShowLoading()
    {
        if(!this.loaded) //Если страница ещё не загрузилась, то выводим сообщение о загрузке
        {
            this.page.body.innerHTML = "Loading...";
        }
    }
    updatePage()
    {
        this.page.body.innerHTML = '';
        this.page.body.appendChild(this.currentPage.render());
        this.page.title.innerText = this.currentPage.title;
        this.navbar.updateNavbar(this.currentPage.action);
        document.title = this.currentPage.title;
        window.history.pushState(this.currentPage.action, this.currentPage.title, this.currentPage.link); //Меняем ссылку
    }
    chengePage(newData)
    {
        this.currentPage = this.getCurrentPage(newData.action);
        this.loadData();
    }
    getCurrentPage(action)
    {
        var currentPage;
        switch(action)
        {
            case "logout":
                currentPage = new LogoutPage();
                break;
            case "login":
                currentPage = new LoginPage();
                break;
            case "register":
                currentPage = new RegisterPage();
                break;
            case "add":
                currentPage = new AddPage();
                break;
            case "info":
                currentPage = new InfoPage();
                break;
            case "delete":
                currentPage = new DeletePage(this.rowId);
                break;
            case "":
                currentPage = new InfoPage();
                break;
            default:
                currentPage = new LoginPage();
                break;
        }
        return currentPage;
    }
}
