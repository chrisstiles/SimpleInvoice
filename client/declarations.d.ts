declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.jpg';
declare module '*.png';
declare module '*.svg';

declare type DomTarget = EventTarget | React.RefObject<EventTarget>;
