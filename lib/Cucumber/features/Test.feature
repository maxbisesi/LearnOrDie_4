@Regression
@Test
Feature: Interact with the Test Tab
    Update a Card.
    Save a Card for review then review it.
    Show the Answer.
    Go back to previous Card.
    Study a Card Set.
    Points should update as intended.

    @TestNailedIt
    Scenario: Clicking Nailed it updates the Points and changes to the next Card changing the Points. (TestNailedIt)
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
    Scenario: Clicking Missed it updates the Points and changes to the next Card, changing Card,Category and Answer. (TestMissedIt)
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
    Scenario: The user cannot update a card without showing the answer first (TestNoShowUpdateCard)
        When The user navigates to FlashCardShark
        And The user logs in as: "QATestUser"
        And The user switches to the "Test" Tab
        When The user clicks the "Nailed it" button 3 times
        And The user clicks the "Update" button
        And The user waits "2" seconds
        Then The "Make a change first..." alert message is shown

    @TestUpdateCard
    Scenario: The user can update a card they own (TestUpdateCard)
        When The user navigates to FlashCardShark
        And The user logs in as: "QATestUser"
        And The user switches to the "Test" Tab
        When The user clicks the "Nailed it" button 5 times
        And The user saves the "Card Number" field as "card_id"
        And The user clicks the "Show" button
        And The user fills the form with the following values:
            | Field Name | Value        |
            | Card       | randomCard   |
            | Answer     | randomAnswer |
        And The user clicks the "Update" button
        When The user queries for a FlashCard with the following properties:
            | Field  | Operator | Value        |
            | card   | =        | randomCard   |
            | answer | =        | randomAnswer |
        Then The queried for "FlashCard" has the following values:
            | Field Name | Value            |
            | card_id    | testData:card_id |
            | card       | randomCard       |
            | answer     | randomAnswer     |


    @TestPreviousCard
    Scenario: The user can go back to the previous Card, with no effect on points.
        . But if they just saw that card, they don't get anymore points
        . Move forward randomly move back randomly
        When The user navigates to FlashCardShark
        And The user logs in as: "QATestUser"
        And The user switches to the "Test" Tab
        When The user clicks the "Nailed it" button
        And The user saves the "Card Number" field as "card_id_one"
        When The user clicks the "Nailed it" button
        And The user saves the "Card Number" field as "card_id_two"
        When The user clicks the "Nailed it" button
        And The user saves the "Card Number" field as "card_id_three"
        When The user clicks the "Nailed it" button
        And The user saves the "Card Number" field as "card_id_four"
        When The user clicks the "Nailed it" button
        And The user saves the "Card Number" field as "card_id_five"
        Then The form matches the following values:
            | Field Name | Value |
            | Points     | 14    |
        When The user clicks the "Previous" button
        Then The form matches the following values:
            | Field Name  | Value                 |
            | Points      | 14                    |
            | Card Number | testData:card_id_four |
        When The user clicks the "Previous" button
        Then The form matches the following values:
            | Field Name  | Value                  |
            | Points      | 14                     |
            | Card Number | testData:card_id_three |
        When The user clicks the "Previous" button
        Then The form matches the following values:
            | Field Name  | Value                |
            | Points      | 14                   |
            | Card Number | testData:card_id_two |
        When The user clicks the "Previous" button
        Then The form matches the following values:
            | Field Name  | Value                |
            | Points      | 14                   |
            | Card Number | testData:card_id_one |

    @TestSaveForReview
    Scenario: The user can save a card for later, Clicking 'Come back..' saves the card clicking 'Review' goes to the next card.
        When The user navigates to FlashCardShark
        And The user logs in as: "QATestUser"
        And The user switches to the "Test" Tab
        When The user clicks the "Nailed it" button
        And The user saves the "Card Number" field as "card_id_one"
        And The user clicks the "Come back to this one!" button
        Then The form matches the following values:
            | Field Name          | Value |
            | Questions To Review | 1     |
        When The user clicks the "Nailed it" button
        And The user clicks the "Come back to this one!" button
        Then The form matches the following values:
            | Field Name          | Value |
            | Questions To Review | 2     |
        And The user saves the "Card Number" field as "card_id_two"
        When The user clicks the "Nailed it" button
        And The user clicks the "Come back to this one!" button
        Then The form matches the following values:
            | Field Name          | Value |
            | Questions To Review | 3     |
        And The user saves the "Card Number" field as "card_id_three"
        When The user clicks the "Nailed it" button
        And The user clicks the "Come back to this one!" button
        Then The form matches the following values:
            | Field Name          | Value |
            | Questions To Review | 4     |
        And The user saves the "Card Number" field as "card_id_four"
        When The user clicks the "Nailed it" button
        And The user clicks the "Come back to this one!" button
        Then The form matches the following values:
            | Field Name          | Value |
            | Questions To Review | 5     |
            | Points              | 14    |
        And The user saves the "Card Number" field as "card_id_five"
        # Cards saved for review, Field matches now use the review feature
        When The user clicks the "Review" button
        Then The form matches the following values:
            | Field Name          | Value                 |
            | Questions To Review | 4                     |
            | Card Number         | testData:card_id_five |
        When The user clicks the "Review" button
        Then The form matches the following values:
            | Field Name          | Value                 |
            | Questions To Review | 3                     |
            | Card Number         | testData:card_id_four |
        When The user clicks the "Review" button
        Then The form matches the following values:
            | Field Name          | Value                  |
            | Questions To Review | 2                      |
            | Card Number         | testData:card_id_three |
        When The user clicks the "Review" button
        Then The form matches the following values:
            | Field Name          | Value                |
            | Questions To Review | 1                    |
            | Card Number         | testData:card_id_two |
        When The user clicks the "Review" button
        Then The form matches the following values:
            | Field Name          | Value                |
            | Questions To Review | 0                    |
            | Card Number         | testData:card_id_one |
        When The user clicks the "Nailed it" button
        Then The form matches the following values:
            | Field Name          | Value |
            | Points              | 24    |



