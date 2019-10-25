create-component-x is a command-line tool that allows you to create a component based on a blueprint

Installation
--------------

```
npm i -g create-component-x
```

Usage
--------------

#### Create a blueprint

Blueprint is a folder with component's structure. Use `$compName$` as a placeholder for component name in filenames and inside the code.

Example of [blueprint folder](https://github.com/jarskii/create-component-x/tree/master/examples/blueprint):

```
blueprint
│
│───src
│   │–––$compName$.js
│   └───$compName$.scss
│
│──tests
│   └───$compName$-test.js
│
│–––README.md
└───package.json
```

Example of component's blueprint:


```javascript
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import cls from 'classnames';
import styles from './$compName$.scss';

class $compName$ extends PureComponent {
  static propTypes = {};
  static defaultProps = {};
  render() {
    return (
      <div className={styles.$compName$}>
        $compName$
      </div>
    );
  }
}

export default $compName$;
```

   

#### Use the blueprint

Go to the blueprint folder and add it to the storage for further use:

    c-c use

#### Create a component

To create a component go to the target directory and run:

    c-c create
    
Then enter component's name and select a blueprint from the list. Component is created!


Options
--------------

Custom pattern for placeholder could be used:
    
    c-c use --pat="$comp$"