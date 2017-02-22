![](https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/AngularJS_logo.svg/695px-AngularJS_logo.svg.png)

# Intro to Angular1

| Learning Objectives |
| :--- |
| Understand the use case for AngularJS |
| Add the AngularJS framework to a web app |
| Create an AngularJS module |
| Create AngularJS controllers using both the _scope_ and _controller as_ approaches |
| Use data binding to create data driven UI's that update automatically when data changes |


## Roadmap

- AngularJS in Context 
- The Angular1 Mindset
- Key Components of Angular1 (w/code along)
  - How Components are Connected
  - Setting Up an App
  - Modules
  - Config & Routes
  - Controllers
  - Two-way Data Binding
  - Directives
  - Services
  - Filters
  - The Many Faces of Controllers
      - Dependency Injection
      - Minification
- Exercise - Create a To Do List App

## AngularJS in Context

### What's a SPA?

In it's simplest terms, a SPA is:

<img src="https://i.imgur.com/Koib0Fq.jpg" style="width:900px">

### Comparing SPAs to "Traditional" Web Apps

<img src="https://i.imgur.com/trUluDu.png" width="900">

**?: What key differences between a SPA and the traditional web app architecture are there?**

### What is AngularJS?

- An open source JS framework maintained by Google.
- Designed to make developing SPA's more productive and fun.
- Created in 2009 - its longevity is a testament to its capability and usefulness.
- It's the **A** in the MEAN Stack.

### How Does Angular perform its "Magic"?

Although you haven't witnessed Angular in action yet, when you do, you will get the feeling that Angular is magical.

- AngularJS performs it's magic by scanning the HTML document after it has loaded.
- Angular looks for special markers in the HTML known as **directives**.
- Those directives are processed by Angular.
- Directives add custom markup and/or behavior to the web app.

### What does Angular1 Bring to the Table?

#### Features and Concepts

The following are features/concepts applicable to AngularJS:

![](https://blog.openshift.com/wp-content/uploads/imported/angularjs-from-30k-feet.png)

You will become familiar with most of these features/concepts this week as you learn about Angular.

#### Benefits of AngularJS

Angular1 provides the following benefits when used to develop web apps:

- **Organizes Complexity**<br>Angular adds structure to complex SPAs using the popular MVC design pattern (or one of its derivatives MVVM, MV\* etc.).
- **Productivity**:<br>Angular makes us more productive when developing web apps because it provides features, such as data binding, that require _less code_ from the developer.
- **Improves Testability**:<br>Angular was designed with testing in mind.

## The AngularJS Mindset

Programming a web app with AngularJS requires a different mindset. In fact, more experienced programmers may struggle more to learn it than lesser experienced developers.

An AngularJS application is **DRIVEN BY DATA thanks to Declarative Data Binding**:

- An Angular controller holds model data that needs to be rendered in the view.
- The view displays that data via the concept of _data binding_. As you'll see, data binding in Angular is implemented using those things called _directives_.
- Thanks to data binding, when the data changes in the controller, the view will update automatically!

The above scenario describes **one-way data binding**. Changes to data in the controller are automatically and immediately reflected in the view.

However, Angular takes data binding to the next level with **two-way data binding**.

Angular provides a directive, `ng-model`, that binds HTML's `<input>`, `<textarea>` and `<select>` elements to the model data in the controller.

When the user changes the data in these "input-type" elements, the model in the controller is changed simultaneously and any other elements data bound to that data would  be updated in the view as well. This _two-way_ binding as shown conceptually here:

![](http://www.codeproject.com/KB/scripting/869712/two-way-db.png)

Again, an AngularJS app is **DRIVEN BY DATA**:

- When we want our HTML/view to change dynamically (change text, add/remove DOM elements, etc.), we change data, and the view will be automatically updated thanks to Angular's data binding directives.
- For example, imagine that you have an array that holds "comments" and you want to render a `<li>` for each comment. Once you declare the data binding using Angular's directives in the view, simply adding and removing comments from the array will result in `<li>` elements being automatically created and removed from the DOM!

**Contrast the Angular mindset with how we've changed the view using jQuery, client-side templates and native JS.**

> Key Point: Drive your application using data - data is the single source of truth!

## Key Components of AngularJS

### How Components are Connected

Let's review the following diagram of Angular's components:

![](http://aspblogs.blob.core.windows.net/media/dwahlin/Media/image_2D6D6780.png)

The above graphic mainly depicts the types of **components** available in AngularJS (`config` is a method and `routes` are defined, but they are not types of components).

The yellowish column that contains _Factory_, _Service_, etc. are different types of **services**.

The big picture takeaway here is that modules are containers for these other types of components. Also, although not depicted so clearly, is the fact that modules can contain numerous components of the same type, for example, several _controllers_, _directives_, etc. can be attached/registered with a module.

Since AngularJS is primarily focused on developing SPA's, let's take a look at another graphic:

<img src="https://i.imgur.com/qqTrCrL.png" style="width:600px">

Things to note:

- Client-side routing is what enables multiple views & functionality to be swapped in and out without a full-page refresh. However, to lower the bar to learning Angular, we'll ignore client-side routing for now and defer talking about _config_ & _routes_ until later in the week.
- When routing is configured, the client-side routes will specify which view and which controller to use for each route. Again, we will not use routing until late in the week.
- **Directives** and **Filters** are used in **views**.
- Optional **Services** (of all types) are used in **controllers**. Although not shown, services can also be used by other services, directives and filters.
- `$scope` is injectable (more on dependency injection in a bit) into our controllers, and if we do, it becomes the glue between our controller and view. However, we will begin by looking at the **controllerAs** syntax which does not use **$scope** by default.

**?: Do we use directives in our controllers or our views?**

**Enough talk, let's look at some of these components and Angular features with some code!**

### Setting Up an App

To get started, all we need is a static `index.html` and an `app.js` script file. You've seen this movie before:

```
? mkdir first-ng
? cd first-ng
? touch index.html
? mkdir js
? touch js/app.js
? subl .
```

Then:

- Put the usual HTML boilerplate in `index.html`.
- It's always worth the short amount of time it takes to include the [Bootstrap CDN](http://getbootstrap.com/getting-started/#download)!  No need for Bootstrap's JS in this lesson.
- Load `app.js` with a `<script>` element in the `<head>`.
- In the `<body>` put: `<h1>AngularJS</h1>`.

**?: Note that we are using an ordinary _index.html_ file (vs. _index.ejs_) - why is this?**

#### Include the AngularJS Library

Although Angular 2 was officially released late last year, it's adoption has not yet taken off due to the fact that it is **completely** different than the original.

In WDI, we are sticking with Angular 1 for now until there are more jobs available for Angular 2.

We are going to be using the CDN of the latest stable 1.6 version.  FYI, the code in this and future lessons was based on version 1.5 - there's a minor chance of "breaking changes", but let's roll the dice!

Get the link to the CDN from the [AngularJS](https://angularjs.org/) website.

**Important:** Ensure that the AngularJS library is loaded **before** our `app.js`.

After adding a `class="container"` to `<body>`, our `index.html` should now look something like this:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title></title>
  <link rel="stylesheet" href="">
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.2/angular.min.js"></script>
</head>
<body >
  <div>
    
  </div>
  <script src="js/app.js"></script>
</body>
</html>
```

### Modules

We've already discussed that modules are containers for other Angular components.

In complex applications, modules are useful for organizing code by feature. This way different developers can work on the app in isolation. It also enables you to package functionality for reuse in other apps.

Third parties can provide functionality to our Angular app via modules.  For example, when we learn client-side routing, we will be using a third-party router known as _ui-router_.

Modules are also used by Angular itself to break out functionality instead of having one massive core module.

There will always be a single "main" module for our app.  Other modules are then "injected" into this main module.

When the AngularJS library is loaded, it creates a global object named, you guessed it, `angular`.

This object has a `module()` method that is used to both **define** a _module_ **and** get **access** to a _module_ that's been previously defined.

>**Note:** It is a best practice in Angular to define all components in separate `js` files, however, for this first look at Angular, we will write all of our script in our `app.js` file.

In `app.js`, let's first create an IIFE to prevent from leaking into the global scope:

```js
(function() {
'use strict';

// all code will go in here...

})();
```

Ready to define our first module? Let's do it!

```js
angular.module('myApp', []);
```

That's all it takes to define a new module named `myApp`, which you can guess by its name, will be our applications main module.

If you recall, there can be more than one module, however, an Angular app needs one "main" module that Angular loads first - more on this in a bit...

The empty array is where we would pass in other module names that `myApp` uses, or depends on - this is called **dependency injection**, an important concept in software engineering and one in which Angular leverages heavily.

Even though `myApp` does not depend on any other **modules**, the empty array is **necessary** because if we call the `module()` method with only one argument, the method becomes a getter, returning the specified module.  When two arguments are supplied, the `module()` defines/creates a new module like we did above.

**So, the `module` method in AngularJS is another example of method _________ in OOP.**

Every AngularJS application has one "main" module that Angular uses to "bootstrap" the app. We tell Angular the name of this "main" module with the `ng-app` directive in our HTML:

```html
<html lang="en" ng-app="myApp">
```

It's about time we do a check to make sure everything is loading as planned. Let's put an Angular **binding expression** in our `<body>` like this:

```html
<body class="container">
  <h1>AngularJS</h1>
  {{3 + 4}}
</body>
```

View `index.html` in the browser and you should see a "7" appear in the place of our binding expression. If not, troubleshoot it by checking for typos, etc.

>**Note:** The `ng-app` directive can be added to any element. All elements contained within that element will be "monitored" by AngularJS, and anything outside of that element will not be treated as part of the AngularJS app. By including `ng-app` on the `<html>` element, our entire page is being watched by Angular. Allow me to demonstrate this by moving `ng-app` to a new `<div>`...

It is also common to put `ng-app` in the `<body>` element.

**?: If you would like to put a binding expression in the `<title>` element of the `<head>`, where should you put `ng-app`?**

#### What the `ng`!

In case you haven't figured it out by now, `ng` is the shortcut namespace used by Angular.

All of Angular's built-in directives will start with `ng`.

For clarity, third-party, as well as your own custom directives (yes, you can!), should start with something other than `ng`.

### Controllers

Controllers in AngularJS serve two primary purposes:

1. Provide the data used for the view to bind to.
2. Contain the _primary_ code to respond to user events, such as when a user clicks on a button.

The above deserves repeating! So, do it!

#### Defining Controllers

>**Warning, chance of headache ahead...** There are two different syntaxes for controllers and a few different ways to define them despite the syntax you use. It's important for you to get a taste of each so that you won't be thrown as you google. There are a couple of AngularJS styleguides referenced at the end of this lesson that discuss the authors' recommendations on which to use.

Without further ado, let's define our first AngularJS controller and register it with our module:

```js

  // When only the name of the module is passed in,
  // the 'module()' method returns the specified module.
  // We can then register our controller with our module
  // using the 'controller()' method.
  angular.module('myApp', [])
    .controller('MainController', function() {
      //code goes here
    });
```
>**Note:** Usually each controller will be defined in its own file - and the above approach allows for this. FYI, in this particular example, we could have chained the `controller()` method directly to the `angular.module('myApp', [])`

Even though the above pattern looks like we're passing in a callback function, the function we're providing actually defines our component and is going to be used as a constructor function, so we typically name the controller using upper-camel-casing.

There are two ways that Angular instantiates controllers:

1. Using the routing system (later in the week).
2. When Angular parses the HTML and sees an `ng-controller` directive.

We can use a `ng-controller` directive for any section of HTML we want, as long as it's within our `ng-app`. In our example, we intend for our `MainController` controller to be available to all the HTML inside of our `<body>` tag, so that's where we're going to put the `ng-controller` directive:

```html
<body class="container" ng-controller="MainController as ctrl">
```

Using a controller this way is known as the _controller as_ syntax.  Whenever you see something like `ng-controller="MainController as ctrl"`, we're using the _controller as_ syntax.  Later, you will see the `$scope` syntax.

`ctrl` is the name we have given our controller to be referred to in all of our views' bindings.  Think of it as the variable pointing to our controller **in the view**. You can call it anything and usually we will call it `vm`, but we won't this time because I don't want you to confuse it with the `vm` you are about to see.

Let's see how we can use our controller to provide a `title` data property that our `<h1>` can bind to.

First, create the data property in our controller:

```js
...
.controller('MainController', function() {
  // Set a variable to the controller instance - "this" would change in callbacks...
  var vm = this;

   // Data and methods "attached" to vm are
   // accessible to bind to in the view.
  vm.title = 'AngularJS, the Superheroic MVW Framework';

});
```

Then, bind the `title` to our view:

```html
<body class="container" ng-controller="MainController as ctrl">
  <h1>{{ctrl.title}}</h1>

</body>
```

Cool!

>**Note:** Since the function we use to define controllers are treated as constructor functions, the code in the function will execute only once. Therefore, be sure to code your controllers to initialize data the view needs and define the methods that will run in response to user actions.

### Directives

#### What are Directives?

Directives teach HTML new tricks.

Directives are "markers" in our HTML that can attach behavior and transform DOM elements. Without directives, Angular just sits there and won't do anything!

**When the DOM is fully loaded, AngularJS's HTML compiler will scan all of the elements contained within the ________ directive?**

#### More Examples

Let's see a couple of more examples of directives. First up, the granddaddy of them all, `ng-repeat`. Here's how we can render an array of names.

In _MainController.js_:

```js
...
  vm.title = 'AngularJS, the Superheroic MVW Framework';
  vm.names = ['Nicole', 'Layne', 'Winford', 'Mattie', 'Lawanda'];
...
```

Add this HTML to _index.html_:

```html
...
  <label>Color: <input type="text" class="form-control" ng-model="ctrl.crazyColor"></label>
  <div>
    Names:
    <ul>
      <li ng-repeat="name in ctrl.names">{{name}}</li>
    </ul>
  </div>
...
```

Nice!

Who hates hooking up event listeners for the _click_ event? Me too. Angular makes it easy:

```js
...
      vm.names = ['Nicole', 'Layne', 'Winford', 'Mattie', 'Lawanda'];
      // new code below
      vm.extraNames = ['Diane', 'Santos', 'Liz', 'Gwyn'];

      vm.addName = function() {
        if (vm.extraNames.length) vm.names.push(vm.extraNames.shift());
      };
...
```

Add this HTML below the existing `<ul>`:

```html
...
  <div>
    Names:
    <ul>
      <li ng-repeat="name in ctrl.names">{{name}}</li>
    </ul>
    
    <!-- new html below -->
    Extra Names:
    <ul>
      <li ng-repeat="name in ctrl.extraNames">{{name}}</li>
    </ul>
    <button class="btn btn-success" ng-click="ctrl.addName()">Add Name</button>
  </div>
...
```

**Let review what's going on here.**

Want more? Let's say we want to toggle the display of the names.

**? Angular apps are driven by __________?**

We will need to create a data property to represent if we want the names shown, or not:

```js
...
      // toggle boolean to show/hide names
      vm.showNames = true;

      vm.addName = function() {
...
```

We can use the `ng-show`/`ng-hide` directives to show/hide elements based upon a truthy/falsey expression:

```html
...
  <label>Color: <input type="text" class="form-control" ng-model="ctrl.crazyColor"></label>

  <!-- name list to show/hide -->
  <div ng-show="ctrl.showNames">
    Names:
    <ul>
...
```

If we refresh our page, we should see that our name list is still showing because we initialized `vm.showNames` equal to `true`. Initializing it to `false` would result in the list being hidden at start up.

All we need now is a toggle button outside of the `<div>` holding the names to toggle `vm.showNames`. Because this is a simple operation, we can put the code right in the `ng-click`.

```html
...
  </div>

  <!-- button to hide/show name list -->
  <br>
  <button class="btn btn-info" ng-click="ctrl.showNames = !ctrl.showNames">Show/Hide Names</button>

</body>
```

Cool! However, putting logic in the view instead of the controller is frowned upon. In this case, the code only has an impact on the UI, so it's acceptable.

>**Note:** The way we've used custom attributes is not valid HTML5. If you work for a shop that insists on 100% compliant HTML, simply preface all Angular directives with `data-`, for example, `data-ng-model`.

#### Practice (5 mins)

A nice improvement would be to update the text in the button to just say "Show Names" or "Hide Names" instead of "Show/Hide Names".

Pair up and make this happen!

Hint: Our friend the ternary operator can come in handy here.

**?: What if we wanted to show a different button entirely?**

#### Directives as Attributes & Elements

So far, we've seen directives being used as attributes in our HTML. However, another possibility is to use directives to create custom element tags!

For example, you could write your own directives to for a game and use them like this:

```html
<body>
  <game>
    <score player="1"></score>
    <score player="2"></score>
    <game-board></game-board>
  </game>
</body>
```

Talk about semantic HTML and teaching HTML new tricks!

#### Directives - Wrap Up

**?: What does AngularJS do if there are no directives in the HTML?**

**?: What directive do we use to create a two-way binding between an `<input>` in the view and a data property in the controller?**

So far you've seen a few directives, however, there are over 50 included in the core of Angular.

You'll see some more directives, as well as learn about some of the powerful options available to us with directives like `ng-repeat` in future lessons!

### Services (including `factory`, `service`, `value`, `constant` & `provider`)

Services allow us to share data and/or behavior between controllers, directives, filters and even other services. This keeps our code more DRY.

They provide a way to organize related program logic and data together - in OOP, this is known as _encapsulation_.

Services should be used to hold the bulk of your application's logic and data, thus keeping controllers lean and focused on what they are responsible for.

There's another key reason to use services - they are more efficient because...

Unlike controllers, which are instantiated and destroyed as the HTML they are attached come into and out of view via routing (or in other ways such as with the `ng-include` directive), services are created once and persist for the life of the application.
<br>**?: In programming, what do we call an object that is designed to be instantiated only once?**

The functionality and data packaged in services are provided to other components, e.g., controllers, using a process known as **dependency injection**. Dependency injection is really cool and we will talk about it more in a bit when we look at different ways to write controllers.

There are a few different methods for creating services, the most popular being the `factory` method. The `service` method does pretty much do the same thing, but is instantiated differently (a _service_ is instantiated as a constructor function, whereas a _factory_ is written to return an object (most common), function, or scalar value directly).

We will look at writing services in a future lesson.

### Filters

Filters are used to transform data. They take data in, process it, and return it.

They are very flexible and can be used for formatting text in a view, such as making it all uppercase, or used to filter and sort an array of items.

Angular comes with several [built-in filters](https://docs.angularjs.org/api/ng/filter), but we can easily create custom filters as well.

Let's see how we can use Angular's filters to display the names in upper and lowercase:

```html
...
    <ul>
      <li ng-repeat="name in ctrl.names">{{name | uppercase}}</li>
    </ul>
    Extra Names:
    <ul>
      <li ng-repeat="name in ctrl.extraNames">{{name | lowercase}}</li>
    </ul>
...
```

As you can see, all we need to do is separate the expression and the name of the filter with a pipe character.

We'll cover more about filters in a future lesson.

### The Many Faces of Controllers

#### In the beginning, Misko created `$scope`, and it was good...

Up until version 1.2, Angular had no _controller as_ syntax, just the `$scope` syntax.

Using this original syntax, we instantiate controllers in our views with the familiar `ng-controller` directive like this:

```html
<body class="container" ng-controller="MainController">
```

versus the _controller as_ approach we've already seen:

```html
<body class="container" ng-controller="MainController as ctrl">
```
Note the missing `as` option.

Accordingly, there is no namespace object (the `ctrl` identifier we defined after the `as`) in our view's bindings. For example,

This:

```html
<div ng-show="ctrl.showNames">
```

becomes this:

```html
<div ng-show="showNames">
```

Now, `$scope`, not `this`, becomes the glue between the view and controller.

To work with `$scope`, we have to inject it into the controller function like this:

```js
angular
  .module('myApp')
  .controller('MainController', function($scope) {
    $scope.title = 'AngularJS, the Superheroic MVW Framework';
  });
```

All model data and methods that you wanted accessible in the view, are now attached to `$scope` instead of `this` (or whatever variable you assigned `this` to, such as `vm`).

>**Note:** Most Angularians today are using the _controller as_ syntax for new development. However, there are a couple of methods only available on the `$scope` object, such as `$watch`, `$broadcast`, `$on` and `$apply`. If you find yourself needing to use these methods, you can still inject `$scope` even if you are using the _controller as_ approach.

#### Individual Practice (5 mins)

Convert our current app to use `$scope`.

#### Dependency Injection

So what's this with this "inject" stuff?

**Dependency Injection** is a software design pattern where an object/service needed by another piece of code is provided to that piece of code instead of it creating that object/service itself.

It's a powerful pattern because it allows us to modularize code and easily swap a service or object out for a different implementation. This really helps testing as well.

Angular provides a dependency injection feature that enables us to inject Angular built-in services, or services we create, as parameters in functions.

`console.log` out `$scope` in your `MainController` controller - that nice object was dependency injected by AngularJS!

Say that you needed to use angular's `$http` service for making AJAX requests - just inject that bad boy like this:

```js
angular
  .module('myApp')
  .controller('MainController', function($scope, $http) {
  
     // new code below
    $http.get('http://jsonplaceholder.typicode.com/users')
    .then(function(response) {
      response.data.forEach(function(user) {
        $scope.names.push(user.username);
      });
    });
  
  });
```

You can inject as many services as you need.

Angular's dependency injection magic works by converting the parameters names into an array of strings and uses the strings to lookup the services registered.

Get in the habit of putting reusable code in services and injecting those services where they are needed - dependency injection will make you a happy developer!

#### Minification

To increase loading speeds, production JavaScript is often "minified", a process also known as "uglifying".

Minification strips out whitespace, comments, and shortens variable and function identifiers to meaningless one or two character names.

This process will break Angular's dependency injection system if we write the controllers the way have so far.<br>**?: Any idea as to why minification will break Angular's dependency injection with the way we've written our controllers so far?**

#### What Do We Do?

So, you've seen controllers that use both the `$scope` and the _controller as_ syntaxes.

But the way we've written them so far is somewhat simplified to make them easier to learn, but they are not safe from minification.

There are two different ways to make our controller functions min-safe, and you will see both in use.

Additionally, we used an anonymous function for our controller function, we'll now look at using function declarations as it is considered a better practice.

#### Min-Safe Approach - `$inject` (Style Guide Recommended)

```js
...
  .controller('MainController', MainController);

  MainController.$inject = ['$scope', '$http'];

  function MainController ($scope, $http) {
  // controller code
  }
```

Here we are setting a `$inject` property with an array of dependencies. Angular will now use this list to know which dependencies to provide to the controller function.

This cures our minification problem because the dependencies listed in the array are strings, and because strings are data, they are never changed by minifiers.

However, it's important to ensure the order of the parameters in the array and the constructor function line up positionally.

#### Min-Safe Approach - Array Annotation (AngularJS Recommended)

There's lots of code out there that uses Array Annotation to make their Angular apps min-safe. Even Angular's docs do it this way:

```js
...
  .controller('MainController', ['$scope', '$http', MainController]);

  function MainController ($scope, $http) {
  }
```

Here we are passing an array as the second argument to our `controller()` method instead of a function.

With this method signature, the controller function, whether inline or declared, is always the last element in the array.

Again, be sure the arguments in the function are in the same order as they are in the array.

That wasn't too bad now, was it?

Here's a [gist](https://gist.github.com/jim-clark/a0e6a60e1eba0672b9cb) that shows all of the minification-safe flavors of the controller we used this lesson.

### Questions

Discuss with a pair for thee minutes:

- **Filters are used to _____________ data.**

- **What are the two primary responsibilities of a controller in Angular?**

- **Is it possible to have data and/or functions inside controllers that are NOT accessible to the view?**

- **When using Array Annotation to define a min-safe controller, is the actual controller function put inside or outside the array?**

- **What are the benefits of using Service components?**

- **What are some benefits that AngularJS provides to us when developing SPAs?**

## Exercise - Create a To Do App

#### Pair Up for this Excercise

#### Create a To Do app using the power of AngularJS.  Your app should be able to:

- Display a list of tasks.

- Display a "Done" button with each task.

- When the user clicks the "Done" button next to the task, that task should be removed from the list.

- Provide the ability for the user to add new tasks.

- **Hint**: Knowing which task to remove is important. You can actually pass the current object in a `ng-repeat` loop to a method, however, since we only need to know the position of the task in the array, check out the `$index` property available in the `ng-repeat` template. In this case, `$index` would make a great argument in a method call ;)

## References
- [Official AngularJS website](https://angularjs.org/)

- [John Papa's AngularJS Style Guide](https://github.com/johnpapa/angular-styleguide)
