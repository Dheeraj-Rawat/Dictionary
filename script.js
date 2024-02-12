const form = document.querySelector('form');
const resultDiv = document.querySelector('.result');

form.addEventListener('submit' , (e)=>{
    
    e.preventDefault(); 

    
    getInfo(form.elements[0].value);


});

const getInfo = async (word)=>{
    try{
        resultDiv.innerHTML = "Fetching Data....";


    
    
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await  response.json();
    resultDiv.innerHTML = `
       <h2><strong>Word : </strong>${data[0].word}</h2>
       <p class = "partOfSpeech">${data[0].meanings[0]. partOfSpeech}</p>
       <p><strong>Meaning : </strong>${data[0].meanings[0].definitions[0].definition === undefined ? "Not Found" :
       data[0].meanings[0].definitions[0].definition}</p>
       <p><strong>Example : </strong>${data[0].meanings[0].definitions[0].example === undefined ? "Not Found" :
       data[0].meanings[0].definitions[0].example}</p>
       
       <p><strong>Antonyms:</strong></p>
       

    `;
    
    if(data[0].meanings[0].definitions[0].antonyms.length === 0){
        resultDiv.innerHTML += `<Span>Not Found</span>`;


    }
    else{
        for(let i = 0; i<data[0].meanings[0].definitions[0].antonyms.length; i++){
            resultDiv.innerHTML += `<li>${data[0].meanings[0].definitions[0].antonyms[i]}</li>`
        }

    };
    
    resultDiv.innerHTML += `<div><a href = "${data[0].sourceUrls}" target = "_blank"> Read More </a></div>`;
    

    

}
catch(error){
    resultDiv.innerHTML = `<p>Sorry, couldn't find the match</p>`

}

    
    
    console.log(data);





}