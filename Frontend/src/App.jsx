import {useState} from 'react';
import React from 'react';

function App() {

  const [inputValue, setInputValue] = useState('');
  const [responseMessage,setResponseMessage]=useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  }

  const handleSubmit=async()=>{

    try{
       const response=await fetch("http://localhost:3000/submit",{

       method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputValue }),

       
    });

       const data = await response.json();

    setResponseMessage(data.message);

       



    }catch(error){

     setErrorMessage('An error occurred while submitting the data.'+error.message);
     console.error('Error:', error);


    }

   
  }

  
  return (
    <>
      <div>
        <input value={inputValue} onChange={handleInputChange}   className="border-2" type="text"></input>
        <button onClick={handleSubmit} className="border-2 p-1 m-2 rounded-3xl hover:bg-amber-600">submit</button>

        {responseMessage  && <p className="mt-4 text-green-600">{responseMessage}</p>}
        {errorMessage && <p className="mt-4 text-red-600">{errorMessage}</p>}

      </div>
    </>
  )
}

export default App;
