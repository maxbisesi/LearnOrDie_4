Feature: Current users can interact with the Galley tab to
    . Create new Card Sets
    . Edit a card
    . See all Card Sets, for those sets they can Study, Delete, share or Edit them
    . Page through all cards
    . Delete a Card
    . Counter shows all Clicked Cards.

    @TestUserStudiesCardSet
    @TestUserCreatesaCardSet
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
        And The user clicks the "Save to Set" button
        And The user fills the form with the following values:
            | Field Name    | Value                                   |
            | Card Set Name | BirchumCardSet                          |
            | Description   | Leeches the size of frisbees on my neck |
        And The user clicks the "Save" button

    Scenario: I can create new CardSet
    Scenario: I can edit a Card From Galley
    Scenario: I can search for a Card in the Galley

    Scenario: The user deletes a CardSet

    Scenario: The user can edit a CardSet

    Scenario: I can share a CardSet
    Scenario: I can page through all my Cards
    Scenario: I can delete a FlashCard
    Scenario: The counter shows how many clicked FlashCards