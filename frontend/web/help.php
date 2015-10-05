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

					<!-- Document Location -->
					<div class="form-group" style="margin-left: 0 !important; margin-right: 0 !important">
						<label class="col-md-4 control-label" for="DocumentLocation">Document Location</label>  
						<div class="col-md-4">
							<input id="DocumentLocation" name="DocumentLocation" type="text" placeholder="File URL" class="form-control input-md" required="">
							<span class="help-block">Contoh: "C:\Desktop\STBI\doc.txt"</span>  
						</div>
					</div>

					<!-- Query Location -->
					<div class="form-group" style="margin-left: 0 !important; margin-right: 0 !important">
						<label class="col-md-4 control-label" for="DocumentLocation">Query Location</label>  
						<div class="col-md-4">
							<input id="DocumentLocation" name="QueryLocation" type="text" placeholder="File URL" class="form-control input-md" required="">
							<span class="help-block">Contoh: "C:\Desktop\STBI\query.txt"</span>  
						</div>
					</div>
					
					<!-- Relevant Judgement -->
					<div class="form-group" style="margin-left: 0 !important; margin-right: 0 !important">
						<label class="col-md-4 control-label" for="DocumentLocation">Relevant Judgement</label>  
						<div class="col-md-4">
							<input id="DocumentLocation" name="RelevantJudgement" type="text" placeholder="File URL" class="form-control input-md" required="">
							<span class="help-block">Contoh: "C:\Desktop\STBI\relevant.txt"</span>  
						</div>
					</div>
					
					<!-- Stopword Location -->
					<div class="form-group" style="margin-left: 0 !important; margin-right: 0 !important">
						<label class="col-md-4 control-label" for="DocumentLocation">Stopword Location</label>  
						<div class="col-md-4">
							<input id="DocumentLocation" name="StopwordLocation" type="text" placeholder="File URL" class="form-control input-md" required="">
							<span class="help-block">Contoh: "C:\Desktop\STBI\stopword.txt"</span>  
						</div>
					</div>
					
					<!-- Multiple Radios -->
					<div class="form-group" style="margin-left: 0 !important; margin-right: 0 !important">
						<div class="container-fluid">
							<div class="row">
								<!-- Untuk Dokumen -->
								<div class="col-md-4 col-md-offset-2">
									<div class="row">
										<label class="col-md-5 control-label" for="radios">Document</label>
									</div>
									<!-- Untuk TF -->
									<div class="row">
										<label class="col-md-4 control-label" for="radios">TF</label>
										<div class="col-md-4">
											<div class="radio">
												<label for="TFDoc-1">
													<input type="radio" name="TFDoc" id="TFDoc-1" value="1" checked="checked">
													No TF
												</label>
											</div>
											<div class="radio">
												<label for="TFDoc-2">
													<input type="radio" name="TFDoc" id="TFDoc-2" value="2">
													Raw TF
												</label>
											</div>
											<div class="radio">
												<label for="TFDoc-3">
													<input type="radio" name="TFDoc" id="TFDoc-3" value="3">
													Binary TF
												</label>
											</div>
											<div class="radio">
												<label for="TFDoc-4">
													<input type="radio" name="TFDoc" id="TFDoc-4" value="4">
													Augmented TF
												</label>
											</div>
											<div class="radio">
												<label for="TFDoc-5">
													<input type="radio" name="TFDoc" id="TFDoc-5" value="5">
													Logarithmic TF
												</label>
											</div>
										</div>										
									</div><br>
									<!-- Untuk IDF -->
									<div class="row">
										<label class="col-md-4 control-label" for="radios">IDF</label>
										<div class="col-md-4">
											<div class="radio">
												<label for="IDFDoc-1">
													<input type="radio" name="IDFDoc" id="IDFDoc-1" value="1" checked="checked">
													No IDF
												</label>
											</div>
											<div class="radio">
												<label for="IDFDoc-2">
													<input type="radio" name="IDFDoc" id="IDFDoc-2" value="2">
													Using IDF
												</label>
											</div>
										</div>										
									</div><br>
									<!-- Untuk Normalisasi -->
									<div class="row">
										<label class="col-md-4 control-label" for="radios">Normalization</label>
										<div class="col-md-5">
											<div class="radio">
												<label for="normalizationDoc-1">
													<input type="radio" name="normalizationDoc" id="normalizationDoc-1" value="1" checked="checked">
													No Normalization
												</label>
											</div>
											<div class="radio">
												<label for="normalizationDoc-2">
													<input type="radio" name="normalizationDoc" id="normalizationDoc-2" value="2">
													Using Normalization
												</label>
											</div>
										</div>										
									</div><br>
									<!-- Untuk Stemming -->
									<div class="row">
										<label class="col-md-4 control-label" for="radios">Stemming</label>
										<div class="col-md-5">
											<div class="radio">
												<label for="stemmingDoc-1">
													<input type="radio" name="stemmingDoc" id="stemmingDoc-1" value="1" checked="checked">
													No stemming
												</label>
											</div>
											<div class="radio">
												<label for="stemmingDoc-2">
													<input type="radio" name="stemmingDoc" id="stemmingDoc-2" value="2">
													Using stemming
												</label>
											</div>
										</div>										
									</div><br>
								</div> <!-- Akhir dari div "Untuk Dokumen" -->
								<!-- Untuk Query -->
								<div class="col-md-4">
									<!-- Untuk TF -->
									<div class="row">
										<label class="col-md-4 control-label" for="radios">TF</label>
										<div class="col-md-4">
											<div class="radio">
												<label for="TFQuery-1">
													<input type="radio" name="TFQuery" id="TFQuery-1" value="1" checked="checked">
													No TF
												</label>
											</div>
											<div class="radio">
												<label for="TFQuery-2">
													<input type="radio" name="TFQuery" id="TFQuery-2" value="2">
													Raw TF
												</label>
											</div>
											<div class="radio">
												<label for="TFQuery-3">
													<input type="radio" name="TFQuery" id="TFQuery-3" value="3">
													Binary TF
												</label>
											</div>
											<div class="radio">
												<label for="TFQuery-4">
													<input type="radio" name="TFQuery" id="TFQuery-4" value="4">
													Augmented TF
												</label>
											</div>
											<div class="radio">
												<label for="TFQuery-5">
													<input type="radio" name="TFQuery" id="TFQuery-5" value="5">
													Logarithmic TF
												</label>
											</div>
										</div>										
									</div><br>
									<!-- Untuk IDF -->
									<div class="row">
										<label class="col-md-4 control-label" for="radios">IDF</label>
										<div class="col-md-4">
											<div class="radio">
												<label for="IDFQuery-1">
													<input type="radio" name="IDFQuery" id="IDFQuery-1" value="1" checked="checked">
													No IDF
												</label>
											</div>
											<div class="radio">
												<label for="IDFQuery-2">
													<input type="radio" name="IDFQuery" id="IDFQuery-2" value="2">
													Using IDF
												</label>
											</div>
										</div>										
									</div><br>
									<!-- Untuk Normalisasi -->
									<div class="row">
										<label class="col-md-4 control-label" for="radios">Normalization</label>
										<div class="col-md-5">
											<div class="radio">
												<label for="normalizationQuery-1">
													<input type="radio" name="normalizationQuery" id="normalizationQuery-1" value="1" checked="checked">
													No Normalization
												</label>
											</div>
											<div class="radio">
												<label for="normalizationQuery-2">
													<input type="radio" name="normalizationQuery" id="normalizationQuery-2" value="2">
													Using Normalization
												</label>
											</div>
										</div>										
									</div><br>
								</div>
							</div> <!-- Akhir dari div class="row" -->
						</div> <!-- Akhir dari div container-fluid -->
					</div> <!-- Akhir dari div class="form-group" untuk Multiple Radios -->
					<!-- Button -->
					<div class="row">
						<div class="col-md-4 col-md-offset-2"></div>						
						<div class="col-md-4 col-md-offset-2">
							<div class="form-group">
								<!-- <label class="col-md-4 control-label" for="singlebutton">Submit</label> -->
								<div class="col-md-4">
									<button id="singlebutton" name="singlebutton" class="btn btn-primary">Submit</button>
								</div>
							</div>
						</div>
					</div>
				</fieldset>
			</form>
		</div> <!-- Akhir dari div id="content" -->
	</body>
</html>