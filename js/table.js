class Table {
    getTableForPage(values) {
        var tbl = document.createElement("table");
        tbl.setAttribute('class', 'table table-bordered');
        var tblHead = document.createElement("thead");
        var rowHead = this.getRow(values[0], true);
        tblHead.appendChild(rowHead);
        tbl.appendChild(tblHead);
        var tblBody = document.createElement("tbody");
        for (let i = 1; i < values.length; i++) {
            var row = this.getRow(values[i]);
            tblBody.appendChild(row);
        }
        tbl.appendChild(tblBody);
        return tbl;
    }
    getTotalForPage(values) {
        // values = values || ['Сумма всех расходов: 222' , 'Сумма всех приходов: 777'];
        // var test = ['Сумма всех расходов: 222' , 'Сумма всех приходов: 777'];
        var tbl = document.createElement("table");
        tbl.setAttribute('class', 'table table-striped');
        var tblBody = document.createElement("tbody");
        var row = this.getRow(values);
        tblBody.appendChild(row);
        tbl.appendChild(tblBody);
        return tbl;
    }
    getRow(columns, isHead)
    {
        var row = document.createElement("tr");
        for (let i = 0; i < columns.length; i++) {
            row.appendChild(this.getColumn(columns[i], isHead, columns[0]));
        }
        return row;
    }
    getColumn(text, isHead, id)
    {
        var el = isHead ? 'th' : 'td';
        var cell = document.createElement(el);
        if ('del' == text) {
            var icon = document.createElement('i');
            icon.setAttribute('class', 'fas fa-times text-info');
            icon.setAttribute('name', id);
            icon.addEventListener("click", function (e, test, tttt)
            {
                e.preventDefault();
                LinkClick('/delete/' + id);
                return false;
            });
            cell.appendChild(icon);
        } else {
            cell.appendChild(document.createTextNode(text));
        }
        return cell;
    }
}