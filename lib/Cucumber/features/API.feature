Feature: API

@AdminAPI
Scenario: API calls return the right response with good parameters
    When The client logs in as a test User
    And creates a Card
    And creates a Card List
    And saves a Session
    And updates a Card
    And creates a Set
    And delete Cards
    And renames a Category
    And adds a Category to a Collection
    And removes a Category from a Collection
    And The client registers a new user
    

@AdminAPINegative
Scenario: The client logs in as a test User
    When The client logs in as Admin
    And The Client tries to something strange
    And I try to login as an Admin but use the wrong password
    And I try to login as a user that does not exist

