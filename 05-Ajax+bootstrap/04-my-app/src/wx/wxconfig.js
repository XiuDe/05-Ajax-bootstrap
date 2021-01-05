import axios from 'axios';
import wx from 'weixin-js-sdk'

async function wxconfig(){
    let url = encodeURIComponent(window.location.href.split('#')[0])
    // aifoosen.applinzi.com
    await axios.get(`/jsapi?url=${url}`).then((result) => {
        console.log('jsapi接口下发的数据', result.data);
        wx.config({
            debug: true, 
            ...result.data,
            jsApiList: [
                'scanQRCode'
            ]
        });
    })
}

export default wxconfig
