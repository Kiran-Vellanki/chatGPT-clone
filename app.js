const API_KEY = "api key";
const submitBtn=document.querySelector('#submit')
const output= document.querySelector('#output')
const historyElement=document.querySelector('.history')
const buttonElement=document.querySelector('button')

const inputElement=document.querySelector('input')

function changeInput(value){
  const inputElement=  document.querySelector('input')
  inputElement.value=value
}
async function getResult() {
    console.log("clicked")
    const options={
        method: 'POST',
        headers:{
            'Authorization':`Bearer ${API_KEY }`,
            'content-type':'application/json'
        },
        body: JSON.stringify({
            model:"gpt-3.5-turbo",
            messages:[{role:"user",content:inputElement.value}],
            max_tokens:100 
        })
    }
 try {
 const response=await fetch('open ai completions link', options)
    // const response=await.fetch("https://api.openai.com/v1/chat/completions");
   const data=await response.json()
   console.log(data)
  
   output.textContent=data.choices[0].message.content
  
   if(data.choices[0].message.content){
    const pElement=document.createElement('p')
    pElement.addEventListener('click',()=>changeInput(pElement.textContent))
    pElement.textContent=inputElement.value
    historyElement.append(pElement)

   }
 } catch (error) {
    console.log(error)
 }
}

submitBtn.addEventListener('click',getResult)
function clearInput(){
    inputElement.value=''
}
buttonElement.addEventListener('click',clearInput)
