# Questions and Answers

1. **Explain how Object Oriented Programming works with a thorough understanding of the keyword this and the new keyword**

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

2. **What is the new class syntax and how to create instance methods, class methods?**

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

    const user = new User('Arfi Renaldi');
    user.getName(); // => 'Arfi Renaldi'
    ```

    For example, method `getName()` will return `this.name` value from parameter `User`.

3. **Give an example of how to implement inheritance in ES2015 using extends and super**
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

4. **Imagine refactoring an ES5 application to use ES2015, how would you go about it?**

    - change functions with arrow functions
    - change var with const/let

5. **Give an example of how you structure applications with design patterns using closure and modules**

    ```js
    function Form() {
        const [name, setName] = useState('');

        const handleChangeName = (event) => {
            setName(event.target.value)
        }

        return (
            <div>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={handleChangeName}
                />
                <p>{name}</p>
            </div>
        )
    }
    ```
    Example: we have input and display the input value. To get and set the input value in `name` variable, we are using react hooks that unconsciously using closure. `name` variable can be access in scope of `Form` component but not accesible for outside `Form` component. To change `name` value, we need setter `setName` that include in react hooks `useState`. Function `setName`, `handleChangeName` can access variable from outer scope in `Form` and their local variable, or with parameter that pass to the function. It makes more flexible to access more variable and keep safe when we get value and modify value to keep in outer scope `Form`.

6. **What are your preferred ways of testing your web application?**

    First, we need unit testing our code to verify that individual function work as expected. We can test our components and functions technically in React using `Jest` and `@testing-library/react`. It makes more comfortable to add new or change feature that we don't need to click testing in browser. We try to only expose methods and utilities that encourage you to write tests that closely resemble how your web pages are used. For example, we unit testing to assert and expecting that component, text, or image is displayed and existed.

    After that, we can end to end testing for better experience that behaves like a user to click or do some actions around the app and verify that it functions correctly. We can use `Cypress` that fits with `Jest` and `@testing-library/react`. End to end testing covers that can't be in unit testing, like for testing full flow from login to payment page, both frontend and backend.

7. **Which web server do you use? Why? Explain pros and cons of your choice**

8. **What is your preferred production deployment process?**
