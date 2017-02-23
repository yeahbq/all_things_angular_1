# Intro to Angular

---

## Learning Objectives

- Describe why learning Angular is important
- Set up an Angular app and test that it works
- Build a very basic controller with fake data
- Render basic controller data in the view
- Bind basic data with a controller variable

---

## Why do we learn Angular?

- It's the most popular client-side MVC
- It makes building SPA apps with client-side templating easy
- 2-way data binding is awesome
- You can do a lot with very little code
- It's widely used in the industry AKA it'll get you a job

---

## Angular Features

- Client-side routes
    - Navigate through browser code just like with server routes
- 2-way data binding
    - Your HTML and CSS automatically update when you change a Javascript variable

---

## BEWARE: Angular Magic ahead

- Just like Rails magic, it's beatiful when it works, and frustrating when it doesn't
- The error messages aren't the best, but hundreds of thousands of people use it, so your solution is only a Google away.   

![Angular Magic](https://i.ytimg.com/vi/Ob7nx4BAJb0/hqdefault.jpg)

---

## Setup: Files and Directories

- This is the file setup you'll need for today's app
- Most Angular apps will have other folders we will cover later

```bash
intro_angular/
    index.html
    css/
        main.css
    js/
        app.js
        controllers/
            HomeController.js
```

---

## Setup: index.html

```html
<!DOCTYPE html>
<!-- App declaration -->
<html ng-app="IntroAngular">

<head>
    <title>Intro to Angular</title>
</head>

<!-- Controller declaration -->
<body ng-controller="HomeController as home">
    <div>Test: {{ 1+1 }}</div>
    <div>Test: {{ home.test }}</div>

    <!-- AngularJS CDN, must come first -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.5/angular.js"></script>

    <!-- Our Javascript files, app.js must be loaded first -->
    <script src="js/app.js"></script>
    <script src="js/controllers/HomeController.js"></script>
</body>

</html>

```

---

## Setup: app.js

```js
// App declaration
angular.module("IntroAngular", [])
```

---

## Setup: Controllers

```js
// js/controllers/HomeController.js

angular.module("IntroAngular")
    .controller("HomeController", HomeController)

function HomeController () {
    this.test = "Hello World"
}
```

---

## Troubleshooting Angular

- Angular requires a lot of setup
- You should have a working app right now, but don't worry if you don't, Angular is difficult to setup
- Run through the checklist on the next slide if your app isn't working. 

---

1. Is the Angular `<script>` tag included in `index.html`?
2. Is ng-app declared in `index.html`?
3. Is the app declared in `app.js`?
4. Does the `ng-app` declaration name match the `app.js` declaration name?
5. Is the app.js `<script>` tag included in `index.html`?
6. Is the `ng-controller` declared in `index.html`?
7. Is the controller `<script>` tag included in `index.html`?
8. Is the controller declared in its JS file?
9. Does the `ng-controller` declaration name match the declaration name in the controller JS file?

---

## Your turn

- Create a new variable called count in your HomeController and set it equal to an integer of your choice
- Print out `count + 1` to the screen

---

## Nested Controllers

- Controllers can be nested inside each other
- The scope rules are the same as for functions, you can use variables from outer controllers, but not inner ones
- Create a file at `js/controller/CarController.js` and include it with a `<script>` tag in `index.html`

---

## Nested Controllers: index.html

- Add the following to your `index.html` inside the HomeController

```html
<div ng-controller="CarController as car">
    <div>Home Test: {{ home.test }}</div>
    <div>Car Test: {{ car.test }}</div>
</div>
```

---

## Nested Controllers: CarController.js

```js
angular.module("IntroAngular")
    .controller("CarController", CarController)

function CarController () {
    this.test = "Goodbye World"
}
```

---

## Your turn 

- Create an object called car in your CarController with make and model properties
- Print the car's make and model onto the screen

---

## Your turn: Looking ahead

- Create an array of 3 car objects with makes and models
- Look up the `ng-repeat` directive and see if you can use it to print out all the cars to the screen
