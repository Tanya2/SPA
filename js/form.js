class Form {
    generateAuthForm(formName, btnText, errorMsg)
    {
        formName = formName || 'login';
        btnText = btnText || 'Войти';
        var f = document.createElement("form");
        f.setAttribute('class', 'p-3 col-sm-11');
        f.appendChild(this.getInput('login', 'Логин', 'text'));
        f.appendChild(this.getInput('password', 'Пароль', 'password'));
        if (errorMsg) {
            var error = document.createElement("div");
            error.setAttribute('class', 'mb-3');
            var span = document.createElement("span");
            span.setAttribute('style', "color: red");
            span.appendChild(document.createTextNode(errorMsg));
            error.appendChild(span);
            f.appendChild(error);
        }
        var btn = this.getButton(btnText, formName);
        f.appendChild(btn);
        return f;
    }
    generateAddForm(formName, btnText, errorMsg)
    {
        formName = formName || 'login';
        btnText = btnText || 'Войти';
        var f = document.createElement("form");
        f.setAttribute('class', 'p-3 col-sm-11');
        f.appendChild(this.getInput('amount', 'Сумма', 'text'));
        f.appendChild(this.getSelect('type', 'Тип', ['Расход', 'Доход']));
        f.appendChild(this.getInput('comment', 'Комментарий', 'text'));
        if (errorMsg) {
            var error = document.createElement("div");
            error.setAttribute('class', 'mb-3');
            var span = document.createElement("span");
            span.setAttribute('style', "color: red");
            span.appendChild(document.createTextNode(errorMsg));
            error.appendChild(span);
            f.appendChild(error);
        }
        var btn = this.getButton(btnText, formName);
        f.appendChild(btn);
        return f;
    }
    getSelect(name, text, options)
    {
        var div = document.createElement("div");
        div.setAttribute('class', 'mb-3');
        var label = document.createElement("label");
        label.setAttribute('for', name);
        label.setAttribute('class', 'form-label');
        label.appendChild(document.createTextNode(text));
        div.appendChild(label);

        var select = document.createElement("select");
        select.setAttribute('name',name);
        select.setAttribute('class', 'form-control');
        select.setAttribute('id',name);
        for(var i = 0; i < options.length; i++) {
            var opt = document.createElement("option");
            opt.appendChild(document.createTextNode(options[i]));
            select.appendChild(opt);
        }
        div.appendChild(select);
        return div;
    }
    getInput(name, text, type)
    {
        var div = document.createElement("div");
        div.setAttribute('class', 'mb-3');
        var label = document.createElement("label");
        label.setAttribute('for', name);
        label.setAttribute('class', 'form-label');
        label.appendChild(document.createTextNode(text));
        div.appendChild(label);
        var i = document.createElement("input");
        i.setAttribute('type',type);
        i.setAttribute('name',name);
        i.setAttribute('class', 'form-control');
        i.setAttribute('id',name);
        div.appendChild(i);
        return div;
    }
    getFormValues()
    {
        var formData = new FormData();
        var form = document.getElementsByTagName("form");
        var obj ={};
        if (form.length > 0){
            var elements = form[0].elements;
            for(var i = 0 ; i < elements.length ; i++){
                var item = elements.item(i);
                obj[item.name] = item.value;
                formData.append(item.name, item.value);
            }
        }

        return formData;
    }

    getButton(text, formName)
    {
        var btn = document.createElement("input");
        btn.setAttribute('class', 'btn btn-outline-info');
        btn.setAttribute('value', text);
        btn.setAttribute('type',"submit");
        btn.addEventListener("click", function (e)
        {
            e.preventDefault();
            LinkClick('/' + formName);
            return false;
        });
        return btn;
    }
}