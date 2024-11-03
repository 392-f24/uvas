import json
from openai import OpenAI
from firebase_functions import https_fn, options
from firebase_admin import initialize_app, firestore

app = initialize_app()
db = firestore.client()
client = OpenAI()
# api_key=OPENAI_API_KEY


@https_fn.on_request(
    cors=options.CorsOptions(cors_origins="*", cors_methods=["get", "post"])
)
def suggest_gifts(req):
    profile_text = get_profile_text(req)
    task_text = "Suggest 5 birthday gifts. Only return a list of gift names."
    # res = generate_suggestion_list(profile_text, task_text)
    return https_fn.Response(json.dumps({"data": profile_text}), 200)


@https_fn.on_request(
    cors=options.CorsOptions(cors_origins="*", cors_methods=["get", "post"])
)
def suggest_events(req):
    profile_text = get_profile_text(req)
    all_events = fetch_events()
    task_text = f"Suggest at most 3 events in the folling event list.\n\n{all_events}\n\nOnly return a list of event names."
    # res = generate_suggestion_list(profile_text, task_text)
    return https_fn.Response(json.dumps({"data": profile_text}), 200)


def get_profile_text(req):
    req_data = json.loads(req.data)["data"]
    user_id, profile_id = req_data["user_id"], req_data["profile_id"]
    user_data = db.collection("Users").document(user_id).get().to_dict()
    # The current data structure for relationships is too clumpsy
    # Ideally we should be able to access the data by profile_id directly
    # i.e. profile_data = user_data["Relationships"][profile_id]
    # TODO: wait for the data structure to be fixed. 
    # It's super easy to change, replace the outer list with a dict and get rid of all the unnecessary nesting dicts
    profile_data = user_data["Relationships"][0][profile_id] # this is a workaround that only works for person1
    return profile_data_to_text(profile_data)


def profile_data_to_text(profile_data):
    # TODO: 
    # 1. Erase sensitive information
    # 2. Make this text more readable if necessary
    return json.dumps(profile_data)

def fetch_events():
    # TODO
    pass

def generate_suggestion_list(profile_text, task_text):
    retry_count = 0
    max_retries = 3
    while retry_count < max_retries:
        try:
            res = generate_suggestion(profile_text, task_text)
            res = parse_suggestion(res)
            return res
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
    # TODO add possible parsing patterns
    return res
