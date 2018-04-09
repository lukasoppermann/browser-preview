import * as util from './sketch-utils'

var Settings = require('sketch/settings')
var sketch = require('sketch')

export default function(context) {
  // get sketch document
  const document = sketch.getSelectedDocument()
  // get selected page
  const page = document.selectedPage
  // get selected artboard
  if (context.selection.count() == 0) {
    context.document.showMessage('⚠️ Please select an artboard.');
    return;
  }

    let selectedArtboards = new Set(
      util.arrayFromNSArray(context.selection)
        .map(layer => util.getContainingArtboard(layer))
        .filter(layer => !!layer)
    );
    
    
    
    selectedArtboards.forEach(artboard => {
        context.document.showMessage(artboard.name);
    })
    
    
    util.setSelection(context, Array.from(selectedArtboards));


  // if (artboard.length === 0) {
  //   context.document.showMessage(Settings.settingForKey('browser-preview-browser'))
  // } else {
  //   context.document.showMessage(`${artboard.length} layers selected.`)
  //   context.document.showMessage(artboard)
  // }
}
