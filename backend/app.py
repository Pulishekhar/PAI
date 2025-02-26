from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import PyPDF2
import io
from celery import Celery



app = FastAPI()

celery = Celery(...)

# Allow frontend to communicate with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (change this in production)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/upload/")
async def upload_pdf(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        pdf_reader = PyPDF2.PdfReader(io.BytesIO(contents))
        extracted_text = "\n".join([page.extract_text() for page in pdf_reader.pages if page.extract_text()])

        return {"extracted_text": extracted_text}
    
    except Exception as e:
        return {"error": str(e)}
