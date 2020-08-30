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
        Then The "Login" Tab is shown
        And The user switches to the "Home" Tab
        And The user switches to the "Chum" Tab
        And The user switches to the "Test" Tab
        And The user switches to the "Chum" Tab

    @UserAfterLoginSeeProfile
    Scenario: After a user successfully logs in they see their profile
        When The user navigates to FlashCardShark
        And The user logs in as: "TestUser01"
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
        And The user clicks the "Submit" button
        And The user switches to the "Home" Tab


# Scenario: If guest user adds some cards then registers, their cards get saved and are accessible

# Scenario: If a current user adds cards then logs in, those cards are saved and accessible.

# Scenario: Session is saved after loggin out

# Scenario: Only Users can use the Galley, not guest Users

# Scenario: Users are promoted if they earn the next rank

# Scenario: Newly registered users are given the Recruit rank after register.

# Scenario: A user can activate Modules in their profile