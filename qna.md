1. Explain how Object Oriented Programming works with a thorough understanding of the keyword this and the new keyword
JavaScript is not a class-based object-oriented language. But it still has ways of using object oriented programming (OOP) with object literal that have constructors and prototypes.

`new` will call constructor class/function and bind the `this` variable as property to the new created object.

```js
function Name(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
};

const name = new Name('Arfi', 'Renaldi');
```

For the example, `name` directed to `Name` with `new` will call constructor with parameter `firstName` `'Arfi'` and `lastName` `'Renaldi'` to access property `this.firstName` and `this.lastName`.

2. What is the new class syntax and how to create instance methods, class methods?

JavaScript introduced the class keyword in ECMAScript 2015. It makes JavaScript seem like an OOP language. But it is just syntatic sugar over the existing prototyping technique. It continues its prototyping in the background but makes the outer body look like OOP.

Instance methods can access and modify instance data. Instance methods can call other instance methods, as well as any static method.

```js
class User {
  constructor(name) {
    this.name = name;
  }
  getName() {
    return this.name;
  }
}

const user = new User('Arfi renaldi');
user.getName(); // => 'Arfi Renaldi'
```

For example, method `getName()` will return `this.name` value from parameter `User`.

3. Give an example of how to implement inheritance in ES2015 using extends and super
```js
class Job {
  constructor(title) {
    this.title = title;
  }

  present() {
    return 'I am ' + this.title;
  }
}

class Programmer extends Job {
  constructor(title, stack) {
    super(title);
    this.stack = stack;
  }

  code() {
    return this.present() + '. I can code ' + this.stack;
  }
}

const job = new Job('Software Engineer');
console.log(job.present()); // => 'I am Software Engineer'

const programmer = new Programmer('Frontend Engineer', 'JavaScript');
console.log(programmer.present()); // => 'I am Frontend Engineer
console.log(programmer.code()); // => 'I am Frontend Engineer. I can code JavaScript'
```
`extend` make `Programmer` class inherting from the `Job` class. `Programmer` has a constructor, it needs to call `super()` to call the parent's constructor in `Job` and inherit property `title` and new property `stack`.

4. Imagine refactoring an ES5 application to use ES2015, how would you go about it?
5. Give an example of how you structure applications with design patterns using closure and module
6. What are your preferred ways of testing your web application?
7. Which web server do you use? Why? Explain pros and cons of your choice.
8. What is your preferred production deployment process?
