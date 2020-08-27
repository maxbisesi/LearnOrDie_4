Feature: Interact with Home tab
    On the home tab you can filter testing by Category or Collection.
    You can logout, Create new Collections, Rename Collection, and remove categories from collections

@HomeLogout
Scenario: Admin tests the api
    When The client logs in as a test User
    And Clicks the Logout button
    Then I am logged out.

@HomeCreateNewCollection
Scenario: On the Home tab the User creates a new Collection
    When The client logs in as a test User

@HomeAddCategoryToCollection
Scenario: On the Home tab the User creates a new Collection
    When The client logs in as a test User

@HomeRemoveCategoryFromCollection
Scenario: On the Home tab the User creates a new Collection
    When The client logs in as a test User

@HomeFilterByCategory
Scenario: On the Home tab the User creates a new Collection
    When The client logs in as a test User

@HomeFilterByCollection
Scenario: On the Home tab the User creates a new Collection
    When The client logs in as a test User

@HomeFilterByMultipleCategories
Scenario: On the Home tab the User creates a new Collection
    When The client logs in as a test User

@HomeFilterByMultipleCollections
Scenario: On the Home tab the User creates a new Collection
    When The client logs in as a test User

@HomeFilterByCategoryAndCollection
Scenario: On the Home tab the User creates a new Collection
    When The client logs in as a test User

@HomeDeleteCategory
Scenario: On the Home tab the User creates a new Collection
    When The client logs in as a test User

@HomeDeleteCollection
Scenario: On the Home tab the User creates a new Collection
    When The client logs in as a test User

@HomeRemoveFilter
Scenario: On the Home tab the User creates a new Collection
    When The client logs in as a test User




