const dict = require("./phrases");
const searchDictionary = function(search){
    const searchp = search.replace(/[~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g,''); //remove punctuation
    const words = searchp.split(' '); // split search in to words
    const foundPhrases = [];
    words.map(function(word){
        const wordv = word.replace(/are|think|is|the|need|and|but|have/gi, ''); //remove verbs and uneeded words. *improvement these words could be kept in a separate array and added
        dict.map(function(phrase) {
            if(wordv.length > 1){ // ignore "a's", "I's" etc,
                //const lcword = word.toLowerCase();
                //const found = phrase.toLowerCase().search(lcword); possible improvement
                const found = phrase.search(wordv);
            if(found !== -1) foundPhrases.push(phrase);
            }
            return phrase;
        });
    });
    const foundPhrasesUnique = foundPhrases.filter(function(e, i, s) {
        return i == s.indexOf(e);
    }); //only unique
    return foundPhrasesUnique;
}
module.exports = searchDictionary;