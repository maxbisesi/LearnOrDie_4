Feature: Create User

Scenario: Empty Payload

If the Client sends a POST request to /register with an unsupported payload, it should
recieve a response with an 400 code.

When The client sends a POST request to /login, without a payload.
Then Our API should respond with a 400 HTTP status code
