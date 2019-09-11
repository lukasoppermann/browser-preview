var UI = require('sketch/ui')
var Settings = require('sketch/settings')

export default function(context) {
  let currentBrowser = Settings.settingForKey('browser-preview-browser') || 'Default'
  var options = ['Default', 'Safari', 'Google Chrome','Firefox','Opera']
  UI.getInputFromUser("Select your preferred browser", {
    type: UI.INPUT_TYPE.selection,
    possibleValues: options,
    initialValue: options.findIndex(element => element === currentBrowser)
    }, (err, value) => {
      if (err) {
        // most likely the user canceled the input
        return options.findIndex(element => element === currentBrowser)
      }
      Settings.setSettingForKey('browser-preview-browser', value)
    }
  )
  // var selection = UI.getSelectionFromUser(
  //   "Select your preferred browser",
  //   options,
  //   options.findIndex(element => element === currentBrowser)
  // )
  // console.log(selection)
  //
  // var ok = selection[2]
  // var value = options[selection[1]]
  // if (ok) {
  //   Settings.setSettingForKey('browser-preview-browser', value)
  // }
}
