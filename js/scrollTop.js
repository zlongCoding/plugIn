    var scrollPage = function(elem,speed,easing){
     this.elem = $(elem);
     this.linkTop = [];
     this.speed = speed || '1500';
     this.easing = easing || 'swing';
   }
   scrollPage.prototype = {
    default:{
      speed: this.speed,
      easing: this.easing
    },
    init : function(elem){
      var nodeList = elem || 'a'
      this.contents = this.elem.find(nodeList);
      this.getPosition();
      var self = this;
      $(this.contents).on('click',$.proxy(this.handleClick, this));
    },
    selectClick : function (elem) {
      return $(elem).attr('href').split("#")[1]
    },
    getPosition : function () {
      var self = this  , stopObject = {} ,ss = [];
      self.contents.each(function(){
         self.getOffect(self.selectClick(this));
      })
    },
    getOffect : function (val , bool) {
      var target , targetTop , stopObject ;
       target = $('#' + val);  
        if(target.length){
          stopObject = { 
            obj: '',
            val: ''
          }
          targetTop = target.offset().top;
          stopObject.obj = val;
          stopObject.val = targetTop;
          this.linkTop.push(stopObject);
        }
        if(bool){
           this.getScroll(stopObject.val)
        }
    },
    getScroll : function (val) {
     $('html, body').animate(
       {scrollTop: val+'px'} , this.default.speed , this.default.easing
       )
   },
   handleClick: function (e) {
     var currentEvent = this.selectClick(e.currentTarget), self = this , arrayString;
     arrayString = JSON.stringify(self.linkTop);
     if(arrayString.includes(currentEvent)){
       for(var i = 0; i < self.linkTop.length; i++){
         if(self.linkTop[i].obj == currentEvent){
           self.getScroll(self.linkTop[i].val);
         }
       }
     }else{
        self.getOffect(currentEvent , true);
     }

     e.preventDefault();
   }
 }