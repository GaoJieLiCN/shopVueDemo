<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar title="类别列表" />
    </div>

    <div>
      <van-row>
        <van-col span="6">
          <div id="leftNav">
            <ul>
              <li
                @click="clickCategory(index,item.id)"
                :class="{categoryActive:categoryIndex==index}"
                v-for="(item,index) in category"
                :key="index"
              >{{item.name}}</li>
            </ul>
          </div>
        </van-col>
        <van-col span="18">
          <div class="tabCategorySub">
            <van-tabs v-model="active">
              <van-tab v-for="(item, index) in categorySub.list" :key="index" :title="item.name"></van-tab>
            </van-tabs>
          </div>

          <div id="list-div">
            <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
              <van-list v-model="loading" :finished="finished" @load="onLoad">
                <div class="list-item" @click="goGoodsInfo(item.id)" v-for="item in list" :key="item">{{item}}</div>
              </van-list>
            </van-pull-refresh>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import CategoryInfo from "../json/CategoryList"; //数据文件
export default {
  data() {
    return {
      category: [],
      categorySub: [], //二级分类
      categorySubId: "", //大分类id
      categoryIndex: 0,
      active: 0,
      list: [], //商品数据
      loading: false, //上拉加载使用
      finished: false, //上拉加载是否没有数据了
      isRefresh: false, //下拉加载

      page: 1, //商品列表的页数
      goodList: [], //商品信息
      categorySubId_id: "" //商品子分类ID
    };
  },
  created() {
    console.log(CategoryInfo);
    this.category = CategoryInfo.data.CategoryInfo;
    this.categorySubId = CategoryInfo.data.CategoryInfo[0].id;
    for (let i = 0; i < this.category.length; i++) {
      var listData = this.category[i];
      if (listData.id == this.categorySubId) {
        this.categorySub = listData;
      }
    }
  },
  mounted() {
    let winHeight = document.documentElement.clientHeight;
    document.getElementById("leftNav").style.height = winHeight - 46 - 50 + "px";
    document.getElementById("list-div").style.height = winHeight - 90 - 50 + "px";
  },
  methods: {
    //点击大类的方法
    clickCategory(index, id) {
      this.categoryIndex = index;
      this.categorySubId = id;
      this.active = 0;
      console.log(this.categorySubId);

      for (let i = 0; i < this.category.length; i++) {
        const listData = this.category[i];
        if (listData.id == this.categorySubId) {
          this.categorySub = listData;
        }
      }

this.page=1
        this.finished = false
        this.goodList=[]
      
    },



    onLoad() {
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        this.loading = false;
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 500);
    },

    onRefresh() {
      setTimeout(() => {
        this.isRefresh = false;
        this.finished = true;
        this.list = [];
        this.onLoad();
      }, 500);
    },

//点击子类获取商品信息
onClickCategorySub(index,title){
    //console.log( this.categorySub)
    this.categorySubId_id= this.categorySub[index].id
    console.log(this.categorySubId_id)

    this.goodList=[]
    this.finished = false
    this.page=1
    this.onLoad()

},

    // 获取上拉加载数据
    getGoodList() {
      axios({
        url: url.getGoodsListByCategorySubID,
        method: "post",
        data: {
          categorySubId: this.categorySubId,
          page: this.page
        }
      })
        .then(response => {
          console.log(response);
          if (response.data.code == 200 && response.data.message.length) {
            this.page++;
            this.goodList = this.goodList.concat(response.data.message);
          } else {
            this.finished = true;
          }
          this.loading = false;
          console.log(this.finished);
        })
        .catch(error => {
          console.log(error);
        });
    },

goGoodsInfo(id){
    this.$router.push({name:'Goods',params:{goodsId:id}})
},

  }
};
</script>

<style scoped>
#leftNav {
  background-color: aliceblue;
}

#leftNav ul li {
  line-height: 2rem;
  border-bottom: 1px solid #e4e7ed;
  padding: 3px;
  font-size: 0.8rem;
  text-align: center;
}

.categoryActive {
  background-color: #fff;
}

.list-item {
  text-align: center;
  line-height: 80px;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;
}
#list-div {
  overflow: scroll;
}
</style>