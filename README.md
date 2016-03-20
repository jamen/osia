# Osia
> An elegant Promise-based tasking system.

Another task manager that is designed around `Promise` objects and aims to keep dependencies small, while still offering a powerful API to get work done.  It is inspired from Gulp, and even uses [vinyl files][vinyl] internally.

## Installation
**One time** CLI install:
```shell
$ npm install -g osia
```

**Per-project** library install:
```shell
$ npm install --save-dev osia
```

## Usage
Import the library:
```javascript
import osia from 'osia';
```

Basic CLI usage:
```
$ osia [...tasks]
```

See the [docs](docs) folder for more information on how to use Osia.

## Credits
| ![jamen][avatar] |
|:---:|
| [Jamen Marzonie][github] |

## License
MIT &copy; [Jamen Marzonie][github]

[avatar]: https://avatars.githubusercontent.com/u/6251703?v=3&s=125
[github]: https://github.com/jamen
[vinyl]: https://github.com/gulpjs/vinyl
