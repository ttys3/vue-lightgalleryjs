(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('lightgallery.js/dist/css/lightgallery.min.css'), require('lightgallery.js'), require('lg-fullscreen.js'), require('lg-thumbnail.js'), require('lg-zoom.js'), require('lg-autoplay.js')) :
  typeof define === 'function' && define.amd ? define(['lightgallery.js/dist/css/lightgallery.min.css', 'lightgallery.js', 'lg-fullscreen.js', 'lg-thumbnail.js', 'lg-zoom.js', 'lg-autoplay.js'], factory) :
  (global = global || self, global.VueLightgallery = factory(null, global.lightgallery_js));
}(this, function (lightgallery_min_css, lightgallery_js) { 'use strict';

  lightgallery_js = lightgallery_js && lightgallery_js.hasOwnProperty('default') ? lightgallery_js['default'] : lightgallery_js;

  //
  var script = {
    props: {
      images: {
        type: Array,

        default() {
          return [];
        }

      },
      options: {
        type: Object,

        default() {
          return {};
        }

      },
      index: {
        type: Number
      },
      id: {
        type: String,
        default: 'lightgallery'
      }
    },

    data() {
      return {
        el: null,
        gallery: null,
        instance: null,
        curIndex: 0,
        isClosed: false,
        isFullscreen: false
      };
    },

    watch: {},

    mounted() {},

    destroyed() {},

    computed: {},
    methods: {
      open(index = 0) {
        this.curIndex = index;
        const options = Object.assign({
          index: index,
          mode: 'lg-fade',
          speed: 600,
          addClass: '',
          startClass: 'lg-start-zoom',
          backdropDuration: 150,
          hideBarsDelay: 6000,
          useLeft: false,
          closable: true,
          loop: true,
          controls: true,
          getCaptionFromTitleOrAlt: true,
          preload: 2,
          download: true,
          counter: true,
          swipeThreshold: 50,
          dynamic: true,
          dynamicEl: this.images,
          thumbnail: true
        }, this.options);
        this.el = document.querySelector(`#${this.id}`);
        let myself = this; // https://sachinchoolur.github.io/lightgallery.js/docs/api.html#events
        // custom event with extra parameters
        // event.detail.index - index of the slide
        // event.detail.fromTouch - true if slide function called via touch event or mouse drag
        // event.detail.fromThumb - true if slide function called via thumbnail click

        this.el.addEventListener('onBeforeSlide', function (event) {
          myself.curIndex = event.detail.index; // console.log(event.detail)

          myself.$emit('onBeforeSlide', {
            prevIndex: event.detail.prevIndex,
            index: event.detail.index,
            fromTouch: event.detail.fromTouch,
            fromThumb: event.detail.fromThumb
          });
        }, false);
        this.el.addEventListener('onAfterSlide', function (event) {
          myself.curIndex = event.detail.index; // console.log(event.detail)

          myself.$emit('onAfterSlide', {
            prevIndex: event.detail.prevIndex,
            index: event.detail.index,
            fromTouch: event.detail.fromTouch,
            fromThumb: event.detail.fromThumb
          });
        }, false); //the index here is not correct ...

        this.el.addEventListener('onSlideItemLoad', function (event) {
          // console.log(event.detail, event.detail.index)
          myself.$emit('onSlideItemLoad', {
            index: event.detail.index
          });
        }, false);
        this.el.addEventListener('onBeforeClose', function (event) {
          // console.log("onBeforeClose event: %o", event)
          myself.$emit('onBeforeClose', {});
        }, false);
        this.el.addEventListener('onCloseAfter', function (event) {
          // console.log("onCloseAfter event: %o", event)
          myself.isClosed = true;
          myself.$emit('onCloseAfter', {});
        }, false); //current not used

        this.gallery = window.lightGallery(this.el, options); //the core

        this.instance = window.lgData[this.el.getAttribute('lg-uid')]; // console.log('init this.instance: %o', this.instance)
        // console.log('gallery open(%d)', index)
      },

      getIndex() {
        return this.curIndex;
      },

      close() {
        if (this.isClosed) {
          return;
        }

        this.instance.destroy(true);

        if (this.gallery !== null) {
          this.gallery = null;
        }

        if (this.instance !== null) {
          this.instance = null;
        }
      },

      enterFullScreen() {
        if (this.isFullscreen) {
          return;
        }

        this.instance.modules.fullscreen.requestFullscreen();
        this.isFullscreen = true;
      },

      exitFullScreen() {
        if (!this.isFullscreen) {
          return;
        }

        this.instance.modules.fullscreen.exitFullscreen();
        this.isFullscreen = false;
      },

      toggleFullScreen() {
        if (this.isFullscreen) {
          this.exitFullScreen();
        } else {
          this.enterFullScreen();
        } // this.instance.modules.fullscreen.fullScreen()

      }

    }
  };

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
  /* server only */
  , shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
      createInjectorSSR = createInjector;
      createInjector = shadowMode;
      shadowMode = false;
    } // Vue.extend constructor export interop.


    var options = typeof script === 'function' ? script.options : script; // render functions

    if (template && template.render) {
      options.render = template.render;
      options.staticRenderFns = template.staticRenderFns;
      options._compiled = true; // functional template

      if (isFunctionalTemplate) {
        options.functional = true;
      }
    } // scopedId


    if (scopeId) {
      options._scopeId = scopeId;
    }

    var hook;

    if (moduleIdentifier) {
      // server build
      hook = function hook(context) {
        // 2.3 injection
        context = context || // cached call
        this.$vnode && this.$vnode.ssrContext || // stateful
        this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
        // 2.2 with runInNewContext: true

        if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
          context = __VUE_SSR_CONTEXT__;
        } // inject component styles


        if (style) {
          style.call(this, createInjectorSSR(context));
        } // register component module identifier for async chunk inference


        if (context && context._registeredComponents) {
          context._registeredComponents.add(moduleIdentifier);
        }
      }; // used by ssr in case component is cached and beforeCreate
      // never gets called


      options._ssrRegister = hook;
    } else if (style) {
      hook = shadowMode ? function () {
        style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
      } : function (context) {
        style.call(this, createInjector(context));
      };
    }

    if (hook) {
      if (options.functional) {
        // register for functional component in vue file
        var originalRender = options.render;

        options.render = function renderWithStyleInjection(h, context) {
          hook.call(context);
          return originalRender(h, context);
        };
      } else {
        // inject component registration as beforeCreate hook
        var existing = options.beforeCreate;
        options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
      }
    }

    return script;
  }

  var normalizeComponent_1 = normalizeComponent;

  /* script */
  const __vue_script__ = script;

  /* template */
  var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":_vm.id}})};
  var __vue_staticRenderFns__ = [];

    /* style */
    const __vue_inject_styles__ = undefined;
    /* scoped */
    const __vue_scope_id__ = undefined;
    /* module identifier */
    const __vue_module_identifier__ = undefined;
    /* functional template */
    const __vue_is_functional_template__ = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var VueLightgallery = normalizeComponent_1(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      undefined,
      undefined
    );

  return VueLightgallery;

}));
