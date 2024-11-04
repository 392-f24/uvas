import json
import re
from openai import OpenAI
from firebase_functions import https_fn, options
from firebase_admin import initialize_app, firestore

app = initialize_app()
db = firestore.client()
client = OpenAI()
# api_key=OPENAI_API_KEY

@https_fn.on_request()
def suggest_gifts(req: https_fn.Request) -> https_fn.Response:
    
    # Handle CORS preflight
    if req.method == 'OPTIONS':
        response = https_fn.Response()
        response.headers["Access-Control-Allow-Origin"] = "*"
        response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type"
        response.status_code = 204  # No Content for OPTIONS preflight
        return response
    
    profile_text = get_profile_text(req)
    task_text = "Suggest 5 birthday gifts. Only return a list of gift names."
    deafault_gift_list = ["gift1", "gift2", "gift3", "gift4", "gift5"]
    try:
        gift_list = generate_suggestion_list(profile_text, task_text)
    except Exception as e:
        print(e)
        gift_list = None
    gift_list = gift_list if gift_list else deafault_gift_list
    
    # Manually set headers
    response = https_fn.Response(json.dumps({"data": gift_list}), 200)
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    
    return response


@https_fn.on_request()
def suggest_events(req: https_fn.Request) -> https_fn.Response:
    
    # Handle CORS preflight
    if req.method == 'OPTIONS':
        response = https_fn.Response()
        response.headers["Access-Control-Allow-Origin"] = "*"
        response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type"
        response.status_code = 204  # No Content for OPTIONS preflight
        return response
    
    profile_text = get_profile_text(req)
    all_events, events_dict = get_event_text()
    task_text = f"Based on the profile, suggest 5 events from the following event list.\n\n{all_events}\n\nOnly return a list of event names."
    default_event_list = [{"title": "event1", "link":""}, {"title": "event2", "link":""}, {"title": "event3", "link":""}]
    try:
        event_list = generate_suggestion_list(profile_text, task_text)
        print(event_list)
        event_list = [{"title": title, "link": events_dict[title]} for title in event_list if title in events_dict]
    except Exception as e:
        print(e)
        event_list = None
    event_list = event_list if event_list else default_event_list
    
    # Manually set headers
    response = https_fn.Response(json.dumps({"data": event_list}), 200)
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    
    return response


def get_profile_text(req):
    req_data = req.get_json()
    user_id, profile_id = req_data["data"]["user_id"], req_data["data"]["profile_id"]
    user_data = db.collection("Users").document(user_id).get().to_dict()
    profile_data = user_data["Relationships"][profile_id]
    return profile_data_to_text(profile_data)


def profile_data_to_text(profile_data):
    # TODO: 
    # 1. Erase sensitive information
    # 2. Make this text more readable if necessary
    return json.dumps(profile_data)

def get_event_text():
    # The actual fetching is in scraping/scrape.py
     events_data = db.collection("Events").document("Nov").get().to_dict()["events"]
     events = events_data.keys()
     return "\n".join(events), events_data # Also passing the dictionary to get links

def generate_suggestion_list(profile_text, task_text):
    retry_count = 0
    max_retries = 3
    while retry_count < max_retries:
        try:
            res = generate_suggestion(profile_text, task_text)
            res = parse_suggestion(res)
            if type(res) == list:
                return res
            else:
                print(f"Invalid response: {res}")
                retry_count += 1
        except Exception as e:
            print(e)
            retry_count += 1
    return None


def generate_suggestion(profile_text, task_text):
    completion = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": [{"type": "text", "text": profile_text}]},
            {"role": "user", "content": [{"type": "text", "text": task_text}]},
        ],
    )
    return completion.choices[0].message.content


def parse_suggestion(res):
    res = res.strip()
    
    # First pattern: numbered list
    if re.match(r'^\d+\.\s', res):
        return [item.split('. ', 1)[1].strip() for item in res.splitlines()]
    
    # Second pattern: square brackets list
    elif res.startswith('[') and res.endswith(']'):
        return [item.strip() for item in res[1:-1].split(',')]
    
    # Third pattern: comma-separated list
    else:
        return [item.strip() for item in res.split(',')]
