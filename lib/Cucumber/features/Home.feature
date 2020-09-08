@Home
Feature: Interact with Home tab
    On the home tab you can filter testing by Category or Collection.
    You can logout, Create new Collections, Rename Collection, and remove categories from collections

@HomeCreateNewCollection
Scenario: On the Home tab the User creates a new Collection
    When The user navigates to FlashCardShark
    And The user logs in as: "QATestUser"
    And The user switches to the "Home" Tab
    And The user clicks the "New Collection" button
    Then The following Collections are shown:
    | Field Name | Value                |


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




