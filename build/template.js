/**
 * Allow for syntax highlighting in template strings
 * E.g. via https://marketplace.visualstudio.com/items?itemName=bierner.lit-html
 * Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#raw_strings
 * @param {string[] | ArrayLike<string>} strings
 * @param {...any} values
 * @returns {string}
 */
export function html(strings, ...values) {
  return String.raw({ raw: strings }, ...values);
}

export function template(content) {
  return html`<!DOCTYPE html>
    <html lang="en">
      <head>
        <title>frontend.directory</title>
        <meta charset="UTF-8" />
        <style>
          /* */
        </style>
      </head>
      <body>
        ${content}
      </body>
    </html>`;
}
