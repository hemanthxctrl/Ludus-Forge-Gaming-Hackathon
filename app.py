import http.server
import socketserver
import webbrowser
import os
import threading
import time

# Configuration
PORT = 8080
DIRECTORY = os.path.join(os.path.dirname(os.path.abspath(__file__)), "404 SQUAD")
FILE_TO_SERVE = "N-block-mind-descent.html"

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
        
    def log_message(self, format, *args):
        # Suppress automatic logging to keep the console clean
        pass

def start_server():
    # Allow address reuse to prevent "Address already in use" errors during rapid restarts
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"Serving game from directory: {DIRECTORY}")
        httpd.serve_forever()

if __name__ == "__main__":
    # Start the server in a separate background thread
    server_thread = threading.Thread(target=start_server, daemon=True)
    server_thread.start()
    
    # Give the server a moment to start up
    time.sleep(0.5)
    
    # Open the default web browser pointing to the game URL
    url = f"http://localhost:{PORT}/{FILE_TO_SERVE}"
    print(f"Launching game in browser: {url}")
    webbrowser.open(url)
    
    print("--------------------------------------------------")
    print("Server is running. DO NOT CLOSE this window.")
    print("Press Ctrl+C to stop the server when you're done.")
    print("--------------------------------------------------")
    
    # Keep the main thread alive so the server continues running
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\nStopping server and exiting...")
