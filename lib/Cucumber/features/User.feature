@User
Feature: A user can log in and interact with their profile
    If a newly registered user is created, they can interact with their profile
    Guest users can: Add and Study cards, see categories and filter by them
    but unless they login and register nothing will be saved.
    If a guest user adds some cards then registers their cards will be saved.
    If a current user adds some cards then logs in, those new cards will be saved.
    Session is saved when logging out.
    Only users can use the Galley.
    Users are promoted if they meet the new criteria.
    Newly Registered users are given the Recruit rank when they first register.

    @FCSisShown
    Scenario: The user opens the App, Login is the first tab
        When The user navigates to FlashCardShark
        And The user uses the app as a Guest
        Then The "Login" Tab is shown
        And The user switches to the "Home" Tab
        And The user switches to the "Chum" Tab
        And The user switches to the "Test" Tab

    @UserAfterLoginSeeProfile
    Scenario: After a user successfully logs in they see their profile
        When The user navigates to FlashCardShark
        And The user logs in as: "QATestUser"
        Then The "Profile" Tab is shown
        Then The form matches the following values:
            | Field Name  | Value  |
            | Math Module | exists |
            | Chat Module | exists |
            | Draw tab    | exists |

    @UserRegisterUser
    Scenario: Newly registered users can interact with their profile
        When The user navigates to FlashCardShark
        And The user clicks the "Come Aboard" button
        And The user fills the form with the following values:
            | Field Name | Value                |
            | username   | QATester02           |
            | password   | lodqa0828            |
            | confirm    | lodqa0828            |
            | email      | max.bisesi@gmail.com |
        And The user clicks the "Choose Your Destiny" button
        Then The form matches the following values:
            | Field Name  | Value  |
            | Math Module | exists |
            | Chat Module | exists |
            | Draw tab    | exists |

    @UserGuestUserAddCards
    Scenario: Guest users can add Cards, Study Cards, see catogries and Filter, but that's it
        When The user navigates to FlashCardShark
        And The user uses the app as a Guest
        And The user switches to the "Chum" Tab
        And The user fills the form with the following values:
            | Field Name | Value              |
            | Card       | SeleniumTestCard   |
            | Answer     | SeleniumTestAnswer |
            | Category   | SeleniumTests      |
        Then The form matches the following values:
            | Field Name | Value              |
            | Card       | SeleniumTestCard   |
            | Answer     | SeleniumTestAnswer |
            | Category   | SeleniumTests      |
        And The user clicks the "Submit" button
        # Animation should play and TextAreas should be cleared if this worked
        # Category doesn't get cleared though
        Then The form matches the following values:
            | Field Name | Value         |
            | Card       |               |
            | Answer     |               |
            | Category   | SeleniumTests |
        And The user switches to the "Home" Tab
        Then The following Categories are shown:
            | Field Name    | Value |
            | SeleniumTests | 1     |


    @UserGuestCardsSavedonRegister
    Scenario: If guest user adds some cards then registers, their cards get saved and are accessible
        When The user navigates to FlashCardShark
        And The user uses the app as a Guest
        And The user switches to the "Chum" Tab
        And The user fills the form with the following values:
            | Field Name | Value                       |
            | Card       | What's a QA's goal in life? |
            | Answer     | Not quality, Equality.      |
            | Category   | SeleniumQA                  |
        Then The form matches the following values:
            | Field Name | Value                       |
            | Card       | What's a QA's goal in life? |
            | Answer     | Not quality, Equality.      |
            | Category   | SeleniumQA                  |
        And The user clicks the "Submit" button
        Then The form matches the following values:
            | Field Name | Value      |
            | Card       |            |
            | Answer     |            |
            | Category   | SeleniumQA |
        And The user fills the form with the following values:
            | Field Name | Value                      |
            | Card       | How many Dev's equal a QA? |
            | Answer     | 1 QA for every 4 Devs      |
        Then The form matches the following values:
            | Field Name | Value                      |
            | Card       | How many Dev's equal a QA? |
            | Answer     | 1 QA for every 4 Devs      |
        And The user clicks the "Submit" button
        Then The form matches the following values:
            | Field Name | Value      |
            | Card       |            |
            | Answer     |            |
            | Category   | SeleniumQA |
        And The user switches to the "Home" Tab
        Then The following Categories are shown:
            | Field Name | Value |
            | SeleniumQA | 2     |
        And The user switches to the "Login/Profile" Tab
        And The user clicks the "Come Aboard" button
        And The user fills the form with the following values:
            | Field Name | Value                |
            | username   | randomusername       |
            | password   | lodqa0828            |
            | confirm    | lodqa0828            |
            | email      | max.bisesi@gmail.com |
        And The user clicks the "Choose Your Destiny" button
        Then The form matches the following values:
            | Field Name  | Value  |
            | Math Module | exists |
            | Chat Module | exists |
            | Draw tab    | exists |
        And The user switches to the "Home" Tab
        Then The following Categories are shown:
            | Field Name | Value |
            | SeleniumQA | 2     |

    @currentUserAddsCardsAsGuest
    Scenario: If a current user adds cards then logs in, those cards are saved and accessible.
        When The user navigates to FlashCardShark
        And The user uses the app as a Guest
        And The user switches to the "Chum" Tab
        And The user fills the form with the following values:
            | Field Name | Value                         |
            | Card       | Why did you forget to log in? |
            | Answer     | Because this test will pass   |
            | Category   | randomcategory                |
        Then The form matches the following values:
            | Field Name | Value                         |
            | Card       | Why did you forget to log in? |
            | Answer     | Because this test will pass   |
            | Category   | randomcategory                |
        And The user clicks the "Submit" button
        Then The form matches the following values:
            | Field Name | Value          |
            | Card       |                |
            | Answer     |                |
            | Category   | randomcategory |
        And The user switches to the "Login/Profile" Tab
        And The user logs in as: "QATestUser"
        And The user switches to the "Home" Tab
        Then The following Categories are shown:
            | Field Name     | Value |
            | randomcategory | 1     |

    @UserSessionSavedLogout
    Scenario: Session is saved after logging out
        When The user navigates to FlashCardShark
        And The user logs in as: "QATestUser"
        And The user switches to the "Home" Tab
        And The user clicks the "Logout" button
        Then The form matches the following values:
            | Field Name                   | Value  |
            | Brave the Treacherour Waters | exists |

    @UserOnlyUsersSeeGalley
    Scenario: Only Users can use the Galley, not guest Users
        When The user navigates to FlashCardShark
        And The user logs in as: "QATestUser"
        And The user switches to the "Galley" Tab

    @UserRanksUp
    Scenario: Users are promoted if they earn the next rank
        When The user navigates to FlashCardShark
        And The user logs in as: "QATestUser"


# Scenario: Newly registered users are given the Recruit rank after register.

# Scenario: A user can activate Modules in their profile