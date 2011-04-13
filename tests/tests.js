$(function() {

  
  module("Serialize");

  test("simple properties", function() {
    equals($.querystring({name: "John"}), "name=John");
    equals($.querystring({name: "John", age:59}), "name=John&age=59");
  });
  
  test("properties requiring URI encoding", function() {
    equals($.querystring({name: "John Doe"}), "name=John%20Doe");
    equals($.querystring({name: "John Doe", garble: " /# #/ "}), "name=John%20Doe&garble=%20%2F%23%20%23%2F%20");
  });
  
  test("empty values", function() {
    equals($.querystring({}), "", "Empty objects serialize to empty strings.");
    equals($.querystring({name:null}), "", "Properties with null values are omitted from resulting string.");
  });
  
  test("arrays", function() {
    equals($.querystring({people: ['Larry', 'Curly', 'Moe']}), "people[]=Larry&people[]=Curly&people[]=Moe");
  });
  
  test("simple objects", function() {
    equals($.querystring({person: {name:"John", age:110}}), "person[name]=John&person[age]=110");
  });
  
  test("nested objects & arrays", function() {
    var object = {person: {name:"John", age:110, drinks: ['Beer', 'Whisky', 'Wine'], location: {city: "New York", state:"NY"}}},
        expected = "person[name]=John&person[age]=110&person[drinks][]=Beer&person[drinks][]=Whisky&person[drinks][]=Wine&person[location][city]=New%20York&person[location][state]=NY";
    equals($.querystring(object), expected); // FIXME
  });
  
  
  module("Parse");
  
  test("simple properties", function() {
    deepEqual($.querystring("?name=John"), {name: "John"}, "With leading '?'");
    deepEqual($.querystring("name=John"), {name: "John"}, "Without leading '?'"); // FIXME
  });

  test("properties requiring URI decoding", function() {
    deepEqual($.querystring("?name=John%20Doe"), {name: "John Doe"});
    deepEqual($.querystring("?name=John%20Doe&garble=%20%2F%23%20%23%2F%20"), {name: "John Doe", garble: " /# #/ "});
  });
  
  test('empty values', function() {
    
  });
  
  test('arrays', function() {
    deepEqual($.querystring("?drinks[]=Beer&drinks[]=Whisky&drinks[]=Wine"), {drinks: ['Beer', 'Whisky', 'Wine']}); // FIXME
  });
  
  test('simple objects', function() {
    
  });
  
  test('nested objects & arrays', function() {
    
  });
  
});