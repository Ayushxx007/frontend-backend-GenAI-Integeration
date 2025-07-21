import express from 'express';
import { GoogleGenAI } from "@google/genai";
import dontenv from "dotenv";
import cors from 'cors';
const app=express();
app.use(cors());

app.use(cors({
  origin: 'http://localhost:5173', // or whatever your frontend port is
  methods: ['GET', 'POST'],
  credentials: true
}));



app.use(express.json());
dontenv.config();





app.listen(3000, () => {
  console.log('Server is running on port 3000');
});



const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY, 

});

async function main(data) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: data,
    config: {
      thinkingConfig: {
        thinkingBudget: 0, // Disables thinking
      },
    }
  });
  console.log(response.text);
  return response.text;
}



app.post("/submit",async(req,res)=>{

 const {inputValue}=req.body;


  const text=await main(inputValue);
  console.log(text);

  res.json({ message: text });


})

await main("mahika");





