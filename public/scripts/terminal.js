var lastCommand = "";

document.onkeydown = checkKey;

document.querySelector(".m-terminal-input").addEventListener("submit", executeCommand);
document.querySelector(".m-terminal-input").addEventListener("click", function () {
  document.querySelector(".m-bash-input").focus()
});

function checkKey(e) {

  e = e || window.event;

  if (e.keyCode == '38') {
    document.querySelector(".m-bash-input").value = lastCommand;
  }

  if (e.keyCode == '27') {
    document.querySelector(".m-terminal-container").style.display = "none";
    document.querySelector(".m-terminal-info").style.display = "none";
    document.querySelector(".m-bash-input").value = "";
    localStorage.terminalopen = "false";
  }

}

function showTerminal() {
  document.querySelector(".m-terminal-container").style.display = "grid";
  document.querySelector(".m-bash-input").focus();
}

function executeCommand() {


  lastCommand = document.querySelector(".m-bash-input").value;

  document.querySelector(".m-terminal-info").style.display = "none";

  var inputtext = document.querySelector(".m-bash-input").value;

  var lowercase = inputtext.toLowerCase();

  var userinput = lowercase;




  if (userinput.includes("chcol")) {
    var myColor = userinput.replace("chcol", "");
    myColor = myColor.replace(" ", "");
    document.querySelector(".m-header").style.backgroundImage = "linear-gradient(rgba(196,190,180,0.95), " + myColor + ")";
    document.querySelector(".m-bash-input").placeholder = "";
  } else if (userinput.includes("reset")) {
    document.querySelector(".m-header").style.backgroundImage = "linear-gradient(rgba(196,190,180,0.92), rgba(73,93,83,0.98))";
    document.querySelector(".m-terminal-container").style.opacity = 1;
    document.querySelector(".m-bash-input").placeholder = "";
    document.querySelector(".m-bash-input").setAttribute('maxLength', 30);
  } else if (userinput.includes("chopac")) {
    var myOpac = userinput.replace("chopac", "");
    myOpac = myOpac.replace(" ", "");
    document.querySelector(".m-terminal-container").style.opacity = myOpac;
    document.querySelector(".m-bash-input").placeholder = "";
  } else if (userinput.includes("help")) {
    document.querySelector(".m-terminal-info").style.display = "block";
    document.querySelector(".m-terminal-info--text").innerHTML = "<h6>The following commands are identified internally:<br><br>chcol: chcol [value]<br>&nbsp;&nbsp;&nbsp;&nbsp;Change background color of page header.<br>&nbsp;&nbsp;&nbsp;&nbsp;Value can be hex ( #ffffff ), plaintext ( white ),<br>&nbsp;&nbsp;&nbsp;&nbsp;or rgb&#47;rgba format ( rgba(255, 255, 255, 1.0) ).<br><br>chopac: chopac [value]<br>&nbsp;&nbsp;&nbsp;&nbsp;Change opacity of terminal input background.<br>&nbsp;&nbsp;&nbsp;&nbsp;Value from 0 to 1 (i.e. 0.5 is 50% opacity).<br><br>exit: exit<br>&nbsp;&nbsp;&nbsp;&nbsp;Close terminal window. Alternate: [Esc]<br><br>help: help<br>&nbsp;&nbsp;&nbsp;&nbsp;Display available commands.<br><br>reset: reset<br>&nbsp;&nbsp;&nbsp;&nbsp;Reset attributes to default.<br><br>sayhello: sayhello [name]<br>&nbsp;&nbsp;&nbsp;&nbsp;Greet [name] appropriately based on system time of day.</h6>"
    document.querySelector(".m-bash-input").placeholder = "";
  } else if (userinput.includes("sayhello")) {
    var d = new Date();
    var h = d.getHours();
    var greeting = "Hello";

    if (h >= 0 && h < 12) {
      greeting = "Good Morning";
    } else if (h >= 12 && h <= 16) {
      greeting = "Good Afternoon";
    } else if (h > 16 && h <= 24) {
      greeting = "Good Evening";
    }

    var username = userinput.replace("sayhello", "");
    username = username.replace(" ", "");
    username = username.charAt(0).toUpperCase() + username.slice(1);
    document.querySelector(".m-terminal-info").style.display = "block";
    document.querySelector(".m-terminal-info--text").innerHTML = "<h6>" + greeting + ", " + username + "!</h6>";
    document.querySelector(".m-bash-input").placeholder = "";
  } else if (userinput.includes("exit")) {
    document.querySelector(".m-terminal-container").style.display = "none";
    document.querySelector(".m-terminal-info").style.display = "none";
    document.querySelector(".m-terminal-info").style.display = "none";
    document.querySelector(".m-bash-input").placeholder = "";
    localStorage.terminalopen = "false";
  } else if (userinput.includes("hidden")) {
    document.querySelector(".m-bash-input").setAttribute('maxLength', 999);
  }
  document.querySelector(".m-bash-input").value = "";
}
