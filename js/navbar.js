class Navbar {
    updateNavbar(action)
    {
        var data = {
            add: false,
            register: true,
            login: false,
            logout: false,
            info: false
        };
        switch(action)
        {
            case "info":
            case "add":
                data.add = true;
                data.info = true;
                data.logout = true
                data.register = false;
                break;
            case "register":
                data.login = true;
                data.register = false;
                break;
        }
        var links = document.getElementsByClassName("link_internal")
        links.add.style.visibility = data.add ? 'visible' : 'hidden';
        links.register.style.visibility = data.register ? 'visible' : 'hidden';
        links.login.style.visibility = data.login ? 'visible' : 'hidden';
        links.logout.style.visibility = data.logout ? 'visible' : 'hidden';
        links.info.style.visibility = data.info ? 'visible' : 'hidden';
    }
}
