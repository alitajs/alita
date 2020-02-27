# @alitajs/native

## supported plugins in native config array

`camera`, `device`, `dialogs`, `file`, `geolocation`, `inappbrowser`, `media`, `media-capture`, `keyboard`, `secure-storage`, `network`, `screen-orientation`, `statusbar`, `vibration`, `document-viewer`, `file-opener`, `fingerprint-aio`, `native-storage`, `qr-scanner`, `sqlite-storage`,

## usage
`config/config.ts`
```
export default {
  appType: 'cordova',
  native: ['file', 'device', 'camera', 'qr-scanner'],   // add the plugin name you want to add to the array, you can find the plugin name above.
};
````
then run
```shell
alita native
```

## documents

### camera

[cordova-plugin-camera](https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-camera/index.html)

`config.xml` config

```xml
<edit-config target="NSCameraUsageDescription" file="*-Info.plist" mode="merge">
    <string>need camera access to take pictures</string>
</edit-config>

<edit-config target="NSPhotoLibraryUsageDescription" file="*-Info.plist" mode="merge">
    <string>need photo library access to get pictures from there</string>
</edit-config>

<edit-config target="NSLocationWhenInUseUsageDescription" file="*-Info.plist" mode="merge">
    <string>need location access to find things nearby</string>
</edit-config>

<edit-config target="NSPhotoLibraryAddUsageDescription" file="*-Info.plist" mode="merge">
    <string>need photo library access to save pictures there</string>
</edit-config>
```

### device

[cordova-plugin-device](https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-device/index.html)

### dialogs

[cordova-plugin-dialogs](https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-dialogs/index.html)

### file

[cordova-plugin-file](https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-file/index.html)

### secure-storage

[cordova-plugin-secure-storage](https://github.com/Crypho/cordova-plugin-secure-storage)

`config.xml` config

```xml
<platform name="ios">
    <preference name="KeychainAccessibility" value="WhenUnlocked"/>
</platform>
```

supported values:

```
AfterFirstUnlock
AfterFirstUnlockThisDeviceOnly
WhenUnlocked (default)
WhenUnlockedThisDeviceOnly
WhenPasscodeSetThisDeviceOnly (this option is available only on iOS8 and later)
```

### geolocation

[cordova-plugin-secure-geolocation](https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-geolocation/index.html)

- ios

```xml
<edit-config target="NSLocationWhenInUseUsageDescription" file="*-Info.plist" mode="merge">
    <string>need location access to find things nearby</string>
</edit-config>
```

### inappbrowser

[cordova-plugin-secure-inappbrowser](https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-inappbrowser/index.html)

### media

[cordova-plugin-secure-media](https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-media/index.html)

### media-capture

[cordova-plugin-media-capture](https://github.com/apache/cordova-plugin-media-capture)

- ios

```xml
<edit-config target="NSCameraUsageDescription" file="*-Info.plist" mode="merge">
    <string>need camera access to take pictures</string>
</edit-config>
<edit-config target="NSMicrophoneUsageDescription" file="*-Info.plist" mode="merge">
    <string>need microphone access to record sounds</string>
</edit-config>
<edit-config target="NSPhotoLibraryUsageDescription" file="*-Info.plist" mode="merge">
    <string>need to photo library access to get pictures from there</string>
</edit-config>
```

### keyboard

[cordova-plugin-ionic-keyboard](https://github.com/ionic-team/cordova-plugin-ionic-keyboard)

### network

[cordova-plugin-network-information](https://github.com/apache/cordova-plugin-network-information)

### screen-orientation

[cordova-plugin-screen-orientation](https://github.com/apache/cordova-plugin-screen-orientation)

### statusbar

[cordova-plugin-statusbar](https://github.com/apache/cordova-plugin-statusbar)

### vibration

[cordova-plugin-vibration](https://github.com/apache/cordova-plugin-vibration)

### file-opener

[cordova-plugin-file-opener2](https://github.com/pwlin/cordova-plugin-file-opener2)

### document-viewer

[cordova-plugin-document-viewer](https://github.com/sitewaerts/cordova-plugin-document-viewer)

### fingerprint-aio

[cordova-plugin-fingerprint-aio](https://github.com/NiklasMerz/cordova-plugin-fingerprint-aio)

#### config

- iOS - XCode 9.2 or higher required Please set `<preference name="UseSwiftLanguageVersion" value="4.0" />` in your config.xml
- if use face id, NSFaceIDUsageDescription need to be added in info.plist

### native-storage

[cordova-plugin-nativestorage](https://github.com/TheCocoaProject/cordova-plugin-nativestorage)

### qr-scanner

[cordova-plugin-qrscanner](https://github.com/bitpay/cordova-plugin-qrscanner)

### sqlite-storage

[cordova-sqlite-storage](https://github.com/litehelpers/Cordova-sqlite-storage)
