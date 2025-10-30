import { createClient } from "@deepgram/sdk";
import fs from "fs";
import words from "./words.json" with { type: "json" };

// STEP 1: Create a Deepgram client with your API key
const deepgram = createClient(process.env.DEEPGRAM_API_KEY);
const getAudio = async (word, i) => {
  // STEP 2: Make a request and configure the request with options (such as model choice, audio configuration, etc.)
  const response = await deepgram.speak.request(
    { text: i % 2 === 0 ? `Now rescue the ${word}!` : `Let's rescue the ${word}!` },
    {
      model: "aura-2-thalia-en",
      encoding: "linear16",
      container: "wav",
    }
  );
  // STEP 3: Get the audio stream and headers from the response
  const stream = await response.getStream();
  const headers = await response.getHeaders();
  if (stream) {
    // STEP 4: Convert the stream to an audio buffer
    const buffer = await getAudioBuffer(stream);
    // STEP 5: Write the audio buffer to a file
    fs.writeFile(`./public/audio/1030/${word}.wav`, buffer, (err) => {
      if (err) {
        console.error("Error writing audio to file:", err);
      } else {
        console.log(`Audio file written to ${word}.wav`);
      }
    });
  } else {
    console.error("Error generating audio:", stream);
  }
  if (headers) {
    console.log("Headers:", headers);
  }
};
// helper function to convert stream to audio buffer
const getAudioBuffer = async (response) => {
  const reader = response.getReader();
  const chunks = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }
  const dataArray = chunks.reduce(
    (acc, chunk) => Uint8Array.from([...acc, ...chunk]),
    new Uint8Array(0)
  );
  return Buffer.from(dataArray.buffer);
};

for (let i = 0; i < words.length; i++) {
  const word = words[i];
  await getAudio(word, i);
}