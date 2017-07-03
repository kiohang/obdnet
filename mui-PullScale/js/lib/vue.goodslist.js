var vm = new Vue({
  el:"#vue-goodslist",
  data:{
    showModal: false,
    productList: [],
    index:0,
    totalPages:0,
    nowpage:1,
    requestUrl:'../js/lib/data.productlist.json',
    requesType:"1",
  },
  filters:{},
  mounted:function(){
    //es5缓存当前对象
    var _this = this;
    this.goodsListView();
  },
  methods:{
    //获取数据，并将服务端数据缓存到productList
      goodsListView: function () {

        // this.$http.jsonp("http://192.168.1.5/index.php/WapService/Product/Product", { credentials: true }).then(function(response) {
        //   console.log(response);
        // });
      var data_url = "?type=" + requesType
      console.log(requestUrl + data_url);
      this.$http.get(requestUrl + data_url).then(function(response) {
        var res = response.data;
        console.log(res.page_info);
        if (res) {
          this.productList = res.datas;
          this.totalPages = res.page_info.totalPages;
          this.nowpage = res.page_info.nowpage;
        }
      });

    },
    

  }
});