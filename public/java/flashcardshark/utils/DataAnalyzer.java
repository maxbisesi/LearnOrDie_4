
package flashcardshark.utils;

import com.google.gson.Gson;
import flashcardshark.bean.Card;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.ArrayList;

public class DataAnalyzer {
    private LinkedHashMap<String,Integer[]> PlusMinusForCategory = new LinkedHashMap<>();
    private ArrayList<Card>cards = new ArrayList<>();
    
    public DataAnalyzer(ArrayList<Card> cards) {
        this.cards = cards;
        findPlusMinusForCategory();
    }
    
    public LinkedHashMap<String,Integer[]> getPlusMinusforCategory() {
        return PlusMinusForCategory;
    }
    
    private void findPlusMinusForCategory () {
        //Sort through the users cards and find which categories they are the worst at,rated by most missedd out of most made
        LinkedHashSet<String> cats = new LinkedHashSet<>();
        HashMap<String,Integer> catCount = new HashMap<>();
        LinkedHashMap<String,Integer[]> categoryRating = new LinkedHashMap<>();
        
        //get all unique categories
        for(Card card : cards) {
            if(card.getCategory() == null) {
                cats.add("null");
            } else 
                cats.add(card.getCategory());
        }
        
        for(String cat : cats) {
            //for each individual category find the number of cards in the users card list nad
            //the total +/- for each cat. 
            int plus = 0;
            int minus = 0;
            int questionsPerCat = 0;
            
            for(Card card : cards) {
                if(card.getCategory() != null && card.getCategory().equals(cat)){
                    plus += card.getMade();
                    minus += card.getMissed();
                    questionsPerCat++;
                } else if(cat.equals("null") && card.getCategory() == null) {
                    plus += card.getMade();
                    minus += card.getMissed();
                    questionsPerCat++;
                }
            }
            categoryRating.put(cat,new Integer[]{plus,minus,questionsPerCat});
        }
        
        PlusMinusForCategory = categoryRating;
        //CatCount = catCount;
        
    }
    
    public static String determineRank(Integer points){
        
        if(points < 2500){
            return "Recruit";
        } else if(points >= 2500 && points < 7000) {
            return "Bucket Brigade";
        } else if(points >= 7000 && points < 15000){
            return "Harpoonist";
        } else if(points >= 15000 && points < 30000) {
            return "Free Diver";
        } else if(points >= 30000 && points < 75000){
            return "Cage Master";
        } else if(points >= 75000 && points < 150000){
            return "The Bitten";
        } else if(points >= 150000){
            return "Great White";
        }
        
        return null;
    }
    
    public static ArrayList<Integer> prepareNumberListFromJSONString(String cardnums){
        Gson gson = new Gson();
        ArrayList<String> cardIDs = gson.fromJson(cardnums,ArrayList.class);
        ArrayList<Integer> flashCardnums = new ArrayList<>();
        for(String num:cardIDs){
            flashCardnums.add(Integer.parseInt(num));
        }
        
        return flashCardnums;
    }
    
}