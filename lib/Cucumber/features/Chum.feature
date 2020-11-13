@Regression
Feature: Create, Organize, and Delete FlashCards
    This is done through the Chum and Galley tabs.
    Use the profile tab to activate modules used to add 
    speciel characters a question or answer. 

@ChumNewCard
Scenario: On the Chum tab User creates a new FlashCard
    When The client logs in as a test User

@ChumNewCardwithEquilateral
Scenario: On the Chum tab the User creates a new FlashCard with an Image of an Equilateral 
    When The client logs in as a test User

@ChumNewCardwithUnicode
Scenario: On the Chum tab the User creates a new FlashCard with Unicode characters in the Question Answer and Category
    When The client logs in as a test User

@ChumCreatedCategoryShowsInList
Scenario: When I create a new Card in a new Category, that category shows up in the Category list with the right count
    When The client logs in as a test User






