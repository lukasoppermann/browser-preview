let sketch = require('sketch')
import * as util from './sketch-utils'

export default (artboard, options) => {
  // export file
  sketch.export(artboard, options)
  let file = options.output + "/" + artboard.name() + "@" + options.scales + "x." + options.formats
  let htmlFile = `${options.output}/${artboard.name()}.html`
  // create html
  let html = `<!DOCTYPE html>
  <html>
    <head>
      <title>${artboard.name()}</title>
      <style type="text/css">
        img{
          margin-left: 50%;
          transform: translateX(-50%);
          max-width: calc(100% / ${options.scales})px;
          height: auto;
        }
      </style>
    </head>
    <body>
      <img src="${file}" alt="${artboard.name()}" />
    </body>
  </html>`
  // create file
  util.runCommand('/bin/echo', ["html", ">>", "/tmp/new.html"])
  // return file
  return htmlFile
}
