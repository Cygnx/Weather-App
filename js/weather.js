
var callbackFunction = function(data) {
	var item = data.query.results.channel.item;
    var cond = item.condition;
    var forecast = item.forecast;
    var code = cond.code;
    var temp = cond.temp;
    var text = cond.text;
	var container = document.getElementById("forecast");
	container.innerHTML = "";
	
	var title = document.createElement("H5")               
	var titleText = document.createTextNode("Forecast for Today : ");    
	var img = document.createElement('img');
	var todaysTemp = document.createElement("p")              
	var todaysTempText = document.createTextNode("Today's temperature is: " + temp);     

	if(code == 1 || code == 3 || code == 4 || code == 37 || code == 38 || code == 39 || code == 45)
		img.src ="img/thunderStorms.png";
	else if((code >= 8 && code <= 12 )|| code == 40)
		img.src ="img/showers.png";
	else if(code == 26 || code == 27 || code == 28)
		img.src ="img/cloudy.png";
	else if(code == 29 || code == 30 || code == 44)
		img.src ="img/partlyCloudy.png";
	else if(code == 5 || code == 7 || code == 13 || code == 14 || code == 15 || code == 16 || code == 41|| code == 42 || code == 43|| code == 46)
		img.src ="img/snow-1.png";
	else if(code == 20)
		img.src ="img/foggy.png";
	else
		img.src ="img/sun.png";

	title.appendChild(titleText);  
	todaysTemp.appendChild(todaysTempText);  

	container.appendChild(document.createElement("br"));
	container.appendChild(document.createElement("br"));
	container.appendChild(document.createElement("br"));
	container.appendChild(document.createElement("br"));
	container.appendChild(title);	
	container.appendChild(img);
	container.appendChild(todaysTemp);

	for(i = 0 ; i < forecast.length; i++)
	{
		container.appendChild(document.createElement("hr"));

		var buffer = "~[Forecast for] : " + forecast[i].date + "~";
			buffer += "~[Day] : " + forecast[i].day + "~";
			buffer += "~[High]: " + forecast[i].high + "~";
			buffer += "~[Low] : " + forecast[i].low + "~";
			buffer += "~[Conditions] : " + forecast[i].text + "~";

		var s = document.createElement("p")              
		var t = document.createTextNode(buffer);     
		s.appendChild(t);
		container.appendChild(s);
	}
}

function btnClicked() {
   var zip = document.getElementById("zipCodeInput").value;
   var script = document.createElement('script');
   script.src = "https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from   geo.places(1) where text='"+zip+", United States')    &format=json &callback=callbackFunction";
   document.getElementsByTagName('head')[0].appendChild(script);
}