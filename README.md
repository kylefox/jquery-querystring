This plugin attempts to make working with querystrings easier. The primary function exposed is `$.querystring`, which handles both parsing & serialization (depending on the type of argument passed in). A `$.fn.querystring` method is also provided, which makes getting & setting the querystring of `<a>` elements more convenient.

_Currently only the simplest cases work, but the goal is to support nested objects and arrays. Please refer to the test suite for more info._

Basic usage
-----------

Objects can be serialized to a querystring fragment:

    $.querystring({name: "John", age:42}); // "name=John&age=42"

Conversely, querystring fragments can be parsed back into objects:

    $.querystring("name=John&age=42"); // {name: "John", age:42}

Element methods
---------------

You can access an element's querystring directly:

    // Markup: <a href="/search?terms=bicycles">Search for bikes!</a>
    $('a').querystring(); // {terms: 'bicycles'}
    
and modify it, too:

    $('a').querystring({perPage: 10});
    // <a href="/search?terms=bicycles&perPage=10">Search for bikes!</a>
    
You'll notice the new parameter was merged into the existing querystring. You can optionally pass a second argument (boolean) indicating if the existing querystring should be cleared:
    
    $('a').querystring({foo: 'bar'}, true);
    // <a href="/search?foo=bar">Search for bikes!</a>
    
You can also use this to remove the querystring:

    $('a').querystring({}, true);
    
_Right now only `<a>` tags are supported, but support for `<form>` tags is planned._
    
Syntax
------
    
The syntax for objects and arrays is similar to that of [Rack](http://rack.rubyforge.org/). For example, an object like this:

    {person: {name: "Johnny"}}
    
equates to a string like this:

    "person[name]=Johnny"

Arrays are similar:

    {drinks: ["Whisky", "Beer", "Wine"]}
    
equates to:

    "drinks[]=Whisky&drinks[]=Beer&drinks[]=Wine"

Tests & Contributing
--------------------

Testing is done with [QUnit](http://docs.jquery.com/Qunit). Have a look at [tests/tests.js](https://github.com/kylefox/jquery-querystring/blob/master/tests/tests.js) to learn more about the intended API. Running the tests (ie, opening `tests/index.html` in your browser) will give you an idea of which features remain to be implemented & clarified.

I would love help with this plugin, so please fork & submit pull requests. Here's an immediate hit-list of things to implement:

* Parsing & serialization of nested objects & arrays
* Coercion to native types (ex: Number, Boolean)
* Handling of blank/empty values

