"use client";

import { useEffect, useRef, useState } from "react";
import { Mic, MicOff, Loader2 } from "lucide-react";

interface VoiceSearchProps {
  onTextReceived: (text: string) => void;
}

interface SpeechRecognitionResultLike {
  isFinal: boolean;
  [index: number]: {
    transcript: string;
  };
}

interface SpeechRecognitionEventLike {
  resultIndex: number;
  results: {
    length: number;
    [index: number]: SpeechRecognitionResultLike;
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

  onerror:
    | ((event: SpeechRecognitionErrorEventLike) => void)
    | null;

  onresult:
    | ((event: SpeechRecognitionEventLike) => void)
    | null;
}

type SpeechRecognitionConstructor =
  new () => SpeechRecognitionLike;

export default function VoiceSearch({
  onTextReceived,
}: VoiceSearchProps) {
  /*
   * ==========================================
   * RECOGNITION
   * ==========================================
   */

  const recognitionRef =
    useRef<SpeechRecognitionLike | null>(null);

  /*
   * Each recording gets a unique session number.
   *
   * This prevents old recognition events from
   * affecting a new recording.
   */
  const sessionRef = useRef(0);

  /*
   * ==========================================
   * TRANSCRIPT
   * ==========================================
   */

  const finalTextRef = useRef("");

  /*
   * Stores individual browser recognition
   * results so they are not appended repeatedly.
   */
  const transcriptResultsRef =
    useRef<string[]>([]);

  /*
   * ==========================================
   * TIMERS
   * ==========================================
   */

  const noSpeechTimerRef =
    useRef<ReturnType<typeof setTimeout> | null>(
      null
    );

  const silenceTimerRef =
    useRef<ReturnType<typeof setTimeout> | null>(
      null
    );

  /*
   * ==========================================
   * FLAGS
   * ==========================================
   */

  const manuallyStoppedRef =
    useRef(false);

  const finishingRef =
    useRef(false);

  const hasSpeechRef =
    useRef(false);

  /*
   * ==========================================
   * STATE
   * ==========================================
   */

  const [recording, setRecording] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [voiceText, setVoiceText] =
    useState("");

  const [showPopup, setShowPopup] =
    useState(false);

  /*
   * ==========================================
   * CLEAR TIMERS
   * ==========================================
   */

  const clearTimers = () => {
    if (noSpeechTimerRef.current) {
      clearTimeout(
        noSpeechTimerRef.current
      );

      noSpeechTimerRef.current = null;
    }

    if (silenceTimerRef.current) {
      clearTimeout(
        silenceTimerRef.current
      );

      silenceTimerRef.current = null;
    }
  };

  /*
   * ==========================================
   * COMPLETELY STOP
   * ==========================================
   */

  const completelyStopRecognition = () => {
    console.log(
      "🛑 Completely stopping recognition"
    );

    clearTimers();

    manuallyStoppedRef.current = true;
    finishingRef.current = true;

    /*
     * Invalidate the current session.
     *
     * Any old browser events will now be ignored.
     */
    sessionRef.current += 1;

    const recognition =
      recognitionRef.current;

    if (recognition) {
      try {
        recognition.onstart = null;
        recognition.onresult = null;
        recognition.onerror = null;
        recognition.onend = null;

        recognition.abort();
      } catch (error) {
        console.log(
          "Recognition already stopped"
        );
      }
    }

    recognitionRef.current = null;

    setRecording(false);
  };

  /*
   * ==========================================
   * CLOSE POPUP
   * ==========================================
   */

  const closePopup = () => {
    completelyStopRecognition();

    setShowPopup(false);
    setVoiceText("");
    setLoading(false);
    setError("");

    finalTextRef.current = "";

    transcriptResultsRef.current = [];

    hasSpeechRef.current = false;
  };

  /*
   * ==========================================
   * FINISH SEARCH
   * ==========================================
   */

  const finishVoiceSearch = () => {
    /*
     * Prevent this function from being executed
     * multiple times by different browser events.
     */
    if (finishingRef.current) {
      return;
    }

    finishingRef.current = true;

    clearTimers();

    manuallyStoppedRef.current = true;

    const finalText =
      finalTextRef.current.trim();

    console.log(
      "🎤 FINAL VOICE TEXT:",
      finalText
    );

    const recognition =
      recognitionRef.current;

    /*
     * Stop recognition.
     *
     * Do NOT restart it.
     */
    if (recognition) {
      try {
        recognition.onstart = null;
        recognition.onresult = null;
        recognition.onerror = null;
        recognition.onend = null;

        recognition.stop();
      } catch (error) {
        console.log(
          "Recognition already stopped"
        );
      }
    }

    recognitionRef.current = null;

    setRecording(false);

    /*
     * ========================================
     * TEXT FOUND
     * ========================================
     */

    if (finalText) {
      setVoiceText(finalText);

      setLoading(true);

      /*
       * Send text to parent immediately.
       */
      onTextReceived(finalText);

      /*
       * Keep final text visible briefly.
       */
      setTimeout(() => {
        setShowPopup(false);
        setVoiceText("");
        setLoading(false);

        finalTextRef.current = "";

        transcriptResultsRef.current = [];

        hasSpeechRef.current = false;
      }, 1000);

      return;
    }

    /*
     * ========================================
     * NO TEXT
     * ========================================
     */

    setVoiceText(
      "No speech detected."
    );

    setLoading(false);

    setTimeout(() => {
      setShowPopup(false);
      setVoiceText("");

      finalTextRef.current = "";

      transcriptResultsRef.current = [];

      hasSpeechRef.current = false;
    }, 1000);
  };

  /*
   * ==========================================
   * START RECORDING
   * ==========================================
   */

  const startRecording = () => {
    if (
      typeof window === "undefined"
    ) {
      return;
    }

    /*
     * Get browser SpeechRecognition.
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
     * Browser doesn't support it.
     */
    if (!SpeechRecognition) {
      setError(
        "Voice search is not supported in this browser. Please use Chrome."
      );

      return;
    }

    /*
     * Completely clean previous session.
     */
    completelyStopRecognition();

    /*
     * Create a NEW session ID.
     */
    const currentSession =
      sessionRef.current;

    /*
     * Reset everything.
     */
    manuallyStoppedRef.current =
      false;

    finishingRef.current =
      false;

    hasSpeechRef.current =
      false;

    finalTextRef.current =
      "";

    transcriptResultsRef.current =
      [];

    clearTimers();

    setError("");

    setVoiceText("");

    setLoading(false);

    setShowPopup(true);

    try {
      /*
       * Create new recognition instance.
       */
      const recognition =
        new SpeechRecognition();

      recognitionRef.current =
        recognition;

      /*
       * ======================================
       * IMPORTANT SETTINGS
       * ======================================
       */

      /*
       * Keep recognition alive while possible.
       *
       * IMPORTANT:
       * We DO NOT restart it manually in onend.
       */
      recognition.continuous = true;

      /*
       * Needed for live text.
       */
      recognition.interimResults = true;

      /*
       * English.
       */
      recognition.lang = "en-US";

      /*
       * ======================================
       * ON START
       * ======================================
       */

      recognition.onstart = () => {
        /*
         * Ignore old session.
         */
        if (
          currentSession !==
          sessionRef.current
        ) {
          return;
        }

        console.log(
          "🎤 Recognition started"
        );

        setRecording(true);

        setLoading(false);

        setShowPopup(true);

        setVoiceText("");

        /*
         * Give the user 4 seconds to begin speaking.
         */
        noSpeechTimerRef.current =
          setTimeout(() => {
            if (
              currentSession !==
              sessionRef.current
            ) {
              return;
            }

            /*
             * Only close if absolutely
             * no speech was detected.
             */
            if (
              !hasSpeechRef.current
            ) {
              console.log(
                "⏱️ No speech for 4 seconds"
              );

              finishVoiceSearch();
            }
          }, 4000);
      };

      /*
       * ======================================
       * ON RESULT
       * ======================================
       */

      recognition.onresult = (
        event
      ) => {
        /*
         * Ignore old session.
         */
        if (
          currentSession !==
          sessionRef.current
        ) {
          return;
        }

        /*
         * We have speech.
         */
        hasSpeechRef.current =
          true;

        /*
         * Cancel initial no-speech timer.
         */
        if (
          noSpeechTimerRef.current
        ) {
          clearTimeout(
            noSpeechTimerRef.current
          );

          noSpeechTimerRef.current =
            null;
        }

        /*
         * Reset silence timer.
         */
        if (
          silenceTimerRef.current
        ) {
          clearTimeout(
            silenceTimerRef.current
          );

          silenceTimerRef.current =
            null;
        }

        /*
         * ==================================
         * BUILD TRANSCRIPT
         * ==================================
         */

        let interimText = "";

        /*
         * IMPORTANT:
         *
         * We store results by INDEX.
         *
         * We do NOT blindly append them.
         *
         * This prevents:
         *
         * holidays holidays holidays
         *
         * on mobile.
         */
        for (
          let i = event.resultIndex;
          i < event.results.length;
          i++
        ) {
          const result =
            event.results[i];

          const transcript =
            result[0].transcript
              .trim();

          if (!transcript) {
            continue;
          }

          if (result.isFinal) {
            transcriptResultsRef.current[
              i
            ] = transcript;
          } else {
            interimText +=
              transcript + " ";
          }
        }

        /*
         * Combine confirmed results.
         */
        const finalText =
          transcriptResultsRef.current
            .filter(Boolean)
            .join(" ")
            .trim();

        finalTextRef.current =
          finalText;

        /*
         * Display live text.
         */
        const displayText =
          `${finalText} ${interimText}`
            .trim();

        setVoiceText(
          displayText
        );

        /*
         * ==================================
         * 3 SECOND SILENCE
         * ==================================
         */

        silenceTimerRef.current =
          setTimeout(() => {
            if (
              currentSession !==
              sessionRef.current
            ) {
              return;
            }

            console.log(
              "🔇 3 seconds of silence"
            );

            finishVoiceSearch();
          }, 3000);
      };

      /*
       * ======================================
       * ON ERROR
       * ======================================
       */

      recognition.onerror = (
        event
      ) => {
        /*
         * Ignore old session.
         */
        if (
          currentSession !==
          sessionRef.current
        ) {
          return;
        }

        /*
         * Ignore errors caused by our own
         * intentional stop.
         */
        if (
          manuallyStoppedRef.current ||
          finishingRef.current
        ) {
          return;
        }

        console.error(
          "❌ Speech recognition error:",
          event.error
        );

        clearTimers();

        setRecording(false);

        /*
         * Permission denied.
         */
        if (
          event.error ===
          "not-allowed"
        ) {
          setError(
            "Microphone permission was denied."
          );

          setVoiceText(
            "Please allow microphone access."
          );
        }

        /*
         * Microphone unavailable.
         */
        else if (
          event.error ===
          "audio-capture"
        ) {
          setError(
            "Could not access your microphone."
          );

          setVoiceText(
            "Could not access microphone."
          );
        }

        /*
         * Network problem.
         */
        else if (
          event.error ===
          "network"
        ) {
          setError(
            "Voice recognition needs an internet connection."
          );

          setVoiceText(
            "Voice recognition unavailable."
          );
        }

        /*
         * No speech.
         */
        else if (
          event.error ===
          "no-speech"
        ) {
          /*
           * Don't treat this as a fatal
           * microphone failure.
           *
           * If we already have text,
           * finish it.
           */
          if (
            finalTextRef.current.trim()
          ) {
            finishVoiceSearch();
            return;
          }

          setError(
            "No speech detected."
          );

          setVoiceText(
            "No speech detected."
          );
        }

        /*
         * Other errors.
         */
        else {
          setError(
            "Voice recognition failed."
          );

          setVoiceText(
            "Voice recognition failed."
          );
        }

        /*
         * IMPORTANT:
         *
         * Do NOT restart recognition here.
         */
        manuallyStoppedRef.current =
          true;

        recognitionRef.current =
          null;

        setTimeout(() => {
          if (
            currentSession ===
            sessionRef.current
          ) {
            setShowPopup(false);
            setVoiceText("");
          }
        }, 1200);
      };

      /*
       * ======================================
       * ON END
       * ======================================
       */

      recognition.onend = () => {
        /*
         * Ignore old session.
         */
        if (
          currentSession !==
          sessionRef.current
        ) {
          return;
        }

        console.log(
          "🛑 Recognition ended"
        );

        /*
         * IMPORTANT:
         *
         * NEVER call:
         *
         * recognition.start()
         *
         * here.
         *
         * Mobile Chrome can naturally end
         * recognition and immediately restarting
         * it causes the mic ON/OFF problem.
         */

        setRecording(false);

        /*
         * If the user already stopped it,
         * do nothing.
         */
        if (
          manuallyStoppedRef.current ||
          finishingRef.current
        ) {
          return;
        }

        /*
         * If we already have text,
         * finish the search.
         */
        if (
          finalTextRef.current.trim()
        ) {
          finishVoiceSearch();

          return;
        }

        /*
         * Otherwise close gracefully.
         */
        clearTimers();

        setShowPopup(false);
        setVoiceText("");

        recognitionRef.current =
          null;
      };

      /*
       * ======================================
       * START
       * ======================================
       */

      recognition.start();

      console.log(
        "🎤 Starting voice search..."
      );
    } catch (error) {
      console.error(
        "❌ Could not start voice recognition:",
        error
      );

      /*
       * Clean everything.
       */
      completelyStopRecognition();

      setShowPopup(false);

      setVoiceText("");

      setError(
        "Could not start voice recognition."
      );
    }
  };

  /*
   * ==========================================
   * MIC BUTTON
   * ==========================================
   */

  const handleMicClick = () => {
    /*
     * Don't allow another action while
     * processing the search.
     */
    if (loading) {
      return;
    }

    /*
     * If recording → manually finish.
     */
    if (recording) {
      finishVoiceSearch();
    } else {
      /*
       * Start a completely new session.
       */
      startRecording();
    }
  };

  /*
   * ==========================================
   * CLEANUP WHEN COMPONENT UNMOUNTS
   * ==========================================
   */

  useEffect(() => {
    return () => {
      clearTimers();

      manuallyStoppedRef.current =
        true;

      finishingRef.current =
        true;

      sessionRef.current += 1;

      const recognition =
        recognitionRef.current;

      if (recognition) {
        try {
          recognition.onstart = null;
          recognition.onresult = null;
          recognition.onerror = null;
          recognition.onend = null;

          recognition.abort();
        } catch (error) {
          console.log(
            "Recognition already stopped"
          );
        }
      }

      recognitionRef.current =
        null;
    };
  }, []);

  /*
   * ==========================================
   * UI
   * ==========================================
   */

  return (
    <>
      {/* ================================= */}
      {/* MOBILE MICROPHONE BUTTON */}
      {/* ================================= */}

      <div
        className="
          relative
          flex
          w-full
          min-w-0
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
            min-w-0
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

          <span
            className="
              relative
              z-10
            "
          >
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
          <p
            className="
              absolute
              left-1/2
              top-full
              z-50
              mt-2
              w-[calc(100vw-32px)]
              max-w-[360px]
              -translate-x-1/2
              break-words
              px-2
              text-center
              text-xs
              leading-4
              text-red-500
            "
          >
            {error}
          </p>
        )}
      </div>

      {/* ================================= */}
      {/* VOICE POPUP */}
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
            p-4
          "
        >
          <div
            className="
              box-border
              flex
              w-full
              min-w-0
              max-w-[420px]
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
            {/* Mic icon */}

            <div
              className={`
                mx-auto
                mb-4
                flex
                h-14
                w-14
                shrink-0
                items-center
                justify-center
                rounded-full

                ${
                  recording
                    ? "bg-red-100 text-red-500"
                    : "bg-blue-100 text-blue-500"
                }
              `}
            >
              {loading ? (
                <Loader2
                  size={28}
                  className="animate-spin"
                />
              ) : recording ? (
                <Mic size={28} />
              ) : (
                <MicOff size={28} />
              )}
            </div>

            {/* Transcript */}

            <div
              className="
                box-border
                w-full
                min-w-0
                max-w-full
                overflow-x-hidden
                overflow-y-auto
                rounded-xl
                bg-gray-50
                px-3
                py-3
                sm:px-4
                sm:py-4
              "
              style={{
                maxHeight:
                  "40vh",
                minHeight:
                  "56px",
              }}
            >
              <p
                className="
                  m-0
                  w-full
                  min-w-0
                  max-w-full
                  break-words
                  whitespace-normal
                  text-wrap
                  text-sm
                  font-medium
                  leading-5
                  text-gray-800
                  sm:text-base
                  sm:leading-6
                  md:text-lg
                "
              >
                {voiceText ||
                  "Start speaking..."}
              </p>
            </div>

            {/* Helper */}

            {recording && (
              <p
                className="
                  mt-3
                  w-full
                  max-w-full
                  break-words
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