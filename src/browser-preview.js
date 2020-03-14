import * as util from './sketch-utils'
import createPreview from './create-preview'

var Settings = require('sketch/settings')
var sketch = require('sketch')

export default function (context) {
    // export options
    const options = {
        scales: '2',
        formats: 'png',
        output: '/tmp',
        overwriting: true
    }
    let browser = Settings.settingForKey('browserPreference') || 'Default';
    let sound = Settings.settingForKey('soundPreference');
    console.log({
        browser,
        sound
    })
    // get sketch document
    const document = sketch.getSelectedDocument()
    // get selected page
    // const page = document.selectedPage
    const layers = document.selectedLayers
    let artboards = []
    let artboardIds = []
    // if no artboard selected
    if (layers.length === 0) {
        context.document.showMessage('⚠️ Please select at least one artboard or layer.');
        return;
    }

    if (layers.length >= 1) {
        artboards = layers.layers.map(layer => {
                // get parent Artboard if layer is not an artboard
                if (layer.getParentArtboard() !== undefined) {
                    layer = layer.getParentArtboard()
                }
                // return special artboard object
                if (layer.type === 'Artboard') {
                    return {
                        name: encodeURIComponent(layer.name),
                        id: layer.id,
                        backgroundColor: layer.background.color,
                        bounds: layer.frame,
                        object: layer
                    }
                }
            })
            .filter(artboard => {
                if (artboardIds.indexOf(artboard.id) > -1) {
                    return false
                }
                return artboardIds.push(artboard.id)
            })

        context.document.showMessage(`Creating preview for ${artboards.length} artboards.`)

        artboards.forEach(artboard => {
            let previewFile = createPreview(artboard, options)
            // play sound if the setting is enabled
            if (sound) {
                util.runCommand("/usr/bin/afplay", ["/System/Library/Sounds/Glass.aiff"])
            }
            // open export in browser
            if (browser === 'Default') {
                util.runCommand('/usr/bin/open', [previewFile])
            } else {
                util.runCommand('/usr/bin/open', ["-a", browser, previewFile])
            }
        });

        // if( layer.type === 'Artboard' ) {
        //   let previewFile = createPreview(artboard, options)
        //   // play sound
        //   util.runCommand("/usr/bin/afplay", ["/System/Library/Sounds/Glass.aiff"])
        //   // open export in browser
        //   if (browser === 'Default') {
        //     util.runCommand('/usr/bin/open', [previewFile])
        //   } else {
        //     util.runCommand('/usr/bin/open', ["-a", browser, previewFile])
        //   }
        // }
        // )

        // const artboard = context.selection.firstObject();
        // if( artboard && artboard.isKindOfClass(MSArtboardGroup) ){
        //   // show message
        //   context.document.showMessage(`Creating preview for "${artboard.name()}" in ${browser}`)
        //   // create export file directory
        //   let previewFile = createPreview(artboard, options)
        //   // play sound
        //   util.runCommand("/usr/bin/afplay", ["/System/Library/Sounds/Glass.aiff"])
        //   // open export in browser
        //   if (browser === 'Default') {
        //     util.runCommand('/usr/bin/open', [previewFile])
        //   } else {
        //     util.runCommand('/usr/bin/open', ["-a", browser, previewFile])
        //   }
        // }
        return;
    }
}
