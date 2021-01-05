<template>
  <div class="cont padding">
        <img class="wish-tit" src="../assets/img/wish_tit.png" alt="">

        <div class="tags">
            <van-tag color="#fbea83"  text-color="#848484">科颜氏</van-tag>
            <van-tag color="#5c79bb" plain>小蜜提纯</van-tag>
            <van-tag color="#cff5f2" text-color="#848484">草莓、蜂蜜</van-tag>
            <van-tag color="#817590" plain>小甘菊</van-tag>
            <van-tag color="#fe5a76" text-color="#848484">
                SKII
            </van-tag>
        </div>

        <img @click="scanCode" class="btn" src="../assets/img/plus.png" alt="">
  </div>
</template>

<script>
export default {
    data(){
        return{
            taglist:[
                '科颜氏',
                '小蜜提纯',
                '草莓、蜂蜜',
                '小甘菊'
            ]
        }
    },
    methods: {
      scanCode(){
        this.$wx.scanQRCode({
          needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
          scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
          success: function (res) {
              console.log('scanCode():Res', res);
            var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
            console.log(result)
          }
        });
      }
    }
}
</script>

<style scoped>
    
    .cont{
        height: 80%;
        width: 90%;
        position: fixed;
        left: 5%;
        top: 5%;
        box-sizing: border-box;
        box-shadow: 0 0 20px 2px rgba(255,71,100,0.2);
        border-radius:10px;
        background: url(../assets/img/wish_tit_bg.png) no-repeat center -10px / 100% auto;
    }
    .cont::after{
        content: "";
        height:40px;
        width: 100%;
        position: absolute;
        bottom: -40px;
        left: 0;
        background: url(../assets/img/wish_cont_bg.png) no-repeat center top / 100% auto;
    }
    .wish-tit{
        width: 100%;
        margin: auto;
        display: block;
    }
    .tags{
        padding: 5px
    }
    .tags span{
        margin:10px;
        padding: 4px 15px;
    }
    .btn{
        height: 50px;
        width: 50px;
        display: block;
        position: absolute;
        bottom: -10px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1;
    }
</style>