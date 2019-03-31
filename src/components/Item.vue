<template>
  <el-row :gutter="12">
    <el-col v-for="(item, index) in goodList" :key ="index" :span="8">
      <el-card :body-style="{ padding: '0px' }">
        <img :src="item.img" class="image">
        <div style="padding: 14px;">
          <span>{{item.title}}</span><br>
          <span>售价：{{item.price}}</span>
          <div class="bottom clearfix">
            <el-button type="text" class="button">购买</el-button>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: {
    goodList: {
      type: Array,
      required: true
    }
  },
}
</script>
