'use strict';

import osia from '../lib';

osia.task('default', () => 
  osia.open('./file.txt')
    .then((files) => {
      console.log(files[0].contents.toString());
    })
);