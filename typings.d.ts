declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';

interface Window {
    app: any;
    Settings: { [key: string]: any };
    StartParams: { [key: string]: any };
    Promise: PromiseConstructor;
}

declare var app: any;
declare var Settings: { [key: string]: any };
declare var StartParams: { [key: string]: any };

declare module 'join-path';
declare module 'classnames';
