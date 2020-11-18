@Regression
@Chum
Feature: Create, Organize, and Delete FlashCards
    This is done through the Chum and Galley tabs.
    Use the profile tab to activate modules used to add
    speciel characters a question or answer.

    @ChumNewCard
    Scenario: On the Chum tab User creates a new FlashCard (ChumNewCard)
        . Other tests used the Chum tab to make sure cards showed up in categories
        . This one will test that the card makes it to the DB.
        When The user navigates to FlashCardShark
        And The user logs in as: "QATestUser"
        And The user switches to the "Chum" Tab
        And The user fills the form with the following values:
            | Field Name | Value        |
            | Card       | randomCard   |
            | Answer     | randomAnswer |
            | Category   | SeleniumQA   |
        And The user clicks the "Submit" button
        Then The form matches the following values:
            | Field Name | Value      |
            | Card       |            |
            | Answer     |            |
            | Category   | SeleniumQA |
        And The user queries for a FlashCard with the following properties:
            | Field    | Operator | Value        |
            | card     | =        | randomCard   |
            | answer   | =        | randomAnswer |
            | category | =        | SeleniumQA   |
        Then The queried for "FlashCard" has the following values:
            | Field Name | Value |
            | owner_id   | 4     |

    # @ChumNewCardwithEquilateral
    # Scenario: On the Chum tab the User creates a new FlashCard with an Image of an Equilateral
    #     When The user navigates to FlashCardShark
    #     And The user logs in as: "QATestUser"

    @ChumNewCardwithUnicode
    Scenario: On the Chum tab the User creates a new FlashCard with Unicode characters in the Question Answer and Category (ChumNewCardwithUnicode)
        When The user navigates to FlashCardShark
        And The user logs in as: "QATestUser"
        And The user switches to the "Home" Tab
        And The user activates the "Math" module
        And The user switches to the "Chum" Tab
        Then The "Math Module" is displayed






