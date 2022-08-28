-  **What is the difference between Component and PureComponent? give an
example where it might break my app.**

	- **Answer**: They are the same but PureComponents is better in terms of performance, it compares props and state then it will update the component based on that.

- **Context + ShouldComponentUpdate might be dangerous. Can think of why is that?**

- -  *Answer**:  When you update the context, other component will not receive this update, because the other component will not detect a change in props then shouldComponentUpdate will return false, instead components should receive context only once (it should be immutable)

- **Describe 3 ways to pass information from a component to its PARENT.**

- -  *Answer**:
	1. Passing a functions as a prop which is called lift the state up
	2. Using a state management library.
	3. Using React context api

- **Give 2 ways to prevent components from re-rendering.**

	- **Answer**: 
		1. Using react hooks like `useMemo` and `useCallback`
		2. Using `React.memo`

- **What is a fragment and why do we need it? Give an example where it might
break my app.**

	- **Answer**: React requires a wrapper for elements inside the component, before we were using `div` for that but now we can use fragment that will allows to us to use elements without wrapping them with extra element.

	There is two way of using it, we can import it directly from react like `<Fragment></Fragment`> and we can use it like this `<></>` 

- **Give 3 examples of the HOC pattern.**

- - **Answer:**
	1. React.memo
	2. Authentication
	3. react-redux


- **what is the difference in handling exceptions in promises, callbacks and
async...await.**

- - **Answer:**
	1.  Promises: we can use `.catch(error => console.log(error))`
	2. Callbacks: `try...catch` but we need to check the parameter if it is a function or not.
	3. async / await: we can use `try...catch`

- **How many arguments does setState take and why is it async.**

- - **Answer:** it can take up to 2 setState callback and the other one is the props, it is async in terms of the performance, because setState causes re-rendering and making it synchronous can lead to a bad user experience in the brwoser.

- **List the steps needed to migrate a Class to Function Component.**

- - **Answer: **
	1. First we need to create a functional component
	2. Remove the constructor
	3. remove render function
	4. check `this.state` and convert all state related things to `useState`
	5. convert methods to arrow functions
	6. check lifecycle functions like compentDidMount or componentDidUpdate and change them to `useEffect`

- **List a few ways styles can be used with components.**

- - **Answer:**
	1.  Normal CSS / Inline
	2. SCSS
	3. Styled Components
	4. CSS Modules

- **How to render an HTML string coming from the server**

	**Answer:** using `dangerouslySetInnerHTML `


