/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

'use strict';

/** @type {?function(?function())} */
let whenReady = window['HTMLImports'] && window['HTMLImports']['whenReady'] || null;

/** @const {Promise<void>} */
const readyPromise = new Promise((resolve) => {
  requestAnimationFrame(() => {
    if (whenReady) {
      whenReady(resolve)
    } else if (document.readyState === 'complete') {
      resolve();
    } else {
      document.addEventListener('readystatechange', () => {
        if (document.readyState === 'complete') {
          resolve();
        }
      });
    }
  });
});

/**
 * @param {?function()} callback
 */
export default function documentWait(callback) {
  readyPromise.then(function(){ callback && callback(); });
}