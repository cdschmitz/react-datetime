/*
 * Prevent input from losing focus
 */
function handleMouseDown(callback) {
  return function(ev) {
    if (ev.button === 0) {
      ev.preventDefault();
      ev.stopPropagation();
      if (typeof callback === 'function') {
        return callback(ev);
      }
    }
  }
}

module.exports = {
  handleMouseDown: handleMouseDown
};
