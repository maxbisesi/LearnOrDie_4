@Regression
Feature: Current users can interact with the Galley tab to
    . Create new Card Sets
    . Edit a card
    . See all Card Sets, for those sets they can Study, Delete, share or Edit them
    . Page through all cards
    . Delete a Card
    . Counter shows all Clicked Cards.

    @StudyCardSet
    @CreatesaCardSet
    @DeleteCardSet
    @GalleyCounter
    Scenario: The user creates a CardSet then loads it for studying
        . If the user studies a CardSet, they see only those cards until the Set is removed.
        . An indicator for the Set is shown.
        . When they remove the Set, they go back to regular sequencing
        When The user navigates to FlashCardShark
        And The user logs in as: "QATestUser"
        And The user switches to the "Galley" Tab
        And The user selects the following question cards:
            | Question                                           |
            | Is this the mailroom ? (Shoulda Sent it Sooner)    |
            | You guys hiring ? (Birchum Security Guard)         |
            | What was your dad doing slinging hash state side ? |
        Then The form matches the following values:
            | Field Name              | Value |
            | Card Set size indicator | 3     |
        And The user clicks the "Save to Set" button
        And The user fills the form with the following values:
            | Field Name    | Value                                   |
            | Card Set Name | BirchumCardSet                          |
            | Description   | Leeches the size of frisbees on my neck |
        And The user clicks the "Save" button
        And The user studies the "BirchumCardSet" Card Set
        Then The form matches the following values:
            | Field Name | Value |
            | Points     | 0     |
        Then The following Card Set Indicators are shown:
            | Set Name       | Set Size | Description                             |
            | BirchumCardSet | 3        | Leeches the size of frisbees on my neck |
        And The user switches to the "Galley" Tab
        And The user deletes the "BirchumCardSet" Card Set

    @GalleyEditCardModal
    Scenario: Edit Card Modal, Clicked cards show correctly in the modal
        When The user navigates to FlashCardShark
        And The user logs in as: "QATestUser"
        And The user switches to the "Galley" Tab
        And The user selects the following question cards:
            | Question                                           |
            | Is this the mailroom ? (Shoulda Sent it Sooner)    |
            | You guys hiring ? (Birchum Security Guard)         |
            | What was your dad doing slinging hash state side ? |
        Then The form matches the following values:
            | Field Name              | Value |
            | Card Set size indicator | 3     |
        And The user clicks the "Edit Card" button
        # Edit Cards in order clicked ?
        Then The form matches the following values:
            | Field Name          | Value                  |
            | Edit Card: Question | Is this the mailroom ? |
            | Edit Card: Answer   | I'm not the mailroom ! |
            | Edit Card: Category | Shoulda Sent it Sooner |
        #| Edit Card: card_id indicator | |
        And The user clicks the "Edit Card: Next" button
        Then The form matches the following values:
            | Field Name          | Value                  |
            | Edit Card: Question | You guys hiring ?      |
            | Edit Card: Answer   | wah wah wah            |
            | Edit Card: Category | Birchum Security Guard |
        And The user clicks the "Edit Card: Next" button
        Then The form matches the following values:
            | Field Name          | Value                                                           |
            | Edit Card: Question | What was your dad doing slinging hash state side ?              |
            | Edit Card: Answer   | Probably blew Bob Hope when he rolled into town on the USO show |
            | Edit Card: Category | Birchum Lost Leg                                                |

    @EditRandomCard
    Scenario: Editing a card correctly updates its representation in the DB
        When The user navigates to FlashCardShark
        And The user logs in as: "QATestUser"
        And The user switches to the "Galley" Tab
        And The user clicks a random question card
        And The user clicks the "Edit Card" button
        And The user fills the form with the following values:
            | Field Name          | Value        |
            | Edit Card: Question | randomCard   |
            | Edit Card: Answer   | randomAnswer |
            | Edit Card: Category | UPDATE TEST  |
        And The user clicks the "Edit Card: Save" button
        And The user queries for a FlashCard with the following properties:
            | Field    | Operator | Value        |
            | card     | =        | randomCard   |
            | answer   | =        | randomAnswer |
            | category | =        | UPDATE TEST  |
        Then The queried for "FlashCard" has the following values:
            | Field Name | Value        |
            | card       | randomCard   |
            | answer     | randomAnswer |
            | category   | UPDATE TEST  |

    @GalleyPaging
    Scenario: I can page through all my Cards.
        When The user navigates to FlashCardShark
        And The user logs in as: "QATestUser"
        And The user switches to the "Galley" Tab
        And The user queries for their Card Count
        Then There's "queryData:cardCount" Questions on Page number "1"


    @GalleySearchForCardandEdit
    Scenario: I can search for a Card in the Galley
        . Insert two Cards with a randomized unique Questions in the Chum window
        . Then Search for them in Galley, ensure they appear
        . Also validates that new Cards get into the Galley
        When The user navigates to FlashCardShark
        And The user logs in as: "QATestUser"
        And The user switches to the "Galley" Tab
        And The user queries for their Card Count
        Then There's "queryData:cardCount" Questions on Page number "1"
        When The user switches to the "Chum" Tab
        When The user fills the form with the following values:
            | Field Name | Value          |
            | Card       | randomCard     |
            | Answer     | randomAnswer   |
            | Category   | randomCategory |
        And The user clicks the "Submit" button
        And The user switches to the "Galley" Tab
        And The user fills the form with the following values:
            | Field Name | Value      |
            | Search Bar | randomCard |
        And The user clicks the "Search" button
        Then There's "1" Questions on Page number "1"
        When The user selects the following question cards:
            | GalleyQuestion |
            | randomCard     |
        And The user clicks the "Edit Card" button
        Then The form matches the following values:
            | Field Name          | Value          |
            | Edit Card: Question | randomCard     |
            | Edit Card: Answer   | randomAnswer   |
            | Edit Card: Category | randomCategory |
        

    #The following features still need to be implemented
    @GalleyEditCardSet
    Scenario: The user can edit a CardSet

    @GalleyShareCardSet
    Scenario: I can share a CardSet

    @GalleyDeleteCard
    Scenario: I can delete a FlashCard
