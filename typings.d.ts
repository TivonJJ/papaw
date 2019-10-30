declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';

interface Window {
    app: any;
    Settings: any;
    StartParams: any;
}

declare var app: any;
declare var Settings: any;
declare var StartParams: any;

declare module 'join-path';
declare module 'classnames';
