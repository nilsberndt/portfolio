import './index.html'
import './styles.css'

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

const contactFormDefault = 
  `<h1>CONTACT ME</h1>
  <form id="form1" action="javascript:;" name="form1">
    <input type="hidden" name="contact_number">
    <input type="text" id="vname" name="name" placeholder="Name*" required><br>
    <input type="text" id="vemail" name="email" placeholder="E-mail*" required><br>
    <input type="text" id="vphone" name="phone" placeholder="Phone (optional)"><br>
    <textarea type="text" cols="50" id="vmsg" name="msg" placeholder="Enter Message*" required></textarea>
  </form>
  <div class="m-contact-form--buttons">
    <button type="reset" class="e-shrink-3" id="cancel" form="form1" value="Cancel">CANCEL</button>
    <button type="submit" class="e-shrink-3" id="submit" form="form1" value="Submit">SUBMIT</button>
  </div>`

// This is so webpack can find the images with dynamic names since they become hashes
const importAllIcons = (r) => {
  let images = {}
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item) })
  return images
}

const icons = importAllIcons(require.context('./assets/images', false, /^.*logo.*\.png$/))

// Set state stuff for the header animation
let coffeeFull = true
let monitor1power = true
let monitor2power = true
let mouseGoing = true

// 'Terminal' closed by default
localStorage.isTerminalOpen = "false" // Note: localStorage cannot use true boolean values, thus the string

const contactForm = document.getElementById('contactform')

const initPage = () => {
  // Iterate over map of icons and add event listeners for mouseover/mouseout icon color changes
  Object.keys(icoMap).map(icoKey => {
    const icoElem = document.getElementById(icoKey)
    const icoVal = icoMap[icoKey]
    const icoColor = icons[`${icoVal}-logo-color.png`]
    const icoWhite = icons[`${icoVal}-logo-white.png`]
    icoElem.addEventListener('mouseover', () => changeImage(icoKey, icoColor))
    icoElem.addEventListener('mouseout', () => changeImage(icoKey, icoWhite))
  })

  // Set additional page event listeners
  getAndSetEvent('darkdiv', 'click', closeContact)
  getAndSetEvent('cancel', 'click', closeContact)
  getAndSetEvent('form1', 'submit', () => {
    import(/* webpackChunkName: "firebase" */ './firebase.js').then(module => { module.sendMessage })
  })
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


const showTerminal = () => {
  document.querySelector(".m-terminal-container").style.display = "grid"
  document.querySelector(".m-bash-input").focus()
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
  contactForm.style.display = "block"
  getAndSetEvent('cancel', 'click', closeContact)
  getAndSetEvent('form1', 'submit', () => {
    import(/* webpackChunkName: "firebase" */ './firebase.js').then(module => {
      module.sendMessage()
    })
  })
  const dark = document.getElementById("darkdiv")
  dark.style.zIndex = "7"
  dark.style.opacity = "0.5"
  dark.style.className = "fadein darken"
}

const closeContact = () => {
  contactForm.style.display = "none"
  contactForm.innerHTML = contactFormDefault
  document.getElementById("form1").reset()

  const dark = document.getElementById("darkdiv")
  dark.style.zIndex = "-1"
  dark.style.opacity = "0"
}

initPage()