## `timer(object)`
Create a timer that logs information.
 - `object` ([`System`](System.md), [`Task`](Task.md)): Task or object to time.

Returns `results` function.

### `results()`
Stops timer and prints results.

## Usage
```javascript
const results = timer(foo);
somethingAsync(() => {
  results();
});
```
