<template>
  <div class="home">
    <img class="home-top" src="../assets/img/home_top.png" alt="">
    <van-row class="home-info">
      <van-col span="10" offset="1">
        <van-image
          round
          width="50px"
          height="50px" 
          class="photo"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
        <van-image
          round
          width="50px"
          height="50px" 
          class="photo margin-left-back"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
      </van-col>
      <van-col span="7" offset="5" class="text-center">
        <div class="fs-14">补个妆与你相见</div>
        <div class="fs-20 text-bold">
          2352
          <span class="fs-14">天</span>
        </div>
      </van-col>
    </van-row>

    <van-row>
      <van-col span="10" offset="1">
        <div class="cfy flex align-start justify-center flex-direction padding-lr color-fff fs-14">
          <div><span class="fs-20 bold">8</span>个</div>
          <div>纪念品</div>
        </div>
      </van-col>
      <van-col span="10" offset="2">
        <div class="cfy list flex align-start justify-center flex-direction padding-lr color-fff fs-14">
          <div><span class="fs-20 bold">22</span>个</div>
          <div>愿望清单</div>
        </div>
      </van-col>
    </van-row>

    <van-steps 
    direction="vertical" 
    :active="0" 
    active-icon="like" 
    inactive-icon="like-o" 
    active-color="#fe7e88" 
    class="text-left">
      <van-step>
        <h3>补个妆与你遇见已经2352</h3>
        <van-grid :border="false" :column-num="3" :square="true">
          <van-grid-item>
            <van-image src="https://img.yzcdn.cn/vant/cat.jpeg" />
          </van-grid-item>
          <van-grid-item>
            <van-image src="https://img.yzcdn.cn/vant/cat.jpeg" />
          </van-grid-item>
          <van-grid-item>
            <van-image src="https://img.yzcdn.cn/vant/cat.jpeg" />
          </van-grid-item>
        </van-grid>
      </van-step>
      <van-step>
        <div class="padding bg-blue color-fff round">
          补个妆与你相见~~~
        </div>
      </van-step>
    </van-steps>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  
}
</script>
<style>
  .home-top{
    width:100%;
  }
  .home-info{
    margin-top: -50px;
    position: relative;
    z-index: 1;
  }
  .photo{
    border:2px solid #FFF;
    box-shadow: 0 2px 8px 1px rgba(0, 0, 0, 0.2) 
  }
  .cfy{
    height: 80px;
    background:url(../assets/img/home_bg1.png) no-repeat center center / 100% 100%;
  }
  .cfy.list{
    background-image: url(../assets/img/home_bg2.png); 
  }
  .cfy span{
    font-weight: bold;
  }
  
</style>
