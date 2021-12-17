// State stuff
let lastCommand = ""
let hiddenEnabled = false

// Terminal elements
const terminalContainer = document.querySelector(".m-terminal-container")
const terminalInfo = document.querySelector(".m-terminal-info")
const terminalInfoText = document.querySelector(".m-terminal-info--text")
const terminalInfoDefault =
  "<h6>The following commands are identified internally:<br><br> \
  chcol: chcol [value]<br>&nbsp;&nbsp;&nbsp;&nbsp;Change background color of page header.<br>\
  &nbsp;&nbsp;&nbsp;&nbsp;Value can be hex ( #ffffff ), plaintext ( white ),<br>&nbsp;&nbsp;&nbsp;&nbsp;\
  or rgb&#47;rgba format ( rgba(255, 255, 255, 1.0) ).<br><br>chopac: chopac [value]<br>&nbsp;&nbsp;&nbsp;&nbsp;\
  Change opacity of terminal input background.<br>&nbsp;&nbsp;&nbsp;&nbsp;Value from 0 to 1 (i.e. 0.5 is 50% opacity).<br><br>\
  exit: exit<br>&nbsp;&nbsp;&nbsp;&nbsp;Close terminal window. Alternate: [Esc]<br><br>help: help<br>&nbsp;&nbsp;&nbsp;&nbsp;\
  Display available commands.<br><br>reset: reset<br>&nbsp;&nbsp;&nbsp;&nbsp;Reset attributes to default.<br><br>\
  sayhello: sayhello [name]<br>&nbsp;&nbsp;&nbsp;&nbsp;Greet [name] appropriately based on system time of day.</h6>"
const terminalInput = document.querySelector(".m-terminal-input")
const bashInput = document.querySelector(".m-bash-input")
const pageHeader = document.querySelector(".m-header")

// Check which key is pressed
const checkKey = (e) => {
  e = e || window.event

  // If user presses up arror, show last command
  if (e.keyCode == '38') {
    bashInput.value = lastCommand;
  }

  // If user presses escape, close terminal
  if (e.keyCode == '27') {
    terminalContainer.style.display = "none"
    terminalInfo.style.display = "none"
    bashInput.value = ""
    localStorage.isTerminalOpen = "false"
  }
}

const executeCommand = () => {
  lastCommand = bashInput.value;

  terminalInfo.style.display = "none"

  const inputText = bashInput.value
  const lowercase = inputText.toLowerCase()
  const userInput = hiddenEnabled ? inputText : lowercase

  // Conditionals for different commands
  if (userInput.includes("chcol")) {
    const myColor = userInput.replace("chcol", "").trim()
    pageHeader.style.backgroundImage = "linear-gradient(rgba(196,190,180,0.95), " + myColor + ")"
    bashInput.placeholder = ""
  } else if (userInput.includes("reset")) {
    pageHeader.style.backgroundImage = "linear-gradient(rgba(196,190,180,0.92), rgba(73,93,83,0.98))"
    terminalContainer.style.opacity = 1
    bashInput.placeholder = ""
    bashInput.setAttribute('maxLength', 30)
    hiddenEnabled = false
  } else if (userInput.includes("chopac")) {
    const myOpac = userInput.replace("chopac", "").trim()
    terminalContainer.style.opacity = myOpac
    bashInput.placeholder = ""
  } else if (userInput.includes("help")) {
    terminalInfo.style.display = "block"
    terminalInfoText.innerHTML = terminalInfoDefault
    bashInput.placeholder = ""
  } else if (userInput.includes("sayhello")) {
    const nowDate = new Date()
    const nowHour = nowDate.getHours()
    let greeting = "Hello"

    // Set greeting based on time of day
    if (nowHour >= 0 && nowHour < 12) {
      greeting = "Good Morning"
    } else if (nowHour >= 12 && nowHour <= 16) {
      greeting = "Good Afternoon"
    } else if (nowHour > 16 && nowHour <= 24) {
      greeting = "Good Evening"
    }

    let username = userInput.replace("sayhello", "").trim()
    username = username.charAt(0).toUpperCase() + username.slice(1)
    terminalInfo.style.display = "block"
    terminalInfoText.innerHTML = `<h6>${greeting}, ${username}!</h6>`
    bashInput.placeholder = ""
  } else if (userInput.includes("exit")) {
    terminalContainer.style.display = "none"
    terminalInfo.style.display = "none"
    bashInput.placeholder = ""
    localStorage.isTerminalOpen = "false"
  } else if (userInput.includes("hidden")) {
    // ULTIMATE H4X0RZ
    hiddenEnabled = true
    bashInput.setAttribute('maxLength', 999)
  }
  bashInput.value = ""
}


// Event Listeners
terminalInput.addEventListener("submit", executeCommand)
terminalInput.addEventListener("click", () => {
  bashInput.focus()
})
document.onkeydown = checkKey