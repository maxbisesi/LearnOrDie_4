Feature: Interact with the Test Tab
    Update a Card.
    Save a Card for review then review it.
    Show the Answer.
    Go back to previous Card.
    Study a Card Set.
    Points should update as intended. 

    @TestNailedIt
    Scenario: Clicking Nailed it updates the Points and changes to the next Card, changing Card,Category and Answer.
        When The user navigates to FlashCardShark
        And The user logs in as: "QATestUser"
        And The user switches to the "Test" Tab
        And I cl

    @TestMissedIt
    Scenario: Clicking Missed it updates the Points and changes to the next Card, changing Card,Category and Answer.

    @TestNoShowUpdateCard
    Scenario: The user cannot update a card without showing the answer first

    @TestUpdateCard
    Scenario: The user can update a card they own

    @TestPreviousCard
    Scenario: The user can go back to the previous Card, with no effect on points.

    @TestSaveForReview
    Scenario: The user can save a card for later, Clicking 'Come back..' goes to the next card.

    @TestSaveForReview
    Scenario: The user can review all cards saved for later, after all saved cards are reviewed, they resume the normal sequence of cards.

    @TestUserOnlySeesFilteredCards
    Scenario: If the user turns a filter on they only see cards in the filter, 
        .They keep seeing the filtered cards until the filter is removed.
        .An indicator for the filter is shown.

    @TestUserStudiesCardSet
    Scenario: If the user studies a CardSet, they see only those cards until the Set is removed.
        .An indicator for the Set is shown.


