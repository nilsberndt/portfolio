import { initializeApp } from 'firebase/app'
import { getDatabase, ref, set } from 'firebase/database'


// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB2Kn8Cv1Y8MUgR6m-0oCpo-vKvFAZnxHE", // Don't worry, this doesn't need to be private
  authDomain: "portfolio-12beb.firebaseapp.com",
  databaseURL: "https://portfolio-12beb.firebaseio.com",
  projectId: "portfolio-12beb",
  storageBucket: "portfolio-12beb.appspot.com",
  messagingSenderId: "598758145112"
}

const firebaseApp = initializeApp(firebaseConfig)

const firebaseDB = getDatabase(firebaseApp)

const contactForm = document.getElementById("contactform")

const contactFormComplete = 
  `<h4>Thanks! I'll get back to you soon.</h4>
  <div class="m-contact-form--buttons">
    <button type="submit" id="okbutton" class="e-shrink-3" value="Ok">OK</button>
  </div>`

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

  set(ref(firebaseDB, dbPath), {
    name: vname,
    email: vemail,
    phone: vphone,
    message: vmsg
  })

  contactForm.innerHTML = contactFormComplete
  document.getElementById("okbutton").addEventListener("click", closeContact)

}

const closeContact = () => {
  contactForm.style.display = "none"
  contactForm.innerHTML = contactFormDefault
  document.getElementById("form1").reset()

  const dark = document.getElementById("darkdiv")
  dark.style.zIndex = "-1"
  dark.style.opacity = "0"
}

export { sendMessage }