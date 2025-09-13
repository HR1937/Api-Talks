# Api-Talks

A simple backend project to learn APIs, file uploads, and deployment.

## What it does

- Upload an audio file → converts speech to text using ElevenLabs.
- Translates the text from English to Gujarati using Google GenAI.
- Frontend served from `public` folder.
- Deployed online for public use.

## Try it online

[Api-Talks Live](https://api-talks-production.up.railway.app/)

## How to run locally

1. Clone the repo:
   git clone https://github.com/HR1937/Api-Talks.git
   cd Api-Talks

2. Install dependencies:
   npm install

3. Create a `.env` file with your API keys:
   XI_API_KEY=your_elevenlabs_api_key  
   GEMINI=your_google_genai_api_key

4. Start the server:
   npm start

Access locally at `http://localhost:3000`.

## Tech Used

- Node.js + Express  
- Multer (file uploads)  
- ElevenLabs (speech-to-text)  
- Google GenAI (translation)  
- Railway (deployment)
