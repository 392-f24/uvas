# Welcome to Cloud Functions for Firebase for Python!
# To get started, simply uncomment the below code or create your own.
# Deploy with `firebase deploy`
import json
import firebase_admin
from firebase_functions import https_fn
from firebase_admin import initialize_app, firestore

app = initialize_app()
db = firestore.client()

@https_fn.on_request()
def on_request_example(req):
    if req.method == 'OPTIONS':
        headers = {
            'Access-Control-Allow-Origin': '*',  
            'Access-Control-Allow-Methods': 'GET, POST',
            'Access-Control-Allow-Headers': 'Content-Type', 
            'Access-Control-Max-Age': '3600',
        }
        return ('', 204, headers)
    headers = {
        'Access-Control-Allow-Origin': '*'
    }
    
    doc_ref = db.collection("Users").document("User1")
    
    return (json.dumps({'data': doc_ref.get().to_dict()}), 200, headers)