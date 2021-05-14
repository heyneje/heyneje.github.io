let lat;
let long;
 $(document).ready(function(){
   $("#main").slideUp(1);
   $("#main2").slideUp(1);
   $("#displayWeather").slideUp(1);
   $("#nameDisplay").slideUp(1);

   $("#main").slideDown(1000);
   $("#main2").slideDown(1000);


   $("#navWea").css({"text-decoration": "underline"});
   $('#submitButton').on('click', function(event) {
     var zip = $("#zipCode").val();
     var url = "https://api.clearllc.com/api/v2/miamidb/_table/zipcode?api_key=bed859b37ac6f1dd59387829a18db84c22ac99c09ee0f5fb99cb708364858818&ids="
     a=$.ajax({
       url: url+zip,
       method :"GET"
     }).done(function(data){
       console.log(data);
       $("#nameDisplay").slideDown(1000);
       $("#city").html(data.resource[0].city + " " +data.resource[0].state + ", " + zip);
       lat = data.resource[0].latitude;
       long = data.resource[0].longitude;
       console.log(lat + " " + long);
       getWeather();
     }).fail(function(error) {
      alert("Invalid Zip code");
      console.log(error.statusText);
     });
     });
 });
 function getWeather() {
   var apiKey2 = "e45ff1fff62c13c7ab715093f9be46fd";
   var newUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&exclude=current,minutely,hourly,alerts&units=imperial&appid=" + apiKey2;
   a=$.ajax({
     url: newUrl,
     method :"GET"
   }).done(function(data){
     $("#displayWeather").slideDown(1000);

     var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
     var now = new Date();
     var day;
     var sunSetTime;
     var sunRiseTime;
     var dayName;
     for(i = 0; i < 7; i++){
       day = days[now.getDay()];
       now.setDate(now.getDate()+1);
       $("#icon"+i).html("<img src=\"" + "http://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + "@2x.png" + "\" class=\"img-fluid\" alt=\"Responsive image\">");
       $("#name"+i).html(day);
       $("#forecase"+i).html(data.daily[i].weather[0].description);
       $("#high"+i).html("<img src = \"hot.png\" class=\"img-fluid\" alt=\"Responsive image\" width=\"50\" height=\"50\">" + (data.daily[i].temp.max).toString().substring(0,2) + "°F");
       $("#low"+i).html("<img src = \"ice.png\" class=\"img-fluid\" alt=\"Responsive image\" width=\"50\" height=\"50\">" + (data.daily[i].temp.min).toString().substring(0,2) + "°F");
        sunSetTime = new Date(data.daily[i].sunset * 1000);
        sunRiseTime = new Date(data.daily[i].sunrise * 1000);
         if(sunRiseTime.getMinutes().toString().length < 2){
           $("#sunrise"+i).html("<img src = \"Sunrise.png\" class=\"img-fluid\" alt=\"Responsive image\" width=\"50\" height=\"50\">" + " " +sunRiseTime.getHours() + ":" + "0" + sunRiseTime.getMinutes() + " AM");
         }else {
        $("#sunrise"+i).html("<img src = \"Sunrise.png\" class=\"img-fluid\" alt=\"Responsive image\" width=\"50\" height=\"50\">" + " " +sunRiseTime.getHours() + ":" + sunRiseTime.getMinutes() + " AM");
      }
      if(sunSetTime.getMinutes().toString().length < 2){
        $("#sunset"+i).html("<img src = \"Sunset.png\" class=\"img-fluid\" alt=\"Responsive image\" width=\"50\" height=\"50\">" + " " +(parseInt(sunSetTime.getHours()) - 12) + ":" + "0" + sunSetTime.getMinutes() + " PM");
      }else {
      $("#sunset"+i).html("<img src = \"Sunset.png\" class=\"img-fluid\" alt=\"Responsive image\" width=\"50\" height=\"50\">" + " " +(parseInt(sunSetTime.getHours()) - 12) + ":" + sunSetTime.getMinutes() + " PM");
    }
  }

   }).fail(function(error) {
     console.log(error.statusText);
     alert("error",error.statusText);
   });

 }
