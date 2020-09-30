Feature: Interact with the Test Tab
    Update a Card.
    Save a Card for review then review it.
    Show the Answer.
    Go back to previous Card.
    Study a Card Set.
    Points should update as intended.

    @TestNailedIt
    Scenario: Clicking Nailed it updates the Points and changes to the next Card changing the Points.
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
        When The user clicks the "Nailed it" button 4 times
        Then The form matches the following values:
            | Field Name | Value |
            | Points     | 14    |
        When The user clicks the "Nailed it" button 5 times
        Then The form matches the following values:
            | Field Name | Value |
            | Points     | 74    |
        When The user clicks the "Nailed it" button 21 times
        Then The form matches the following values:
            | Field Name | Value |
            | Points     | 554   |
        And The user clicks the "Nailed it" button
        Then The form matches the following values:
            | Field Name | Value |
            | Points     | 604   |

    @TestMissedIt
    Scenario: Clicking Missed it updates the Points and changes to the next Card, changing Card,Category and Answer.
        . Rut <= 5 && currentRut > 0  -= 10;
        . Rut > 5 && currentRut <= 10  -= 20;
        . Rut > 10 && currentRut <= 15 -= 50;
        . Rut > 15 -= 150;
        When The user navigates to FlashCardShark
        And The user logs in as: "QATestUser"
        And The user switches to the "Test" Tab
        When The user clicks the "Missed it" button 5 times
        Then The form matches the following values:
            | Field Name | Value |
            | Points     | -50   |
        When The user clicks the "Missed it" button 5 times
        Then The form matches the following values:
            | Field Name | Value |
            | Points     | -150  |
        When The user clicks the "Missed it" button 5 times
        Then The form matches the following values:
            | Field Name | Value |
            | Points     | -400  |

    @TestNoShowUpdateCard
    Scenario: The user cannot update a card without showing the answer first
        When The user navigates to FlashCardShark
        And The user logs in as: "QATestUser"
        And The user switches to the "Test" Tab
        When The user clicks the "Nailed it" button 3 times
        And The user clicks the "Update" button
        And The user waits "2" seconds
        Then The "Make a change first..." alert message is shown

    @TestUpdateCard
    Scenario: The user can update a card they own
        When The user navigates to FlashCardShark
        And The user logs in as: "QATestUser"
        And The user switches to the "Test" Tab
        When The user clicks the "Nailed it" button 5 times
        And The user clicks the "Show" button
        And The user fills the form with the following values:
            | Field Name | Value        |
            | Card       | randomCard   |
            | Answer     | randomAnswer |
        And The user clicks the "Update" button


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


