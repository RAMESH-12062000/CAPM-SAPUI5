/**
 * Class for individual linter message. Consistent with CompileMessage and BuildMessage API.
 *
 * @class LinterMessage
 */
class LinterMessage {
  /**
   * Creates an instance of LinterMessage.
   * @param {string} message The message text
   * @param {any} element The source element causing the linter message with optional $location property
   * @param {string} [severity='Error'] Severity: Debug, Info, Warning, Error
   *
   * @memberOf LinterMessage
   */
  constructor(message, element, severity = 'Error') {
    this.message = message
    this.name = "LinterMessage"
    this.element = element
    this.severity = severity
  }

  get location() { return this.element?.$location }

  toString() {
    return `${this.location?.file ? LinterMessage._locationString(this.location) + ':' : ''} ${this.severity}: ${this.message}`
  }

  /**
   * Return gnu-style error string for location `loc`:
   *  - 'File:Line:Col' without `loc.end`
   *  - 'File:Line:StartCol-EndCol' if Line = start.line = end.line
   *  - 'File:StartLine.StartCol-EndLine.EndCol' otherwise
   *
   * Copied from cds-compiler/lib/base/location.js
   *
   * @param {CSN.Location|CSN.Location} location
   */
  static _locationString(loc) {
    if (!loc)
      return '<???>';
    if (!(loc instanceof Object))
      return loc;
    if (!loc.line) {
      return loc.file;
    }
    else if (!loc.endLine) {
      return (loc.col)
        ? `${loc.file}:${loc.line}:${loc.col}`
        : `${loc.file}:${loc.line}`;
    }

    return (loc.line === loc.endLine)
      ? `${loc.file}:${loc.line}:${loc.col}-${loc.endCol}`
      : `${loc.file}:${loc.line}.${loc.col}-${loc.endLine}.${loc.endCol}`;
  }
}
module.exports = LinterMessage