import express from "express";
import fs from 'fs'
import multer from 'multer'
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const port = 3000;
let transcript;

app.use(express.static("public"));

const elevenlabs = new ElevenLabsClient({
  apiKey: process.env.XI_API_KEY,
});
const upload = multer({ dest: "uploads/" });
app.post("/output1", upload.single("audio"),async (req, res) => {
  try{
    transcript=await elevenlabs.speechToText.convert({
      file: fs.createReadStream(req.file.path),
      modelId: 'scribe_v1',
      languageCode: "eng"
    })
    fs.unlinkSync(req.file.path);
    let ans=await output2();
    res.json({text : transcript.text,text2: ans});
    
  }
  catch(err){
    console.log(err);
    res.status(500).json({error: "Transcription internal error!!"});
  }
});

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI,
});
async function output2()//convert eng to guj
{
  let ans=await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Hey gemini, you need to translate the english text that I am providing to Gujarati language, the english text is "${transcript.text}" and yeah note that You are about to send only the gujarati text and not ANYTHING else like here is the text or anything... I want just the guj text in the output`
  })
  return ans.text;
}




app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
