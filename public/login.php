<!--<button type="button" class="btn" id="loginbutton" (click)="login()">Login</button>-->
<nav class="navbar navbar-expand-lg navbar-light bg-faded justify-content-between">
        <h4>Ad‌&#243;nde</h4>
        <div id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link d-inline text-white" href="#">Home <span class="sr-only"></span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link d-inline text-white" href="#">Account</a>
            </li>
          </ul>
        </div>
</nav>
<div class="container bg-light" id="portalBody">
    <div id="LoginTitle"><h1 id="LoginText">Login</h1></div>
    <div class="container" id="LoginTerminal">
	<form action="/login">
        <div class="form-group">
            <label for="email" id="LoginLabel"><h4 id="LoginLabel">Sign in with email address:</h4></label>
            <input name = "email"type="text" class="form-control" id="usernameInput">
        </div>
        <div class="form-group">
            <label for="password" id="LoginLabel"><h4 id="LoginLabel">Password:</h4></label>
            <input name="password"type="password" class="form-control" id="passwordInput">
        </div>
    </div> 
    <p id="ForgotPswd">Forgot your password?</p> 
    <div class="checkbox" style="text-align:center">
        <label style="color:black;"><input type="checkbox"> Keep me signed in</label>   
    </div>        
    <div class="wrapper">
        <input type="submit" class="btn btn-primary" id="signInButton">
    </div>  
</form>  
</div>
