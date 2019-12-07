/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package flashcardshark.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.gson.Gson;
import flashcardshark.bean.Card;
import flashcardshark.bean.CardSet;
import flashcardshark.bean.UserAccount;
import flashcardshark.utils.DataDAO;
import flashcardshark.utils.UserSession;
import java.util.Map;


@WebServlet(name = "SetServlet", urlPatterns = {"/SetServlet"})
public class SetServlet extends HttpServlet {
    private static Gson gson = new Gson();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        //get and study questions from selected sets
        String name = request.getParameter("name");
        String data = request.getParameter("data");
        UserSession usersession = (UserSession) request.getSession().getAttribute("usersession");
        UserAccount useraccount = usersession.getUser();
        //------------------------------------
        //Get the cards in the sets saved
        //====================================
        if(name.equals("getsets")){
            //get the cards related to those sets and give them to the UserAccount
            ArrayList<Integer> setids = prepareNumberListFromJSONString(data);
            ArrayList<Card> cards = DataDAO.getCardSets(setids);
            UserSession user = (UserSession) request.getSession().getAttribute("usersession");
            user.studyCards(cards);
        }
        //------------------------------------
        //after removing all sets from test restore all questions
        //====================================
        else if(name.equals("restore")){
            System.out.println("restore");
            UserSession user = (UserSession) request.getSession().getAttribute("usersession");
            user.removeFilter();
        } else if(name.equals("delete")){
            ArrayList<Integer> cardIds = prepareNumberListFromJSONString(data);
            int[] ids = DataDAO.updateCardSet(cardIds,"Deleted");
            if(ids != null){
                String json = gson.toJson("Your sets were deleted");
                response.setStatus(HttpServletResponse.SC_OK);
                response.setContentType("application/json");
                response.setCharacterEncoding("UTF-8");
                response.getWriter().write(json); 
            }
        }
        
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

    }


    public static ArrayList<Integer> prepareNumberListFromJSONString(String cardnums){
        
            ArrayList<String> cardIDs = gson.fromJson(cardnums,ArrayList.class);
            ArrayList<Integer> flashcardnums = new ArrayList<>();

            for(String num:cardIDs){
                Integer intvalue = Integer.parseInt(num);
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
