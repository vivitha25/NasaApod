const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
let apiQuotes = [];
// show loading
function loading(){
    loader.hidden=false;
    quoteContainer.hidden=true;
}
//Hide loading
function complete(){
    quoteContainer.hidden=false;
    loader.hidden=true;
}
// show new quote
function newQuote(){
    loading();
    const quote=apiQuotes[Math.floor(Math.random()* apiQuotes.length)];
    // author is blank
    if(!quote.author){
        authorText.textContent='Unknown'
    }else{
    
    authorText.textContent=quote.author;
    }
    //determine styling
    if(quote.text.length>120){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }
    //Set quote,hide loader
    quoteText.textContent=quote.text;
    complete();
}
// Get Quotes
 async function getQuotes(){
    loading();
     const apiUrl='https://type.fit/api/quotes'
    try{
       const response=await fetch(apiUrl);
       apiQuotes=await response.json();
       newQuote();

    }catch (error){
        
    }
 }
 //Tweet
 function tweetQuote(){
    const twitterUrl=`https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl,'_blank');
 }
 //Event Listeners
 newQuoteBtn.addEventListener('click', newQuote);
 twitterBtn.addEventListener('click', tweetQuote);
 getQuotes();


