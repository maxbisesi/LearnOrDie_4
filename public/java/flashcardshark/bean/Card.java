package flashcardshark.bean;

public class Card {

    private String answer;
    private String card;
    private int flashCardnum;
    private String category;
    private int missed = 0;
    private int made = 0;
 
    public Card(String card, String ans, int x, String cat) {
        this.answer = ans;
        this.card = card;
        this.flashCardnum = x;
        this.category = cat;

    }
    public Card(String card, String ans, int x, String cat,int right,int wrong) {
        this.answer = ans;
        this.card = card;
        this.flashCardnum = x;
        this.category = cat;
        missed = wrong;
        made = right;
    }

    public Card(String card, String ans) {
        this.answer = ans;
        this.card = card;
    }
    public Card(Card c){
        this.answer = c.getAnswer();
        this.card = c.getCard();
        this.flashCardnum = c.getflashCardnum();
        this.category = c.getCategory();
        this.missed = c.getMissed();
        this.made = c.getMade();
    }
    
    public Card(String card, String ans, String category){
        this.answer = ans;
        this.card = card;
        this.category = category;
        this.missed = 0;
        this.made = 0;
    }

    public String getAnswer() {
        return answer;
    }
    
    public void nailedIt(){
        made++;
    }
    
    public void missedIt(){
        missed++;
    }
    
    public int getMissed(){
        return missed;
    }
    public int getMade(){
        return made;
    }

    public String getCard() {
        return card;
    }

    public int getflashCardnum() {
        return flashCardnum;
    }
    
    public String getCategory(){
        return category;
    }

    public boolean equals(Object o) {
        if ((o instanceof Card) && ((Card) o).getflashCardnum() == this.flashCardnum) {
            return true;
        } else {
            return false;
        }

    }
}