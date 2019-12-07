package flashcardshark.utils;

import flashcardshark.bean.UserSessionRecord;
import flashcardshark.bean.*;
import java.sql.*;
import java.util.*;
//import com.mysql.cj.jdbc.Driver;

public class DataDAO {
    
    private static final Map<String,String> USERS_PASSWORDS = new HashMap<>();
    //-----------------production db--------------------------
    //private static final String DBURL = "jdbc:mysql://localhost:3306/FlashCardShark?useUnicode=true&useSSl=false&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC";    
	//private static final String un = "root";
	//private static final String pw = "Epictetus12!"; 
    //---------------------------------------------------------
    
    //-----------------local db -------------------------------
    private static final String DBURL = "jdbc:mysql://localhost:3306/FlashCardShark?useUnicode=true&useSSl=false&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC";
    private static final String un = "root";
    private static final String pw = "Basketball12";
    //----------------------------------------------------------*/
    
    static {
        init();
    }
    
    private static void init() {
        //creates a map listing all usernames and passwords
	try{
	    Class.forName("com.mysql.cj.jdbc.Driver");
       	    Connection conn = DriverManager.getConnection(DBURL,un,pw);
            Statement stm = conn.createStatement();
            ResultSet allusersandpasswords = stm.executeQuery("Select username,password From flashuser");
            int usercount = 0;
            
            while(allusersandpasswords.next()){
                USERS_PASSWORDS.put(allusersandpasswords.getString("username"),allusersandpasswords.getString("password"));
                usercount++;
            }
            
            System.out.println("Number of users: "+usercount);
            
        }catch(SQLException e) {
	    System.out.print("its still not working... lol ");
            e.printStackTrace();
        }catch(ClassNotFoundException e){
		System.out.print("com.myslq.cj.jdbc.Driver was not found wtf?");
	}
        
    }
    
    public static UserAccount findUser(String userName,String password) {
        // finds a user with the username and password only if the passwords match
         try (Connection conn = DriverManager.getConnection(DBURL, un, pw)) {
             
             String query = "Select * From flashuser Where username = ?";
             PreparedStatement getuser = conn.prepareStatement(query);
             getuser.setString(1, userName);
             
             ResultSet user = getuser.executeQuery();

             if(user.next()){
                 String un = user.getString("username");
                 String rightPassword = user.getString("password");
                 if(password.equals(rightPassword)){
                     Integer userspoints = user.getInt("points");
                     String rank = DataAnalyzer.determineRank(userspoints);
                     UserAccount retrievedUser = new UserAccount(userName,rightPassword,user.getString("firstname"),user.getString("lastname"),user.getString("email"),rank,userspoints,user.getString("avatar"));
                     
                     Integer userID = user.getInt("USER_ID");
                     retrievedUser.setUserID(userID.toString());
                     
                     return retrievedUser;
                 } else {
                     return null;
                 }
                 
             } else {
                 return null;
             }
        } catch(SQLException e) {
            e.printStackTrace();
            return null;
        }
         
         
    }
    
    public static Map<String,String> getAllUsers(){
        return USERS_PASSWORDS;
    }
    
    public static String insertNewUser(UserAccount newuser) {
        //inserts a new user into FlashUser
        //returns the database's userid
        
        try(Connection con = DriverManager.getConnection(DBURL, un, pw)){
            
            PreparedStatement prepareNewUser = con.prepareStatement("Insert into flashuser(username,password,firstname,lastname,email,avatar) values(?,?,?,?,?,?)",new String[]{"USER_ID"});
            prepareNewUser.setString(1,newuser.getUserName());
            prepareNewUser.setString(2,newuser.getPassword());
            prepareNewUser.setString(3,newuser.getFirstname());
            prepareNewUser.setString(4,newuser.getLastname());
            prepareNewUser.setString(5,newuser.getEmail());
            prepareNewUser.setString(6,newuser.getAvatar());
            int rows = prepareNewUser.executeUpdate();
            
            ResultSet rs = prepareNewUser.getGeneratedKeys();
            if(rs.next()){
                String newUserID = rs.getString(1);
                return newUserID;
            } else {
                throw new SQLException("Problems gettting new User ID");
            } 
        } catch(SQLException e) {
            e.printStackTrace();
            return null;
        } 
    }
    
    public static ArrayList<Card> getCardsForUser(UserAccount user) {
        
        //TODO: get the username and password then get all flashcards linked to that user and return them in a list
        ArrayList<Card> cardsForUser = new ArrayList<>();
        
        try(Connection conn = DriverManager.getConnection(DBURL, un, pw)) {
            PreparedStatement pstm = conn.prepareStatement("Select * From flashcard where fk_user_id = ?");
            pstm.setString(1,user.getUserID());
            ResultSet usersCards = pstm.executeQuery();
            
            while(usersCards.next()){
                String cat = usersCards.getString("category");
                if(cat == null) {
                    cat = "null";
                }
                Card card_new = new Card(usersCards.getString("card"),usersCards.getString("answer"),usersCards.getInt("cardid"),cat,usersCards.getInt("times_right"),usersCards.getInt("times_wrong"));
                cardsForUser.add(card_new);
            }
            System.out.println("Card For User size: "+cardsForUser.size());
            
            return cardsForUser;
            
            
        } catch(SQLException e) {
            //TODO: what happens now ?
            e.printStackTrace();
            return null;
        }
        
    }
    
    public static void insertCardForUser(UserAccount user, Card card) {
        
        try(Connection con = DriverManager.getConnection(DBURL, un, pw)) {
            PreparedStatement ps = con.prepareStatement("Insert into flashcard(answer,card,category,times_wrong,times_right,fk_user_id) Values(?,?,?,?,?,?)");
            ps.setString(1,card.getAnswer());
            ps.setString(2,card.getCard());
            ps.setString(3,card.getCategory());
            ps.setInt(4,0);
            ps.setInt(5,0);
            ps.setString(6,user.getUserID());
            int rows = ps.executeUpdate();
        } catch(SQLException e) {
            e.printStackTrace();
            //email error. 
        }
    }
    
    public static boolean updateCards(List<Card> cards) {
        
        try(Connection conn = DriverManager.getConnection(DBURL, un, pw)) {
            PreparedStatement pst = conn.prepareStatement("Update flashcard Set card=?, answer=?, times_wrong=?, times_right=? Where cardid=?");
            int rows = 0;
            for( Card card : cards) {
                pst.setString(1,card.getCard());
                pst.setString(2,card.getAnswer());
                pst.setInt(3,card.getMissed());
                pst.setInt(4,card.getMade());
                pst.setInt(5, card.getflashCardnum());
                rows += pst.executeUpdate();
            }
            return true;
            
        } catch(SQLException e) {
            //TODO: do something here, so that the browser user knows something went wrong
            e.printStackTrace();
            return false;
        }
    }
    
    public static boolean saveUserSession(int cards_seen, int cards_correct,int cards_incorrect,int user_id) {
        try(Connection conn = DriverManager.getConnection(DBURL, un, pw)) {
            PreparedStatement pst = conn.prepareStatement("insert into usersession(cards_seen,cards_correct,cards_incorrect,fk_user_id) Values(?,?,?,?)");
            
            pst.setInt(1,cards_seen);
            pst.setInt(2,cards_correct);
            pst.setInt(3,cards_incorrect);
            pst.setInt(4,user_id);
            boolean updatecount = pst.execute();
            System.out.print("USER SESSION UPDATE COUNT: " + updatecount+" "+cards_seen+" "+user_id);
            if(!updatecount) {
                return true;
            } else {
                //should never return false an insert would not return a resultset execute() returns false for no result
                //or update count.
                return false;
            }
        }catch(SQLException e) {
            e.printStackTrace();
            //email erro here
            return false;
        }
    }
    
    public static void updateUsersPoints(UserAccount user, Integer points){
        try(Connection conn = DriverManager.getConnection(DBURL, un, pw)) {
            PreparedStatement pst = conn.prepareStatement("update flashuser set points = points + ? where user_id = ?");
            
            pst.setInt(1,points);
            pst.setInt(2,Integer.valueOf(user.getUserID()));
            
            pst.executeUpdate();
            
        } catch(SQLException e){
            e.printStackTrace();
            System.out.println("exception did not update points");
        }
    }
    
    public static void updateUsersAvatar(UserAccount user, String avatar){
        try(Connection conn = DriverManager.getConnection(DBURL, un, pw)) {
            PreparedStatement pst = conn.prepareStatement("update flashuser set avatar = ? where user_id = ?");
            
            pst.setString(1,avatar);
            pst.setInt(2,Integer.valueOf(user.getUserID()));
            
            pst.executeUpdate();
            
        } catch(SQLException e){
            e.printStackTrace();
            System.out.println("exception did not update points");
        }
    }
    
    public static List<UserSessionRecord> getUserSessionHistory(UserAccount user) {
        try(Connection conn = DriverManager.getConnection(DBURL, un, pw)) {
            List<UserSessionRecord> recordsList = new ArrayList<>();
            PreparedStatement pst = conn.prepareStatement("Select * From usersession where fk_user_id = ?");
            pst.setInt(1,Integer.parseInt(user.getUserID()));
            
            ResultSet results = pst.executeQuery();
            
            while(results.next()) {
                UserSessionRecord rec = new UserSessionRecord(results.getInt("cards_seen"),results.getInt("cards_correct"),results.getInt("cards_incorrect"),results.getDate("session_date"));
                recordsList.add(rec);
            }
            
            return recordsList;
        } catch(SQLException e) {
            e.printStackTrace();
            return null;
        }
    }
    
    public static Integer saveCardSet(UserAccount user, String setname, ArrayList<Integer> cardnums,String desc){
        try(Connection conn = DriverManager.getConnection(DBURL, un, pw)) {
            //create the card set
            PreparedStatement pst = conn.prepareStatement("insert into cardset(set_name,fk_user_id,description) values(?,?,?)",new String[]{"setid"});
            
            pst.setString(1,setname);
            pst.setInt(2,Integer.valueOf(user.getUserID()));
            pst.setString(3, desc);
            pst.executeUpdate();
            //get cardset id
            ResultSet rs = pst.getGeneratedKeys();
            Integer newSetID;
            
            //insert junction objects to associate this set with Card Numbers
            if(rs.next()){
                newSetID = rs.getInt(1);
                 PreparedStatement cardsetcard = conn.prepareStatement("insert into cardsetcard(setid,cardid) values(?,?)");
                for(Integer num : cardnums){
                    cardsetcard.setInt(1,newSetID);
                    cardsetcard.setInt(2,num);
                    cardsetcard.addBatch();
                }    
                cardsetcard.executeBatch();

            } else {
                throw new SQLException("Problems gettting set id");
            }  
            
            return newSetID;
        } catch(SQLException e){
            e.printStackTrace();
            System.out.println("exception did not update points");
            return null;
        }
    }
    
    public static ArrayList<CardSet> getMySets(UserAccount user) {
        try(Connection conn = DriverManager.getConnection(DBURL, un, pw)) {
            ArrayList<CardSet> mysets = new ArrayList<CardSet>();
            PreparedStatement pst = conn.prepareStatement("select * from cardset where fk_user_id = ?");
            pst.setString(1, user.getUserID());
            ResultSet rs = pst.executeQuery();
            while(rs.next()){
                CardSet set = new CardSet(rs.getString("set_name"),null,rs.getString("description"));
                set.setSetID(rs.getInt("setid"));
                set.setStatus(rs.getString("status"));
                mysets.add(set);
            }
            
            return mysets;
            
        }catch(SQLException e){
            e.printStackTrace();
            return null;
        }
    }
    
    public static void deleteCardSet(UserAccount user, ArrayList<Integer> setnums){
       try(Connection conn = DriverManager.getConnection(DBURL, un, pw)) {
           PreparedStatement pst = conn.prepareStatement("Delete from cardset where setid = ?");
           
           for(Integer num:setnums){
               pst.setInt(1,num);
               pst.addBatch();
           }
           pst.executeBatch();
                   
           
       } catch(SQLException e){
           
       }
    }
    
    public static int[] updateCardSet(ArrayList<Integer> setnums,String status){
        try(Connection conn = DriverManager.getConnection(DBURL, un, pw)) {
            PreparedStatement pst = conn.prepareStatement("update cardset set status = ? where setid = ?");
            
            for(Integer num: setnums){
                pst.setString(1,status);
                pst.setInt(2,num);
                pst.addBatch();
            }
            
            int[] updatecounts = pst.executeBatch();
            
            if(updatecounts.length == setnums.size()){
                System.out.println("all card sets updated correctly");
                return updatecounts;
            } else {
                return null;
            }
            
        } catch(SQLException e){
            e.printStackTrace();
            return null;
        }
    }
    
    public static ArrayList<Card> getCardSets(ArrayList<Integer> setids){
        try(Connection conn = DriverManager.getConnection(DBURL, un, pw)) {
            ArrayList<Card> cards = new ArrayList<Card>();
            for(Integer i:setids){
                PreparedStatement pst = conn.prepareStatement("Select fc.*  from flashcard as fc inner join cardsetcard as csc on fc.cardid = csc.cardid inner join cardset as cs on cs.setid = csc.setid where cs.setid = ?");    
                pst.setInt(1,i);
                ResultSet rs = pst.executeQuery();
                while(rs.next()){
                    String cat = rs.getString("category");
                        if(cat == null) {
                            cat = "null";
                        }
                        Card card_new = new Card(rs.getString("card"),rs.getString("answer"),rs.getInt("cardid"),cat,rs.getInt("times_right"),rs.getInt("times_wrong"));
                        cards.add(card_new);
                    }
            }
            return cards;
        }catch(SQLException e){
            e.printStackTrace();
            return null;
        }
        
    }
    
    public static Map<UserAccount,ArrayList<CardSet>> getPublicSets() {
        //No need to store cards on browser, these will just be markers
        // will exchange cards back here, behind the scenes.
        //Also 
        try(Connection conn = DriverManager.getConnection(DBURL, un, pw)) {
            Map<UserAccount,ArrayList<CardSet>> multimap = new HashMap<>();
            //PreparedStatement pst = conn.prepareStatement("Select * from cardset inner join cardsetcard on cardset.setid = cardsetcard.setid inner join flashcard on flashcard.cardid = cardsetcard.cardid where cardset.status = 'Shared'");
            PreparedStatement pst = conn.prepareStatement("Select * from cardset cs inner join flashuser fu on cs.fk_user_id = fu.user_id where cs.status = 'Shared'");
            ResultSet sharedsets = pst.executeQuery();
            
            while(sharedsets.next()){
                String name = sharedsets.getString("set_name");
                Integer setid = sharedsets.getInt("setid");
                String description = sharedsets.getString("description");
                String username = sharedsets.getString("username");
                String firstname = sharedsets.getString("firstname");
                String lastname = sharedsets.getString("lastname");
                String password = sharedsets.getString("password");
                String email = sharedsets.getString("email");
                String userid = sharedsets.getString("user_id");
                Integer points = sharedsets.getInt("points");
                // get image avatar
                UserAccount user = new UserAccount(username,password,firstname,lastname,email,userid,points);
                CardSet s = new CardSet(name,null,description);
                s.setSetID(setid);
                s.setStatus("Shared");
                
                if(multimap.containsKey(user)){
                    multimap.get(user).add(s);
                }else{
                    ArrayList<CardSet> setNew = new ArrayList<>();
                    setNew.add(s);
                    multimap.put(user,setNew);
                }
            }
            
            return multimap;
            
        }catch(SQLException e){
            e.printStackTrace();
            return null;
        }
    }
    
    public static void deleteQuestions(ArrayList<Integer> cardids) {
        try(Connection conn = DriverManager.getConnection(DBURL, un, pw)) {
            // disable autocommit to run two transactions
            conn.setAutoCommit(false);
            PreparedStatement copytodelete = conn.prepareStatement("insert into deletedcards select * from flashcard where cardid = ?");
            PreparedStatement delete = conn.prepareStatement("delete from flashcard where cardid = ?");
            
            for(Integer num: cardids){
                copytodelete.setInt(1,num);
                delete.setInt(1,num);
                copytodelete.addBatch();
                delete.addBatch();
            }
            
            copytodelete.executeBatch();
            delete.executeBatch();
            
            //commit
            conn.commit();
        } catch(SQLException e){
            e.printStackTrace();
        }
    }

    
}