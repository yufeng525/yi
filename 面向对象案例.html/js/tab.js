var that;
class Tab {
    constructor(id) {
            // 1. 点击 tab栏, 可以切换效果.
            // 2. 点击 + 号, 可以添加 tab 项和内容项.
            // 3. 点击 x 号, 可以删除当前的tab项和内容项.
            // 4. 双击tab项文字或者内容项文字, 可以修改里面的文字内容.


            that = this;
            // 1 、 获取元素
            this.main = document.querySelector(id);

            this.add = this.main.querySelector('.tabadd')
            this.ul = this.main.querySelector('.fisrstnav ul:first-child') // li的父元素
            this.fsection = this.main.querySelector('.tabscon') // section的父元素
            this.init();


        }
        // 初始化
    init() {
            this.updateNode();
            this.add.onclick = this.addTab; // 添加键只有一个，所以不用循环

            for (var i = 0; i < this.lis.length; i++) {
                this.lis[i].index = i;
                this.lis[i].onclick = this.toggleTab;
                this.remove[i].onclick = this.removeTab;
                this.spans[i].ondblclick = this.reviseTab;
                this.sections[i].ondblclick = this.reviseTab;

            }
        }
        // 因为有些元素是动态的
    updateNode() {
            this.lis = this.main.querySelectorAll('li')
            this.sections = this.main.querySelectorAll('section')
            this.remove = this.main.querySelectorAll('.icon-guanbi')
            this.spans = this.main.querySelectorAll('.fisrstnav li span:first-child')
        }
        // 1.切换功能
    toggleTab() {
        that.cleanClass();
        // console.log(this.index);
        this.className = 'liactive';
        that.sections[this.index].className = 'conactive';
    };
    // 排他
    cleanClass() {
            for (var i = 0; i < this.lis.length; i++) {
                this.lis[i].className = '';
                this.sections[i].className = '';
            }
        }
        // 2.添加功能
    addTab() {
        // alert(11)
        that.cleanClass() // 先排出其他的
        var li = '<li class="liactive"><span>测试1</span><span class="iconfont icon-guanbi"></span></li>'
        that.ul.insertAdjacentHTML('beforeend', li)
        var section = '<section class="conactive">测试1</section>'
        that.fsection.insertAdjacentHTML('beforeend', section)
        that.init()
    };
    // 3.删除功能
    removeTab(e) {
        // console.log(11);
        // console.log(e);
        e.stopPropagation()
        var index = this.parentNode.index
        console.log(index);
        that.lis[index].remove();
        that.sections[index].remove();
        that.init();
    };
    // 4.修改功能
    reviseTab() {
        // console.log(11);
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        var str = this.innerHTML; // 获取原先的内容
        this.innerHTML = '<input type = "text" />' // 在这个span里面创建一个input
        var input = this.children[0]
        input.value = str; //把原先的span的内容赋值给文本框的值
        input.select() // 增加用户体验，选定文本框里面的内容
            // 1.当input失去焦点时，就把input里面的值赋值给span里
        input.onblur = function() {
            this.parentNode.innerHTML = this.value
        }
        input.onkeyup = function(e) {
            if (e.keyCode === 13) {
                this.parentNode.innerHTML = this.value
            }
        }
    };
}

new Tab("#tab")
    // 1. 确定对象， 该对象需要什么功能（ 切换、 添加、 删除、 修改）
    // 2. 获取元素tab， 以实参、 形参传递给构造函数
    // 3. 封装一个初始化函数，添加我们绑定事件
    // 4.点击 tab栏, 可以切换效果.（遍历我们ul里面的全部li，因为下面的section内容跟我们li时对应的，所以遍历的同时我们可以给我们的li和（借用li的索引号的section）添加相应的类名，）
    // 5.添加类名后，当我们每次点击li都会添加类名，所以我们要用排他思想，先清除全部元素的类名，然后我们点击了哪个就给谁添加类名
    // 6.封装一个清除类名的函数，然后再切换功能开头调用这个函数，清理所有的类名
    // 7. 点击 + 号, 可以添加 tab 项和内容项.
    // 新增点：element.insertAdjacentHTML（）   可以把字符串格式添加到元素内
    // 8.先获取+号的元素，在我们init（）里面添加我们的绑定事件，因为我们的+号只有一个，所以我们不用再li的for循环里面的添加绑定事件
    // 9.我们可以先创建li和section，然后通过element.insertAdjacentHTML('beforeend', li)直接把我们的li添加到父元素内
    // 10.这时候会有相应的bug，因为我们新添加的元素是没有一开始就被获取到的，所以我们的封装一个函数updateNode（）存放我们动态元素li和section
    //11.然后在init()里面调用我们的updateNode（）函数，时刻更新我们最新的元素个数，然后在我们addTab（）最后 再调用init（）把最新数据存放进去
    // 12. 点击 x 号, 可以删除当前的tab项和内容项.
    // 13.我们先再updateNode（）获取×号的元素，然后通过父级的li的索引号，然后删除相应的li和section，最后调用init（）更新最新数据
    // 14. 双击tab项文字或者内容项文字, 可以修改里面的文字内容.
    // 注意点：window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();（禁止双击选定）
    // 新增点：input.select()   双击表单，全选选定里面的value值
    // 15.当我们双击span会再span生成input元素，我们通过表单失去焦点和按下回车给input绑定事件，把表单的value值赋值给该span的innerHTML
    // 16.我们获取我们的sections后，同时我们的sections也绑定双击事件，并调用修改功能函数。


// alert(1)