// import { response } from "express";

const btn = document.querySelector("button");
let isRecording = false;
let mediaRecorder;
btn.addEventListener("click", async () => {
  if (!isRecording) {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = (e) => {
      sendAudioToServer(e.data);
    };
    mediaRecorder.start();
    isRecording = true;
    btn.innerHTML = `<i class="fa-solid fa-microphone"></i>`;
  } else {
    mediaRecorder.stop();
    isRecording = false;
    btn.innerHTML = `<i class="fa-solid fa-microphone-slash"></i>`;
  }
});
async function sendAudioToServer(blob) {
  let formData = new FormData();
  formData.append("audio", blob, "recording.webm");
  await fetch("/output1", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      document.querySelector("#myTxt").textContent = `${data.text}`;
      document.querySelector('#myConverted').textContent=data.text2;
    })
    .catch((err) => console.log(err));
}
