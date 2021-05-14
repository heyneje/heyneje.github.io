let val1 = null;
let val2 = null;
let op;
let clear = true;
 $(document).ready(function(){
   $("#main").slideUp(1);
   $("#main2").slideUp(1);
   $("#main").slideDown(1000);
   $("#main2").slideDown(1000);
   $("#navCal").css({"text-decoration": "underline"});
   $('#tableDiv').on('click', function(event) {
     var x = event.target.innerText;
     switch(x) {
       case "0": case "1":  case "2": case "3": case "4": case "5": case "6": case "7": case "8": case "9": case ".":
       if(clear){
         $("#display").html("");
         clear = false;
       }
       if($("#display").html().substring(0,1) == "0"){
         $("#display").html("");
       }
       $("#display").html($("#display").html()+x);
       break;
       case "+/-":
       $("#display").html(parseFloat($("#display").html())*-1);
       break;

       case "*": case "/": case "+": case "-":
       var1 = parseFloat($("#display").html());
       $("#display").html(x);
       clear = true;
       switch(x) {
         case "*":
         op = "Multiply";
         break;
         case "/":
         op = "Divide";
         break;
         case "+":
         op = "Add";
         break;
         case "-":
         op = "Subtract";
         break;
         default:
         // code block
       }
       break;

       case "C":
       $("#display").html("&nbsp;");
       clear = true;
       var1 = null;
       var2 = null;
       op = null;
       break;
       case "=":
       let apiKey = "bed859b37ac6f1dd59387829a18db84c22ac99c09ee0f5fb99cb708364858818";
       let webServer = "https://api.clearllc.com/api/v2/math/";
       var2 = parseFloat($("#display").html());
       a=$.ajax({
         url: webServer+op+"?api_key="+apiKey+"&n1="+var1+"&n2="+var2,
         method :"GET"
       }).done(function(data){
         $("#display").html(data.result);
       }).fail(function(error) {
         console.log("error",error.statusText);
         $("#display").html("Error");
       });
       break;
       default:
     }
   });
 });
