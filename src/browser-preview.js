import * as util from './sketch-utils'
import createPreview from './create-preview'

var Settings = require('sketch/settings')
var sketch = require('sketch')

export default function(context) {
  // export options
  const options = { 
    scales: '2', 
    formats: 'png',
    output: '/tmp',
    overwriting: true
  }
  let browser = Settings.settingForKey('browser-preview-browser') || 'Safari'
  // get sketch document
  const document = sketch.getSelectedDocument()
  // get selected page
  const page = document.selectedPage
  
  // if no artboard selected
  if (context.selection.length == 0) {
    context.document.showMessage('⚠️ Please select an artboard.');
    return;
  }
  
  if( context.selection.length >= 1 ){
    const artboard = context.selection.firstObject();
    if( artboard && artboard.isKindOfClass(MSArtboardGroup) ){
      // show message
      context.document.showMessage(`Creating preview for "${artboard.name()}" in ${browser}`)
      // create export file directory
      let previewFile = createPreview(artboard, options)
      // play sound
      util.runCommand("/usr/bin/afplay", ["/System/Library/Sounds/Glass.aiff"])
      // open export in browser
      util.runCommand('/usr/bin/open', ["-a", browser, previewFile])
    }
    return;
  }
}
