
package flashcardshark.servlet;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import flashcardshark.bean.Card;
import flashcardshark.utils.DataDAO;
import flashcardshark.utils.Pageable;
import flashcardshark.utils.UserSession;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebServlet("/Data")
public class DataServlet extends HttpServlet {
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
        
        String name = request.getParameter("name");
        HttpSession sesh = request.getSession();
        UserSession user = (UserSession) sesh.getAttribute("usersession");
        
        //---------------------------------
        //Change pages
        //=================================
        if(name.equals("pagechange")){
            //get lists of questions, 20 at a time.
            List<Card> cards = user.getAllCards();
            Integer pagenumber = Integer.parseInt(request.getParameter("pagenumber"));
 
            Pageable pagelist = new Pageable(cards);
            pagelist.setPage(pagenumber);
            

            String responseMessage = new Gson().toJson(pagelist.getListForPage());
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.setStatus(HttpServletResponse.SC_ACCEPTED);
            response.getWriter().write(responseMessage);
            response.getWriter().flush(); 
        } 
        //---------------------------------
        //Delete Question
        //=================================
        else if(name.equals("deletequestions")){
            
            ArrayList<Integer> deleteids = QuestionPageServlet.prepareNumberListFromJSONString(request.getParameter("data"));
            DataDAO.deleteQuestions(deleteids);
            user.deleteCards(deleteids);
            
            String responsemessage = "cards deleted";
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.setStatus(HttpServletResponse.SC_ACCEPTED);
            response.getWriter().write(responsemessage);
            response.getWriter().flush(); 
        }
    }
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        
    }
    
    
}