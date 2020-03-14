const BrowserWindow = require('sketch-module-web-view');
const sketch = require('sketch');

const Settings = sketch.Settings;
const UI = sketch.UI;

const settingsKeys = {
    BROWSERPREFERENCE: 'browserPreference',
    SOUNDPREFERENCE: 'soundPreference'
};

export default function (context) {
    const options = {
        identifier: 'browserPreviewSettings',
        width: 320,
        height: 260,
        show: false,
        resizable: false,
        title: 'Browser Preview - Settings',
        minimizable: false,
        maximizable: false,
        alwaysOnTop: false,
        devTools: false,
        center: true,
        backgroundColor: '#ececec',
        hidesOnDeactive: false
    };

    let browserWindow = new BrowserWindow(options);

    browserWindow.once('ready-to-show', () => {
        browserWindow.show();
    });

    const webContents = browserWindow.webContents;

    webContents.on('did-start-loading', () => {
        let defaultSettings = JSON.stringify(getDefaultSettings());

        browserWindow.webContents
            .executeJavaScript(
                "window.settings =" + defaultSettings + "; populateSettings();"
            ).then(res => console.info(res))
            .catch(err => console.error(err));
    });

    webContents.on('updateSettings', data => {
        setSettings(data);
        browserWindow.close();
    });

    browserWindow.on('closed', () => {
        browserWindow = null;
    });

    browserWindow.loadURL(require('../resources/settingsView.html'));
}

function getSettings() {
    let obj = {};
    let isUndefined = true;

    Object.keys(settingsKeys).forEach(key => {
        obj[settingsKeys[key]] = Settings.settingForKey(settingsKeys[key]);
        isUndefined = obj[settingsKeys[key]] === undefined;
    });

    return {
        data: obj,
        isUndefined: isUndefined
    };
}

function setSettings(data) {
    Object.keys(data).forEach(key => {
        Settings.setSettingForKey(key, data[key]);
    });
}

export function getDefaultSettings() {
    const currentSettings = getSettings();

    if (currentSettings.isUndefined) {
        let obj = {};
        (obj[settingsKeys.BROWSERPREFERENCE] = 'safari'),
        (obj[settingsKeys.SOUNDPREFERENCE] = false);
        setSettings(obj);
        return obj;
    } else {
        return currentSettings.data;
    }
}
