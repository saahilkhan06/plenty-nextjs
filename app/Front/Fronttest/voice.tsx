"use client";

import { useRef, useState } from "react";
import { Mic, MicOff, Loader2 } from "lucide-react";

interface VoiceSearchProps {
  onTextReceived: (text: string) => void;
}

interface SpeechRecognitionEventLike {
  resultIndex: number;
  results: {
    length: number;
    [index: number]: {
      isFinal: boolean;
      [index: number]: {
        transcript: string;
      };
    };
  };
}

interface SpeechRecognitionErrorEventLike {
  error: string;
}

interface SpeechRecognitionLike {
  continuous: boolean;
  interimResults: boolean;
  lang: string;

  start: () => void;
  stop: () => void;
  abort: () => void;

  onstart: (() => void) | null;
  onend: (() => void) | null;

  onerror: ((event: SpeechRecognitionErrorEventLike) => void) | null;

  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
}

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

export default function VoiceSearch({ onTextReceived }: VoiceSearchProps) {
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  /*
   * Stores the final words that the browser
   * has already confirmed.
   */
  const finalTextRef = useRef("");

  /*
   * Timer used when no speech is detected.
   */
  const noSpeechTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /*
   * Timer used after the user stops speaking.
   */
  const silenceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /*
   * Used to know whether the user manually
   * stopped the microphone.
   */
  const manuallyStoppedRef = useRef(false);

  /*
   * Prevents the recognition from automatically
   * restarting after we intentionally stop it.
   */
  const shouldKeepListeningRef = useRef(false);

  const [recording, setRecording] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [voiceText, setVoiceText] = useState("");

  const [showPopup, setShowPopup] = useState(false);

  /*
   * ==========================================
   * CLEAR ALL TIMERS
   * ==========================================
   */
  const clearTimers = () => {
    if (noSpeechTimerRef.current) {
      clearTimeout(noSpeechTimerRef.current);

      noSpeechTimerRef.current = null;
    }

    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);

      silenceTimerRef.current = null;
    }
  };

  /*
   * ==========================================
   * COMPLETELY STOP MICROPHONE
   * ==========================================
   */
  const completelyStopRecognition = () => {
    console.log("🛑 Completely stopping voice recognition");

    clearTimers();

    shouldKeepListeningRef.current = false;

    manuallyStoppedRef.current = true;

    const recognition = recognitionRef.current;

    if (recognition) {
      try {
        /*
         * abort() immediately stops recognition.
         *
         * This is preferable when we want
         * the microphone to turn off completely.
         */
        recognition.abort();
      } catch (error) {
        console.log("Recognition already stopped");
      }
    }

    recognitionRef.current = null;

    setRecording(false);
  };

  /*
   * ==========================================
   * FINISH VOICE SEARCH
   * ==========================================
   */
  const finishVoiceSearch = () => {
    clearTimers();

    shouldKeepListeningRef.current = false;

    manuallyStoppedRef.current = true;

    const finalText = finalTextRef.current.trim();

    console.log("🎤 Final voice text:", finalText);

    /*
     * Stop recognition completely.
     */
    const recognition = recognitionRef.current;

    if (recognition) {
      try {
        recognition.stop();
      } catch (error) {
        console.log("Recognition already stopped");
      }
    }

    recognitionRef.current = null;

    setRecording(false);

    /*
     * If we have text, send it to the
     * parent component.
     */
    if (finalText) {
      setVoiceText(finalText);

      onTextReceived(finalText);

      /*
       * Give the user a moment to see
       * the final text before closing.
       */
      setTimeout(() => {
        setShowPopup(false);
        setVoiceText("");
        setLoading(false);
      }, 1200);
    } else {
      /*
       * No speech was detected.
       */
      setVoiceText("No speech detected.");

      setLoading(false);

      setTimeout(() => {
        setShowPopup(false);
        setVoiceText("");
      }, 1000);
    }
  };

  /*
   * ==========================================
   * START RECORDING
   * ==========================================
   */
  const startRecording = () => {
    if (typeof window === "undefined") {
      return;
    }

    setError("");

    /*
     * Get browser SpeechRecognition.
     *
     * Chrome uses webkitSpeechRecognition.
     * Some browsers expose SpeechRecognition.
     */
    const SpeechRecognition =
      (
        window as unknown as {
          SpeechRecognition?: SpeechRecognitionConstructor;
          webkitSpeechRecognition?: SpeechRecognitionConstructor;
        }
      ).SpeechRecognition ||
      (
        window as unknown as {
          webkitSpeechRecognition?: SpeechRecognitionConstructor;
        }
      ).webkitSpeechRecognition;

    /*
     * Browser does not support SpeechRecognition.
     */
    if (!SpeechRecognition) {
      setError(
        "Voice recognition is not supported. Please use Chrome or Edge.",
      );

      return;
    }

    try {
      /*
       * Clean up any previous recognition.
       */
      completelyStopRecognition();

      /*
       * Reset everything for the new search.
       */
      finalTextRef.current = "";

      manuallyStoppedRef.current = false;

      shouldKeepListeningRef.current = true;

      clearTimers();

      /*
       * Create new recognition instance.
       */
      const recognition = new SpeechRecognition();

      recognitionRef.current = recognition;

      /*
       * Continue listening.
       */
      recognition.continuous = true;

      /*
       * Give us temporary/interim results
       * while the user is still speaking.
       */
      recognition.interimResults = true;

      /*
       * English voice search.
       */
      recognition.lang = "en-US";

      /*
       * ======================================
       * RECOGNITION STARTED
       * ======================================
       */
      recognition.onstart = () => {
        console.log("🎤 Voice recognition started");

        setRecording(true);

        setLoading(false);

        setShowPopup(true);

        setVoiceText("Listening...");

        /*
         * Start 3-second no-speech timer.
         *
         * If nothing is detected for 3 seconds,
         * automatically close the popup.
         */
        noSpeechTimerRef.current = setTimeout(() => {
          console.log("⏱️ No speech detected for 3 seconds");

          finishVoiceSearch();
        }, 2000);
      };

      /*
       * ======================================
       * LIVE TRANSCRIPTION
       * ======================================
       */
      recognition.onresult = (event) => {
        /*
         * Speech has been detected.
         *
         * Cancel the no-speech timer.
         */
        if (noSpeechTimerRef.current) {
          clearTimeout(noSpeechTimerRef.current);

          noSpeechTimerRef.current = null;
        }

        /*
         * User is actively speaking.
         *
         * Cancel previous silence timer.
         */
        if (silenceTimerRef.current) {
          clearTimeout(silenceTimerRef.current);

          silenceTimerRef.current = null;
        }

        let interimText = "";

        let finalText = finalTextRef.current;

        /*
         * Read all recognition results.
         */
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];

          const transcript = result[0].transcript;

          /*
           * Final result = browser is confident
           * about these words.
           */
          if (result.isFinal) {
            finalText += transcript + " ";
          } else {
            /*
             * Interim result = live text.
             */
            interimText += transcript;
          }
        }

        finalText = finalText.trim();

        finalTextRef.current = finalText;

        /*
         * Combine confirmed text +
         * currently spoken text.
         */
        const displayText = `${finalText} ${interimText}`.trim();

        if (displayText) {
          setVoiceText(displayText);
        }

        /*
         * Start a silence timer.
         *
         * If the browser gives us a result and
         * then no new speech arrives for 3 sec,
         * finish the search.
         */
        silenceTimerRef.current = setTimeout(() => {
          console.log("🔇 3 seconds of silence");

          finishVoiceSearch();
        }, 3000);
      };

      /*
       * ======================================
       * ERROR
       * ======================================
       */
      recognition.onerror = (event) => {
        console.error("❌ Speech recognition error:", event.error);

        clearTimers();

        setRecording(false);

        setLoading(false);

        /*
         * If we intentionally stopped it,
         * don't show an error.
         */
        if (manuallyStoppedRef.current) {
          return;
        }

        if (event.error === "not-allowed") {
          setError("Microphone permission was denied.");

          setVoiceText("Microphone permission denied.");
        } else if (event.error === "no-speech") {
          setError("No speech detected.");

          setVoiceText("No speech detected.");
        } else if (event.error === "audio-capture") {
          setError("Could not access your microphone.");

          setVoiceText("Could not access microphone.");
        } else {
          setError("Voice recognition failed.");

          setVoiceText("Voice recognition failed.");
        }

        /*
         * Make sure microphone is no longer active.
         */
        shouldKeepListeningRef.current = false;

        recognitionRef.current = null;

        setTimeout(() => {
          setShowPopup(false);
          setVoiceText("");
        }, 1500);
      };

      /*
       * ======================================
       * RECOGNITION ENDED
       * ======================================
       */
      recognition.onend = () => {
        console.log("🛑 Voice recognition ended");

        /*
         * If we intentionally stopped it,
         * don't restart.
         */
        if (!shouldKeepListeningRef.current) {
          setRecording(false);

          return;
        }

        /*
         * Browser sometimes stops SpeechRecognition
         * automatically.
         *
         * Restart it so the user can continue speaking.
         */
        try {
          console.log("🔄 Restarting voice recognition...");

          recognition.start();
        } catch (error) {
          console.log("Could not restart recognition");
        }
      };

      /*
       * ======================================
       * START
       * ======================================
       */
      recognition.start();

      setShowPopup(true);

      setVoiceText("Listening...");
    } catch (error) {
      console.error("❌ Could not start voice recognition:", error);

      completelyStopRecognition();

      setShowPopup(false);

      setError("Could not start voice recognition.");
    }
  };

  /*
   * ==========================================
   * BUTTON CLICK
   * ==========================================
   */
  const handleMicClick = () => {
    if (loading) {
      return;
    }

    if (recording) {
      /*
       * User manually clicked mic to stop.
       */
      finishVoiceSearch();
    } else {
      /*
       * Start new voice search.
       */
      startRecording();
    }
  };

  return (
    <>
      {/* ================================= */}
      {/* MICROPHONE BUTTON */}
      {/* ================================= */}

      <div
        className="
          flex
          w-full
          items-center
          justify-center
          lg:hidden
        "
      >
        <button
          type="button"
          disabled={loading}
          onClick={handleMicClick}
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

            ${loading ? "cursor-not-allowed opacity-70" : ""}
          `}
        >
          {/* Recording animation */}
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

          <span className="relative z-10">
            {loading ? (
              <Loader2 size={26} className="animate-spin" />
            ) : recording ? (
              <MicOff size={26} />
            ) : (
              <Mic size={26} />
            )}
          </span>
        </button>

        {/* Error message */}
        {error && (
          <p
            className="
              absolute
              mt-20
              px-4
              text-center
              text-xs
              text-red-300
            "
          >
            {error}
          </p>
        )}
      </div>

      {/* ================================= */}
      {/* RESPONSIVE CENTER POPUP */}
      {/* ================================= */}

      {showPopup && (
        <div
          className="
      fixed
      inset-0
      z-[9999]
      flex
      items-center
      justify-center
      overflow-hidden
      bg-black/30
      px-3
      py-4
    "
        >
          <div
            className="
        box-border
        flex
        w-full
        max-w-[420px]
        min-w-0
        flex-col
        overflow-hidden
        rounded-2xl
        bg-white
        p-4
        text-center
        shadow-2xl

        sm:p-5
      "
          >
            {/* Mic */}
            <div
              className={`
          mx-auto
          mb-3
          flex
          h-14
          w-14
          shrink-0
          items-center
          justify-center
          rounded-full

          ${recording ? "bg-red-100 text-red-500" : "bg-blue-100 text-blue-500"}
        `}
            >
              {recording ? <Mic size={28} /> : <MicOff size={28} />}
            </div>

            {/* Transcript */}
            <div
              className="
          box-border
          w-full
          min-w-0
          max-w-full
          overflow-y-auto
          overflow-x-hidden
          rounded-xl
          bg-gray-50
          px-3
          py-3

          max-h-[35vh]
          min-h-[52px]

          sm:max-h-[40vh]
          sm:px-4
          sm:py-4
        "
            >
              <p
                className="
            m-0
            w-full
            min-w-0
            max-w-full
            whitespace-normal
            break-words
            text-sm
            font-medium
            leading-5
            text-gray-800

            sm:text-base
            sm:leading-6

            md:text-lg
          "
              >
                {voiceText || "Start speaking..."}
              </p>
            </div>

            {/* Helper text */}
            {recording && (
              <p
                className="
            mt-3
            w-full
            max-w-full
            px-1
            text-[11px]
            leading-4
            text-gray-400

            sm:mt-4
            sm:text-xs
            sm:leading-5
          "
              >
                Speak now. Your words will appear here.
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
