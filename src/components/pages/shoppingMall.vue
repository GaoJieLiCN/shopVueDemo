<template>
  <div>
    <div class="search-bar">
      <van-row class>
        <van-col span="3">
          <i class="icon iconfont icon-dingwei search-icon-style"></i>
        </van-col>
        <van-col span="16">
          <input type="text" class="search-input" />
        </van-col>
        <van-col span="5">
          <van-button size="mini">查找</van-button>
        </van-col>
      </van-row>
    </div>

    <!-- swipe -->
    <div class="swiper-area">
      <van-swipe :autoplay="3000" class="my-swipe">
        <van-swipe-item v-for="(banner,index) in bannerPicArray" :key="index">
          <img v-lazy="banner.image" width="100%" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- swipe -->

    <!-- type bar -->
    <div class="type-bar">
      <div v-for="(cate,index) in category" :key="index">
        <img v-lazy="cate.image" width="90%" />
        <span>{{cate.mallCategoryName}}</span>
      </div>
    </div>
    <!-- type bar -->

    <!--AD banner area-->
    <div class="ad-banner">
      <img v-lazy="adBanner.PICTURE_ADDRESS" width="100%" />
    </div>
    <!--AD banner area-->

    <!--Recommend goods area-->
    <div class="recommend-area">
      <div class="recommend-title">商品推荐</div>
      <div class="recommend-body">
        <!--swiper  :options="swiperOption" /加了会报错-->
        <swiper :options="swiperOption">
          <swiper-slide v-for=" (item ,index) in recommendGoods" :key="index">
            <div class="recommend-item">
              <img :src="item.image" width="80%" />
              <div>{{item.goodsName}}</div>
              <div>￥{{item.price | moneyFilter}} (￥{{item.mallPrice | moneyFilter}})</div>
            </div>
          </swiper-slide>
        </swiper>
        <!--swiper-->
      </div>
    </div>
    <!--Recommend goods area end-->

    <!--floor one area-->
    <div class="recommend-area">
      <div class="recommend-title">推荐商品</div>
      <div class="recommend-body">
        <floorComponents :floorData="floor1" :floorTitle="floorName.floor1"></floorComponents>
        <floorComponents :floorData="floor2" :floorTitle="floorName.floor2"></floorComponents>
        <floorComponents :floorData="floor3" :floorTitle="floorName.floor3"></floorComponents>
      </div>
    </div>
    <!--floor one area end-->

    <!--Hot Area-->
    <div class="hot-area">
      <div class="hot-title">热卖商品</div>
      <div class="hot-goods">
        <van-list>
            <van-row gutter="20">
                <van-col span="12" v-for="( item, index) in hotGoods" :key="index">
                    <goods-Info :goodsId="item.goodsId" :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price"></goods-Info>
                </van-col>
            </van-row>
        </van-list>
      </div>
    </div>
    <!--Hot Area end-->
  </div>
</template>

<script>
import axios from "axios";
import index from "../json/index"; //数据文件

import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";

import floorComponents from "../component/floorComponents"; //组件数据

import { toMoney } from "@/filter/money.js";
import goodsInfo from '../component/goodsInfoComponent'

import url from '@/serviceAPI.config.js'

export default {
  data() {
    return {
      swiperOption: {
        slidesPerView: 3
      },
      bannerPicArray: [],
      category: [],
      adBanner: "",
      recommendGoods: [],
      floor1: [],
      floor2: [], //楼层1的数据
      floor3: [], //楼层1的数据
      floorName: {},
      hotGoods:[] //热卖商品
    };
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
  },
  components: {
    Swiper,
    SwiperSlide,
    floorComponents,
    goodsInfo,
  },
  created() {

        // 提前刷新页面
        console.log(index);
        this.category = index.data.data.category;
        this.adBanner = index.data.data.advertesPicture; //获得广告图片
        this.bannerPicArray = index.data.data.slides; //轮播图片
        this.recommendGoods = index.data.data.recommend; //推荐商品
        this.floor1 = index.data.data.floor1; //楼层1数据
        this.floor2 = index.data.data.floor2; //楼层2数据
        this.floor3 = index.data.data.floor3; //楼层3数据
        this.floorName = index.data.data.floorName; //楼层名称
        this.hotGoods = index.data.data.hotGoods           //热卖商品


    axios({
      url: url.getShoppingMallInfo,
      method: "get"
    })
      .then(response => {
        console.log(response);
        if (response.status == 200) {
          this.category = response.data.data.category;
          this.adBanner = response.data.data.advertesPicture; //获得广告图片
          this.bannerPicArray = response.data.data.slides; //轮播图片
          this.recommendGoods = response.data.data.recommend; //推荐商品
          this.floor1 = response.data.data.floor1; //楼层1数据
          this.floor2 = response.data.data.floor2; //楼层2数据
          this.floor3 = response.data.data.floor3; //楼层3数据
          this.floorName = response.data.data.floorName; //楼层名称
          this.hotGoods = response.data.data.hotGoods           //热卖商品
        }
      })
      .catch(error => {
        console.log("错误,调取本地数据！");
        console.log(index);
        this.category = index.data.data.category;
        this.adBanner = index.data.data.advertesPicture; //获得广告图片
        this.bannerPicArray = index.data.data.slides; //轮播图片
        this.recommendGoods = index.data.data.recommend; //推荐商品
        this.floor1 = index.data.data.floor1; //楼层1数据
        this.floor2 = index.data.data.floor2; //楼层2数据
        this.floor3 = index.data.data.floor3; //楼层3数据
        this.floorName = index.data.data.floorName; //楼层名称
        this.hotGoods = index.data.data.hotGoods           //热卖商品
      });


  }
};
</script>

<style scoped>
.search-bar {
  height: 2.2rem;
  background-color: #e5017d;
  line-height: 2.2rem;
  overflow: hidden;
}

.search-icon-style {
  color: white;
  padding-top: 0.2rem;
  padding-left: 0.3rem;
}

.search-input {
  width: 100%;
  height: 1.3rem;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  border-bottom: 1px solid 1px !important ;
  background-color: #e5017d;
  color: #fff;
}

.swiper-area {
  width: 20rem;
  clear: both;
}

.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 1rem;
  height: 8rem;
  text-align: center;
  background-color: #39a9ed;
}

.type-bar {
  background-color: #fff;
  margin: 0 0.3rem 0.3rem 0.3rem;
  border-radius: 0.3rem;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.type-bar div {
  padding: 0.3rem;
  font-size: 12px;
  text-align: center;
}

.type-bar img {
  height: 3.125rem;
  width: 3.125rem;
}

.ad-banner {
}

.recommend-area {
  background-color: #fff;
  margin-top: 0.3rem;
}
.recommend-title {
  border-bottom: 1px solid #eee;
  font-size: 14px;
  padding: 0.2rem;
  color: #e5017d;
}

.recommend-body {
  border-bottom: 1px solid #eee;
}

.recommend-item {
  width: 99%;
  border-right: 1px solid #eee;
  font-size: 12px;
  text-align: center;
}

.hot-area {
  text-align: center;
  font-size: 14px;
  height: 1.8rem;
  line-height: 1.8rem;
}

.hot-goods{
  height: 130rem;
    overflow: hidden;
    background-color: #fff;
}

</style>