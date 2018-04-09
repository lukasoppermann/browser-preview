var UI = require('sketch/ui')
var Settings = require('sketch/settings')

export default function(context) {
  var options = ['Chrome','Firefox','Opera','Safari']
  var selection = UI.getSelectionFromUser(
    "Select your preferred browser",
    options
  )

  var ok = selection[2]
  var value = options[selection[1]]
  if (ok) {
    Settings.setSettingForKey('browser-preview-browser', value)
  }
}
