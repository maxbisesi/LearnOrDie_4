
package flashcardshark.servlet;

import flashcardshark.utils.UserSession;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import flashcardshark.bean.UserAccount;
import flashcardshark.utils.DataDAO;
import flashcardshark.bean.Card;
import flashcardshark.bean.CardSet;
import flashcardshark.bean.UserSessionRecord;
import flashcardshark.utils.DataAnalyzer;
import javax.servlet.RequestDispatcher;
import javax.servlet.annotation.WebServlet;
import java.util.*;
import javax.servlet.ServletConfig;
import javax.servlet.http.HttpSession;
import com.google.gson.Gson;

@WebServlet("/LoginServlet")
public class LoginServlet extends HttpServlet {
    
    private Map<String,UserAccount> activeUsers = new HashMap<>();
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException{

	//invalidate a session if one exists,make sure not to create one
	HttpSession oldsesh = request.getSession(false);      
	if(oldsesh != null){
		oldsesh.invalidate();
		System.out.print("old sesh existed");
	}


       response.setContentType("application/json");

       String userName = request.getParameter("username");
       String password = request.getParameter("password");

       if(request.getParameter("name").equals("login")){
            UserAccount userAccount = DataDAO.findUser(userName, password);
            
            if(userAccount == null) {
                //response.setAttribute("error","invalid Username or password");
                String errorgson = new Gson().toJson("invalid username or password");
                    response.setCharacterEncoding("UTF-8");
                    response.setStatus(HttpServletResponse.SC_ACCEPTED);
                    response.getWriter().write(errorgson);
                    response.getWriter().flush();
            } else{
            System.out.println("Login successful");

            //fill this User object with all their cards
            ArrayList<Card> usersCards = DataDAO.getCardsForUser(userAccount);
            userAccount.addCards(usersCards);
            
            //one time load cards from fcs in lod
            //MBFramework.database.MySQLimporter.importCardsFromQuestionBank(userAccount);
            
            //Set the logged in user for this session
            //also update the list of acitive users application wide in the servletcontext...
            HttpSession session = request.getSession(true);
            session.setAttribute("user",userAccount);
            activeUsers.put(session.getId(),userAccount);
            getServletContext().setAttribute("activeUsers",activeUsers);
            //set card count to uer, TODO: addd a feature so that they can remember where they were after they log out. 
            session.setAttribute("cardCount",-1);
            
            //use data analyzer to show the nature of their card data when first logging in. 
            DataAnalyzer anal = new DataAnalyzer(usersCards);
            session.setAttribute("CatRating",anal.getPlusMinusforCategory());
            
            //create the userSession object to track their usage
            UserSession usersession = new UserSession(userAccount);
            session.setAttribute("usersession",usersession);
            usersession.storeCards(usersCards);	
            session.setAttribute("cardcount",1);
            
            //load the session history for viewing on home page...
            List<UserSessionRecord> history = DataDAO.getUserSessionHistory(userAccount);
            session.setAttribute("sessionhistory",history);
            System.out.print("... obtain session history");
                    
            //After successfully logging in send them to the Question page
            RequestDispatcher dispatch = getServletContext().getRequestDispatcher("/WEB-INF/QuestionPage.jsp");
            dispatch.forward(request,response);
        }
       }

       if(request.getParameter("name").equals("register")){
            String username = request.getParameter("username");
            String password = request.getParameter("password");
            String confirm = request.getParameter("confirmpw");
            String fname = request.getParameter("firstname");
            String lname = request.getParameter("lastname");
            String email = request.getParameter("email");
            Map<String, String> users = DataDAO.getAllUsers();

            System.out.println("UserInfo entered in form: " + username + " " + password + " " + confirm + " " + fname + " " + lname + " " + email);

            // Check that all fields are filled in 
            if (username.equals("") || password.equals("") || confirm.equals("") || fname.equals("") || lname.equals("") || email.equals("")) {
                System.out.println("There is an empty field");
                request.setAttribute("emptyfield", "one is empty");
                RequestDispatcher dispatcher = getServletContext().getRequestDispatcher("/registrationPage.jsp");
                dispatcher.forward(request, response);
                return;
            }

            //check that the passwords are confirmed
            if (!password.equals(confirm)) {
                System.out.println("Those passwords don't match");
                request.setAttribute("passwordsConfirmed", "Passwords do not match");
                RequestDispatcher dispatcher = getServletContext().getRequestDispatcher("/registrationPage.jsp");
                dispatcher.forward(request, response);
                return;
            }

            //check that the username doesn't already exist, if it does set an error message and send them back to the login page
            if (users.containsKey(username)) {
                System.out.println("Username already exists...");
                request.setAttribute("usernameexists", "That username already exists");
                RequestDispatcher dispatcher = getServletContext().getRequestDispatcher("/registrationPage.jsp");
                dispatcher.forward(request, response);
                return;
            }
            //======================================================================

            // if all those checks are ok then insert the user....
            UserAccount newuser = new UserAccount(username,password,fname,lname,email,"Recruit",0,null);
            String newUserID = DataDAO.insertNewUser(newuser);
            newuser.setUserID(newUserID);
            //======================================================================

            //Create a List to save their questions
            HttpSession session = request.getSession();
            UserSession usersession = new UserSession(newuser);
            activeUsers.put(session.getId(), newuser);
            //declare them as a first time user so that when they chum their question can be immediately accessed...
            getServletContext().setAttribute("activeUsers",activeUsers);
            request.getSession().setAttribute("usersession",usersession);
            //======================================================================

            //After registering the user, set them as the session user and send them to the question page.
            session.setAttribute("user",newuser);
            RequestDispatcher dispatch = getServletContext().getRequestDispatcher("/WEB-INF/QuestionPage.jsp");
            dispatch.forward(request, response);
            //===================================
       }

    }
    
}