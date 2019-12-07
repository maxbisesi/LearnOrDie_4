package flashcardshark.bean;


import java.util.Date;

public class UserSessionRecord {
    private Integer cardsseen;
    private Integer cards_correct;
    private Integer cards_incorrect;
    private Date date;
    
    public UserSessionRecord(Integer c1,Integer c2, Integer c3, Date d) {
        cardsseen = c1;
        cards_correct = c2;
        cards_incorrect = c3;
        date = d;
    }

    public Integer getCardsseen() {
        return cardsseen;
    }

    public void setCardsseen(Integer cardsseen) {
        this.cardsseen = cardsseen;
    }

    public Integer getCards_correct() {
        return cards_correct;
    }

    public void setCards_correct(Integer cards_correct) {
        this.cards_correct = cards_correct;
    }

    public Integer getCards_incorrect() {
        return cards_incorrect;
    }

    public void setCards_incorrect(Integer cards_incorrect) {
        this.cards_incorrect = cards_incorrect;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
    
    
}
