let sketch = require('sketch')
let fs = require('@skpm/fs')

export default (artboard, options) => {
  // export file
  sketch.export(artboard, options)
  let file = options.output + "/" + artboard.name() + "@" + options.scales + "x." + options.formats
  let htmlFile = `${options.output}/${artboard.name()}.html`
  let bgColor = '#ffffff'
  if (artboard.hasBackgroundColor() === 1) {
    let colorObj = artboard.backgroundColor()
    bgColor = `rgba(${255*colorObj.red()},${255*colorObj.green()},${255*colorObj.blue()},${colorObj.alpha()})`
  }

  // create html
  let html = `<!DOCTYPE html>
  <html>
    <head>
      <title>${artboard.name()}</title>
      <style type="text/css">
        html, body{
          margin: 0;
          background: ${bgColor};
        }
        .flex{
          width: 100vw;
          display: flex;
          justify-content: center;
        }
        img{
          position: relative;
          width: ${artboard.bounds().size.width}px;
          height: ${artboard.bounds().size.height}px;
        }
      </style>
    </head>
    <body>
      <div class="flex">
        <img src="${file}" alt="${artboard.name()}" /
      </div>
    </body>
  </html>`
  // create file
  fs.writeFileSync(htmlFile, html)
  // return file
  return htmlFile
}
