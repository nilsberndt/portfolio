
document.getElementById("darkdiv").addEventListener("click", closeContact);
document.getElementById("cancel").addEventListener("click", closeContact);
document.getElementById("form1").addEventListener("submit", sendMessage);
document.getElementById("footerContact").addEventListener("click", showContact);

var coffeefull = true;
var monitor1power = true;
var monitor2power = true;
var mousegoing = true;
localStorage.terminalopen = "false";

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB2Kn8Cv1Y8MUgR6m-0oCpo-vKvFAZnxHE",
    authDomain: "portfolio-12beb.firebaseapp.com",
    databaseURL: "https://portfolio-12beb.firebaseio.com",
    projectId: "portfolio-12beb",
    storageBucket: "portfolio-12beb.appspot.com",
    messagingSenderId: "598758145112"
  };
  firebase.initializeApp(config);
  



function sendMessage() {
	var vname = document.getElementById("vname").value;
	var vphone = document.getElementById("vphone").value;
	var vemail = document.getElementById("vemail").value;
	var vmsg = document.getElementById("vmsg").value;
	var nowtime = new Date();
	
	firebase.database().ref('messages/' + nowtime.getFullYear() + '/' + (nowtime.getMonth() + 1) + '/' + nowtime.getDate() + '/' + (nowtime.getHours() + nowtime.getMilliseconds())).set({
    "name": vname,
    "email": vemail,
    "phone" : vphone,
	"message" : vmsg
	});
	window.alert("Thanks, I'll get back to you soon!");
	closeContact();
}
  
  

document.querySelector(".m-header--logo-svg").addEventListener("load",function(){
		var svgDoc = this.contentDocument;
		var namebadge = svgDoc.getElementById("namebadge");
		var keyboard = svgDoc.getElementById("keyboard");
		var coffeecup = svgDoc.getElementById("coffeecup");
		var coffeeliquid = svgDoc.getElementById("coffeeliquid");
		var coffeesteam = svgDoc.getElementById("coffeesteam");
		var alltext = svgDoc.getElementById("alltext");
		var monitor2 = svgDoc.getElementById("monitor2");
		var alldesign = svgDoc.getElementById("alldesign");
		var monitor1 = svgDoc.getElementById("monitor1");
		var mouse = svgDoc.getElementById("mouse");
		var coffeespill = svgDoc.getElementById("coffeespill");
		
		namebadge.addEventListener("click",function(){showContact();}, false);
		keyboard.addEventListener("click",function(){checkTerminal();}, false);
		coffeecup.addEventListener("click",function(){drinkCoffee(coffeeliquid, coffeesteam, coffeespill);}, false);
		monitor2.addEventListener("click",function(){powerMonitor2(alltext);}, false);
		monitor1.addEventListener("click",function(){powerMonitor1(alldesign);}, false);
		mouse.addEventListener("click",function(){mouseGo(mouse);}, false);
		
    }, false
);



window.onhashchange = function() {
	closeContact();
}

function mouseGo(mous){
	if (mousegoing){
		mous.style.animation = "none";
		mousegoing = false;
	}else{
		mous.style.animation = "move 2.5s infinite";
		mousegoing = true;
	}
}



function checkTerminal(){
	if (localStorage.terminalopen == "true"){
		document.querySelector(".m-terminal-container").style.display = "none";
		document.querySelector(".m-terminal-info").style.display = "none";
		localStorage.terminalopen = "false";
	}else{
		showTerminal();
		localStorage.terminalopen = "true";
	}
}

function powerMonitor1(thedesign){
	if (monitor1power){
		thedesign.style.opacity = "0";
		monitor1power = false;
	}else{
		thedesign.style.opacity = "1";
		monitor1power = true;
	}
}

function powerMonitor2(thetext){
	if (monitor2power){
		thetext.style.opacity = "0";
		monitor2power = false;
	}else{
		thetext.style.opacity = "1";
		monitor2power = true;
	}
}

function drinkCoffee(liquid, steam, spill) {
	if (coffeefull){
		liquid.style.opacity = "0";
		spill.style.visibility = "visible";
		steam.style.visibility = "hidden";
		coffeefull = false;
	}else{
		liquid.style.opacity = "1";
		spill.style.visibility = "hidden";
		steam.style.visibility = "visible";
		coffeefull = true;
	}
}

function showContact() {
	var elem = document.getElementById("contactform");
	elem.style.display = "block";
	
	var dark = document.getElementById("darkdiv");
	dark.style.zIndex = "7";
	dark.style.opacity = "0.5";
	dark.style.className = "fadein darken";
}


function closeContact(){
	var elem = document.getElementById("contactform");
	elem.style.display = "none";
	document.getElementById("form1").reset(); 
	var dark = document.getElementById("darkdiv");
	dark.style.zIndex = "-1";
	dark.style.opacity = "0";
}