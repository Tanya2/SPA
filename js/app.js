var links = null;
var page;
function OnLoad() 
{
	page =
		{
			title: document.getElementById("title"),
			body: document.getElementById("body")
		};
	var link = window.location.pathname; //Ссылка страницы без домена
	InitLinks();
	LinkClick(link);
}
function InitLinks()
{
	links = document.getElementsByClassName("link_internal");
	for (var i = 0; i < links.length; i++)
	{
		//Отключаем событие по умолчанию и вызываем функцию LinkClick
		links[i].addEventListener("click", function (e)
		{
			e.preventDefault();
			LinkClick(e.target.getAttribute("href"));
			return false;
		});
	}
}
function LinkClick(href)
{
	var props = href.split("/");
	var id = props.length == 3 ? props[2] : 0;
	var obgectPage = new Page(page, props[1], id);
	obgectPage.loadData();
}
function clearSession()
{
	document.cookie = "PHPSESSID= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
}

document.addEventListener("DOMContentLoaded", OnLoad);
