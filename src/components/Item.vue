<template>
  <el-row :gutter="2" >
    <el-col v-for="(item, index) in goodList" :key ="index" :span="8" class="item">
      <el-card :body-style="{ border: '0px' }" shadow="hover">
        <img :src="`${publicPath}static/${item.img}`" class="image">
        <div style="padding: 14px;">
          <span class="box_title">{{item.title}}</span><br>
          <span class="box_message">{{item.message}}</span>
          <span class="box_price">售价：{{item.price}}</span>
          <div class="bottom clearfix">
            <el-button type="text" class="button">加入购物车</el-button>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      publicPath: process.env.BASE_URL,
    };
  },
  props: {
    goodList: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="stylus" scoped>

.item
  margin-top 32px

.box_title
  font-size: 26px;
  line-height: 110%;
  text-align: center;
  display: block;
  font-family: "roboto condensed";
  font-weight: 700;
  letter-spacing: 0.025em;
  margin-bottom: 3px;
  text-transform: uppercase;
  position: relative;
  z-index: 4;

.box_message
  font-size: 15px;
  line-height: 140%;
  text-transform: initial;
  font-family: "roboto condensed";
  text-align: center;
  margin-bottom: 5px;
  display: block;
  width: 90%;
  margin: 10px auto;

.box_price
  text-transform: uppercase;
  font-family: "roboto condensed";
  font-weight: 400;
  font-size: 17px;
  letter-spacing: 0.025em;
  display: inline-block !important;
  border-bottom: 0.1em white solid;
  padding-bottom: 0.1em;
  margin: auto;
  width: initial !important;

</style>
