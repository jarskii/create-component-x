import React, { PureComponent } from 'react';

import styles from './$compName$.scss';

class $compName$ extends PureComponent {
  static propTypes = {};
  static defaultProps = {};

  constructor(props, ctx) {
    super(props, ctx);
  }

  render() {
    return (
      <div className={styles['$compName$']}>
        $compName$
      </div>
    )
  }
}

export default $compName$;
