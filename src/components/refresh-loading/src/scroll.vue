<template>
	<div ref="sclWrap" :style="sclWrapClass">
		<!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
			<slot name="list"></slot>
		</van-pull-refresh>	 -->
		<p class="refreshText" ref="refreshText">{{text}}</p>
		<slot name="list"></slot>
		<!-- <mugen-scroll :handler="fetchData"  :should-handle="!pullUpLoading"  scroll-container="sclWrap"></mugen-scroll> -->
	</div>
</template>
<script>
// let MugenScroll = require("assets/self/js/vue-mugen-scroll.min.js");
export default {
    name: 'refresh-loading',
    props: {
        // 组件高度
        height: {
            type: Number
        },
        // 上拉加载
        pullUpLoading: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            isLoading: false,
            text: "",
            startPos: 0,
            transitionHeight: 0
        };
    },
    computed: {
        sclWrapClass() {
            return {
                overflowY: "auto",
                height: this.height + "px",
                position: "relative"
            };
        }
    },
    methods: {
        // 上拉加载回调
        fetchData() {
            console.log("test :", this.pullUpLoading);
            if (!this.pullUpLoading) {
                this.$emit("pullUp");
            }
        },
        // 下拉刷新回调
        onRefresh() {
            // setTimeout(() => {
            this.$emit("pullDown");
            // this.isLoading = false
            // }, 500);
        }
    },
    watch: {},
    components: {
        MugenScroll
    },
    created() {
        this.fetchData();
    },
    mounted() {
        let wrap = this.$refs.sclWrap;
        let _element = this.$slots.list[0].elm;
        // let targetClientRect = _element.getBoundingClientRect()
        _element.addEventListener(
            "touchstart",
            e => {
                this._startPos = e.touches[0].pageY;
                _element.style.position = "relative";
                _element.style.transition = "transform 0s";
            },
            false
        );
        _element.addEventListener(
            "touchmove",
            e => {
                this._transitionHeight = e.touches[0].pageY - this._startPos;
                if (
                    this._transitionHeight > 0 &&
                    this._transitionHeight < 60 &&
                    this.$refs.sclWrap.scrollTop === 0
                ) {
                    this.text = "下拉刷新";
                    _element.style.transform =
                        "translateY(" + this._transitionHeight + "px)";
                    if (this._transitionHeight > 55) {
                        this.text = "释放更新";
                    }
                }
            },
            false
        );
        _element.addEventListener(
            "touchend",
            e => {
                _element.style.transition = "transform 0.5s ease 1s";
                _element.style.transform = "translateY(0px)";
                if (
                    this._transitionHeight > 55 &&
                    this.$refs.sclWrap.scrollTop === 0
                ) {
                    this.text = "更新中...";
                    this._transitionHeight = 0;
                    this.onRefresh();
                }
                // todo...
            },
            false
        );

        // 上拉加载
        //获取滚动条当前的位置
        function getScrollTop() {
            var scrollTop = 0;
            // if(document.documentElement && document.documentElement.scrollTop) {
            // 		scrollTop = document.documentElement.scrollTop;
            // } else if(document.body) {
            // 		scrollTop = document.body.scrollTop;
            // }
            return wrap.scrollTop;
        }
        //获取当前可视范围的高度
        function getClientHeight() {
            var clientHeight = 0;
            // if(document.body.clientHeight && document.documentElement.clientHeight) {
            // 		clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
            // } else {
            // 		clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
            // }
            return wrap.clientHeight;
        }
        //获取文档完整的高度
        function getScrollHeight() {
            return Math.max(document.body.scrollHeight, wrap.scrollHeight);
        }
        //滚动事件触发
        this.$refs.sclWrap.onscroll = () => {
            if (getScrollTop() + getClientHeight() === getScrollHeight()) {
                this.fetchData();
                console.log("下拉刷新了");
                //此处发起AJAX请求
            }
        };
    }
};
</script>
<style scoped>
.refreshText {
    position: absolute;
    width: 100%;
    line-height: 50px;
    text-align: center;
    left: 0;
    top: 0;
}
</style>


