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
		
		<div id="header2">
			<br><h2 class="text-center">SEARCH ANYTHING<h2>
		</div>
		
		<div id="content">
			<form class="form-horizontal">
				<!-- Input type text -->
				<!-- Document Location -->
				<div class="form-group">
					<label class="col-sm-5 control-label">Document Location</label>
					<div class="col-sm-3">
						<input type="text" class="form-control" placeholder="File URL">
					</div>
				</div>
				
				<!-- Query Location -->
				<div class="form-group">
					<label class="col-sm-5 control-label">Query Location</label>
					<div class="col-sm-3">
						<input type="text" class="form-control" placeholder="File URL">
					</div>
				</div>
				
				<!-- Relevant Judgement -->
				<div class="form-group">
					<label class="col-sm-5 control-label">Relevant Judgement</label>
					<div class="col-sm-3">
						<input type="text" class="form-control" placeholder="File URL">
					</div>
				</div>
				
				<!-- Stopword Location -->
				<div class="form-group">
					<label class="col-sm-5 control-label">Stopword Location</label>
					<div class="col-sm-3">
						<input type="text" class="form-control" placeholder="File URL">
					</div>
				</div>
				
				<br>
				
				<!-- Radio button -->
				<div class="row">
					<!-- Documents -->
					<div class="col-md-6">
						<label class="col-md-offset-7 col-md-6">Document</label><br>
						<!-- TF -->
						<label class="col-md-offset-7 col-md-6">TF</label>
						<!-- No TF -->
						<div class="radio">
							<label class="col-md-offset-7 col-md-6">
								<input type="radio" name="TFD" id="TF1" value="option1" checked>
								No TF
							</label>
						</div>
						
						<!-- Raw TF -->
						<div class="radio">
							<label class="col-md-offset-7 col-md-6">
								<input type="radio" name="TFD" id="TF2" value="option2">
								Raw TF
							</label>
						</div>
						
						<!-- Binary TF -->
						<div class="radio">
							<label class="col-md-offset-7 col-md-6">
								<input type="radio" name="TFD" id="TF3" value="option3">
								Binary TF
							</label>
						</div>
						
						<!-- Augmented TF -->
						<div class="radio">
							<label class="col-md-offset-7 col-md-6">
								<input type="radio" name="TFD" id="TF4" value="option4">
								Augmented TF
							</label>
						</div>
						
						<!-- Logarithmic TF -->
						<div class="radio">
							<label class="col-md-offset-7 col-md-6">
								<input type="radio" name="TFD" id="TF5" value="option5">
								Logarithmic TF
							</label>
						</div>
						
						<!-- IDF -->
						<br>
						<label class="col-md-offset-7 col-md-6">
							IDF
						</label>
						<!-- No IDF -->
						<div class="radio">
							<label class="col-md-offset-7 col-md-6">
								<input type="radio" name="IDFD" id="IDF1" value="option1" checked>
								No IDF
							</label>
						</div>
						
						<!-- Using IDF -->
						<div class="radio">
							<label class="col-md-offset-7 col-md-6">
								<input type="radio" name="IDFD" id="IDF2" value="option2">
								Using IDF
							</label>
						</div>
						
						<!-- Normalization -->
						<br>
						<label class="col-md-offset-7 col-md-6">
							Normalization
						</label>
						<!-- No normalization -->
						<div class="radio">
							<label class="col-md-offset-7 col-md-6">
								<input type="radio" name="NormalizationD" id="Normalization1" value="option1" checked>
								No normalization
							</label>
						</div>
						
						<!-- Using normalization -->
						<div class="radio">
							<label class="col-md-offset-7 col-md-6">
								<input type="radio" name="NormalizationD" id="Normalization2" value="option2">
								Using normalization
							</label>
						</div>
						
						<!-- Stemming -->
						<br>
						<label class="col-md-offset-7 col-md-6">
							Stemming
						</label>
						<!-- No stemming -->
						<div class="radio">
							<label class="col-md-offset-7 col-md-6">
								<input type="radio" name="StemmingD" id="Stemming1" value="option1" checked>
								No stemming
							</label>
						</div>
						
						<!-- Using stemming -->
						<div class="radio">
							<label class="col-md-offset-7 col-md-6">
								<input type="radio" name="StemmingD" id="Stemming2" value="option2">
								Using stemming
							</label>
						</div>
					</div>
					
					<div class="col-md-6">
						<!-- Query -->
						<label class="col-md-offset-3 col-md-6">Query</label><br>
						<!-- TF -->
						<label class="col-md-offset-3 col-md-6">TF</label>
						<!-- No TF -->
						<div class="radio">
							<label class="col-md-offset-3 col-md-6">
								<input type="radio" name="TFQ" id="TF1" value="option1" checked>
								No TF
							</label>
						</div>
						
						<!-- Raw TF -->
						<div class="radio">
							<label class="col-md-offset-3 col-md-6">
								<input type="radio" name="TFQ" id="TF2" value="option2">
								Raw TF
							</label>
						</div>
						
						<!-- Binary TF -->
						<div class="radio">
							<label class="col-md-offset-3 col-md-6">
								<input type="radio" name="TFQ" id="TF3" value="option3">
								Binary TF
							</label>
						</div>
						
						<!-- Augmented TF -->
						<div class="radio">
							<label class="col-md-offset-3 col-md-6">
								<input type="radio" name="TFQ" id="TF4" value="option4">
								Augmented TF
							</label>
						</div>
						
						<!-- Logarithmic TF -->
						<div class="radio">
							<label class="col-md-offset-3 col-md-6">
								<input type="radio" name="TFQ" id="TF5" value="option5">
								Logarithmic TF
							</label>
						</div>
						
						<!-- IDF -->
						<br><label class="col-md-offset-3 col-md-6">IDF</label>
						<!-- No IDF -->
						<div class="radio">
							<label class="col-md-offset-3 col-md-6">
								<input type="radio" name="IDFQ" id="IDF1" value="option1" checked>
								No IDF
							</label>
						</div>
						
						<!-- Using IDF -->
						<div class="radio">
							<label class="col-md-offset-3 col-md-6">
								<input type="radio" name="IDFQ" id="IDF2" value="option2">
								Using IDF
							</label>
						</div>
						
						<!-- Normalization -->
						<br><label class="col-md-offset-3 col-md-6">Normalization</label>
						<!-- No normalization -->
						<div class="radio">
							<label class="col-md-offset-3 col-md-6">
								<input type="radio" name="NormalizationQ" id="Normalization1" value="option1" checked>
								No normalization
							</label>
						</div>
						
						<!-- Using normalization -->
						<div class="radio">
							<label class="col-md-offset-3 col-md-6">
								<input type="radio" name="NormalizationQ" id="Normalization2" value="option2">
								Using normalization
							</label>
						</div>
						
						<!-- Finish button -->
						<br><br><br><br>
						<div class="form-group">
							<div class="col-sm-offset-3 col-sm-6">
								<button type="submit" class="btn btn-default">Indexing</button>
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
	</body>
</html>