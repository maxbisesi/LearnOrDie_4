package flashcardshark.servlet;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import flashcardshark.bean.CardSet;
import flashcardshark.bean.UserAccount;
import flashcardshark.utils.DataDAO;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Map;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.gson.reflect.*;
import flashcardshark.utils.UserSession;
import java.util.List;


@WebServlet(name = "Scuttlebutt", urlPatterns = {"/Scuttlebutt"})
public class Scuttlebutt extends HttpServlet {
    Gson gson = new GsonBuilder().enableComplexMapKeySerialization()
        .create();
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String name = request.getParameter("name");
        UserSession usersession =(UserSession) request.getSession().getAttribute("usersession");
        UserAccount user = usersession.getUser();
        if(name.equals("onload")){
            //TypeToken maptype = TypeToken<Map<UserAccount,ArrayList<CardSet>>();
            Map<UserAccount,ArrayList<CardSet>> sharedsets = DataDAO.getPublicSets();
            String responseMessage = gson.toJson(sharedsets,Map.class);
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.setStatus(HttpServletResponse.SC_ACCEPTED);
            response.getWriter().write(responseMessage);
            response.getWriter().flush(); 
        }else if(name.equals("mysets")){
            ArrayList<CardSet> mysets = DataDAO.getMySets(user);
            String responseList = gson.toJson(mysets, List.class);
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(responseList);
            response.setStatus(HttpServletResponse.SC_ACCEPTED);
            response.getWriter().flush();
        }

    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        String name = request.getParameter("name");
        String data = request.getParameter("data");
        
        if(name.equals("sharesets")){
            ArrayList<Integer> setids = SetServlet.prepareNumberListFromJSONString(data);
            int[] updatedids = DataDAO.updateCardSet(setids,"Shared");
            if(updatedids != null){
                String responseMessage = gson.toJson(updatedids);
                response.setContentType("application/json");
                response.setCharacterEncoding("UTF-8");
                response.setStatus(HttpServletResponse.SC_ACCEPTED);
                response.getWriter().write(responseMessage);
                response.getWriter().flush();
            }else {
                response.setContentType("text");
                response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                response.getWriter().write("not all sets updated properly");
                response.getWriter().flush();
                return;
            } 
        }

    }
    
    //private static 
}
