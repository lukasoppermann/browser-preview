var UI = require('sketch/ui')
var Settings = require('sketch/settings')

export default function(context) {
  let currentBrowser = Settings.settingForKey('browser-preview-browser') || 'Safari'
  var options = ['Safari', 'Google Chrome','Firefox','Opera']
  var selection = UI.getSelectionFromUser(
    "Select your preferred browser",
    options,
    options.findIndex(element => element === currentBrowser)
  )

  var ok = selection[2]
  var value = options[selection[1]]
  if (ok) {
    Settings.setSettingForKey('browser-preview-browser', value)
  }
}
