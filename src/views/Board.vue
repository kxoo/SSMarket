<template>
<div>
        <el-dialog :title="item.header" :visible.sync="dialogTableVisible">
          <el-card style=" margin: 2px ; border: 0 " shadow="hover">
            <div style="padding:6px 2px;">
              <div class="item_price">{{item.content}}</div>
            </div>
          </el-card>
      </el-dialog>
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
      <template slot-scope="scope">
          <el-button
            size="mini"

            @click="board(scope.$index, scope.row)">{{scope.row.header}}</el-button>
        </template>
    </el-table-column>
    <el-table-column
      prop="time"
      label="发布时间"
      fixed="right"
      width="210"
     >
    </el-table-column>
  </el-table>
</div>

</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      dialogTableVisible: false,
      item: {
        header: '',
      },
      tableData: {},
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      axios.get('manage/boards')
        .then((res) => {
          this.tableData = res.data.result;
          console.log(this.tableData);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    board(index, row) {
      console.log(row);

      this.item = row;
      console.log(this.item);
      this.dialogTableVisible = true;
    },


  },

};
</script>
