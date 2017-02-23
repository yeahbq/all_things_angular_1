# The True-True Alien Overlord Presidents

![](http://41.media.tumblr.com/b357cacdaac16180a5b99f8dc300b08f/tumblr_inline_nxmvk1EylB1sdh097_1280.jpg)

## Angular $http

| Lesson Objectives                        |
| ---------------------------------------- |
| Use $http to access an API resource      |
| Incorporate AJAX calls into your Angular application |

#### Road Map

1. Aliens Own Us - Intro
2. Demo
3. Hitting an API with $http
4. POSTing Data
5. PUT and DELETE - Independent Practice
6. Outro

## Aliens Own Us - Intro

Aliens own us. We all know that - no big surprise here, but that's 
because we're educated programmers who read the Matrix every day.

**It's time to make these overlords public to the sheeple.**

We've only been working with hardcoded data so far. Today that changes; 
it's time to kick it up a notch if we're going to oust these dang 
aliens.

#### Welcome to your First MEAN App!

We're going to learn a little about two different functionalities in 
Angular that will allow us to start communicating with real data, 
accessed through an API. You'll need to dust off your knowledge of 
RESTful routes & AJAX.

Now, since we're going to be interacting with an API, in an ideal world 
we'd force you to write one first. You totally could. But _because_ you 
could, and because we'd rather skip to the new stuff, let's use a 
pre-built backend for this lesson.

Now, real quick – let's seed a little seed data. Go ahead and run 
`npm install`, `mongod`, then `npm run seed`.

```json
[
  {"name": "Blorp Florp McRichards", "start": 1789, "end": 1790 },
  {"name": "John MuscleBrain Adams", "start": 1790, "end": 1801 },
  {"name": "Blogpost Dorgabn", "start": 1801, "end": 1949 },
  {"name": "Mike", "start": 1949, "end": 1947 }
]
```

Once you have some, do a quick `GET` request 
`http://localhost:3000/api/presidents` in Postman and make sure you've 
got some JSON coming back.

## Demo of Starter Code

We've included a bunch of starter code that looks quite a bit like the 
code you've already written. There's an angular controller, with some 
hardcoded data, listing out some of the True-True Overlord Presidents of 
the United States. Hopefully 
[Wikipedia](http://uncyclopedia.wikia.com/wiki/Alien_overlords) is 
accurate, 'cuz who knows stuff like that off the top of their head?

It's our job to mush together this little API we have, and our Angular 
application.

Notice the following line in `server.js`:

`app.use(express.static(path.join(__dirname, 'public')));`

This line serves up `index.html` (and only `index.html` - specified by
expressJS) in `/public`. From there, you can connect your entire Angular
app to one html page.

## Hitting an API with $http

![](http://vigilantcitizen.com/wp-content/uploads/2012/04/theylive20.jpg)

The simplest starting point will be to switch our hardcoded array of 
presidents with the one living in our new API.

Step one – **let's delete our hardcoded data.** In 
`presidentsController.js`:

```diff
angular.module('ThePresidentsApp', [])
  .controller('PresidentsController', PresidentsController);

function PresidentsController(){
-  this.all = [
-    {name: 'Blorp Florp McRichards', start: 1789, end: 1790 },
-    {name: 'John MuscleBrain Adams', start: 1790, end: 1801 },
-    {name: 'Blogpost Dorgabn', start: 1801, end: 1949 },
-    {name: 'Mike', start: 1949, end: 1947 }
-  ]
+  this.all = [];
}
```

With a little setup, we'll do a GET request to our API, and assign 
`this.all` to the array we get back. To do that, we're going to have to 
use an Angular library called `$http`.

### Injecting Dependencies

Angular dependencies – like libraries or plugins that other people have 
built – are defined first in our module (unless they come with Angular 
by default), and then _injected_ into any controllers that need to use 
them.

`$http` happens to come with Angular, so we only need to _inject_ it 
into our controller. We do that with a simple command, and then by 
simply passing an argument to our controller function.

In `js/presidentsController.js`:
```js
PresidentsController.$inject = ['$http'];
function PresidentsController($http){
  // ...
```

The first tells the controller we intend to use this library called 
`$http`, the second allows us to pass the library in and gives it the 
name $http.

Think of it just like any other argument in a function – because it's 
the first argument, and we called it $http, we can use it inside our 
function using that name.

### Using $http is just AJAX!

`$http` is not very different than how we've used AJAX in the past, 
especially with JQuery. Let's see it all, then walk through it. In 
`js/presidentsController.js` again:

```js
PresidentsController.$inject = ['$http'];

function PresidentsController($http){
  var vm = this;
  self.all = [];

  function getPresidents(){
    $http
      .get('/api/presidents')
      .then(function(response){
        vm.all = response.data.presidents;
    }, function(err) {
          console.log(err);
    });
  }

  getPresidents();

// ...
}
```

There are a few important things to note. Let's cut it down first just 
to $http:

```js
function PresidentsController($http){
// ...

  function getPresidents(){
    $http
      .get('/api/presidents')
      .then(function(response){
        vm.all = response.data.presidents;
    }, function(err) {
          console.log(err);
    });
  }

  getPresidents();

// ...
}
```

We call `$http`, then our favorite HTTP verb, `.get`. There's one for 
`.post`, `.put`, and `.delete` too. It's asynchronous, so we'll use 
`.then` - a promise -to make sure when it's _done_ it'll do what we 
want. And what we want is just to overwrite our `.all` array with the 
response we get back.

Feel free to `console.log(response)` and see everything that comes back. 
`.data` is just the data, `.presidents` is the key inside our JSON 
holding an array of presidents.

That's all we're doing in that function. Afterwords, we literally just 
run the function, which runs when we first load up the app. Easy.

**Now before we move on and you try it yourself, there's an important 
detail to note.** We've suddenly gone from:

```js
function PresidentsController($http){
  this.all = [];
  // ...
```
to
```js
function PresidentsController($http){
  var vm = this;
  vm.all = [];
  // ...
```

**Why?** The answer is JavaScript's _scope_. As you've seen in the past 
few weeks, `this` means different things depending on how many layers 
deep your code is.

In the previous example, which function is `this` scoped to?

```js
function PresidentsController($http){
// ...

  function getPresidents(){
    $http
      .get('/api/presidents')
      .then(function(response){
        // Where is 'this' scoped to?
        this.all = response.data.presidents;
    });
  }
// ...
}
```

We're 3 functions deep when we call `this.all` – `this` is no longer 
referring to our controller, it's referring to the function inside 
`.then`. If you left it that way, you'd never see any data, because to 
see it in the view, that data needs to be attached directly to our 
_controller_.

So what's a simple way to make sure we're scoped to the right place? A 
tiny little variable. The variable you choose is up to you, it's just 
preference. So if we do:

```js
function PresidentsController($http){
  var vm = this;
  vm.all = [];
// ...

  function getPresidents(){
    $http
      .get('/api/presidents')
      .then(function(response){
        vm.all = response.data.presidents;
    }, function(err) {
          console.log(err);
    });
  }

  getPresidents();

// ...
}
```

Now we can trust we're talking to the right scope.

Try refreshing your browser, let's see if it worked!


## POSTing Data

Now that we've got GETing down, it's time to try POSTing. Just like any 
RESTful API, you can add a new president by POSTing to the correct URL. 
We'll need to modify our controller action to send a new president from 
the form to our API.

We already have an `addPresident` function we can manipulate. Currently, 
it only takes the data within the form and adds it to the `vm.all` 
array.  If we want it to post, we'll have to use `$http`.

```javascript
function PresidentsController($http){
  var vm = this;
  vm.all = [];
  // ...
  
  function addPresident(){
    $http
    .post('/api/presidents', vm.newPresident)
    .then(function(res) {
      vm.all.push(res.data.president);
      vm.newPresident = {};
    }, function(err) {
      console.log(err);
    });
  }  	
  
  // ...
}
```

Again, just like ajax! Nothing new here - we're simply taking the data 
from our `ng-model` attached to our inputs!

Notice that in each of the `$http` calls' `.then()` field takes a 
successful function first, then a failure. If you need to do greater 
configuration, such as attaching some kind of header, you can do so by 
passing a config object in place of the second argument (recall 
something like: `{ method: POST, data: data, url: '/api/presidents }`).

## PUT and DELETE - Independent Practice

Let's try and implement the other two parts of CRUD.

First, try and attach a delete function using an `ng-click` on the 'X' 
span tag. Remember to use `$http.delete()`!

Next, try and implement a similar PUT function.

1. Create an "uncover" function that switches the president's 
   "uncovered" boolean value.
2. Make sure that uncover function uses `$http.put()`
3. Add an `ng-click` directive to the Uncovered? button.
4. Use `ng-class` and the `uncovered` classname to strike out a 
   true-true president's name if `president.uncovered === true`.

## Conclusion
![](http://www.eyeforfilm.co.uk/images/newsite/roddy_piper.jpg)

Even though we may not have freed the Sheeple today, we've certainly 
taken great steps. You should be proud!

Let's wrap up with a few questions:
- How do you inject dependencies into an Angular controller?
- How do you use $http to do a GET request?
- Why did we start using `vm` instead of `this`?
- How do you do a POST request?

##### References

[Angular $http](https://docs.angularjs.org/api/ng/service/$http)
