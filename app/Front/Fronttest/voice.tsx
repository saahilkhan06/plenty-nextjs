"use client";

import { useRef, useState } from "react";
import { Mic, MicOff, Loader2 } from "lucide-react";

interface VoiceSearchProps {
  onTextReceived: (text: string) => void;
}

export default function VoiceSearch({
  onTextReceived,
}: VoiceSearchProps) {

  // ============================================
  // Refs
  // ============================================

  const mediaRecorderRef =
    useRef<MediaRecorder | null>(null);

  const streamRef =
    useRef<MediaStream | null>(null);

  const audioChunksRef =
    useRef<Blob[]>([]);

  const audioContextRef =
    useRef<AudioContext | null>(null);

  const analyserRef =
    useRef<AnalyserNode | null>(null);

  const silenceTimerRef =
    useRef<ReturnType<typeof setTimeout> | null>(null);

  const animationFrameRef =
    useRef<number | null>(null);

  // Important:
  // We don't want the initial silence to stop recording.
  // User must speak first.
  const hasDetectedSpeechRef =
    useRef(false);

  // ============================================
  // State
  // ============================================

  const [recording, setRecording] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  // ============================================
  // Detect silence
  // ============================================

  const detectSilence = (
    stream: MediaStream
  ) => {

    const audioContext =
      new AudioContext();

    const analyser =
      audioContext.createAnalyser();

    const source =
      audioContext.createMediaStreamSource(
        stream
      );

    analyser.fftSize = 2048;

    source.connect(analyser);

    audioContextRef.current =
      audioContext;

    analyserRef.current =
      analyser;

    const dataArray =
      new Uint8Array(
        analyser.fftSize
      );

    const checkAudio = () => {

      if (!mediaRecorderRef.current) {
        return;
      }

      analyser.getByteTimeDomainData(
        dataArray
      );

      let sum = 0;

      for (
        let i = 0;
        i < dataArray.length;
        i++
      ) {
        const value =
          (dataArray[i] - 128) / 128;

        sum += value * value;
      }

      const volume =
        Math.sqrt(
          sum / dataArray.length
        );

      // Voice threshold
      const isSilent =
        volume < 0.02;

      // ========================================
      // Voice detected
      // ========================================

      if (!isSilent) {

        // User has started speaking
        hasDetectedSpeechRef.current =
          true;

        // Cancel silence timer
        if (silenceTimerRef.current) {

          clearTimeout(
            silenceTimerRef.current
          );

          silenceTimerRef.current =
            null;
        }
      }

      // ========================================
      // Silence detected AFTER speech
      // ========================================

      if (
        isSilent &&
        hasDetectedSpeechRef.current
      ) {

        if (!silenceTimerRef.current) {

          silenceTimerRef.current =
            setTimeout(() => {

              console.log(
                "🔇 3 seconds of silence detected"
              );

              stopRecording();

            }, 3000);
        }
      }

      animationFrameRef.current =
        requestAnimationFrame(
          checkAudio
        );
    };

    checkAudio();
  };

  // ============================================
  // Start recording
  // ============================================

  const startRecording =
    async () => {

      try {

        setError("");

        console.log(
          "🎤 Requesting microphone..."
        );

        const stream =
          await navigator.mediaDevices.getUserMedia(
            {
              audio: true,
            }
          );

        console.log(
          "🎤 Microphone access granted"
        );

        streamRef.current =
          stream;

        // Reset speech detection
        hasDetectedSpeechRef.current =
          false;

        const mediaRecorder =
          new MediaRecorder(stream);

        mediaRecorderRef.current =
          mediaRecorder;

        audioChunksRef.current =
          [];

        // ======================================
        // Audio chunks
        // ======================================

        mediaRecorder.ondataavailable =
          (event) => {

            if (
              event.data.size > 0
            ) {

              audioChunksRef.current.push(
                event.data
              );
            }
          };

        // ======================================
        // Recording stopped
        // ======================================

        mediaRecorder.onstop =
          async () => {

            console.log(
              "🛑 Recording stopped"
            );

            const audioBlob =
              new Blob(
                audioChunksRef.current,
                {
                  type:
                    mediaRecorder.mimeType,
                }
              );

            console.log(
              "Audio size:",
              audioBlob.size
            );

            console.log(
              "Audio type:",
              audioBlob.type
            );

            // Stop microphone
            stream
              .getTracks()
              .forEach((track) =>
                track.stop()
              );

            streamRef.current =
              null;

            mediaRecorderRef.current =
              null;

            // Clear silence timer
            if (
              silenceTimerRef.current
            ) {

              clearTimeout(
                silenceTimerRef.current
              );

              silenceTimerRef.current =
                null;
            }

            // Stop animation
            if (
              animationFrameRef.current
            ) {

              cancelAnimationFrame(
                animationFrameRef.current
              );

              animationFrameRef.current =
                null;
            }

            // Close AudioContext
            if (
              audioContextRef.current
            ) {

              await audioContextRef.current.close();

              audioContextRef.current =
                null;
            }

            // Send audio to FastAPI
            await sendAudio(
              audioBlob
            );
          };

        // ======================================
        // Start MediaRecorder
        // ======================================

        mediaRecorder.start();

        setRecording(true);

        setLoading(false);

        console.log(
          "🎙️ Recording started"
        );

        // Start silence detection
        detectSilence(stream);

      } catch (error) {

        console.error(
          "❌ Microphone error:",
          error
        );

        setError(
          "Could not access microphone."
        );
      }
    };

  // ============================================
  // Stop recording
  // ============================================

  const stopRecording =
    () => {

      if (
        !mediaRecorderRef.current
      ) {
        return;
      }

      if (
        mediaRecorderRef.current
          .state === "recording"
      ) {

        console.log(
          "🛑 Stopping recording..."
        );

        mediaRecorderRef.current.stop();

        setRecording(false);
      }
    };

  // ============================================
  // Send audio to FastAPI
  // ============================================

  const sendAudio =
    async (
      audioBlob: Blob
    ) => {

      try {

        setLoading(true);

        setError("");

        console.log(
          "================================"
        );

        console.log(
          "📤 SEND AUDIO FUNCTION CALLED"
        );

        console.log(
          "Audio blob:",
          audioBlob
        );

        console.log(
          "Audio size:",
          audioBlob.size
        );

        console.log(
          "Audio type:",
          audioBlob.type
        );

        // ======================================
        // FormData
        // ======================================

        const formData =
          new FormData();

        formData.append(
          "file",
          audioBlob,
          "voice.webm"
        );

        console.log(
          "📤 Sending audio to FastAPI..."
        );

        // ======================================
        // FastAPI request
        // ======================================

        const response =
          await fetch(
            "http://127.0.0.1:8000/voice",
            {
              method: "POST",
              body: formData,
            }
          );

        console.log(
          "📥 FastAPI status:",
          response.status
        );

        if (!response.ok) {

          throw new Error(
            `Server returned ${response.status}`
          );
        }

        // ======================================
        // Response
        // ======================================

        const data =
          await response.json();

        console.log(
          "📦 FastAPI response:",
          data
        );

        console.log(
          "🎤 YOU SPOKE:",
          data.text
        );

        // ======================================
        // Recognized text
        // ======================================

        if (
          data.success &&
          typeof data.text === "string" &&
          data.text.trim()
        ) {

          const recognizedText =
            data.text.trim();

          console.log(
            "✅ RECOGNIZED TEXT:",
            recognizedText
          );

          // Send text to parent
          onTextReceived(
            recognizedText
          );

        } else {

          console.log(
            "❌ No text returned from Whisper"
          );

          setError(
            "I couldn't understand your voice."
          );
        }

      } catch (error) {

        console.error(
          "❌ Voice API error:",
          error
        );

        setError(
          "Unable to connect to the voice backend."
        );

      } finally {

        setLoading(false);
      }
    };

  // ============================================
  // UI
  // ============================================

  return (
    <div className="flex w-full items-center justify-center lg:hidden">

      <button
        type="button"
        disabled={loading}
        onClick={
          recording
            ? stopRecording
            : startRecording
        }
        className={`
          relative
          flex
          h-14
          w-full
          items-center
          justify-center
          overflow-visible
          rounded-[10px]
          transition-all
          duration-300

          ${
            recording
              ? "bg-red-500 text-white shadow-lg shadow-red-300"
              : "bg-[#55A5F5] text-white hover:bg-[#3A8DE4]"
          }

          ${
            loading
              ? "cursor-not-allowed opacity-70"
              : ""
          }
        `}
      >

        {/* ==================================
            Recording animation
        ================================== */}

        {recording && (
          <>
            <span
              className="
                absolute
                inset-0
                animate-ping
                rounded-[10px]
                bg-red-400
                opacity-40
              "
            />

            <span
              className="
                absolute
                -inset-1
                animate-pulse
                rounded-[10px]
                border-2
                border-red-300
              "
            />
          </>
        )}

        {/* ==================================
            Icon
        ================================== */}

        <span className="relative z-10">

          {loading ? (

            <Loader2
              size={26}
              className="animate-spin"
            />

          ) : recording ? (

            <MicOff size={26} />

          ) : (

            <Mic size={26} />

          )}

        </span>
      </button>

      {/* Error */}
      {error && (
        <p className="absolute mt-20 text-xs text-red-300">
          {error}
        </p>
      )}

    </div>
  );
}