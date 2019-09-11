let sketch = require('sketch')
let fs = require('@skpm/fs')

export default (artboard
  /* = {
    object: artboard,
    name: string
    backgroundColor: string,
    bounds: {
      width: px
      height: px
    }
  }*/
, options) => {
  // export file
  sketch.export(artboard.object, options)
  let file = options.output + "/" + artboard.name + "@" + options.scales + "x." + options.formats
  let htmlFile = `${options.output}/${artboard.name}.html`
  let align = artboard.name.split(':').pop().trim()

  // create html
  let html = `<!DOCTYPE html>
  <html>
    <head>
      <title>${artboard.name}</title>
      <style type="text/css">
        html, body{
          margin: 0;
          background: ${artboard.backgroundColor};
        }
        .flex{
          width: 100vw;
          max-width: 100vw;
          overflow-x: hidden;
          display: flex;
          justify-content: ${align === 'left' ? 'flex-start' : 'center'};
        }
        img{
          position: relative;
          width: ${artboard.bounds.width}px;
          height: ${artboard.bounds.height}px;
        }
      </style>
    </head>
    <body>
      <div class="flex">
        <img src="${file}" alt="${artboard.name}" /
      </div>
    </body>
  </html>`
  // create file
  fs.writeFileSync(htmlFile, html)
  // return file
  return htmlFile
}
