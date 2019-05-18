<template>
  <el-table
    :data="tableData"
    stripe
    style="width: 100%">
    <el-table-column
      type="index"
      width="150">
    </el-table-column>
    <el-table-column
      prop="header"
      label="标题"
      >
    </el-table-column>
    <el-table-column
      prop="time"
      label="发布时间"
      fixed="right"
      width="210"
     >
    </el-table-column>
  </el-table>
</template>

<script>
import axios from 'axios';
  export default {
    data() {
      return {
        tableData: {}
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        axios.get('manage/boards')
        .then( res => {
          this.tableData = res.data.result;
          console.log(this.tableData)
        })
        .catch(e => {
          console.log(e)
        })
      }
    }

  }
</script>
