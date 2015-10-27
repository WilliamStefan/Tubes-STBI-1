/**
 * Created by henry on 17/10/2015.
 */

var file = require('fs');
var natural = require('natural'), stem = natural.PorterStemmer;
var math = require('mathjs');
var wstream = file.createWriteStream('out.txt');
var fileInverted = require('fs');
var wstreamInverted = fileInverted.createWriteStream('invertedfile.txt');

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

    // array of query
    this.queryArray = [];

    // query number and id of relevant document
    this.relevantDocument = [];

    // total relevant document for a query
    this.totalRelevantDocument = [];

    this.precision = [];

    this.recall = [];
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
            // this.similarities.push(0);
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

            console.log(this.postdata[i][j]);
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
    file.appendFile('out.txt',query+'\nDocument_ID Similarity');
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
    }
    // counting document and query length for normalization options
    var documentLength = [];
    var queryLength;
    if(typeNormalizationDocument == 'option2'){
        var sumD = [];
        for(var i = 0; i < documentweight.length; i++){
            sumD[i] = 0;
            for(var j = 0; j < documentweight[i].length; j++){
                sumD[i] += documentweight[i][j] * documentweight[i][j];
            }
            documentLength[i] = math.sqrt(sumD[i]);
        }
    }
    if(typeNormalizationQuery == 'option2'){
        var sumQ = 0; 
        for(var i = 0; i < queryweight.length; i++){
            sumQ += queryweight[i]*queryweight[i];
        }
        queryLength = math.sqrt(sumQ); 
    }
    // counting similarity of documents to query
    for (var i = 0; i < this.postdata.length; i++){
        if(isNaN(this.similarities[i])){
            this.similarities[i] = 0;
        }
    }
    if(typeNormalizationDocument == 'option2' && typeNormalizationQuery == 'option2'){
        for (var i = 0; i < this.postdata.length; i++){
            for (var j = 0; j < wordTemp.length; j++){
                this.similarities[i] = this.similarities[i] + (documentweight[i][j] * queryweight[j] / (documentLength[i] * queryLength));
            }
            file.appendFile('out.txt',(i+1)+' '+this.similarities[i]+'\n');
        }
    }
    else if(typeNormalizationDocument == 'option2' && typeNormalizationQuery == 'option1'){
        for (var i = 0; i < this.postdata.length; i++){
            for (var j = 0; j < wordTemp.length; j++){
                this.similarities[i] = this.similarities[i] + (documentweight[i][j] * queryweight[j] / documentLength[i]);
            }
            file.appendFile('out.txt',(i+1)+' '+this.similarities[i]+'\n');
        }
    }
    else if(typeNormalizationDocument == 'option1' && typeNormalizationQuery == 'option2'){
        for (var i = 0; i < this.postdata.length; i++){
            for (var j = 0; j < wordTemp.length; j++){
                this.similarities[i] = this.similarities[i] + (documentweight[i][j] * queryweight[j] / queryLength);
            }
            file.appendFile('out.txt',(i+1)+' '+this.similarities[i]+'\n');
        }
    }
    else{
        for (var i = 0; i < this.postdata.length; i++){
            for (var j = 0; j < wordTemp.length; j++){
                this.similarities[i] = this.similarities[i] + (documentweight[i][j] * queryweight[j]);
            }
            file.appendFile('out.txt',(i+1)+' '+this.similarities[i]+'\n');
        }
    }
}

Collection.prototype.loadQrels = function(filename) {
    var documents = file.readFileSync(filename).toString().split('\r\n');
    for(var i = 0; i < documents.length-1;i++) {
        this.relevantDocument[i] = documents[i].split('   ');
    }
    var count = 0;
    for(var i = 0; i < this.relevantDocument.length;i++) {
        if(this.relevantDocument[i][0] != count+1){
            count++;
        }
        if(isNaN(this.totalRelevantDocument[count])){
            this.totalRelevantDocument[count] = 0;
        }
        this.totalRelevantDocument[count]++;
    }
};

Collection.prototype.loadQuery = function(filename) {
    var documents = file.readFileSync(filename).toString().split('.I');
    var temp = documents[0].split('.W\r\n');
    for(var i = 1; i < documents.length;i++) {
        temp = documents[i].split('.W\r\n');
        this.queryArray[i-1] = temp[1];
    }
};

Collection.prototype.countPrecision = function() {
    
};

Collection.prototype.countRecall = function() {
    
};

Collection.prototype.createInvertedFile = function() {
    wstream.on('finish', function () {
      console.log('file has been written');
    });

    for(var i = 1; i <= this.word.length; i++){
        var k = this.word.indexOf(this.word[i]);
        for(var j = 1; j <= this.postdata[k].length; j++){
            if(this.postdata[k][j] != 0){
                wstream.write(this.word[i] + " " + this.postdata[k][j] + " weight");
            }
        }
    }

    wstreamInverted.end();
};

module.exports = Collection;