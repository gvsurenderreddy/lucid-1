# Lucid Contributions

First of all, thank you for contributing. It’s appreciated.

1. Clone the repo and install dependencies with `npm install`.
2. Make a GitHub issue before doing any significant amount of work. Make sure the core team approves your idea. This step is really important. If you skip this, your PR might be rejected.
3. Run `npm test` to lint and test, and `npm run dev` to see the docs. Don't commit before fixing all errors and warnings.
4. Ensure your changes work properly on the latest versions of Chrome, Firefox, Safari, and IE. Currently this step includes some manual testing.
5. Reference the issue's number in your commit. E.g.: "Did this #12".
6. Make a pull request.

## Process

- All PRs should at minimum have a label [semver-major/minor/patch/none]. This helps identify what kind of version bump the PR represents.
- Branches should follow this convention (where 1234 is either a GitHub PR or an ANXR ticket):
  - feature/1234-added-something
  - quality/1234-refactored-something
  - bugfix/1234-fixed-something
  - release/2.0.0

## Component structure

Some of these conventions can be checked against a component by running the `common` tests. Here's an example of how to do that:

```javascript
import { common } from '../../util/generic-tests';

import MyNewComponent from './MyNewComponent';

describe('MyNewComponent', () => {
	common(MyNewComponent);

	// Other tests...
});
```

- Use `isX` or `hasX` props for boolean types even when it differs from native.
- Make sure all components allow `className` and `style` to be extended for consumer convenience.
- Use `onX` props for all event handlers.
  - Use `onVerbNoun` structure.
- Use `handleX` methods for event handlers.
- Handlers that are passing through to native handlers should include the `event` as the last argument.
- Every component that wraps around native controls should callback with all its props for performance reasons. This allows consumers to avoid creating functions inside their `render` blocks by attaching identifiers to components that can then be extracted at callback time.
  - When the callback event is fired, the last argument should be an object with at least `event` and `props`.
  - See [this article][perf] for a more in depth explanation.
  - There is a test within the `controls` function of "generic-tests" to help test this convention.
- If the component is a thin wrapper around a native control, be sure to pass through any extra props through to the native component.
- Stateless by default, uses the reducer pattern for stateful components. Don't use `setState` anywhere in our components.
- Prefer `span`s for root level component elements.

## Styling

- Css classes used for state, such as `.is-active`, should also be prefixed with the component name. E.g. Button should use the class `lucid-Button-is-active`.
- We have a naming convention for our props. Below is a list of examples that are valid. Please see the `variables.less` file for real world examples.

```
@type-propName
@type-subType-propName

@ComponentName-type-propName
@ComponentName-type-subType-propName
```

## Code styling

- We are `createClass` only, no ES6 classes.
- Folders should use kebab case e.g. "this-is-a-folder/and-a-javascript-file.js".
- Components should use start case e.g.:
  - "MyComponent"
  - "AnotherComponentHere.jsx"
- We hang the `_lucidIsPrivate` boolean off our component definitions to indicate that the component isn't intended for external consumption yet.

## Tests

- Components should have a `Component.spec.jsx` that lives alongside the component jsx file.
- Most tests should be shallow rendered using `enzyme`.
- If your tests need to be functional, i.e. using button clicks, then be sure to use the `describeWithDOM` util.

[perf]: https://medium.com/@esamatti/react-js-pure-render-performance-anti-pattern-fb88c101332f
