/**
 * Created by henry on 17/10/2015.
 */

var file = require('fs');
var natural = require('natural'), stem = natural.PorterStemmer;
var math = require('mathjs');


function Collection() {
    this.rawdata = [];
    this.postdata = [];
    this.stopwords = [];
    this.word = [];
    this.idf = [];
    this.similarities = [];
}

Collection.prototype.loadDocuments = function(filename) {
    var documents = file.readFileSync(filename).toString().split('.I');
    for(var i = 0; i < documents.length;i++) {
        var document = documents[i];
        var element, title, author, words;

        if(document != '') {
            element = document.split('.T\r\n');
            element = element[1].split('.A\r\n');
            if (element.length == 2) {
                title = element[0];
                element = element[1].split('.W\r\n');
                if (element.length == 2) {
                    author = element[0];
                    words = element[1];
                }
            }
            else {
                element = element[0].split('.W\r\n');
                if (element.length == 2) {
                    title = element[0];
                    words = element[1];
                }
            }

            this.rawdata.push({
                title: title,
                author: author,
                words: words
            });

            this.postdata.push([]);
            this.similarities.push(0);
        }
    }
};

Collection.prototype.loadStopWords = function(filename) {
    this.stopwords = file.readFileSync(filename).toString().split('\r\n');
};

Collection.prototype.removeStopWord = function(text) {
    for(var i = 0 ; i < this.stopwords.length; i++){
        text = text.replace(new RegExp('\\s'+this.stopwords[i]+'\\s','gi'),' ');
    }
    text = text.replace(new RegExp('\\s*(\\d+|[^\\w])\\s','gi'),' ');
    text = text.replace(new RegExp('\\s[^\\w]\\s*','gi'),' ');

    return text;
};

Collection.prototype.stemText = function(text) {
    /*var result = stem.tokenizeAndStem(text);
    var stemmed = '';
    for(var i = 0; i < result.length; i++) {
        stemmed = stemmed + result[i] + ' ';
    }

    return stemmed;*/
    return stem.tokenizeAndStem(text);
};

/*Collection.prototype.getDocument = function(id) {
    return this.data[id];
};*/

Collection.prototype.processData = function() {
    var temp;

    for(var i = 0; i < this.rawdata.length; i++) {
        temp = this.stemText(this.removeStopWord(this.rawdata[i].title + this.rawdata[i].words));
        for(var j = 0; j < temp.length; j++) {
            if(this.word.indexOf(temp[j]) == -1) {
                this.word.push(temp[j]);
                this.idf.push(0);
                for(var k = 0; k < this.postdata.length; k++) {
                    this.postdata[k].push(0);
                }
            }
            this.postdata[i][this.word.indexOf(temp[j])]++;
        }
    }

    console.log('Done !');
};

Collection.prototype.countIdf = function() {
    for(var i = 0; i < this.postdata.length; i++) {
        for(var j = 0; j < this.word.length; j++) {
            if(this.postdata[i][j] > 0) {
                this.idf[j]++;
            }
        }
    }
};

Collection.prototype.indexing = function(query) {
    var temp = this.stemText(this.removeStopWord(query));
    var id;
    for(var i = 0; i < temp.length; i++) {
        for(var j = 0; j < this.postdata.length; j++) {
            id = this.word.indexOf(temp[i]);
            if(id != -1) {
                this.similarities[j] = this.similarities[j] + math.pow(math.log(this.postdata.length / this.idf[id], 2), 2) * this.postdata[j][id];
            }
        }
    }
};

Collection.prototype.normalization = function(queryWeight, documentWeight) {
    var sumQueryW = 0;
    var sumDocumW = 0;
    var sumQueryW2 = 0;
    var sumDocumW2 = 0;
    var varianceQuery = 0;
    var varianceDocum = 0;

    var cosNormalization;

    for(var i = 0; i < queryWeight.length; i++) {
        sumQueryW = sumQueryW + queryWeight[i];
        sumQueryW2 = sumQueryW2 + math.pow(queryWeight[i],2);
    }

    for(var j = 0; j < documentWeight.length; j++){
        sumDocumW = sumDocumW + documentWeight[i];
        sumDocumW2 = sumDocumW2 + math.pow(documentWeight[i],2);
    }

    varianceQuery = math.sqrt(sumQueryW2);
    varianceDocum = math.sqrt(sumDocumW2);

    cosNormalization = (sumDocumW * sumQueryW) / (varianceDocum * varianceQuery);
}

module.exports = Collection;