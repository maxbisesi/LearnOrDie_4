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

    Scenario: Newly registered users can interact with their profile

    Scenario: Guest users can add Cards, Study Cards, see catogries and Filter, but that's it

    Scenario: If guest user adds some cards then registers, their cards get saved and are accessible

    Scenario: If a current user adds cards then logs in, those cards are saved and accessible.

    Scenario: Session is saved after loggin out

    Scenario: Only Users can use the Galley, not guest Users

    Scenario: Users are promoted if they earn the next rank

    Scenario: Newly registered users are given the Recruit rank after register.

    Scenario: A user can activate Modules in their profile