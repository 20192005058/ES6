var that;
class Tab{
    constructor(id){
        that =this;
        this.main=document.querySelector(id);
        this.add=this.main.querySelector('.tabadd');
        this.ul=this.main.querySelector('.firstnav ul:first-child');
        this.fsection=this.main.querySelector('.tabscon');
        this.init();
    }
    init(){
        this.updateNode();
        this.add.onclick=this.addTab;
        for(var i=0 ;i<this.lis.length;i++){
          
            this.lis[i].index=i;
            this.lis[i].onclick =this.toggleTab;
            this.remove[i].onclick=this.removeTab;
            this.spans[i].ondblclick=this.editTab;
            this.sections[i].ondblclick=this.editTab;
        }
    }
    updateNode(){
        this.lis =this.main.querySelectorAll('li');
        this.sections=this.main.querySelectorAll('section');
        this.remove=this.main.querySelectorAll('.iconfont');
        this.spans=this.main.querySelectorAll('.firstnav li span:first-child');
    }
    toggleTab(){
      //  console.log(this.index);
      that.clearClass();
      this.className='liactive';
        that.sections[this.index].className='conactive';
    }
    clearClass(){
        for(var i=0;i<this.lis.length;i++){
            this.lis[i].className='';
            this.sections[i].className='';
        }
    }

    addTab(){
        that.clearClass();
        var random=Math.random();
       var li='<li class="liactive"><span>新选项卡</span><span class="iconfont"></span></li>';
       var section='<section class="conactive">测试' + random + '</section>';
       that.ul.insertAdjacentHTML('beforeend',li);
       that.fsection.insertAdjacentHTML('beforeend',section);
       that.init();
    }
    removeTab(e){
        e.stopPropagation();//防止冒泡，防止触发li的切换点击事件
        var index=this.parentNode.index;
        console.log(index);
        //根据索引号删除对应的li 和section remove（方法可以直接删除指定的元素
        that.lis[index].remove();
        that.sections[index].remove();
        that.init();
        //当我们删除的不是选择状态的li的时候，原来的选中状态li保持不变
        if(document.querySelector('.liactive'))
        return;

        //当我们删除了选中状态的这个li的时候，让她的前一个li处于选定状态
        index--;
        //手动调用点击事件，不需要鼠标触发
        that.lis[index] && that.lis[index].click();

    }
    editTab(){
        var str=this.innerHTML;
        //双击禁止选定文字
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
     // alert(11);
     this.innerHTML='<input type="text" />';
     var input =this.children[0];
     input.value=str;
     input.select();//文本框里的值处于选定状态
    //当离开文本框时把文本框里的值给span
    input.onblur=function(){
        this.parentNode.innerHTML=this.value;
    }
    //按回车键也保存
    input.onkeyup=function(e){
        if(e.keyCode===13){
            //手动事情鼠标焦点
            this.blur();
        }
    }
    }
}
new Tab('#tab');