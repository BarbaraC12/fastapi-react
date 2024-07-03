python3.9 -m venv venv
source venv/bin/activate

pip3 install -r requirements.txt

uvicorn app.main:app --reload
# open http://127.0.0.1:8000/docs