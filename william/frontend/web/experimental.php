<!DOCTYPE html>
<html lang="en">
	<!-- CSS -->
	<link href="../assets/bootstrap-3.3.5-dist/css/bootstrap.min.css" rel="stylesheet">
	<link href="../assets/css/home.css" rel="stylesheet">

	<!-- Script -->
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
	<script type="text/javascript" src="../assets/bootstrap-3.3.5-dist/js/bootstrap.js"></script>

	<head>
		<title>MAWILE</title>
	</head>
	
	<body>
		<!-- Header untuk menu responsive -->
		<div id="header1">
			<nav class="navbar navbar-default">
				<div class="container-fluid">
					<!-- Brand and toggle get grouped for better mobile display -->
					<div class="navbar-header">
						<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
							<span class="sr-only">Toggle navigation</span>
							<!-- Jumlah garis -->
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
						</button>
						<img src="../assets/img/Mega-Mawile.png" class="img-responsive" alt="Responsive image" width="50px" height="50px">
					</div>

					<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
						<ul class="nav navbar-nav navbar-right">
							<li><a href="#">Normal</a></li>
							<li><a href="#">Experimental</a></li>
							<li><a href="#">Help</a></li>
						</ul>
					</div><!-- /.navbar-collapse -->
				</div><!-- /.container-fluid -->
			</nav>
		</div>
		
		<!-- Header untuk judul -->
		<div id="header2">
			<br><h3 class="text-center">SEARCH ANYTHING<h3>
		</div>
		
		<div id="content">
			<form class="form-horizontal">
				<fieldset>
					<!-- Form Name -->
					<!-- <legend>Form Name</legend> -->

					<!-- Query -->
					<div class="form-group">
						<label class="col-md-2 control-label" for="queryExperimental">Query</label>  
						<div class="col-md-8">
							<input id="queryExperimental" name="queryExperimental" type="text" placeholder="File URL" class="form-control input-md" required="">
							<span class="help-block">Contoh: "Materi STBI"</span> 
						</div>
					</div>
					<!-- Button -->
					<center>
						<div class="form-group">
							<button id="submitQueryExperimental" name="singlebutton" class="btn btn-primary">Submit</button>
						</div>
					</center>
				</fieldset>
			</form>
		</div> <!-- Akhir dari div id="content" -->
	</body>
</html>