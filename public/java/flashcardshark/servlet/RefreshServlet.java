/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package flashcardshark.servlet;

import flashcardshark.bean.Card;
import flashcardshark.utils.DataAnalyzer;
import flashcardshark.utils.UserSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.List;
import com.google.gson.Gson;
import flashcardshark.utils.DataDAO;
import java.util.LinkedHashMap;


/**
 *
 * @author maximilian.bisesi
 */
@WebServlet("/Refresh")
public class RefreshServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        HttpSession session = request.getSession();
        UserSession usersession = (UserSession) session.getAttribute("usersession");

        if(usersession.cardListEmpty()) {
            String json = new Gson().toJson("no cards to analyze");
            response.setStatus(HttpServletResponse.SC_NO_CONTENT);
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(json);
        } else {
            DataDAO.updateCards(usersession.getUsedCards());
            List<Card> cards = DataDAO.getCardsForUser(usersession.getUser());
            //cards.addAll(DataDAO.getCardsForUser(usersession.getUser()));
            DataAnalyzer anal = new DataAnalyzer((ArrayList<Card>)cards);
            session.setAttribute("CatRating",anal.getPlusMinusforCategory());
            
            LinkedHashMap<String,Integer[]> catRatings = anal.getPlusMinusforCategory();
            
            String json = new Gson().toJson(catRatings);
            response.setStatus(HttpServletResponse.SC_OK);
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(json);
        }
    }
}
