import store from '@src/store'
import _ from 'lodash'
const mediaPx = [1200, 992, 768, 576];
const media = ['xl','lg','md','sm','xs']

/**
* @param：回调参数
 * @return:返回屏幕大小
* */
const resize = window.onresize
export default window.onresize = _.debounce(() => {
    // @ts-ignore
    resize && resize();

    let width = window.document.body.clientWidth || window.document.documentElement.clientWidth
    let pxNum = [...mediaPx,width];
    const sortArray = pxNum.sort((a,b) => b - a);
    const index = sortArray.indexOf(width);

    store.dispatch.global.setDevice({media: media[index]})
},300)

/**
 * @param:value
 * @type:lt gt eq
 * @tag:大于号 或者小于号左边
 * */
export function equalResize(value,type,tag){
    const index = media.indexOf(tag);
    if(type === 'lt'){
        const array = media.slice(0, index + 1);
        return array.includes(value)
    }
    if(type === 'gt'){
        const array = media.slice(index + 1 , media.length);
        return array.includes(value)
    }
    if(type === 'eq'){
        return media.includes(value)
    }
}
