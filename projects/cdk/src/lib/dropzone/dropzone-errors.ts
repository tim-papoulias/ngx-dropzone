/**
 * Returns an exception to be thrown when creating a dropzone
 * without a FileInputDirective child.
 */
export function getMissingControlError() {
  return Error('The `ngx-dropzone` component requires a file input control child.');
}
