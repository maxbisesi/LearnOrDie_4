package MBFramework.database;

import flashcardshark.bean.Card;
import flashcardshark.bean.UserAccount;
import flashcardshark.utils.DataDAO;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class MySQLimporter {
    public static void importCardsFromQuestionBank(UserAccount currentuser){
        //connect to Question_Bank and draw cards 
        List<Card> insertcards = new ArrayList<Card>();
       try (Connection conn = DriverManager.getConnection("jdbc:mysql://localhost/Question_Bank?useUnicode=true&useSSl=false&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC", "root", "Basketball12")) {
                String prepFlash = "Select * From FlashCards;";
                PreparedStatement ps = conn.prepareStatement(prepFlash);
                ResultSet rs = ps.executeQuery();

                while (rs.next()) {
                    String cat = rs.getString("category");
                    if (cat == null) {
                        cat = "";
                    }
                    insertcards.add(new Card(rs.getString("card"), rs.getString("answer"),cat));
                }

            } catch (Exception e) {
                e.printStackTrace();
                System.out.println("FlashCards not working");
            }
       
       //insert those cards into FlashCardShark
       for(Card card : insertcards){
        DataDAO.insertCardForUser(currentuser, card);
       }
    }
}
