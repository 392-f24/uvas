import time
from selenium import webdriver
from selenium.webdriver.common.by import By
import firebase_admin
from firebase_admin import firestore

# This script is meant to run locally instead on the cloud
driver = webdriver.Chrome()

events_all = {}
base_url = 'https://yourchicagoguide.com/chicago-events-calendar/?_evDiscoveryPath=/'

def getEvents(pageNumber):
    url = base_url + f'&evPage={pageNumber}' if pageNumber > 1 else base_url
    # URL of the page with events
    driver.get(url)

    # Allow time for dynamic content to load
    time.sleep(5)

    events = driver.execute_script("""
        let shadowRoot = document.querySelector('#evvnt-calendar').shadowRoot;
        let eventElements = shadowRoot.querySelectorAll('.c-card'); // Replace '.c-card' with the actual selector if needed
        return Array.from(eventElements).map(event => {
            return {
                title: event.querySelector('h3')?.innerText || '',
                link: event.querySelector('a')?.href || ''
            };
        });
    """)

    # Filter out events without a title or link
    events = [event for event in events if event['title'] and event['link']]

    # Print the event details
    # for event in events:
    #     print(f"Title: {event['title']}, Link: {event['link']}")
        
    # print(f"number of events on page {pageNumber}:",len(events))
    # the first page has 35 events, the other pages have 30
    return events

for i in range(1, 3): # first 2 pages.
    for event in getEvents(i):
        events_all[event["title"]] = event["link"]
    
driver.quit()

print(len(events_all.keys()), "events scraped")
# for event in events_all:
#     print(event["title"])

app = firebase_admin.initialize_app()
db = firestore.client()

db.collection("Events").document("Nov").set({"events": events_all})