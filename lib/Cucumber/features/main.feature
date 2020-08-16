Feature: Create User

Scenario: Empty Payload

If the Client sends a POST request to /register with an unsupported payload, it should
recieve a response with an 400 code.

When The client creates a POST request to /register
And Uses an existing username
And Sends the request
Then Our API should respond with a 400 HTTP status code
