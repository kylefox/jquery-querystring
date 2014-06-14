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
    equals($.querystring({name:''}), "name=", 'Blank strings are included in result.');
    equals($.querystring({boring:false}), "boring=false", '`false` literal is included in result.');
  });

  test("arrays", function() {
    equals($.querystring({people: ['Larry', 'Curly', 'Moe']}), "people[]=Larry&people[]=Curly&people[]=Moe");
  });

  test("simple objects", function() {
    equals($.querystring({person: {name:"John", age:110}}), "person[name]=John&person[age]=110");
  });

  test("nested objects & arrays", function() {
    equals(
      $.querystring({person: {name:"John", age:110, drinks: ['Beer', 'Whisky', 'Wine'], location: {city: "New York", state:"NY"}}}),
      "person[name]=John&person[age]=110&person[drinks][]=Beer&person[drinks][]=Whisky&person[drinks][]=Wine&person[location][city]=New%20York&person[location][state]=NY"
    );
  });


  module("Parse");

  test("simple properties", function() {
    deepEqual($.querystring("?name=John"), {name: "John"}, "With leading '?'");
    deepEqual($.querystring("name=John"), {name: "John"}, "Without leading '?'");
    deepEqual($.querystring("http://google.com/?name=John"), {name: "John"}, "With domains prefix.");
  });

  test("coercion to native types", function() {
    deepEqual($.querystring('?boring=false'), {boring:false}, 'Should parse true/false to native boolean types.');
    deepEqual($.querystring('?awesome=true'), {awesome:true}, 'Should parse true/false to native boolean types.');
    deepEqual($.querystring('?age=21'), {age:21});
    deepEqual($.querystring('?things=null'), {things: null});
  });

  test("properties requiring URI decoding", function() {
    deepEqual($.querystring("?name=John%20Doe"), {name: "John Doe"});
    deepEqual($.querystring("?name=John%20Doe&garble=%20%2F%23%20%23%2F%20"), {name: "John Doe", garble: " /# #/ "});
  });

  test('empty values', function() {
    deepEqual($.querystring('?awesome'), {awesome:""});
    deepEqual($.querystring('?awesome='), {awesome:""});
  });

  test('arrays', function() {
    deepEqual(
      $.querystring("?drinks[]=Beer&drinks[]=Whisky&drinks[]=Wine"),
      {drinks: ['Beer', 'Whisky', 'Wine']}
    );
  });

  test('simple objects', function() {
    deepEqual($.querystring("?person[name]=John"), {person: {name: "John"}});
  });

  test('nested objects & arrays', function() {
    deepEqual(
      $.querystring("?person[location][city]=NYC&&person[drinks][]=Beer&person[drinks][]=Whisky&person[drinks][]=Wine"),
      {person: {location: {city:'NYC'}}, drinks: ['Beer', 'Whisky', 'Wine']}
    );
  });

  test('missing querystring', function() {
    deepEqual($.querystring('/foo?'), {}, 'Should give empty object with ? only')
    deepEqual($.querystring('/foo'), {}, 'Should give empty object with no ?')
    deepEqual($.querystring('http://google.com/foo?'), {}, 'Should give empty object with host/path and ?')
    deepEqual($.querystring('http://google.com/foo'), {}, 'Should give empty object with host/path and no ?')
  });

  module("Element methods");

  test("get querystring from link", function() {
    deepEqual($('<a href="/foo?">link</a>').querystring(), {}, "With no querystring");
    deepEqual($('<a href="/foo?name=John">link</a>').querystring(), {name: "John"}, "With querystring");
    deepEqual($('<a href="http://google.com/?name=John">link</a>').querystring(), {name: "John"}, "With domains prefix.");
    deepEqual($('<a href="/foo">link</a>').querystring(), {}, "With no ?");
  });
  test("set link querystring existing", function() {
    equals(
      $('<a href="/foo?name=John">link</a>').querystring({awesome:'value'}).attr('href'),
      '/foo?name=John&awesome=value'
     )
  });
  test("set link querystring non-existent", function() {
    equals(
      $('<a href="/foo">link</a>').querystring({awesome:'value'}).attr('href'),
      '/foo?awesome=value'
     )
  });
  // TODO: Tests for clearing, merging & using `form` elements.

});
