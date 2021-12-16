
// Icon names to file names map
const icoMap = {
  'icoHtml1': 'html5',
  'icoHtml2': 'html5',
  'icoHtml3': 'html5',
  'icoFirebase1': 'firebase',
  'icoFirebase2': 'firebase',
  'icoFirebase3': 'firebase',
  'icoSass': 'sass',
  'icoChartJS': 'chartjs',
  'icoJsEs61': 'js-es6',
  'icoJsEs62': 'js-es6',
  'icoReact1': 'react',
  'icoReact2': 'react',
  'icoRedux': 'redux',
  'icoCloudFunctions': 'cloudfunctions',
  'icoAndroid': 'android',
  'icoJava': 'java',
  'icoJs': 'js',
  'icoXml': 'xml',
  'icoGithub': 'github2',
  'icoContact': 'contact',
}

// Set state stuff for the header animation
let coffeeFull = true
let monitor1power = true
let monitor2power = true
let mouseGoing = true

// 'Terminal' closed by default
localStorage.isTerminalOpen = "false" // Note: localStorage cannot use true boolean values, thus the string


const initPage = () => {
  // Initialize Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyB2Kn8Cv1Y8MUgR6m-0oCpo-vKvFAZnxHE", // Don't worry, this doesn't need to be private
    authDomain: "portfolio-12beb.firebaseapp.com",
    databaseURL: "https://portfolio-12beb.firebaseio.com",
    projectId: "portfolio-12beb",
    storageBucket: "portfolio-12beb.appspot.com",
    messagingSenderId: "598758145112"
  }

  firebase.initializeApp(firebaseConfig)

  // Iterate over map of icons and add event listeners for mouseover/mouseout icon color changes
  Object.keys(icoMap).map(icoKey => {
    const icoElem = document.getElementById(icoKey)
    const icoVal = icoMap[icoKey]
    icoElem.addEventListener('mouseover', () => changeImage(icoKey, `images/${icoVal}-logo-color.png`))
    icoElem.addEventListener('mouseout', () => changeImage(icoKey, `images/${icoVal}-logo-white.png`))
  })

  // Set additional page event listeners
  getAndSetEvent('darkdiv', 'click', closeContact)
  getAndSetEvent('cancel', 'click', closeContact)
  getAndSetEvent('form1', 'submit', sendMessage)
  getAndSetEvent('icoContact', 'click', showContact)

  // Set header animation event listeners
  const headerSVG = document.querySelector(".m-header--logo-svg")
  headerSVG.addEventListener("load", () => {
    const svgDoc = headerSVG.contentDocument
    const namebadge = svgDoc.getElementById("namebadge")
    const keyboard = svgDoc.getElementById("keyboard")
    const coffeecup = svgDoc.getElementById("coffeecup")
    const coffeeliquid = svgDoc.getElementById("coffeeliquid")
    const coffeesteam = svgDoc.getElementById("coffeesteam")
    const alltext = svgDoc.getElementById("alltext")
    const monitor2 = svgDoc.getElementById("monitor2")
    const alldesign = svgDoc.getElementById("alldesign")
    const monitor1 = svgDoc.getElementById("monitor1")
    const mouse = svgDoc.getElementById("mouse")
    const coffeespill = svgDoc.getElementById("coffeespill")
  
    namebadge.addEventListener("click", () => showContact())
    keyboard.addEventListener("click", () => checkTerminal())
    coffeecup.addEventListener("click", () => drinkCoffee(coffeeliquid, coffeesteam, coffeespill))
    monitor2.addEventListener("click", () => powerMonitor2(alltext))
    monitor1.addEventListener("click", () => powerMonitor1(alldesign))
    mouse.addEventListener("click", () => mouseGo(mouse))
  
  })
  
  // Close contact window on window changes (probably no longer necessary since no nav menu)
  window.onhashchange = () => {
    closeContact()
  }
}

const getAndSetEvent = (elementName, eventName, actionName) => {
  document.getElementById(elementName).addEventListener(eventName, actionName)
}


const sendMessage = () => {
  // Message data
  const vname = document.getElementById("vname").value
  const vphone = document.getElementById("vphone").value
  const vemail = document.getElementById("vemail").value
  const vmsg = document.getElementById("vmsg").value

  // DB Path data
  const nowTime = new Date()
  const nowYear = nowTime.getFullYear()
  const nowMonth = nowTime.getMonth() + 1
  const nowDay = nowTime.getDate()
  const nowKey = nowTime.getHours() + nowTime.getMilliseconds()
  const dbPath = `messages/${nowYear}/${nowMonth}/${nowDay}/${nowKey}`

  firebase.database().ref(dbPath).set({
    "name": vname,
    "email": vemail,
    "phone": vphone,
    "message": vmsg
  })

  closeContact()

  // TODO: Find a better way to do this alert
  window.alert("Thanks, I'll get back to you soon!")
}


const mouseGo = (mouse) => {
  if (mouseGoing) {
    mouse.style.animation = "none"
    mouseGoing = false
  } else {
    mouse.style.animation = "move 2.5s infinite"
    mouseGoing = true
  }
}

const changeImage = (imgId, newImgSrc) => {
  document.getElementById(imgId).src = newImgSrc;
}

const checkTerminal = () => {
  if (localStorage.isTerminalOpen === "true") {
    document.querySelector(".m-terminal-container").style.display = "none"
    document.querySelector(".m-terminal-info").style.display = "none"
    localStorage.isTerminalOpen = "false"
  } else {
    showTerminal()
    localStorage.isTerminalOpen = "true"
  }
}

const powerMonitor1 = (theDesign) => {
  if (monitor1power) {
    theDesign.style.opacity = "0";
    monitor1power = false;
  } else {
    theDesign.style.opacity = "1";
    monitor1power = true;
  }
}

const powerMonitor2 = (theText) => {
  if (monitor2power) {
    theText.style.opacity = "0";
    monitor2power = false;
  } else {
    theText.style.opacity = "1";
    monitor2power = true;
  }
}

const drinkCoffee = (liquid, steam, spill) => {
  if (coffeeFull) {
    liquid.style.opacity = "0";
    spill.style.visibility = "visible";
    steam.style.visibility = "hidden";
    coffeeFull = false;
  } else {
    liquid.style.opacity = "1";
    spill.style.visibility = "hidden";
    steam.style.visibility = "visible";
    coffeeFull = true;
  }
}

const showContact = () => {
  const elem = document.getElementById("contactform")
  elem.style.display = "block"

  const dark = document.getElementById("darkdiv")
  dark.style.zIndex = "7"
  dark.style.opacity = "0.5"
  dark.style.className = "fadein darken"
}

const closeContact = () => {
  const elem = document.getElementById("contactform")
  elem.style.display = "none"
  document.getElementById("form1").reset()

  const dark = document.getElementById("darkdiv")
  dark.style.zIndex = "-1"
  dark.style.opacity = "0"
}


initPage()