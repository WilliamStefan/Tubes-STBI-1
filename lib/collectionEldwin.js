/**
 * Created by henry on 17/10/2015.
 */

var file = require('fs');
var natural = require('natural'), stem = natural.PorterStemmer;
var math = require('mathjs');


function Collection() {
    // split by title, author, and word
    this.rawdata = [];

    // stemmed rawdata
    this.postdata = [];
    
    // collection of stopwords
    this.stopwords = [];
    
    // collection of words from all documents
    this.word = [];
    
    // idf of words
    this.idf = [];
    
    // similarities of words
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

Collection.prototype.indexing = function(query, typeIdfDocument, typeTfDocument, typeNormalizationDocument, typeIdfQuery, typeTfQuery, typeNormalizationQuery) {
    for(var i = 0; i < this.similarities.length; i++){
        this.similarities[i] = 0;
    }
    var temp = this.stemText(this.removeStopWord(query));
    var wordTemp = [];
    var count = 0;
    for(var i = 0; i < temp.length; i++){
        var found = false;
        for(var j = 0; j < wordTemp.length; j++){
            if(wordTemp[j] == temp[i]){
                found = true;
                break;
            }
        }
        if(!found) {
            wordTemp[count] = temp[i];
            count++;
        }
    }
    var id;
    // weighting calculation for document
    var documentWordCounter = [];
    var documentweight = [];
    for(var i = 0; i < this.postdata.length; i++){
        documentWordCounter[i] = [];
        documentweight[i] = [];
        for(var j = 0; j < wordTemp.length; j++){
            if(isNaN(documentWordCounter[i][j])) {
                documentWordCounter[i][j] = 0;
            }
            if(isNaN(documentweight[i][j])){
                documentweight[i][j] = 0;
            }
            id = this.word.indexOf(wordTemp[j]);
            if (id != -1){
                documentWordCounter[i][j] = this.postdata[i][id];
            }
        }
    }
    if(typeIdfDocument == 'option2'){
        if(typeTfDocument == 'option1'){
            for(var i = 0; i < this.postdata.length; i++) {
                for(var j = 0; j < documentWordCounter[i].length; j++) {
                    id = this.word.indexOf(wordTemp[j]);
                    if(id != -1){
                        documentweight[i][j] = documentweight[i][j] + math.log(this.postdata.length / this.idf[id], 10);
                    }
                }
            }
        }
        else if(typeTfDocument == 'option2'){
            for(var i = 0; i < this.postdata.length; i++) {
                for(var j = 0; j < documentWordCounter[i].length; j++) {
                    id = this.word.indexOf(wordTemp[j]);
                    if(id != -1){
                        documentweight[i][j] = documentweight[i][j] + math.log(this.postdata.length / this.idf[id], 10) * documentWordCounter[i][j]; 
                    }
                }
            }
        }
        else if(typeTfDocument == 'option3'){
            for(var i = 0; i < this.postdata.length; i++) {
                for(var j = 0; j < documentWordCounter[i].length; j++) {
                    id = this.word.indexOf(wordTemp[j]);
                    if(id != -1) {
                        var temp1 = (documentWordCounter[i][j]!=0)?1:0;
                        documentweight[i][j] = documentweight[i][j] + math.log(this.postdata.length / this.idf[id], 10) * temp1;
                    }
                }
            }
        }
        else if(typeTfDocument == 'option4'){
            var max = [];
            for(var i = 0; i < this.postdata.length; i++){
                max[i] = -1;
            }
            for(var i = 0; i < this.postdata.length; i++){
                for(var j = 0; j < documentWordCounter[i].length; j++){
                    if (max[i] < documentWordCounter[i][j]) {
                        max[i] = documentWordCounter[i][j];
                    }
                }
            }
            for(var i = 0; i < this.postdata.length; i++) {
                for(var j = 0; j < documentWordCounter[i].length; j++) {
                    id = this.word.indexOf(wordTemp[j]);
                    if(id != -1 && max[i] != 0) {
                        documentweight[i][j] = documentweight[i][j] + math.log(this.postdata.length / this.idf[id], 10) * (0.5 + 0.5 * documentWordCounter[i][j] / max[i]);
                    }
                }
            }
        }
        else if(typeTfDocument == 'option5'){
            for(var i = 0; i < this.postdata.length; i++) {
                for(var j = 0; j < documentWordCounter[i].length; j++) {
                    id = this.word.indexOf(wordTemp[j]);
                    if(id != -1 && documentWordCounter[i][j] != 0) {
                        documentweight[i][j] = documentweight[i][j] + math.log(this.postdata.length / this.idf[id], 10) * (1 + math.log(documentWordCounter[i][j], 10));
                    }
                }
            }
        }
        if(typeNormalizationDocument == 'option2'){

        }
    }
    else if(typeIdfDocument == 'option1'){
        if(typeTfDocument == 'option1'){
            for(var i = 0; i < this.postdata.length; i++) {
                for(var j = 0; j < documentWordCounter[i].length; j++) {
                    id = this.word.indexOf(wordTemp[j]);
                    if(id != -1){
                        documentweight[i][j] = documentweight[i][j];
                    }
                }
            }
        }
        else if(typeTfDocument == 'option2'){
            for(var i = 0; i < this.postdata.length; i++) {
                for(var j = 0; j < documentWordCounter[i].length; j++) {
                    id = this.word.indexOf(wordTemp[j]);
                    if(id != -1){
                        documentweight[i][j] = documentweight[i][j] + documentWordCounter[i][j]; 
                    }
                }
            }
        }
        else if(typeTfDocument == 'option3'){
            for(var i = 0; i < this.postdata.length; i++) {
                for(var j = 0; j < documentWordCounter[i].length; j++) {
                    id = this.word.indexOf(wordTemp[j]);
                    if(id != -1) {
                        documentweight[i][j] = (documentWordCounter[i][j]!=0)?1:0;
                    }
                }
            }
        }
        else if(typeTfDocument == 'option4'){
            var max = [];
            for(var i = 0; i < this.postdata.length; i++){
                max[i] = -1;
            }
            for(var i = 0; i < this.postdata.length; i++){
                for(var j = 0; j < documentWordCounter[i].length; j++){
                    if (max[i] < documentWordCounter[i][j]) {
                        max[i] = documentWordCounter[i][j];
                    }
                }
            }
            for(var i = 0; i < this.postdata.length; i++) {
                for(var j = 0; j < documentWordCounter[i].length; j++) {
                    id = this.word.indexOf(wordTemp[j]);
                    if(id != -1 && max[i] != 0) {
                        documentweight[i][j] = documentweight[i][j] + (0.5 + 0.5 * documentWordCounter[i][j] / max[i]);
                    }
                }
            }
        }
        else if(typeTfDocument == 'option5'){
            for(var i = 0; i < this.postdata.length; i++) {
                for(var j = 0; j < documentWordCounter[i].length; j++) {
                    id = this.word.indexOf(wordTemp[j]);
                    if(id != -1 && documentWordCounter[i][j] != 0) {
                        documentweight[i][j] = documentweight[i][j] + (1 + math.log(documentWordCounter[i][j], 10));
                    }
                }
            }
        }
        if(typeNormalizationDocument == 'option2'){

        }
    }
    // weighting calculation for query
    var queryWordCounter = [];
    var queryweight = [];
    for(var i = 0; i < wordTemp.length; i++){
        if(isNaN(queryWordCounter[i])){
                queryWordCounter[i] = 0;
        }
        if(isNaN(queryweight[i])){
                queryweight[i] = 0;
        }
        for(var j = 0; j < temp.length; j++){
            if(wordTemp[i] == temp[j]){
                queryWordCounter[i]++;
            }
        }
    }
    if(typeIdfQuery == 'option2'){
        if(typeTfQuery == 'option1'){
            for(var i = 0; i < queryWordCounter.length; i++) {
                id = this.word.indexOf(wordTemp[i]);    
                if(id != -1) {
                    queryweight[i] = queryweight[i] + math.log(this.postdata.length / this.idf[id], 10);
                }
            }
        }
        else if(typeTfQuery == 'option2'){
            for(var i = 0; i < queryWordCounter.length; i++) {
                id = this.word.indexOf(wordTemp[i]);    
                if(id != -1) {
                    queryweight[i] = queryweight[i] + math.log(this.postdata.length / this.idf[id], 10) * queryWordCounter[i];
                }
            }
        }
        else if(typeTfQuery == 'option3'){
            for(var i = 0; i < queryWordCounter.length; i++) {
                id = this.word.indexOf(wordTemp[i]);    
                if(id != -1) {
                    temp1 = (queryWordCounter[i][i]!=0)?1:0
                    queryweight[i] = queryweight[i] + math.log(this.postdata.length / this.idf[id], 10) * temp1;
                }
            }
        }
        else if(typeTfQuery == 'option4'){
            var max = -1;
            for(var i = 0; i < queryWordCounter.length; i++) {
                if (max < queryWordCounter[i]) {
                    max = queryWordCounter[i];
                }
            }
            for(var i = 0; i < queryWordCounter.length; i++) {
                id = this.word.indexOf(wordTemp[i]);    
                if(id != -1) {
                    queryweight[i] = queryweight[i] + math.log(this.postdata.length / this.idf[id], 10) * (0.5 + 0.5 * queryWordCounter[i] / max);
                }
            }
        }
        else if(typeTfQuery == 'option5'){
            for(var i = 0; i < queryWordCounter.length; i++) {
                id = this.word.indexOf(wordTemp[i]);    
                if(id != -1) {
                    queryweight[i] = queryweight[i] + math.log(this.postdata.length / this.idf[id], 10) * (1 + math.log(queryWordCounter[i], 10));
                }
            }
        }
        if(typeNormalizationQuery == 'option2'){
        
        }
    }
    else if(typeIdfQuery == 'option1'){
        if(typeTfQuery == 'option1'){
            for(var i = 0; i < queryWordCounter.length; i++) {
                queryweight[i] = queryweight[i];
            }
        }
        else if(typeTfQuery == 'option2'){
            for(var i = 0; i < queryWordCounter.length; i++) {
                queryweight[i] = queryweight[i] + queryWordCounter[i];
            }
        }
        else if(typeTfQuery == 'option3'){
            for(var i = 0; i < queryWordCounter.length; i++) {
                queryweight[i] = (queryWordCounter[i]!=0)?1:0;
            }
        }
        else if(typeTfQuery == 'option4'){
            var max = -1;
            for(var i = 0; i < queryWordCounter.length; i++) {
                if (max < queryWordCounter[i]) {
                    max = queryWordCounter[i];
                }
            }
            for(var i = 0; i < queryWordCounter.length; i++) {
                queryweight[i] = queryweight[i] + (0.5 + 0.5 * queryWordCounter[i] / max);
            }
        }
        else if(typeTfQuery == 'option5'){
            for(var i = 0; i < queryWordCounter.length; i++) {
                queryweight[i] = queryweight[i] + (1 + math.log(queryWordCounter[i], 10));
            }
        }
        if(typeNormalizationQuery == 'option2'){

        }
    }

    for (var i = 0; i < this.postdata.length; i++){
        if(isNaN(this.similarities[i])){
            this.similarities[i] = 0;
        }
        for (var j = 0; j < wordTemp.length; j++){
            if(typeNormalizationQuery == 'option2')
                var sumD = 0;
                sumD = sumD + documentweight[i][j]*documentweight[i][j];

                this.similarities[i] = this.similarities[i] + (documentweight[i][j]*queryweight[j]/(math.sqrt(sumD)));
            else
                this.similarities[i] = this.similarities[i] + (documentweight[i][j]*queryweight[j]);
                

        }
        console.log(i+' '+this.similarities[i]);
    }
}

module.exports = Collection;