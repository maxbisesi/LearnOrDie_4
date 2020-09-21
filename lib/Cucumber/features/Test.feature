Feature: Interact with the Test Tab
    Update a Card.
    Save a Card for review then review it.
    Show the Answer.
    Go back to previous Card.
    Study a Card Set.
    Points should update as intended.

    @TestNailedIt
    Scenario: Clicking Nailed it updates the Points and changes to the next Card, changing Card,Category and Answer.
        . Streak < five = streak 1, + 1
        . Streak >= 5 and currentStreak < 10 = streak 2, + 10
        . Streak > 10 and < 30 = streak 3, + 20
        . Streak >= 30 = streak 4, + 50
        When The user navigates to FlashCardShark
        And The user logs in as: "QATestUser"
        And The user switches to the "Test" Tab
        And The user clicks the "Nailed it" button
        Then The form matches the following values:
            | Field Name | Value |
            | Points     | 1     |
        When The user clicks the "Nailed it" button "4" times
        Then The form matches the following values:
            | Field Name | Value |
            | Points     | 14    |
        When The user clicks the "Nailed it" button "4" times
        Then The form matches the following values:
            | Field Name | Value |
            | Points     | 74    |
        When The user clicks the "Nailed it" button "21" times
        Then The form matches the following values:
            | Field Name | Value |
            | Points     | 504   |
        And The user clicks the "Nailed it" button
        Then The form matches the following values:
            | Field Name | Value |
            | Points     | 554   |

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


