<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="sql" uri="http://java.sun.com/jsp/jstl/sql"%>
<%@page contentType="text/html" pageEncoding="UTF-8" session="false" %>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Welcome To Flash Card Shark</title>
        <style><c:import url="/css/registrationPageCustomSheet.css"></c:import></style>
        <script><c:import url="/js/jquery.js"></c:import></script>
        <script><c:import url="/js/JSregistrationPage.js"></c:import></script>
        <link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png">
        <link rel="manifest" href="site.webmanifest">
        <link rel="mask-icon" href="safari-pinned-tab.svg" color="#0087ad">
        <meta name="msapplication-TileColor" content="#2d89ef">
        <meta name="theme-color" content="#000000">
    </head>
    
    <div class="registration">
    <p id="wa">Welcome Aboard.</p>
            <form class="centerRegistrationScreen" action="${pageContext.request.contextPath}/registrationPage" method="POST"> 
            
                <p><span id="loginfield">username:</span> <input type="text" name="username"/></p>
                <p><span id="loginfield">password:</span>  <input type="password" name="password"/></p>
                <p><span id="loginfield">confirm:</span> <input type="password" name="confirmpw"/></p>
                <p><span id="loginfield">First Name:</span> <input type="text" name="firstname" /></p>
                <p><span id="loginfield">Last Name:</span> <input type="text" name="lastname" /></p>
                <p><span id="loginfield">Email:</span> <input type="text" name="email" id="emailfield"/></p>
                <p><input type="hidden" name="name" value="register"/></p>
                <p><input id="submitbutton" type="submit" name="submit" disabled="disabled"/></p>
                
            </form>
        
        <div>
            <c:if test="${not empty requestScope.passwordsConfirmed}">
                <p style="color:red; font-size: 20px;">Ooops! those passwords don't match. Try again</p>
            </c:if>
            <c:if test="${not empty requestScope.usernameexists}">
                <p style="color: red; font-size: 20px;"> That User already exists </p>
            </c:if>
            <c:if test="${not empty requestScope.emptyfield}">
                <p style="color: crimson">You didn't fill out a required field</p>
            </c:if>
        </div>
    </div>
    
</html>
