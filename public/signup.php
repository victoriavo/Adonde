<div id="AppName">
        <h1>Ad‌&#243;nde</h1>
</div>
<br>
<div class="container">
    <div id="SignupName">
        <h1>Signup</h1>
        <form method="post" action = '/signup'>
                <div class="form-group">
                  <label id="label" class="col-form-label" for="formGroupforUserName">Your Name:</label>
                  <input name="name" type="text" class="form-control" id="formGroupforUserName" placeholder="Name" [(ngModel)]="newUser.userName">
                </div>
		<div class="form-group">
                  <label id="label" class="col-form-label" for="formGroupforUserName">Your Username:</label>
                  <input name="username" type="text" class="form-control" id="formGroupforUserName" placeholder="Username" [(ngModel)]="newUser.userName">
                </div>
                <div class="form-group">
                  <label id="label" class="col-form-label" for="formGroupforEmail">Your Email:</label>
                  <input name = "email"type="text" class="form-control" id="formGroupforEmail" placeholder="Email" [(ngModel)]="newUser.email">
                </div>
                <div class="form-group">
                        <label id="label" class="col-form-label" for="formGroupforPassword">Password:</label>
                        <input name="password" type="password" class="form-control" id="formGroupforPassword" placeholder="Password"[(ngModel)]="newUser.password" >
                </div>
                <input  type="submit" class="btn btn-primary">
        </form>
    </div>
</div>
