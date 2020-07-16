export * from 'umi';

type IPresetOrPlugin = string | [string, any];
type INativeItem =
  | 'sqlite-storage'
  | 'qr-scanner'
  | 'native-storage'
  | 'camera'
  | 'device'
  | 'dialogs'
  | 'file'
  | 'geolocation'
  | 'inappbrowser'
  | 'media'
  | 'media-capture'
  | 'keyboard'
  | 'secure-storage'
  | 'network'
  | 'screen-orientation'
  | 'fingerprint-aio'
  | 'statusbar'
  | 'vibration'
  | 'document-viewer'
  | 'file-opener';
export interface AlitaConfig {
  appType: 'pc' | 'h5' | 'cordova';
  proxy?: any;
  plugins?: IPresetOrPlugin[];
  mobileLayout?: boolean;
  keepalive?: string[];
  packageId?: string;
  displayName?: string;
  mainPath?: string;
  native?: INativeItem[];
  theme?: object;
}
