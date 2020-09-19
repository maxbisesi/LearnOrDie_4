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

    @HomeDragNDrop_CategoryToCollection
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
        Then The "SeleniumCollection" Collection has the following Categories:
            | DragAndDropTesting |
        And The user removes the "DragAndDropTesting" Category from the "SeleniumCollection" Collection
        Then The form matches the following values:
            | Field Name  | Value              |
            | Collections | SeleniumCollection |
        Then The following Categories are shown:
            | Field Name         | Value |
            | DragAndDropTesting | 1     |


    @HomeRemoveCategoryFromCollection
    @HomeAddCategoriesByCheckboxes
    Scenario: On the Home tab the User creates a new Collection
        When The user navigates to FlashCardShark
        And The user logs in as: "QATestUser"
        And The user switches to the "Home" Tab
        When The user selects the following Categories' checkboxes:
            | Category              |
            | Birchum Bounty Hunter |
            | Birchum Big Foot      |
            | Birchum Pop Warner    |
        And The user waits "5" seconds
        And The user creates a new Collection named: "SeleniumCollection"
        And The user waits "5" seconds
        Then The "SeleniumCollection" Collection has the following Categories:
            | Category              |
            | Birchum Bounty Hunter |
            | Birchum Big Foot      |
            | Birchum Pop Warner    |
        And The user waits "3" seconds
        When The user removes the "Birchum Bounty Hunter" Category from the "SeleniumCollection" Collection
        And The user waits "3" seconds
        When The user removes the "Birchum Big Foot" Category from the "SeleniumCollection" Collection
        And The user waits "3" seconds
        When The user removes the "Birchum Pop Warner" Category from the "SeleniumCollection" Collection
        And The user waits "3" seconds
        Then The following Categories are shown:
            | Field Name            | Value |
            | Birchum Bounty Hunter | 1     |
            | Birchum Big Foot      | 1     |
            | Birchum Pop Warner    | 1     |
        And The user waits "10" seconds


    @HomeFilterByCategory
    Scenario: On the Home tab the User creates a new Collection
        When The user navigates to FlashCardShark
        And The user logs in as: "QATestUser"
        And The user switches to the "Home" Tab
        When The user selects the following Categories' checkboxes:
            | Category              |
            | Birchum Bounty Hunter |
            | Birchum Big Foot      |
            | Birchum Pop Warner    |
        And The user clicks the "Filter" button
        And The user waits "3" seconds
        Then The user switches to the "Test" Tab
        Then The form matches the following values:
            | Field Name          | Value          |
            | Rating              | 0 / 0          |
            | Card Number         | STARTER        |
            | Questions To Review | 0              |
            | Points              | 0              |
            | Question            | starterMessage |
        And The user waits "3" seconds
        And The user clicks the "Nailed it" button
        Then The "Category" field value is one of the following:
            | Values                |
            | Birchum Bounty Hunter |
            | Birchum Big Foot      |
            | Birchum Pop Warner    |
        And The user waits "3" seconds
        And The user clicks the "Nailed it" button
        Then The "Category" field value is one of the following:
            | Values                |
            | Birchum Bounty Hunter |
            | Birchum Big Foot      |
            | Birchum Pop Warner    |
        And The user waits "3" seconds
        And The user clicks the "Nailed it" button
        Then The "Category" field value is one of the following:
            | Values                |
            | Birchum Bounty Hunter |
            | Birchum Big Foot      |
            | Birchum Pop Warner    |
        And The user waits "3" seconds
        Then The form matches the following values:
            | Field Name | Value |
            | Points     | 3     |


    @HomeFilterByCollection
    Scenario: On the Home tab the User filters their cards from a Collection
        When The user navigates to FlashCardShark
        And The user logs in as: "QATestUser"
        And The user switches to the "Home" Tab
        When The user selects the following Categories' checkboxes:
            | Category              |
            | Birchum Bounty Hunter |
            | Birchum Big Foot      |
            | Birchum Pop Warner    |
        And The user waits "2" seconds
        And The user creates a new Collection named: "CollectionFilterTest"
        Then The "CollectionFilterTest" Collection has the following Categories:
            | Category              |
            | Birchum Bounty Hunter |
            | Birchum Big Foot      |
            | Birchum Pop Warner    |
        And The user waits "3" seconds
        When The user selects the following Collections' checkboxes:
            | Collection           |
            | CollectionFilterTest |
        And The user clicks the "Filter" button 
        And The user switches to the "Test" Tab
        Then The form matches the following values:
            | Field Name          | Value          |
            | Rating              | 0 / 0          |
            | Card Number         | STARTER        |
            | Questions To Review | 0              |
            | Points              | 0              |
            | Question            | starterMessage |
        And The user waits "3" seconds
        And The user clicks the "Nailed it" button
        Then The "Category" field value is one of the following:
            | Values                |
            | Birchum Bounty Hunter |
            | Birchum Big Foot      |
            | Birchum Pop Warner    |
        And The user waits "3" seconds
        And The user clicks the "Nailed it" button
        Then The "Category" field value is one of the following:
            | Values                |
            | Birchum Bounty Hunter |
            | Birchum Big Foot      |
            | Birchum Pop Warner    |
        And The user waits "3" seconds
        And The user clicks the "Nailed it" button
        Then The "Category" field value is one of the following:
            | Values                |
            | Birchum Bounty Hunter |
            | Birchum Big Foot      |
            | Birchum Pop Warner    |
        And The user waits "3" seconds
        Then The form matches the following values:
            | Field Name | Value |
            | Points     | 3     |


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




