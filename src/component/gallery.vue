<template>
  <div :id="id">
  </div>
</template>

<script>
  import 'lightgallery.js/dist/css/lightgallery.min.css'
  // lg-slide and lg-fade transitions are included in lightgallery.css.
  // for all other transitions you need to include lg-transitions.css in your document
  // https://sachinchoolur.github.io/lightgallery.js/demos/transitions.html
  import 'lightgallery.js/dist/css/lg-transitions.min.css'
  import lightgallery from 'lightgallery.js'
  // <!-- lightgallery plugins -->
  import 'lg-fullscreen.js'
  import 'lg-thumbnail.js'
  // import 'lg-zoom.js'
  import 'lg-autoplay.js'
  import 'lg-pager.js'

  export default {
    props: {
      images: {
        type: Array,
        default() {
          return [];
        },
      },

      options: {
        type: Object,
        default() {
          return {};
        },
      },
      index: {
        type: Number,
      },
      id: {
        type: String,
        default: 'lightgallery',
      },
    },

    data() {
      return {
        el: null,
        gallery: null,
        instance: null,
        curIndex: 0,
        isClosed: false,
      };
    },

    watch: {
    },

    mounted() {
    },

    destroyed() {
    },

    computed: {
    },
    methods: {
      open(index = 0) {
        this.curIndex = index
        const options = Object.assign({
          index: index,
          mode: 'lg-fade',
          closable: false, //warning: enable this will cause the bug that: the gallery get closed soon after it opened (closeGallery->lg-dragging)
          mousewheel: true,
          speed: 600,
          addClass: '',
          startClass: 'lg-start-zoom',
          backdropDuration: 150,
          hideBarsDelay: 1000,
          useLeft: false,
          loop: true,
          controls: true,
          getCaptionFromTitleOrAlt: true,
          preload: 2,
          download: true,
          counter: true,
          swipeThreshold: 50,
          dynamic: true,
          dynamicEl: this.images,
          thumbnail: true, //thumbnail indicator
          pager: false, //dot indicator
        }, this.options);

        this.el = document.querySelector(`#${this.id}`)

        let myself = this;
        // https://sachinchoolur.github.io/lightgallery.js/docs/api.html#events
        // custom event with extra parameters
        // event.detail.index - index of the slide
        // event.detail.fromTouch - true if slide function called via touch event or mouse drag
        // event.detail.fromThumb - true if slide function called via thumbnail click
        this.el.addEventListener('onBeforeSlide', function(event){
          myself.curIndex = event.detail.index
          // console.log(event.detail)
          myself.$emit('onBeforeSlide', { prevIndex: event.detail.prevIndex, index: event.detail.index, fromTouch: event.detail.fromTouch, fromThumb: event.detail.fromThumb })
        }, false);

        this.el.addEventListener('onAfterSlide', function(event){
          myself.curIndex = event.detail.index
          // console.log(event.detail)
          myself.$emit('onAfterSlide', { prevIndex: event.detail.prevIndex, index: event.detail.index, fromTouch: event.detail.fromTouch, fromThumb: event.detail.fromThumb })
        }, false);

        //the index here is not correct ...
        this.el.addEventListener('onSlideItemLoad', function(event){
          // console.log(event.detail, event.detail.index)
          myself.$emit('onSlideItemLoad', { index: event.detail.index })
        }, false);

        this.el.addEventListener('onBeforeClose', function(event){
          // console.log("onBeforeClose event: %o", event)
          myself.$emit('onBeforeClose', {})
        }, false);

        this.el.addEventListener('onCloseAfter', function(event){
          // console.log("onCloseAfter event: %o", event)
          myself.isClosed = true
          myself.$emit('onCloseAfter', {})
        }, false);

        //current not used
        this.gallery = window.lightGallery(this.el, options)
        //the core
        this.instance = window.lgData[this.el.getAttribute('lg-uid')]
        // console.log('init this.instance: %o', this.instance)
        // console.log('gallery open(%d)', index)
      },
      getIndex() {
        return this.curIndex
      },
      //get current options
      getConfig() {
        return this.instance.s
      },
      //get current img
      getCurImg() {
        return document.querySelector('.lg-current img')
      },
      //get current thumb img
      getCurThumbImg() {
        return document.querySelector('.lg-thumb-item.active img')
      },
      //Goto specific slide
      slideIndex(index) {
        this.curIndex = index
        this.instance.s.index = index
        this.instance.slide(index)
      },
      close() {
        if (this.isClosed) {
          return
        }
        this.instance.destroy(true)
        if (this.gallery !== null) {
          this.gallery = null;
        }
        if (this.instance !== null) {
          this.instance = null;
        }
      },
      enterFullScreen() {
        if (this.instance.modules.fullscreen.isFullScreen()) {
          return
        }
        this.instance.modules.fullscreen.requestFullscreen()
      },
      exitFullScreen() {
        if (!this.instance.modules.fullscreen.isFullScreen()) {
          return
        }
        this.instance.modules.fullscreen.exitFullscreen()
      },
      toggleFullScreen() {
        if (this.instance.modules.fullscreen.isFullScreen()) {
          this.exitFullScreen()
        } else {
          this.enterFullScreen()
        }
        // this.instance.modules.fullscreen.fullScreen()
      },
      next() {
        this.instance.goToNextSlide()
      },
      prev() {
        this.instance.goToPrevSlide()
      },
      play() {
        // startlAuto ? maybe it's a typo
        // see https://github.com/sachinchoolur/lg-autoplay.js/blob/master/src/lg-autoplay.js#L140
        this.instance.modules.autoplay.startlAuto()
      },
      pause() {
        this.instance.modules.autoplay.cancelAuto()
      },
    },
  };
</script>

<style>

</style>
