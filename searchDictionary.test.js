const searchDictionary = require("./searchDictionary");

test('To return 54 items', () => {
     expect(searchDictionary('I have a hypertension')).toHaveLength(54);
});

test('To return 78 items', () => {
     expect(searchDictionary('I have a hypertension sore')).toHaveLength(78);
});
test('To return 24 items', () => {
     expect(searchDictionary('I have a sore')).toHaveLength(24);
});
test('To return 140 items', () => {
     expect(searchDictionary('I think I have high blood pressure')).toHaveLength(140);
});