<?php

use Slim\Http\Request;
use Slim\Http\Response;

// Routes
$app->get('/flights/search/budget/[{budget}]', function ($request, $response,$args) {
        $sth = $this->db->prepare("SELECT * from Flights where cost<=:budget");
        $sth->bindParam("budget", $args['budget']);
        $sth->execute();
        $flights = $sth->fetchAll();
        return $this->response->withJson($flights);
    });

$app->get('/flights/search/origin/[{origin}]',function($request,$response,$args){
        $sth = $this->db->prepare("select * from Flights where origin = :origin");
        $sth->bindParam("origin", $args['origin']);
        $sth->execute();
        $flights =$sth->fetchAll();
        return $this->response->withJson($flights);

});

$app->get('/flights/search/[{origin}[/{depDate}]]', function($request, $response, $args) {
        $sth = $this->db->prepare("SELECT * FROM Flights where origin = :origin and depart_date >= concat(:depDate,' 00:00:00') and depart_date <= concat(:depDate,' 23:59:59') ");
        $sth->bindParam("origin", $args['origin']);
        $sth->bindParam("depDate",  $args['depDate']);
//      $sth->bindParam("returnDate",  $args['returnDate']);
        $sth->execute();
        $flights = $sth->fetchAll();
        return $this->response->withJson($flights);
});
$app->get('/flights/search/minD/[{origin}[/{minDistance}]]',function($request,$response,$args){
        $sth = $this->db->prepare("select * from Flights where origin =:origin and distance >= :minDistance");
        $sth->bindParam("origin",$args['origin']);
        $sth->bindParam("minDistance",$args['minDistance']);
        $sth->execute();
        $flights = $sth->fetchAll();
        return $this->response->withJson($flights);
});
$app->get('/flights/search/maxD/[{origin}[/{maxDistance}]]',function($request,$response,$args){
        $sth = $this->db->prepare("select * from Flights where origin =:origin and distance <= :maxDistance");
        $sth->bindParam("origin",$args['origin']);
        $sth->bindParam("maxDistance",$args['maxDistance']);
        $sth->execute();
        $flights = $sth->fetchAll();
        return $this->response->withJson($flights);
});

$app->get('/flights', function ($request, $response, $args) {
        $sth = $this->db->prepare("SELECT * FROM Flights");
        $sth->execute();
        $flights = $sth->fetchAll();
        return $this->response->withJson($flights);
});

$app->get('/flights/search/origin/budget/depart/return/[{origin}[/{budget}[/{depDate}[/{retDate}]]]]',function($request,$response,$args){
        $sql = "SELECT o.origin, o.destination, o.depart_date, d.depart_date AS return_date, o.cost AS depart_cost, d.cost AS return_cost ";
	$sql = $sql . "FROM ";
	$sql = $sql .  "(SELECT * FROM Flights WHERE cost <= :budget AND origin = :origin AND depart_date >= concat(:depDate,' 00:00:00') AND depart_date <= concat(:depDate,' 23:59:59')) AS o ";
	$sql = $sql . "JOIN ";
	$sql = $sql . "(SELECT * FROM Flights WHERE cost <= :budget AND destination = :origin AND depart_date >= concat(:retDate,' 00:00:00') AND depart_date <= concat(:retDate,' 23:59:59')) AS d ";
	$sql = $sql .  "WHERE o.origin = d.destination	AND o.destination = d.origin";
	$sth = $this->db->prepare($sql);
        $sth->bindParam("origin",$args['origin']);
        $sth->bindParam("budget",$args['budget']);
	$sth->bindParam("depDate",$args['depDate']);
        $sth->bindParam("retDate",$args['retDate']);
        $sth->execute();
        $flights = $sth->fetchAll();
        return $this->response->withJson($flights);
});

$app->get('/accounts', function ($request, $response, $args) {
        $sth = $this->db->prepare("SELECT * FROM Account");
        $sth->execute();
        $accounts = $sth->fetchAll();
        return $this->response->withJson($accounts);
});

$app->get('/update/[{email}[/{password}]]', function ($request, $response,  $args) {
        $input = $request->getParsedBody();
        $sql = "UPDATE Account SET password = :password WHERE email = :email";
        $sth = $this->db->prepare($sql);
	$sth->bindParam("email",$args['email']);
        $sth->bindParam("password",$args['password']);
	$sth->execute();
        $sth = $this->db->prepare("SELECT * FROM Account");
        $sth->execute();
        $password_update = $sth->fetchAll();
        return $this->response->withJson($password_update);
});
$app->post('/signup',function($request,$response){
	$input = $request->getParsedBody();
	$sql = "insert into Account (username, name, email, password, last_login) values (:username, :name,:email,:password, CURTIME())";
	$sth = $this->db->prepare($sql);
	$sth->bindParam("username",$input['username']);
	$sth->bindParam("name", $input['name']);
	$sth->bindParam("email", $input['email']);
	$hashed_password = password_hash($input['password'], PASSWORD_DEFAULT);
	$sth->bindParam("password", $hashed_password);
	$sth->execute();
	return $this->response->withJson($input);
});

$app->get('/login',function($request,$response){
        session_start();
        $input = $request->getQueryParams();
        $sql = "select * from Account where email = :email";
        $sth=$this->db->prepare($sql);
        $hashed_password = password_hash($input['password'], PASSWORD_DEFAULT);
        $sth->bindParam("email",$input['email']);
        $sth->execute();
        $account = $sth->fetchAll();
        if(password_verify($input['password'], $account[0]['password'])) {
                $sql = "UPDATE Account SET last_login = CURTIME() WHERE email = :email";
		$sth=$this->db->prepare($sql);
		$sth->bindParam("email",$input['email']);
		$sth->execute();
		return '1';
        }
        else return 'The following the combination of email/password is incorrect. Please Try Again!!';
});

$app->get('/logout',function($request,$response){
	session.start();
	unset($_SESSION['valid']);
	unset($_SESSION['name']);
	unset($_SESSION['username']);
	header("Refresh:5; url=login.php");

});

$app->get('/[{name}]', function (Request $request, Response $response, array $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/' route");

    // Render index view
    return $this->renderer->render($response, 'index.phtml', $args);
});
