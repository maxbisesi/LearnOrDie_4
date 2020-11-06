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

    Scenario: I can search for a Card in the Galley



    Scenario: The user can edit a CardSet
    Scenario: I can share a CardSet
    Scenario: I can page through all my Cards
    Scenario: I can delete a FlashCard
    Scenario: The counter shows how many clicked FlashCards