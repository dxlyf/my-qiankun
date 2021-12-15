declare module '*.module.less' {
    const classes: { [className: string]: string };
    export default classes;
}

interface Window {
    [key:string]:any
    __MICRO_APP_BASE_ROUTE__:string
    __MICRO_APP_ENVIRONMENT__:string
    __MICRO_APP_NAME__:string
}