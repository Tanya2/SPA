class Request {
    sendRequest(query, method, params, page)
    {
        let me = this;
        var xhr = new XMLHttpRequest(); //Создаём объект для отправки запроса
        method = method || "GET";
        xhr.open(method, "/api.php" + query, true); //Открываем соединение

        xhr.onreadystatechange = function() //Указываем, что делать, когда будет получен ответ от сервера
        {
            if (xhr.readyState != 4) return; //Если это не тот ответ, который нам нужен, ничего не делаем

            if (xhr.status == 200) //Если ошибок нет, то получаем данные
            {
                console.log('xhr.responseText', xhr.responseText);
                page && page.setData && page.setData(JSON.parse(xhr.responseText));
            }
            else //Иначе выводим сообщение об ощибке
            {
                alert("Loading error! Try again later.");
                console.log(xhr.status + ": " + xhr.statusText);
            }
        }

        xhr.send(params); //Отправляем запрос
    }
}
