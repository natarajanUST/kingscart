// Anything exported from this file is importable by other in-browser modules.
import "./global.css?modules=false";

export function publicApiFunction() {}

export function getCopyrightText() {
  return "Copyright " + new Date().getFullYear() + " Kings Cart";
}