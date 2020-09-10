@Home
Feature: Interact with Home tab
    On the home tab you can filter testing by Category or Collection.
    You can logout, Create new Collections, Rename Collection, and remove categories from collections

    @HomeCreateNewCollection
    Scenario: On the Home tab the User creates a new Collection
        . This will create a new Collection locally but until
        . a category is saved to it a Collection is just an empty vessle
        . and won't be saved into the DB
        When The user navigates to FlashCardShark
        And The user logs in as: "QATestUser"
        And The user switches to the "Home" Tab
        And The user creates a new Collection named: "SeleniumCollection"
        Then The form matches the following values:
            | Field Name  | Value              |
            | Collections | SeleniumCollection |


    @HomeAddCategoryToCollection
    Scenario: On the Home tab the User creates a new Collection
        . This will create a new Collection locally but until
        . a category is saved to it a Collection is just an empty vessle
        . and won't be saved into the DB
        When The user navigates to FlashCardShark
        And The user logs in as: "QATestUser"
        And The user switches to the "Chum" Tab
        And The user fills the form with the following values:
            | Field Name | Value                 |
            | Card       | Drag and Drop Testing |
            | Answer     | It works              |
            | Category   | randomcategory        |
        And The user clicks the "Submit" button
        And The user switches to the "Home" Tab
        Then The following Categories are shown:
            | Field Name     | Value |
            | randomcategory | 1     |
        And The user creates a new Collection named: "SeleniumCollection"
        And The user drags the "randomcategory" Category into the "SeleniumCollection" Collection
    # Then The "SeleniumCollection" Collection has the following Categories:
    #     | DragAndDropTesting |
    # And The user removes the "DragAndDropTesting" Category from the "SeleniumCollection" Collection
    # Then The form matches the following values:
    #     | Field Name  | Value              |
    #     | Collections | SeleniumCollection |
    # Then The following Categories are shown:
    #     | Field Name         | Value |
    #     | DragAndDropTesting | 1     |


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




