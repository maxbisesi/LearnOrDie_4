Feature: API tests

@AdminAPI
Scenario: Admin tests the api
    When The client logs in as Admin
    And creates a Card
    And creates a Card List
    And saves a Session
    And updates a Card
    And creates a Set
    And delete Cards
    And renames a Category
    And adds a Category to a Collection
    And removes a Category from a Collection
    # Covered in registration test. --->
    # And The client trys to register a user that already exists
    And The client registers a new user
    

@AdminAPINegative
Scenario: Admin negative tests
    When The client logs in as Admin
    And The Client tries to something strange
    And I try to login as an Admin but use the wrong password
    And I try to login as a user that does not exist

