let sketch = require('sketch')
let fs = require('@skpm/fs')

export default (artboard, options) => {
  // export file
  sketch.export(artboard, options)
  let file = options.output + "/" + encodeURIComponent(artboard.name()) + "@" + options.scales + "x." + options.formats
  let htmlFile = `${options.output}/${encodeURIComponent(artboard.name())}.html`
  let bgColor = '#ffffff'
  let align = artboard.name().split(':').pop().trim()
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
          max-width: 100vw;
          overflow-x: hidden;
          display: flex;
          justify-content: ${align === 'left' ? 'flex-start' : 'center'};
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
