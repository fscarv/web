import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

const isRecordingSupported =
  !!navigator.mediaDevices &&
  typeof navigator.mediaDevices.getUserMedia === "function" &&
  typeof window.MediaRecorder === "function"

type RoomParams = {
  roomId: string
}

export function RecordRoomAudioPage() {
  const [isRecording, setIsRecording] = useState(false);
  const recorder = useRef<MediaRecorder | null>(null);

  const params = useParams<RoomParams>()
  if (!params.roomId) {
    return <Navigate replace to="/" />
  }

  async function stopRecording() {
    setIsRecording(false);

    if (recorder.current && recorder.current.state !== 'inactive') {
      recorder.current.stop();
    }
  }

  async function uploadAudio(audio: Blob) {
    const formData = new FormData();
    formData.append('audio', audio, 'audio.webm');

    const response = await fetch(`http://localhost:3333/rooms/${params.roomId}/audio`, {
      method: 'POST',
      body: formData,
    })

    const result = await response.json()

    console.log(result)
  }

  async function startRecording() {
    if (!isRecordingSupported) {
      return alert("Navegador não suporta gravação de áudio");
    }
    setIsRecording(true);

    const audio = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44_100,
      }
    })

    recorder.current = new MediaRecorder(audio, {
      mimeType: 'audio/webm',
      audioBitsPerSecond: 64_000,
    })

    recorder.current.ondataavailable = event => {
      if (event.data.size > 0) {
        uploadAudio(event.data)
      }
    }

    recorder.current.onstart = () => {
      console.log('recorder started')
    }

    recorder.current.onstop = () => {
      console.log('recorder stopped')
    }

    recorder.current.start();
  }

  return (
    <div className="flex flex-col h-screen items-center justify-center gap-3">
      {isRecording ? (
        <Button onClick={stopRecording}>Parar gravação</Button>
      ) : (
        <Button onClick={startRecording}>Gravar Áudio</Button>
      )}

      {isRecording ? <span>Gravando...</span> : <p>Nenhuma gravação iniciada</p>}
    </div>
  )
}