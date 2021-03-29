<template>
  <div>
    <el-button
      class="setting"
      @click="dialogVisible = true"
      icon="el-icon-setting"
      >设置</el-button
    >
    <el-button class="setting" @click="reset" icon="el-icon-setting"
      >重置</el-button
    >
    <!-- 表单显示begin -->
    <el-table
      ref="filterTable"
      :data="tableDataShow"
      style="width: 100%"
      stripe
      border
      @cell-mouse-enter="mouseEnter"
      @cell-mouse-leave="mouseLeave"
    >
      <!-- :key="Math.random()" -->
      <el-table-column
        v-for="(item, index) in tableHeader"
        :key="index"
        :prop="item.char"
        :label="item.field"
        sortable
        :column-key="item.char"
      >
        <template slot="header" slot-scope="scope">
          <div @mouseenter="enter(index, item)" @mouseout="leave(index, item)">
            {{ item.field }}
          </div>
          <i
            class="el-icon-circle-check"
            v-show="item.show"
            @click.stop="openSearch(index)"
          ></i>
          <el-popover
            placement="top"
            title="筛选"
            width="200"
            trigger="manual"
            v-model="item.dialogSearchVisible"
          >
            <el-input
              class="searchInput"
              v-model="searchStr"
              size="mini"
              placeholder="输入关键字搜索"
              @click.stop.native=""
            />
            <div style="text-align: right; margin: 0;margin-top: 10px;">
              <el-button
                size="mini"
                type="text"
                @click.stop="item.dialogSearchVisible = false"
                >取消</el-button
              >
              <el-button
                type="primary"
                size="mini"
                @click.stop="(item.dialogSearchVisible = false), seachInfo(item)"
                >确定</el-button
              >
            </div>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <!-- 表单end -->

    <!-- 分页begin -->
    <div style="padding:10px;text-align:right;">
      <el-pagination
        background
        @size-change="numberHandleSizeChange"
        @current-change="numberHandleCurrentChange"
        :current-page="tableData.pageNum"
        :page-sizes="[10, 20, 50, 100]"
        :pager-count="5"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <!-- 分页end -->

    <!-- 编辑表格字段begin -->
    <el-dialog
      title="编辑表格字段"
      :visible.sync="dialogVisible"
      width="30%"
      @close="closeDialog"
    >
      <div class="flex">
        <div>请选择需要在列表显示的字段</div>
        <div>
          已选择字段<span class="glay">(按住字段并拖动，调整顺序)</span>
        </div>
      </div>
      <div class="flex_bottom">
        <div class="left">
          <el-checkbox-group
            v-model="checkList"
            @change="handleCheckedCitiesChange"
          >
            <el-checkbox
              v-for="(item, index) in tableHeaderPre"
              :key="index"
              :label="item.field"
            ></el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="right">
          <div class="color-list">
            <div
              class="color-item"
              v-for="(color, index) in colors"
              v-dragging="{ item: color, list: colors, group: 'color' }"
              :key="index"
            >
              <div class="flex">
                <div>
                  <i class="el-icon-s-operation"></i>
                  {{ color }}
                </div>
                <i class="el-icon-close" @click="deleteSelectedItem(color)"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="(dialogVisible = false), confirmDialog()"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 编辑表格字段end -->
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      total: 0, // 分页参数
      tableHeader: [],
      tableHeaderPre: [],
      tableData: [],
      tableDataShow: [],
      searchStr: "",
      formtype: "",
      dialogVisible: false,
      dialogSearchVisible: false,
      checkList: [],
      colors: []
    };
  },
  created() {
    this.getHeaderItemInfo();
    this.getTableItemInfo();
    this.checkList = ["标题", "费用金额", "收款方", "部门"];
    this.colors = ["标题", "费用金额", "收款方", "部门"];
  },
  mounted() {
    this.$dragging.$on("dragged", ({ value }) => {
      // console.log(value.item);
      // console.log(value.list);
      // console.log(value.otherData);
    });
    this.$dragging.$on("dragend", () => {});

    Array.prototype.remove = function(val) {
      var index = this.indexOf(val);
      if (index > -1) {
        this.splice(index, 1);
      }
    };
  },
  methods: {
    /* 重置 */
    reset() {
      this.searchStr = "";
      this.tableDataShow = this.tableData;
      this.total = this.tableDataShow.length;
    },
    /* 搜索 */
    seachInfo(value) {
      if (this.searchStr) {
        let name = value.char;
        let string = this.searchStr;
        let newArr = [];
        for (var i = 0; i < this.tableDataShow.length; i++) {
          if (this.tableDataShow[i][name].indexOf(string) >= 0) {
            newArr.push(this.tableDataShow[i]);
          }
        }
        this.total = newArr.length;
        this.tableDataShow = newArr;
      } else {
        this.tableDataShow = this.tableData;
      }
    },
    /* 打开搜索框图标 */
    openSearch(index) {
      this.tableHeader[index].dialogSearchVisible = true;
      this.tableHeader[index].show = true;
    },
    /*  */
    mouseEnter(row, column, cell, event) {
      var index = this.colors.indexOf(column.label);
      this.tableHeader[index].show = true;
    },
    mouseLeave(row, column, cell, event) {
      var index = this.colors.indexOf(column.label);
      this.tableHeader[index].show = false;
    },
    /* 点击确定表头排序 */
    confirmDialog() {
      this.tableHeader = [];
      let obj = {};
      let lastArr = [];
      let arr = this.colors;
      let arrPre = this.tableHeaderPre;
      arr.map(function(param) {
        obj = arrPre.find(item => {
          return item.field === param; // 筛选出匹配数据
        });
        lastArr.push(obj);
      });
      this.tableHeader = lastArr;
    },
    /* 点击复选框 */
    handleCheckedCitiesChange(value) {
      this.colors = value;
    },
    /* 取消选中复选框 */
    deleteSelectedItem(item) {
      this.checkList.remove(item);
      this.colors.remove(item);
    },
    /* 弹窗关闭 */
    closeDialog() {
      this.searchStr = "";
    },
    /* 点击显示搜索框 */
    enter(index, row) {
      this.tableHeader[index].show = true;
    },
    /* 隐藏搜索框 */
    leave(index, row) {
      this.tableHeader[index].show = false;
    },
    /* 确定按钮 */
    confirmButton(index, row) {
      this.tableHeader[index].show = false;
    },
    /* 取消按钮 */
    cancelButton(index, row) {
      this.tableHeader[index].show = false;
    },
    /* 获取表头信息 */
    getHeaderItemInfo() {
      this.$ajax({
        method: "get",
        url: "/get_custom_field_list.php"
      })
        .then(response => {
          if (response.data.code == "0") {
            response.data.data.map(function(item) {
              item.show = false;
              item.dialogSearchVisible = false;
            });
            this.tableHeaderPre = response.data.data;
            this.confirmDialog();
          } else {
            this.$notify.warning({
              title: "友情提示",
              message: this.$errorTip(response.data.code, this.errorJson, this)
            });
          }
        })
        .catch(error => {
          this.$message(error);
        });
    },
    /* 获取表格信息 */
    getTableItemInfo() {
      this.$ajax({
        method: "get",
        url: "/get_payout_list.php",
        param: {
          params: {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            formtype: this.formtype
          }
        }
      })
        .then(response => {
          if (response.data.code == "0") {
            this.tableData = response.data.data;
            this.tableDataShow = response.data.data;
            this.total = response.data.data.length;
          } else {
            this.$notify.warning({
              title: "友情提示",
              message: this.$errorTip(response.data.code, this.errorJson, this)
            });
          }
        })
        .catch(error => {
          this.$message(error);
        });
    },
    /* 数组分割 */
    FunData(e) {
      let proportion = this.pageSize; //按照比例切割
      let num = 0;
      let _data = [];
      for (let i = 0; i < e.length; i++) {
        if (i % proportion == 0 && i != 0) {
          _data.push(e.slice(num, i));
          num = i;
        }
        if (i + 1 == e.length) {
          _data.push(e.slice(num, i + 1));
        }
      }
      this.tableDataShow = _data[this.pageNum - 1];
      return _data;
    },
    /** 选择第几页 */
    numberHandleCurrentChange(val) {
      this.pageNum = val;
      this.FunData(this.tableData);
    },
    /** 选取每页显示多少条 */
    numberHandleSizeChange(val) {
      this.pageSize = val;
    }
  }
};
</script>

<style>
.el-table th > .cell {
  display: flex;
  align-items: center;
  height: 100% !important;
}
.has-gutter .cell {
  position: relative;
  display: flex;
}
.has-gutter .cell div {
  width: 100%;
}
.el-icon-circle-check {
  position: absolute;
  right: 30px;
  z-index: 999;
}
.cell {
  display: flex;
}
.setting {
  background: #f5f8fd;
  margin-bottom: 10px;
}
.has-gutter > tr > th {
  background: #f5f8fd;
  border-right: 1px solid #e8ebf1;
}
.el-table th > .cell {
  display: flex;
  align-items: center;
  overflow: visible;
}
.el-table th {
  overflow: visible;
  height: 100%;
}
.el-dialog {
  border-radius: 4px;
}
.el-dialog__header {
  border-radius: 4px;
  padding: 10px 20px 10px;
  text-align: left;
  background: #f5f8fd;
}
.el-dialog .flex {
  display: flex;
  justify-content: space-around;
  color: #7e879b;
}
.glay {
  color: #cacaca;
}
.flex_bottom {
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 200px;
  border: 1px solid #b2bcc8;
  margin-top: 10px;
  border-radius: 4px;
}
.flex_bottom .right,
.flex_bottom .left {
  width: 50%;
  display: flex;
  justify-content: center;
}
.flex_bottom .left .el-checkbox-group {
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  text-align: left;
  overflow-y: auto;
  width: 100%;
  margin-left: 25px;
}
.color-list {
  text-align: left;
  padding: 10px 0;
  width: 100%;
  margin: 0 25px;
  align-items: center;
  overflow-y: auto;
}
.color-list .flex {
  align-items: center;
  justify-content: space-between;
}
.el-table__footer-wrapper,
.el-table__header-wrapper,
.el-table__body-wrapper,
.el-table {
  overflow: visible;
}
.el-popover.el-popper {
  right: 0px;
  top: 39px;
}
</style>
