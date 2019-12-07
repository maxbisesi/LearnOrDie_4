package flashcardshark.utils;

import flashcardshark.bean.Card;
import flashcardshark.bean.UserAccount;
import flashcardshark.utils.DataDAO;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class UserSession {
    private final UserAccount user;
    private final List<Card> usersUpdatedCards = new ArrayList<>();  
    private Integer SessionNailedRating = 0;
    private Integer SessionMissedRating = 0;
    private List<Card> userscards = new ArrayList<>();
    private List<Card> filteredcards = new ArrayList<>();
    private List<Card> studycards = new ArrayList<>();
    private Integer cardcount = 0;
    private boolean filteron = false;
    private boolean studying = false;
    
    public UserSession(UserAccount user) {
        this.user = user;
    }
    public boolean cardListEmpty(){
        return userscards.isEmpty();
    }
    
    public List<Card> getAllCards(){
        return userscards;
    }
    
    public void addSingleCard(Card singlecard){
        userscards.add(singlecard);
    }

    public void addUsedCard(Card card) {
        usersUpdatedCards.add(card);
    }
    
    private void questionCorrect() {
        SessionNailedRating++;
    }
    
    private void questionIncorrect() {
       SessionMissedRating++;
    }
    
    public UserAccount getUser() {
        return user;
    }
    
    public boolean saveSession() {
        int userid = 0;
        try {
            userid = Integer.parseInt(user.getUserID()); 
        } catch(NumberFormatException e ){
            System.out.println("user id not in number format");
            e.printStackTrace();
        }
        
        //save the points here
        boolean sessionsuccess = DataDAO.saveUserSession(usersUpdatedCards.size(), SessionNailedRating, SessionMissedRating,userid);
        boolean updatesuccess = true;
        
        if(!usersUpdatedCards.isEmpty()) {
            updatesuccess = DataDAO.updateCards(usersUpdatedCards);
        }
        
        return updatesuccess && sessionsuccess;
    }
    
    public void storeCards(List<Card> cards) {
        userscards.addAll(cards);
    }
    
    public List<Card> getUsedCards() {
        return usersUpdatedCards;
    }
    
    public Card nextCard(String result) {
        List<Card> cards;
        //TODO: put an equals on the Card so that when they updpate and save if the user has seen the same
        //question twice it doesn't addd it again. 

        //set which cards to use
        if(filteron) {
            cards = filteredcards;
        } else if(studying) {
            cards = studycards;
        } else {
            cards = userscards;
        }
        
        Card nextCard;
        
        //keep track of correct and incorrectly answered questions, update the seen cards with new cards
        if(result.equals("nailed")) {
            questionCorrect();
            Card oldCard = cards.get(cardcount);
            oldCard.nailedIt();
            
            if(!usersUpdatedCards.contains(oldCard)){
                addUsedCard(oldCard);
            }
            
            cardcount++;
        } else if(result.equals("missed")) {
            questionIncorrect();
            Card oldCard = cards.get(cardcount);
            oldCard.missedIt();
            
            if(!usersUpdatedCards.contains(oldCard)){
                addUsedCard(oldCard);
            }
            
            cardcount++;
        } else if(result.equals("first")){
            nextCard = cards.get(cardcount);
            return nextCard;
        }
        
        //if not the first card, return the next
        if(cardcount <= (cards.size() - 1)) {
            nextCard = cards.get(cardcount);
            return nextCard;
        } else {
            cardcount = 0;
            return cards.get(cardcount);
        }

    }
    
    public void studyCards(ArrayList<Card> cards) {
       ///set studied section as this set.
       this.studying = true;
       this.filteron = false;
       studycards = cards;
       cardcount = 0;
    }
    
    public void setFilter(List<String> cats) {
        if(cardListEmpty()){
            //do nothing
            return;
        }
        filteron = true;
        cardcount = 0;
        for(Card c : userscards) {
            if(cats.contains(c.getCategory())) {
                filteredcards.add(c);
            }
        }
        
    }
    
    public void deleteCards(ArrayList<Integer> deleters){
        System.out.println("delete ids: "+deleters);
 
        Map<Integer,Card> cardmap = new HashMap<>();
        for(Card c : userscards){
            cardmap.put(c.getflashCardnum(),c);
        }
        for(Integer i : deleters){
            Card del = cardmap.get(i);
            boolean deleted = userscards.remove(del);
            
            if(deleted){
                System.out.println("flashcard: "+del.getflashCardnum()+ "succesfully deleted.");
            }
        }
    }
    
    public void removeFilter(){
        filteron = false;
        studying = false;
    }
    
}