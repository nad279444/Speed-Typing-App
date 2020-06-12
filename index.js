const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random'
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')

let correct = true
quoteInputElement.addEventListener('input',() => {
     const arrayQuote = quoteDisplayElement.querySelectorAll('span')
     const arrayValue = quoteInputElement.value.split('')
     arrayQuote.forEach((letterSpan,index) => {
         const letter = arrayValue[index]
         if(letter == null ) {
            letterSpan.classList.remove('correct')
            letterSpan.classList.remove('wrong')
            correct = false 
         } else if(letter === letterSpan.innerText) {
             letterSpan.classList.add('correct')
             letterSpan.classList.remove('wrong')
         } else {
            letterSpan.classList.remove('correct')
            letterSpan.classList.add('wrong')
            correct = false
         }

     })
     if (correct) renderNewQuote()
        
     
})

function getRandomQuote(){
    return fetch(RANDOM_QUOTE_API_URL)
    .then(response => response.json())
    .then(data => data.content)
}

 async function renderNewQuote(){
    const quote = await getRandomQuote()
    quoteDisplayElement.innerHTML = ''
    quote.split('').forEach(letter=>{
        const characterSpan = document.createElement('span')   
        characterSpan.innerText = letter
        quoteDisplayElement.appendChild(characterSpan)
    })
    quoteInputElement.value = null
    startTimer()

}
let startTime
function startTimer() {
    timerElement.innerText = 0
    startTime = new Date()
    setInterval(() => {
        timerElement.innerText = getTimer()

    },1000)




}
function getTimer() {
  return Math.floor((new Date() - startTime)/ 1000)
}
renderNewQuote()