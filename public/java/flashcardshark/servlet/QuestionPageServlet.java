package flashcardshark.servlet;

import com.google.gson.Gson;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import flashcardshark.bean.UserAccount;
import flashcardshark.bean.Card;
import flashcardshark.bean.CardSet;
import flashcardshark.utils.DataDAO;
import java.io.StringReader;
import java.util.*;
import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonReader;
import javax.servlet.RequestDispatcher;
import javax.servlet.http.*;
import flashcardshark.utils.UserSession;
import java.io.PrintWriter;

@WebServlet("/QuestionPageServlet")
public class QuestionPageServlet extends HttpServlet {
    
    //link users to active sessions, this will only be a problem if One person trys to use their
    //browser to log in to two different accounts 
    
    //TODO: support images in text area...
    //TODO: support one person logging in to two accounts on one browser..
    private Map<String,UserAccount> activeUsers;
    private static Gson gson = new Gson();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        System.out.println("doGet()");
        
        if(request.getParameter("name").equals("saveusedcards")) {

            HttpSession session = request.getSession();
            //encode request with confirmation that cards were successfully updated
            UserSession usersession = (UserSession) session.getAttribute("usersession");
            boolean success = usersession.saveSession();
            
            String responseMessage = new Gson().toJson("card successfully udpated");
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.setStatus(HttpServletResponse.SC_ACCEPTED);
            response.getWriter().write(responseMessage);
            response.getWriter().flush();
            
        }
        
        //----------------------------------------------------------------------
        //       Logout
        //======================================================================
        else if(request.getParameter("name").equals("logout")) {
           //kill the session
            System.out.println("logout servlet, get.");
           HttpSession session = request.getSession();
           UserSession usersession = (UserSession) session.getAttribute("usersession");
           
           //remove user from activeUser map
           activeUsers =(Map)getServletContext().getAttribute("activeUsers");
           activeUsers.remove(session.getId());
           
           String pointsParam = request.getParameter("points");
           Integer points = Integer.parseInt(pointsParam);
           System.out.println("logout serverlt,users points: "+points);
           DataDAO.updateUsersPoints(usersession.getUser(), points);
           //RequestDispatcher dispatch = request.getRequestDispatcher("/lod1/Home.jsp");
           //dispatch.forward(request,response);
           response.sendRedirect("/lod1/Home.jsp");
           //RequestDispatcher dispatch = getServletContext().getRequestDispatcher("/Home.jsp");
           //dispatch.forward(request, response);
           
           session.invalidate();
        }
        
        //----------------------------------------------------------------------
        //             get the next card
        //======================================================================
        else if(request.getParameter("name").equals("next")) {
            
            //establish this user in the activeUsers list, get the next card, send it back
            
            if(activeUsers == null) {
                activeUsers = (Map)getServletContext().getAttribute("activeUsers");
            }
            
            UserSession usersession = (UserSession) request.getSession().getAttribute("usersession");
            String result = request.getParameter("result");
            Card nextCard;
            
            if(usersession.cardListEmpty()) {
                String json = gson.toJson("The User hasn't added any cards yet");
                response.setStatus(HttpServletResponse.SC_NO_CONTENT);
                response.setContentType("application/json");
                response.setCharacterEncoding("UTF-8");
                response.getWriter().write(json);
                return;
            }
            
            nextCard = usersession.nextCard(result);
            
            //encode next card as JSON and send back
            String json = gson.toJson(nextCard);
            response.setStatus(HttpServletResponse.SC_OK);
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(json);  
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
	//test that post is actually hit, and print id
	System.out.print("-----submitted to do post------\n");
	HttpSession session = (HttpSession) request.getSession(false);
	if(session != null){
		System.out.print("QP doPost session ID: "+session.getId());
	}else {
		HttpSession sesh = request.getSession();
		System.out.print("--- sesh id in do Post on QP ---\n"+"---"+sesh.getId()+"---\n");
	}
	
	/* for testing sessions 
	response.setStatus(HttpServletResponse.SC_OK);
	response.setContentType("text/html");
	PrintWriter writer = response.getWriter();
	writer.append("successfully hit doPost in QP");
	
	return;
	*/

	//HttpSession session = (HttpSession)request.getSession(false);
	
	if(session != null){		
		System.out.print("QP session id: "+session.getId());
	
		if(session.getAttribute("usersession") == null){
			System.out.print(" usersession attribute is null in QP \n ");
		}

		if(session.getAttribute("sessionhistory") == null)
			System.out.print("session history session attr is null too in QP \n");
		
	}
        
        UserSession usersession = (UserSession) session.getAttribute("usersession");         
        //----------------------------------------------------------------------
        //        set the question filter 
        //======================================================================
        if(request.getParameter("name").equals("filter")) {
            //get the filter criteria, create the QuestionFilter object
            //apply it to the user. Then when the all
            String cats = request.getParameter("result");
            if(cats.equals("remove")) {
                usersession.removeFilter();
                return;
            } 
            
            ArrayList<String> catStrings = gson.fromJson(cats, ArrayList.class);
            usersession.setFilter(catStrings);
            response.setStatus(HttpServletResponse.SC_OK);
        }
      
        //----------------------------------------------------------------------
        // update card
        //======================================================================
        //update this servlet with map of active users
        //user polymorphism by casting to Map rather than HashMap, this gives you more methods...
        //activeUsers = (Map) getServletContext().getAttribute("activeUsers");
        else if(request.getParameter("name").equals("update")){
             String updateID = request.getParameter("cardid");
             String updateCard = request.getParameter("card");
             String updateAnswer = request.getParameter("answer");
             Card updatedCard = new Card(updateCard,updateAnswer,Integer.parseInt(updateID),"update");
             usersession.addUsedCard(updatedCard);
             
             response.setStatus(HttpServletResponse.SC_OK);
        }
        //----------------------------------------------------------------------
        // submit a new card
        //======================================================================
        
        else if(request.getParameter("name").equals("submit")) {          
	    String newCard = request.getParameter("card");
            String newAnswer = request.getParameter("answer");
            String cat = request.getParameter("cat");
            Card insertCard = new Card(newCard,newAnswer,cat);
            DataDAO.insertCardForUser(usersession.getUser(), insertCard); 
            
            //store the cards they add in the session so that they can be accessed 
            //immediately
            usersession.addSingleCard(insertCard);
            response.setStatus(HttpServletResponse.SC_OK);
	} 
        else if(request.getParameter("name").equals("savequestionset")){
            
            String setname = request.getParameter("setname");
            String cardnums = request.getParameter("result");
            String desc = request.getParameter("setdesc");
            //checked questions come in by the flashcardnum
            ArrayList<Integer> flashCardnums = prepareNumberListFromJSONString(cardnums);
            
            //save the set into the DB
            Integer newSetID = DataDAO.saveCardSet(usersession.getUser(),setname,flashCardnums,desc);
            
            //create the set in java and give it to the user
            List<Card> allcards = usersession.getAllCards();
            ArrayList<Card> setcards = new ArrayList<>();
            
            //what ?
            //this gets the actual cards,where before you were working with just the fc numbers
            for(Integer cardnum: flashCardnums){
                for(Card card: allcards){
                    if(card.getflashCardnum() == cardnum){
                        setcards.add(card);
                    }
                }
            }
            
            CardSet Set_new = new CardSet(setname,setcards,desc);
            Set_new.setSetID(newSetID);
            //serialize to gson and send back in response..
            
            String setResponseMessage = new Gson().toJson(Set_new);
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.setStatus(HttpServletResponse.SC_ACCEPTED);
            response.getWriter().write(setResponseMessage);
            response.getWriter().flush();
        }

    }
    
    public static ArrayList<Integer> prepareNumberListFromJSONString(String cardnums){
        ArrayList<Double> cardIDs = gson.fromJson(cardnums,ArrayList.class);
        ArrayList<Integer> flashcardnums = new ArrayList<>();
        
        for(Double num:cardIDs){
            Integer intvalue = num.intValue();
            if(flashcardnums.contains(intvalue)){
                //skip it
                continue;
            }else{
                flashcardnums.add(intvalue);
            }
        }
        return flashcardnums;
    }

}