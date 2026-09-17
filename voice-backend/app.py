from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from faster_whisper import WhisperModel
import tempfile
import os


# ----------------------------------------
# Create FastAPI app
# ----------------------------------------

app = FastAPI()


# ----------------------------------------
# CORS
# ----------------------------------------

app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://plenty-nextjs.onrender.com",
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)


# ----------------------------------------
# Load Whisper model
# ----------------------------------------

print("Loading Whisper model...")

model = WhisperModel(
    "base",
    device="cpu",
    compute_type="int8"
)

print("Whisper model loaded successfully!")


# ----------------------------------------
# Home route
# ----------------------------------------

@app.get("/")
def home():

    return {
        "success": True,
        "message": "Voice backend is running"
    }


# ----------------------------------------
# Voice route
# ----------------------------------------

@app.post("/voice")
async def voice(
    file: UploadFile = File(...)
):

    temp_path = None

    try:

        print(
            "Received audio:",
            file.filename
        )

        # ----------------------------------------
        # Create temporary audio file
        # ----------------------------------------

        with tempfile.NamedTemporaryFile(
            delete=False,
            suffix=".webm"
        ) as temp_file:

            content = await file.read()

            temp_file.write(content)

            temp_path = temp_file.name


        print(
            "Temporary audio file created:",
            temp_path
        )


        # ----------------------------------------
        # Whisper transcription
        # ----------------------------------------

        print(
            "Transcribing audio..."
        )

        segments, info = model.transcribe(
    temp_path,
    language="en",
    beam_size=5,
    vad_filter=True
)


        # ----------------------------------------
        # Combine segments
        # ----------------------------------------

        text = ""

        for segment in segments:

            text += segment.text


        text = text.strip()


        print(
            "Recognized text:",
            text
        )


        # ----------------------------------------
        # Return response
        # ----------------------------------------

        return {

            "success": True,

            "message":
                "Speech recognized successfully",

            "text": text
        }


    except Exception as error:

        print(
            "Voice processing error:",
            error
        )

        return {

            "success": False,

            "message":
                "Failed to process audio",

            "text": ""
        }


    finally:

        # ----------------------------------------
        # Delete temporary file
        # ----------------------------------------

        if (
            temp_path
            and os.path.exists(temp_path)
        ):

            os.remove(temp_path)

            print(
                "Temporary audio file deleted"
            )