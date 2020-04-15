# @alitajs/native

## 支持配置的插件

`camera`, `device`, `dialogs`, `file`, `geolocation`, `inappbrowser`, `media`, `media-capture`, `keyboard`, `secure-storage`, `network`, `screen-orientation`, `statusbar`, `vibration`, `document-viewer`, `file-opener`, `fingerprint-aio`, `native-storage`, `qr-scanner`, `sqlite-storage`,

## 用法
`config/config.ts`
```
export default {
  appType: 'cordova',
  native: ['file', 'device', 'camera', 'qr-scanner'],   // 数组里的名字只能用上面的插件名
};
````
在项目根目录运行
```shell
alita native
```

## 各插件用法

### camera
相机组件，可用来拍照等

对应的 `cordova` 插件:
[cordova-plugin-camera](https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-camera/index.html)

`config.xml` 配置

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

用法
```js
import { Camera, CameraOptions } from '@ionic-native/camera';
const options: CameraOptions = {
  quality: 100,
  destinationType: Camera.DestinationType.FILE_URI,
  encodingType: Camera.EncodingType.JPEG,
  mediaType: Camera.MediaType.PICTURE
}
Camera.getPicture(options).then((imageData) => {
 // imageData is either a base64 encoded string or a file URI
 // If it's base64 (DATA_URL):
 let base64Image = 'data:image/jpeg;base64,' + imageData;
}, (err) => {
 // Handle error
});
```

### device
用于获取设备信息，比如 platform, uuid, version 等

对应的 `cordova` 插件:
[cordova-plugin-device](https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-device/index.html)

用法
```js
import { Device } from '@ionic-native/device';

...

console.log('Device UUID is: ' + Device.uuid);
```

### dialogs
弹窗组件

对应的 `cordova` 插件:
[cordova-plugin-dialogs](https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-dialogs/index.html)

用法
```js
import { Dialogs } from '@ionic-native/dialogs';
Dialogs.alert('Hello world')
  .then(() => console.log('Dialog dismissed'))
  .catch(e => console.log('Error displaying dialog', e));
```

### file
文件组件，用于读写原生文件系统

对应的 `cordova` 插件:
[cordova-plugin-file](https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-file/index.html)

用法
```typescript
import { File } from '@ionic-native/file';
File.checkDir(File.dataDirectory, 'mydir').then(_ => console.log('Directory exists')).catch(err =>
  console.log('Directory doesn't exist'));
```

### secure-storage
调原生方法加密保存数据

对应的 `cordova` 插件:
[cordova-plugin-secure-storage](https://github.com/Crypho/cordova-plugin-secure-storage)

`config.xml` 配置

```xml
<platform name="ios">
    <preference name="KeychainAccessibility" value="WhenUnlocked"/>
</platform>
```
支持的配置:

```
AfterFirstUnlock
AfterFirstUnlockThisDeviceOnly
WhenUnlocked (default)
WhenUnlockedThisDeviceOnly
WhenPasscodeSetThisDeviceOnly (this option is available only on iOS8 and later)
```

用法
```typescript
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';

SecureStorage.create('my_store_name')
  .then((storage: SecureStorageObject) => {

     storage.get('key')
       .then(
         data => console.log(data),
         error => console.log(error)
     );

     storage.set('key', 'value')
       .then(
        data => console.log(data),
         error => console.log(error)
     );

     storage.remove('key')
     .then(
         data => console.log(data),
         error => console.log(error)
     );

  });
```

### geolocation
获取当前位置组件

对应的 `cordova` 插件:
[cordova-plugin-geolocation](https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-geolocation/index.html)

- ios

```xml
<edit-config target="NSLocationWhenInUseUsageDescription" file="*-Info.plist" mode="merge">
    <string>need location access to find things nearby</string>
</edit-config>
```

用法
```typescript
import { Geolocation } from '@ionic-native/geolocation';

Geolocation.getCurrentPosition().then((resp) => {
 // resp.coords.latitude
 // resp.coords.longitude
}).catch((error) => {
  console.log('Error getting location', error);
});

let watch = Geolocation.watchPosition();
watch.subscribe((data) => {
 // data can be a set of coordinates, or an error (if an error occurred).
 // data.coords.latitude
 // data.coords.longitude
});
```

### inappbrowser
应用内浏览器组件

对应的 `cordova` 插件:
[cordova-plugin-inappbrowser](https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-inappbrowser/index.html)

```typescript
import { InAppBrowser } from '@ionic-native/in-app-browser';

const browser = InAppBrowser.create('https://ionicframework.com/');

browser.executeScript(...);

browser.insertCSS(...);
browser.on('loadstop').subscribe(event => {
   browser.insertCSS({ code: "body{color: red;" });
});

browser.close();
```

### media
音频播放、录制组件

对应的 `cordova` 插件:
[cordova-plugin-media](https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-media/index.html)

用法
```typescript
import { Media, MediaObject } from '@ionic-native/media';


// Create a Media instance.  Expects path to file or url as argument
// We can optionally pass a second argument to track the status of the media

const file: MediaObject = Media.create('file.mp3');

// to listen to plugin events:

file.onStatusUpdate.subscribe(status => console.log(status)); // fires when file status changes

file.onSuccess.subscribe(() => console.log('Action is successful'));

file.onError.subscribe(error => console.log('Error!', error));

// play the file
file.play();

// pause the file
file.pause();

// get current playback position
file.getCurrentPosition().then((position) => {
  console.log(position);
});

// get file duration
let duration = file.getDuration();
console.log(duration);

// skip to 10 seconds (expects int value in ms)
file.seekTo(10000);

// stop playing the file
file.stop();

// release the native audio resource
// Platform Quirks:
// iOS simply create a new instance and the old one will be overwritten
// Android you must call release() to destroy instances of media when you are done
file.release();



// Recording to a file
const file: MediaObject = Media.create('path/to/file.mp3');

file.startRecord();

file.stopRecord();
```

### media-capture
照片、音频、视频录制组件

对应的 `cordova` 插件:
[cordova-plugin-media-capture](https://github.com/apache/cordova-plugin-media-capture)

- ios 配置

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

用法
```typescript
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture';


let options: CaptureImageOptions = { limit: 3 }
MediaCapture.captureImage(options)
  .then(
    (data: MediaFile[]) => console.log(data),
    (err: CaptureError) => console.error(err)
  );
```

### keyboard
键盘插件，支持键盘弹起或隐藏，需要安装 ionic webview
- https://github.com/ionic-team/cordova-plugin-ionic-webview
- https://ionicframework.com/docs/wkwebview/

对应的 `cordova` 插件:
[cordova-plugin-ionic-keyboard](https://github.com/ionic-team/cordova-plugin-ionic-keyboard)

用法
```typescript
import { Keyboard } from '@ionic-native/keyboard';

Keyboard.show();

Keyboard.hide();
```

### network
网络连接监听插件，可以获取网络连接状态，连接变化

对应的 `cordova` 插件:
[cordova-plugin-network-information](https://github.com/apache/cordova-plugin-network-information)

用法
```typescript
import { Network } from '@ionic-native/network';

// watch network for a disconnection
let disconnectSubscription = Network.onDisconnect().subscribe(() => {
  console.log('network was disconnected :-(');
});

// stop disconnect watch
disconnectSubscription.unsubscribe();


// watch network for a connection
let connectSubscription = Network.onConnect().subscribe(() => {
  console.log('network connected!');
  // We just got a connection but we need to wait briefly
   // before we determine the connection type. Might need to wait.
  // prior to doing any api requests as well.
  setTimeout(() => {
    if (Network.type === 'wifi') {
      console.log('we got a wifi connection, woohoo!');
    }
  }, 3000);
});

// stop connect watch
connectSubscription.unsubscribe();
```

### screen-orientation
控制屏幕旋转

对应的 `cordova` 插件:
[cordova-plugin-screen-orientation](https://github.com/apache/cordova-plugin-screen-orientation)

用法
```typescript
import { ScreenOrientation } from '@ionic-native/screen-orientation';

// get current
console.log(ScreenOrientation.type); // logs the current orientation, example: 'landscape'

// set to landscape
ScreenOrientation.lock(ScreenOrientation.ORIENTATIONS.LANDSCAPE);

// allow user rotate
ScreenOrientation.unlock();

// detect orientation changes
ScreenOrientation.onChange().subscribe(
   () => {
       console.log("Orientation Changed");
   }
);
```

### statusbar
状态栏组件

对应的 `cordova` 插件:
[cordova-plugin-statusbar](https://github.com/apache/cordova-plugin-statusbar)

```typescript
import { StatusBar } from '@ionic-native/status-bar';

// let status bar overlay webview
StatusBar.overlaysWebView(true);

// set status bar to white
StatusBar.backgroundColorByHexString('#ffffff');
```

### vibration
震动控制

对应的 `cordova` 插件:
[cordova-plugin-vibration](https://github.com/apache/cordova-plugin-vibration)

用法
```typescript
import { Vibration } from '@ionic-native/vibration';

// Vibrate the device for a second
// Duration is ignored on iOS.
Vibration.vibrate(1000);

// Vibrate 2 seconds
// Pause for 1 second
// Vibrate for 2 seconds
// Patterns work on Android and Windows only
Vibration.vibrate([2000,1000,2000]);

// Stop any current vibrations immediately
// Works on Android and Windows only
Vibration.vibrate(0);
```

### file-opener
使用系统默认软件打开文件

对应的 `cordova` 插件:
[cordova-plugin-file-opener2](https://github.com/pwlin/cordova-plugin-file-opener2)

用法
```typescript
import { FileOpener } from '@ionic-native/file-opener';

FileOpener.open('path/to/file.pdf', 'application/pdf')
  .then(() => console.log('File is opened'))
  .catch(e => console.log('Error opening file', e));

FileOpener.showOpenWithDialog('path/to/file.pdf', 'application/pdf')
  .then(() => console.log('File is opened'))
  .catch(e => console.log('Error opening file', e));
```

### document-viewer
pdf 查看组件

对应的 `cordova` 插件:
[cordova-plugin-document-viewer](https://github.com/sitewaerts/cordova-plugin-document-viewer)

用法
```typescript
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer';

const options: DocumentViewerOptions = {
  title: 'My PDF'
}

DocumentViewer.viewDocument('assets/myFile.pdf', 'application/pdf', options)
```

### fingerprint-aio
生物识别组件

对应的 `cordova` 插件:
[cordova-plugin-fingerprint-aio](https://github.com/NiklasMerz/cordova-plugin-fingerprint-aio)

#### 配置

- iOS - 需要 XCode 9.2 及以上版本，Please set `<preference name="UseSwiftLanguageVersion" value="4.0" />`，在 config.xml 里设置 `<preference name="UseSwiftLanguageVersion" value="4.0" />`
- 如果使用 Face ID，在 info.plist 里添加 NSFaceIDUsageDescription

用法
```typescript
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';

FingerprintAIO.show({
    clientId: 'Fingerprint-Demo', //Android: Used for encryption. iOS: used for dialogue if no `localizedReason` is given.
    clientSecret: 'o7aoOMYUbyxaD23oFAnJ' //Necessary for Android encrpytion of keys. Use random secret key.
    disableBackup:true,  //Only for Android(optional)
    localizedFallbackTitle: 'Use Pin', //Only for iOS
    localizedReason: 'Please authenticate' //Only for iOS
})
.then((result: any) => console.log(result))
.catch((error: any) => console.log(error));
```

### native-storage
使用原生存储，`Sharedpreferences` in Android and `NSUserDefaults` in iOS.

对应的 `cordova` 插件:
[cordova-plugin-nativestorage](https://github.com/TheCocoaProject/cordova-plugin-nativestorage)

用法
```typescript
import { NativeStorage } from '@ionic-native/native-storage/ngx';

NativeStorage.setItem('myitem', {property: 'value', anotherProperty: 'anotherValue'})
  .then(
    () => console.log('Stored item!'),
    error => console.error('Error storing item', error)
  );

NativeStorage.getItem('myitem')
  .then(
    data => console.log(data),
    error => console.error(error)
  );
```

### qr-scanner
二维码识别组件

对应的 `cordova` 插件:
[cordova-plugin-qrscanner](https://github.com/bitpay/cordova-plugin-qrscanner)

用法
```typescript
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';

// Optionally request the permission early
QRScanner.prepare()
  .then((status: QRScannerStatus) => {
     if (status.authorized) {
       // camera permission was granted


       // start scanning
       let scanSub = QRScanner.scan().subscribe((text: string) => {
         console.log('Scanned something', text);

         QRScanner.hide(); // hide camera preview
         scanSub.unsubscribe(); // stop scanning
       });

     } else if (status.denied) {
       // camera permission was permanently denied
       // you must use QRScanner.openSettings() method to guide the user to the settings page
       // then they can grant the permission from there
     } else {
       // permission was denied, but not permanently. You can ask for permission again at a later time.
     }
  })
  .catch((e: any) => console.log('Error is', e));

```

### sqlite-storage
sqlite 数据库插件

对应的 `cordova` 插件:
[cordova-sqlite-storage](https://github.com/litehelpers/Cordova-sqlite-storage)

用法
```typescript
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

SQLite.create({
  name: 'data.db',
  location: 'default'
})
  .then((db: SQLiteObject) => {


    db.executeSql('create table danceMoves(name VARCHAR(32))', [])
      .then(() => console.log('Executed SQL'))
      .catch(e => console.log(e));


  })
  .catch(e => console.log(e));
```
