export const  getDeepValue = (obj: any, path: string) => {
    if (!path || !obj){
        return null
    }
    if (!path.includes(".")){
        return obj[path]
    }
    for (let i = 0, props = path.split('.'), len = props.length; i < len; i++) {
        if (!obj) {
            return null
        }
        obj = obj[props[i]];
    }
    return obj;
}