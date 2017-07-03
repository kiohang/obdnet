var vm = new Vue({
  el:"#cart",
  data:{
    showModal: false,
    productList: [],
    totalMoney: 0,
    totalNums:0,
    checkAll: false,
    currentProduct: '',
    checkstate:false
  },
  filters:{},
  mounted:function(){
    //es5缓存当前对象
    var _this = this;
    this.cartView();
  },
  methods:{
    //获取数据，并将服务端数据缓存到productList
    cartView: function () {
      this.$http.get("../js/lib/data.cart.json").then(function(response) {
        var res = response.data;
        //console.log(res);
        if (res) {
          this.productList = res;
          this.cartTotalmoney();
        }
      });
    },
    //  全选功能
    selectAll: function () {
      var isCheck = this.checkAll;
      if(isCheck){isCheck = false;this.checkAll = false;}else{isCheck = true;this.checkAll = true;}
      this.productList.forEach(function (item) {
        if (typeof item.checked == "undefined") {
          Vue.set(item, "checked", isCheck);
        } else {
          item.checked = isCheck;
        }
      });
      this.cartTotalmoney();
      //console.log(this.checkAll)
    },
    //  计算总价
    cartTotalmoney:function(){
      var totalMoney = 0;
      var totalNums = 0;
      this.productList.forEach(function (item) {
        if (item.checked) {
          totalMoney += item.points_price * item.nums;
          totalNums ++;
        }
      });
      this.totalMoney = totalMoney;
      this.totalNums = totalNums;
    },

    //选中商品
    selectedProduct: function (product) {
      if (typeof product.checked == "undefined") {
        Vue.set(product, "checked", true);
      } else {
        product.checked = !product.checked;
        if(product.checked === false){
          this.checkAll = product.checked;
        }
      }
      this.cartTotalmoney();
      this.isCheckAll();
      console.log(this.checkAll)
    },

    //购物车全选功能
    isCheckAll: function () {
      var flag = true;
      this.productList.forEach(function (item) {
        if (!item.checked) {
          flag = false;
        }
      });
      if (flag) {
        this.checkAll = true;
      } else {
        this.checkAll = false;
      }
    },
    //  修改numbox的数量
    changeNumbox: function (product, way) {
      if (way > 0) {
        product.nums++;
      } else {
        product.nums--;
        if (product.nums < 1) {
          product.nums = 1;
        }
      }
    this.cartTotalmoney();
    },
  //  缓存当前编辑状态
   isEdit: function(){
     this.checkstate = !this.checkstate;
     console.log(this.checkstate);
   },

  }
});