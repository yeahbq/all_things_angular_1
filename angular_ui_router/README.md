# Front-end Routing with UI-Router

### Objectives
- Understand the value of client side routing
- Build a SPA with multiple pages
- Describe when to consider server-side routing and when to consider front-end routing

### Preparation

- Build a basic Angular app
- Interact with an API
- Download the [starter code](starter-code)

Routing, as you've seen in multiple frameworks and languages, is adding in the ability to render different pages in a application – but in a single-page app, how can we have multiple pages? In Angular, it comes down to storing all our views on our main page and turning them on and off as we need.

But what's the benefit? Why even make it single page? Why add that complexity? The main use case for front-end frameworks is added speed – by loading everything upfront, and just switching sections on and off, our page will seem wonderfully speedy because we'll be skipping quite a few steps that a more traditional framework has to run through.

There are downsides though -- if we really store an entire complex app on a single page, it becomes huge and unweildy. Also, what about URL's? They're the primary tool of navigation on the web, and they're how our users share links to certain parts of our application.

Client Side Routing helps us keep the URL updated and organize the different views in a single page app.

Now, Angular comes with a basic routing mechanism, ``ngRoute``, which you can read about [here](https://docs.angularjs.org/api/ngRoute/service/$route).

But today we're looking at an even more beefed up router: a third-party plugin called [`ui-router`](https://github.com/angular-ui/ui-router);

**Our ultimate goal is to build out two pages – a main Todo list and an Archive page for all the Todos we've completed.**

Let's walk through it.

## Seven Steps to UI-Router 

Because of the nature of what we're building today - our URL will be telling our application what particular views to render - we can't just open our file with ``file://`` anymore. We'll have to load up a quick server to render our initial HTML file.

```bash
$ server
```
From now on, rather than opening the HTML file directly, we can navigate to ``http://0.0.0.0:8000`` or ``http://localhost:8000``.

OR

```bash
$ http-server
```
Remember that http-server normally uses port 8080 not 8000.

#### Step One: UI-Router

We'll need the UI-Router source. It's not an official, core library, and it's not hosted on Google's site. CDNJS [has the file](https://cdnjs.com/libraries/angular-ui-router), or you can download it from GitHub and include it yourself.

Assuming the latter, let's make sure our script tag is _after_ including Angular, and before we try to use it.

```html
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.7/angular.min.js"></script>

<!-- new router script -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.3.2/angular-ui-router.min.js"></script>
<!-- end new router script -->

<script src="js/app.js"></script>
<script src="js/TodosController.js"></script>
```

#### Step Two: Adding a Dependency

Because we're adding in a new library, it'll be a dependency – we'll need to make sure Angular knows about our library, so we can use it. If you haven't used any external libraries yet, rejoice in that we're finally going to put _something_ in those empty brackets in our `app.js`.

```javascript
// in app.js
angular.module('todoApp', ['ui.router']);
```

``'ui.router'`` just happens to be what the library is called in it's source. Most libraries will tell you what to write here in their documentation, and if you need more than one, just list them like any array.

#### Step Three: Add Some Configuration

In `app.js`, we had this:

```javascript
// in app.js
angular.module('todoApp', ['ui.router']);
```

Let's add on to it:

```javascript
// in app.js
angular.module('todoApp', ['ui.router'])
  .config(MainRouter);
```

Of course, now we need a ``MainRouter()`` function, so let's build one:

```javascript
MainRouter.$inject = ['$stateProvider', '$urlRouterProvider'];
function MainRouter($stateProvider, $urlRouterProvider) {
  // ROUTE
}
```

The arguments in the function are necessary parts for our router to do its work, however, we're specifically injecting using the `$inject` syntax to ensure that the file will work after minification.

#### Step Four: Add Some Routes

When using Angular, we're not really changing locations (single-page apps, here), lets, instead of calling them _routes_, call them **states**. Same idea as routes, but we're just trying to be more descriptive. We're changing the current _state_ of the app, as in a snapshot of the stuff we're looking at and working with, at a particular moment.

```javascript
function MainRouter($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'home.html'
    });
}
```

That weird ``$stateProvider`` argument comes from our library, and it allows us to add a state to our application.

We define a **name** for the state. This is important because it's how we can refer to it later.

We also define a **relative url** for each state to tell the browser how to simulate navigating different pages. A `/` here says it'll be the default homepage, basically.

And finally, we add a **templateURL**, which is sort of a partial HTML file. We'll fill a partial with _just_ the code we'd need to change on the page, here.  Remember, it's just a part of a larger HTML page with parts that we can hide.

Now, before our route can work, we've got to extract some of our view into that partial. Let's do that.

#### Otherwise

Let's also add a catch-all to ensure that we route to the home if a state is not found:

```javascript
function MainRouter($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'home.html',
    });

    $urlRouterProvider.otherwise('/');
}
```

#### Step Five: Building Partials

Go over to our `index.html`. What we want to do is to take everything inside our `<main>` tag:

```html
<main>
	... ALL INSIDE HERE ...
</main>
```

Let's open up ``home.html`` and paste all that view code inside. Now you've got a partial, and all we have left to do is tell our `index.html` where we want to put it.

In that `<main>`, on our `index.html`, we'll add a new directive: `ui-view`.

```html
<main ui-view></main>
```

And since our route is a default route at `/`, and our `templateUrl` is already `home.html`, it should actually work!

#### Step Six: One More State!

Of course, that's exactly what we were looking at before, but _now_, we have the ability to switch out that view with different partials, depending on our _state_.

So let's make things interesting and add another state in here. Let's make a state for when we're looking at an archived list. In `app.js`:

```javascript
function MainRouter($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'home.html'
    })
    .state('archive', {
      url: '/archive',
      templateUrl: 'archive.html'
    });

  $urlRouterProvider.otherwise('/');
}
```

We'll need another partial for `archive.html` and for that one, instead of listing all our todos, let's just list the completed ones.

Our new partial will be almost exactly the same as our last so **duplicate the `home.html` file**. Inside, find our `ng-repeat`:

```html
<li ng-repeat="todo in todosVm.todoList">
```

...and switch that sucker out:

```html
<li ng-repeat="todo in todosVm.completedTodos()">
```

...we also want to change our home page to only show non-completed todos.  Take a look at the TodosController.  What change do we need to make to

```html
<li ng-repeat="todo in todos.todoList">
```

We're 10 seconds away from seeing something awesome. We need one more thing.

#### Step Seven: A Navbar!

In order to jump between one view and the other, we need _links_! But not normal links because we're not changing pages. Luckily, `ui.router` gives us a custom directive. Inside your `index.html`, underneath `header` - let's add a `nav` with a few `a`'s

```html
<header><!-- stuff --></header>
<nav class="tabs">
  <a ui-sref="home">My List</a>
  <a ui-sref="archive">Archives</a>
</nav>
```

That custom directive, `ui-sref` is like `href`, but referencing _states_ instead. That came with our library, and **the text we're putting in there is just the names of the states we defined**.

You already have a little CSS in your `style.css` to make it look nice, something like:

```css
nav.tabs {
  background: #4d5d70;
  max-width: 55%;
  margin: 0 auto;
}
nav.tabs a {
  display: inline-block;
  background: rgba(255,255,255,0.7);
  color: black;
  padding: 10px 20px;
  margin-right: 1px;
}
```

Check it out. Click through and jump from page to page. Super awesome, yeah?

#### Helpful Extra - Which state am I on?

``ui.router`` actually gives us another really useful custom directive. Throw it on whichever links are using ``ui-sref``:

```html
<nav class="tabs">
  <a ui-sref-active="active" ui-sref="home">List</a>
  <a ui-sref-active="active" ui-sref="archive">Archive</a>
</nav>
```
This is a really nice helper that will apply the class of "active" (or whatever you put in quotes) to the link that's currently active, depending on what state you're looking at.

And suddenly, your interface makes a ton more sense. Super helpful.

## Independent Practice 

Having multiple states is really useful, obviously – we can start making a much more complex Angular application.

**What other states would be good to add to your app?** Try adding an about page to start

## Conclusion
- What's a router? What's it for?
- How do we add routes to our Angular application?
