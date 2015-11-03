var file = require('fs');
var natural = require('natural'), stem = natural.PorterStemmer;
var math = require('mathjs');

function Collection() {
    this.rawdocuments = [];
	this.rawqueries = [];
	this.stopwords = [];
	this.relevantjudgements = [];
	
	this.word = [];
	this.postdocuments = [];
	this.idf = [];
	this.matrixinverted = [];
}

Collection.prototype.loadDocuments = function(filename) {
    var documents = file.readFileSync(filename).toString().split('.I ');
    for(var i = 0; i < documents.length; i++) {
        var document = documents[i];
        var element, title, author, words;

        if(document != '') {
            element = document.split('.T\r\n');
            element = element[1].split('.A\r\n');
            if (element.length > 1) {
                title = element[0];
				author = '';
				for(var j = 1; j < element.length - 1; j++) {
					author = author + element[j] + ' ';
				}
                element = element[element.length - 1].split('.W\r\n');
				author = author + element[0] + ' ';
				element = element[1].split('.X\r\n');
				words = element[0];
            }
            else {
                element = element[0].split('.W\r\n');
				title = element[0];
				element = element[1].split('.X\r\n');
				words = element[0];
            }

            this.rawdocuments.push({
                title: title,
                author: author,
                words: words
            });
			
			this.postdocuments.push([]);
        }
    }
	console.log("Document loaded !");
};

Collection.prototype.loadQueries = function(filename) {
	var queries = file.readFileSync(filename).toString().split('.I');
	for(var i = 0; i < queries.length; i++) {
		var query = queries[i];
		var element;
		
		if(query != '') {
			element = query.split('.W\r\n');
			//element = element[1].split('\r\n');
			
			this.rawqueries.push(element[1]);
		}
	}
	console.log("Query loaded !");
};

Collection.prototype.loadRelevance = function(filename) {
	var relevances = file.readFileSync(filename).toString().split('\r\n')
	for(var i = 0; i < relevances.length; i++) {
		var relevance = relevances[i];
		var element;
		
		if(relevance != '') {
			element = relevance.split(' ');
			if(this.relevantjudgements.length < element[0]) {
				this.relevantjudgements[this.relevantjudgements.length] = [element[1]];
			}
			else {
				this.relevantjudgements[element[0] - 1].push(element[1]);
			}
		}
	}
	console.log("Relevance Feedback loaded !");
}

Collection.prototype.loadStopwords = function(filename) {
    this.stopwords = file.readFileSync(filename).toString().split('\r\n');
	console.log("Stopwords loaded !");
};

Collection.prototype.processText = function(text, stemopt) {
	var result = text;
	
	for(var i = 0 ; i < this.stopwords.length; i++) {
        result = result.replace(new RegExp('\\s'+this.stopwords[i]+'\\s','gi'),' ');
    }
    result = result.replace(new RegExp('\\s*(\\d+|[^\\w])\\s','gi'),' ');
    result = result.replace(new RegExp('\\s[^\\w]\\s*','gi'),' ');
	if(stemopt == 'option2') {
		result = stem.tokenizeAndStem(result);
	}
	else {
		result = result.split(new RegExp('\\s','gi'));
	}
	
	return result;
};

Collection.prototype.processDocuments = function(stemopt) {
	var temp;
	
	for(var i = 0; i < this.rawdocuments.length; i++) {
		temp = this.processText(this.rawdocuments[i].title + ' ' + this.rawdocuments[i].words, stem);
		for(var j = 0; j < temp.length; j++) {
			if(this.word.indexOf(temp[j]) == -1) {
				this.word.push(temp[j]);
				for(var k = 0; k < this.postdocuments.length; k++) {
					this.postdocuments[k].push(0);
				}
			}
			this.postdocuments[i][this.word.indexOf(temp[j])]++;
		}
	}
	console.log("Post documents created !");
};

Collection.prototype.createInverted = function(tfopt, idfopt) {
	var matrixtf = [];
	var matrixidf = [];
	
	if(tfopt == 'option1') {
		for(var i = 0; i < this.postdocuments.length; i++) {
			matrixtf.push([]);
			for(var j = 0; j < this.word.length; j++) {
				matrixtf[i].push(1);
			}
		}
	}
	else if(tfopt == 'option2') {
		matrixtf = this.postdocuments;
	}
	else if(tfopt == 'option3') {
		for(var i = 0; i < this.postdocuments.length; i++) {
			matrixtf.push([]);
			for(var j = 0; j < this.word.length; j++) {
				if(this.postdocuments[i][j] == 0) {
					matrixtf[i].push(0);
				}
				else {
					matrixtf[i].push(1);
				}
			}
		}
	}
	else if(tfopt == 'option4') {
		for(var i = 0; i < this.postdocuments.length; i++) {
			var max = 0;
			for(var j = 0; j < this.word.length; j++) {
				if(this.postdocuments[i][j] > max) {
					max = this.postdocuments[i][j];
				}
			}
			matrixtf.push([]);
			for(var j = 0; j < this.word.length; j++) {
				matrixtf[i].push(0.5 + 0.5 * this.postdocuments[i][j] / max);
			}
		}
	}
	else if(tfopt == 'option5') {
		for(var i = 0; i < this.postdocuments.length; i++) {
			matrixtf.push([]);
			for(var j = 0; j < this.word.length; j++) {
				if(this.postdocuments[i][j] != 0) {
					matrixtf[i].push(1 + math.log(this.postdocuments[i][j], 10));
				}
				else {
					matrixtf[i].push(0);
				}
			}
		}
	}
	
	if(idfopt == 'option1') {
		for(var i = 0; i < this.word.length; i++) {
			matrixidf.push(1);
		}
	}
	else if(idfopt == 'option2') {
		for(var i = 0; i < this.word.length; i++) {
			var sum = 0;
			for(var j = 0; j < this.postdocuments.length; j++) {
				if(this.postdocuments[j][i] > 0) {
					sum++;
				}
			}
			matrixidf.push(math.log(this.postdocuments.length / sum, 10));
		}
	}
	
	this.idf = matrixidf;
	
	for(var i = 0; i < this.postdocuments.length; i++) {
		this.matrixinverted.push([]);
		for(var j = 0; j < this.word.length; j++) {
			this.matrixinverted[i].push(matrixtf[i][j] * matrixidf[j]);
		}
	}
	
	console.log("Inverted file created !")
};

Collection.prototype.indexing = function(query, tfopt, idfopt, stemopt, normd, normq) {
	var temp = this.processText(query, stemopt);
	var wordquery = [];
	var postquery = [];
	var matrixtf = [];
	var matrixidf = [];
	
	for(var i = 0; i < temp.length; i++) {
		if(wordquery.indexOf(temp[i]) == -1) {
			wordquery.push(temp[i]);
			postquery.push(0);
		}
		postquery[wordquery.indexOf(temp[i])]++;
	}
	
	if(tfopt == 'option1') {
		for(var i = 0; i < wordquery.length; i++) {
			matrixtf.push(1);
		}
	}
	else if(tfopt == 'option2') {
		matrixtf = postquery;
	}
	else if(tfopt == 'option3') {
		for(var i = 0; i < wordquery.length; i++) {
			matrixtf.push(1);
		}
	}
	else if(tfopt == 'option4') {
		var max = 0;
		for(var i = 0; i < wordquery.length; i++) {
			if(postquery[i] > max) {
				max = postquery[i];
			}
		}
		for(var i = 0; i < wordquery.length; i++) {
			matrixtf.push(0.5 + 0.5 * postquery[i] / max);
		}
	}
	else if(tfopt == 'option5') {
		for(var i = 0; i < wordquery.length; i++) {
			matrixtf.push(1 + math.log(postquery[i], 10));
		}
	}
	
	if(idfopt == 'option1') {
		for(var i = 0; i < wordquery.length; i++) {
			matrixidf.push(1);
		}
	}
	else if(idfopt == 'option2') {
		for(var i = 0; i < wordquery.length; i++) {
			if(this.word.indexOf(wordquery[i]) != -1) {
				matrixidf.push(this.idf[this.word.indexOf(wordquery[i])]);
			}
			else {
				matrixidf.push(0);
			}
		}
	}
	
	// count similarity
	var similarity = [];
	for(var i = 0; i < this.matrixinverted.length; i++) {
		similarity.push(0);
		for(var j = 0; j < wordquery.length; j++) {
			var id = this.word.indexOf(wordquery[j]);
			if(id != -1) {
				similarity[i] = similarity[i] + this.matrixinverted[i][id] * matrixtf[j] * matrixidf[j];
			}
		}
	}
	
	if(normd = 'option2') {
		var norm = 0;
		for(var i = 0; i < similarity.length; i++) {
			for(var j = 0; j < this.word.length; j++) {
				norm = norm + math.pow(this.postdocuments[i][j], 2);
			}
			similarity[i] = similarity[i] / math.sqrt(norm);
		}
	}
	if(normq = 'option2') {
		var norm = 0;
		for(var i = 0; i < wordquery.length; i++) {
			norm = norm + math.pow(postquery[i], 2);
		}
		for(var i = 0; i < similarity.length; i++) {
			similarity[i] = similarity[i] / math.sqrt(norm);
		}
	}
	
	var result = [];
	for(var i = 0; i < similarity.length; i++) {
		if(similarity[i] > 0) {
			result.push({
				nodoc : '' + (i + 1),
				value : similarity[i]
			});
		}
	}
	result.sort(function(a, b) {
		if(a.value > b.value) {
			return -1;
		}
		if(a.value < b.value) {
			return 1;
		}
		return 0;
	});
	return result;
};

Collection.prototype.experiment = function(tfopt, idfopt, stemopt, normd, normq) {
	file.writeFile('result.txt','Query_ID Recall Precision NonInterpolatedPrecision\n');
	for(var i = 0; i < this.rawqueries.length; i++) {
		var query = this.rawqueries[i];	
		var result = this.indexing(query, tfopt, idfopt, stemopt, normd, normq);
		
		var rank = [];
		for(var j = 0; j < result.length; j++) {
			if(this.relevantjudgements[i].indexOf(result[j].nodoc) != -1) {
				rank.push(j + 1);
			}
		}
		
		var recall = rank.length / this.relevantjudgements[i].length;
		var precision = rank.length / result.length;
		var nip = 0;
		for(var j = 0; j < rank.length; j++) {
			nip = nip + (j + 1) / rank[j];
		}
		nip = nip / this.relevantjudgements[i].length;
		file.appendFile('result.txt', i+1 + ' ' + recall + ' ' + precision + ' ' + nip +'\n');
		// console.log(recall, precision, nip);
	}
};

module.exports = Collection;