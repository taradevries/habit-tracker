# habit-tracker
This is a demo app that I built for the front-end unit testing workshop on 3/Aug/2022. This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Unit testing examples

### Habit.test.tsx
This test suite shows basic examples of how to use React Testing Library to render a component, interact with it using @testing-library/user-event, and assert on its behavior. It also introduces the simplest kind of mock, which is a function to be used as a callback.

`toBeChecked()` is an example of a Testing Library assertion that, while possible to recreate using other means (an example is shown in comments), offers more useful information in the case of a failure. 

Check out the [@testing-library/jest-dom README](https://github.com/testing-library/jest-dom) for the full list of helper assertions.

### HabitList.test.tsx
This test suite shows an example of using [faker-js](https://fakerjs.dev/guide/) to generate test data. It also demonstrates how to use `within()` to query a particular tree within the container.

### HabitTracker.test.tsx
This test suite shows an example of using [test.each()](https://jestjs.io/docs/api#testeachtablename-fn-timeout). This particular example is using an array of arrays, but depending on the complexity of your test case inputs, an array of objects may be friendlier to read. The example also demonstrates how we can use the test case title itself as an input in order to make the purpose of the test clear.

This suite also contains a more complex example of mocking, namely that of a named import. Note that because each mock is for a named import, a [spy](https://jestjs.io/docs/jest-object#jestspyonobject-methodname) can just as easily be used. 

The setup I've used in this test suite allows for a default mock to be used, which is reset in between test cases. To override the mock's implementation, the mocked value is spread and then the specific value I want to change for the given test is provided. A setup like this reduces how much code is in the test that doesn't directly pertain to the subject/behavior under test.

### habits.test.ts
This test suite is one of two examples of unit testing a custom hook, making use of the [hooks testing library](https://react-hooks-testing-library.com/) provided by the maintainers of Testing Library. You can see how actions that result in mutated data must be wrapped in `act()`.

This suite also contains another example of using `test.each()`, wherein the inputs are used in the test title.

### DateContext.test.tsx
Last but not least, this test suite is the second example of unit testing a custom hook, this time with respect to React Context. Exposing a custom hook is a great way to encapusulate the context logic, and as it turns out, makes it easier to test because we can focus on just the behavior without writing custom rendering logic for the Context Provider/Consumer. 

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

To get test coverage information, use:
```
npm test -- --coverage --watchAll=false
```