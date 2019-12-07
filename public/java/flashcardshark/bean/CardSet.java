/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package flashcardshark.bean;

import java.util.ArrayList;

/**
 * @author maxbisesi
 */
public class CardSet {
    private String Name;
    private ArrayList<Card> cards = new ArrayList<>();
    private Integer size;
    private Integer setID;
    private String description;
    private String status;

    public CardSet(String name, ArrayList<Card> cards, String Description){
        this.Name = name;
        this.cards = cards;
        if(cards != null){
            size = cards.size();
        }
        this.description = Description;
        
    }
    
    public String getDescription() {
        return description;
    }
    
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getSetID() {
        return setID;
    }

    public void setSetID(Integer setID) {
        this.setID = setID;
    }

    public Integer getSize() {
        return size;
    }

    public void setSize(Integer size) {
        this.size = size;
    }

    public String getName() {
        return Name;
    }

    public void setName(String Name) {
        this.Name = Name;
    }

    public ArrayList<Card> getCards() {
        return cards;
    }

    public void setCards(ArrayList<Card> cards) {
        this.cards = cards;
    }
    
}
