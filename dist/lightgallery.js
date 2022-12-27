var St = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Me = {}, it;
function os() {
  return it || (it = 1, function(e) {
    (function(r, s) {
      s(e);
    })(St, function(r) {
      Object.defineProperty(r, "__esModule", {
        value: !0
      });
      var s = {
        getAttribute: function(o, a) {
          return o[a];
        },
        setAttribute: function(o, a, u) {
          o[a] = u;
        },
        wrap: function(o, a) {
          if (o) {
            var u = document.createElement("div");
            u.className = a, o.parentNode.insertBefore(u, o), o.parentNode.removeChild(o), u.appendChild(o);
          }
        },
        addClass: function(o, a) {
          o && (o.classList ? o.classList.add(a) : o.className += " " + a);
        },
        removeClass: function(o, a) {
          o && (o.classList ? o.classList.remove(a) : o.className = o.className.replace(new RegExp("(^|\\b)" + a.split(" ").join("|") + "(\\b|$)", "gi"), " "));
        },
        hasClass: function(o, a) {
          return o.classList ? o.classList.contains(a) : new RegExp("(^| )" + a + "( |$)", "gi").test(o.className);
        },
        setVendor: function(o, a, u) {
          o && (o.style[a.charAt(0).toLowerCase() + a.slice(1)] = u, o.style["webkit" + a] = u, o.style["moz" + a] = u, o.style["ms" + a] = u, o.style["o" + a] = u);
        },
        trigger: function(o, a) {
          var u = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
          if (o) {
            var n = new CustomEvent(a, {
              detail: u
            });
            o.dispatchEvent(n);
          }
        },
        Listener: {
          uid: 0
        },
        on: function(o, a, u) {
          var n = this;
          o && a.split(" ").forEach(function(t) {
            var l = n.getAttribute(o, "lg-event-uid") || "";
            s.Listener.uid++, l += "&" + s.Listener.uid, n.setAttribute(o, "lg-event-uid", l), s.Listener[t + s.Listener.uid] = u, o.addEventListener(t.split(".")[0], u, !1);
          });
        },
        off: function(o, a) {
          if (o) {
            var u = this.getAttribute(o, "lg-event-uid");
            if (u) {
              u = u.split("&");
              for (var n = 0; n < u.length; n++)
                if (u[n]) {
                  var t = a + u[n];
                  if (t.substring(0, 1) === ".")
                    for (var l in s.Listener)
                      s.Listener.hasOwnProperty(l) && l.split(".").indexOf(t.split(".")[1]) > -1 && (o.removeEventListener(l.split(".")[0], s.Listener[l]), this.setAttribute(o, "lg-event-uid", this.getAttribute(o, "lg-event-uid").replace("&" + u[n], "")), delete s.Listener[l]);
                  else
                    o.removeEventListener(t.split(".")[0], s.Listener[t]), this.setAttribute(o, "lg-event-uid", this.getAttribute(o, "lg-event-uid").replace("&" + u[n], "")), delete s.Listener[t];
                }
            }
          }
        },
        param: function(o) {
          return Object.keys(o).map(function(a) {
            return encodeURIComponent(a) + "=" + encodeURIComponent(o[a]);
          }).join("&");
        }
      };
      r.default = s;
    });
  }(Me)), Me;
}
(function(e) {
  (function(r, s) {
    s(os());
  })(St, function(r) {
    var s = i(r);
    function i(n) {
      return n && n.__esModule ? n : {
        default: n
      };
    }
    var o = Object.assign || function(n) {
      for (var t = 1; t < arguments.length; t++) {
        var l = arguments[t];
        for (var c in l)
          Object.prototype.hasOwnProperty.call(l, c) && (n[c] = l[c]);
      }
      return n;
    };
    (function() {
      if (typeof window.CustomEvent == "function")
        return !1;
      function n(t, l) {
        l = l || {
          bubbles: !1,
          cancelable: !1,
          detail: void 0
        };
        var c = document.createEvent("CustomEvent");
        return c.initCustomEvent(t, l.bubbles, l.cancelable, l.detail), c;
      }
      n.prototype = window.Event.prototype, window.CustomEvent = n;
    })(), window.utils = s.default, window.lgData = {
      uid: 0
    }, window.lgModules = {};
    var a = {
      mode: "lg-slide",
      cssEasing: "ease",
      easing: "linear",
      speed: 600,
      height: "100%",
      width: "100%",
      addClass: "",
      startClass: "lg-start-zoom",
      backdropDuration: 150,
      hideBarsDelay: 6e3,
      useLeft: !1,
      ariaLabelledby: "",
      ariaDescribedby: "",
      closable: !0,
      loop: !0,
      escKey: !0,
      keyPress: !0,
      controls: !0,
      slideEndAnimatoin: !0,
      hideControlOnEnd: !1,
      mousewheel: !1,
      getCaptionFromTitleOrAlt: !0,
      appendSubHtmlTo: ".lg-sub-html",
      subHtmlSelectorRelative: !1,
      preload: 1,
      showAfterLoad: !0,
      selector: "",
      selectWithin: "",
      nextHtml: "",
      prevHtml: "",
      index: !1,
      iframeMaxWidth: "100%",
      download: !0,
      counter: !0,
      appendCounterTo: ".lg-toolbar",
      swipeThreshold: 50,
      enableSwipe: !0,
      enableDrag: !0,
      dynamic: !1,
      dynamicEl: [],
      galleryId: 1,
      supportLegacyBrowser: !0
    };
    function u(n, t) {
      if (this.el = n, this.s = o({}, a, t), this.s.dynamic && this.s.dynamicEl !== "undefined" && this.s.dynamicEl.constructor === Array && !this.s.dynamicEl.length)
        throw "When using dynamic mode, you must also define dynamicEl as an Array.";
      return this.modules = {}, this.lGalleryOn = !1, this.lgBusy = !1, this.hideBartimeout = !1, this.isTouch = "ontouchstart" in document.documentElement, this.s.slideEndAnimatoin && (this.s.hideControlOnEnd = !1), this.items = [], this.s.dynamic ? this.items = this.s.dynamicEl : this.s.selector === "this" ? this.items.push(this.el) : this.s.selector !== "" ? this.s.selectWithin ? this.items = document.querySelector(this.s.selectWithin).querySelectorAll(this.s.selector) : this.items = this.el.querySelectorAll(this.s.selector) : this.items = this.el.children, this.___slide = "", this.outer = "", this.init(), this;
    }
    u.prototype.init = function() {
      var n = this;
      n.s.preload > n.items.length && (n.s.preload = n.items.length);
      var t = window.location.hash;
      if (t.indexOf("lg=" + this.s.galleryId) > 0 && (n.index = parseInt(t.split("&slide=")[1], 10), s.default.addClass(document.body, "lg-from-hash"), s.default.hasClass(document.body, "lg-on") || (s.default.addClass(document.body, "lg-on"), setTimeout(function() {
        n.build(n.index);
      }))), n.s.dynamic)
        s.default.trigger(this.el, "onBeforeOpen"), n.index = n.s.index || 0, s.default.hasClass(document.body, "lg-on") || (s.default.addClass(document.body, "lg-on"), setTimeout(function() {
          n.build(n.index);
        }));
      else
        for (var l = 0; l < n.items.length; l++)
          (function(c) {
            s.default.on(n.items[c], "click.lgcustom", function(f) {
              f.preventDefault(), s.default.trigger(n.el, "onBeforeOpen"), n.index = n.s.index || c, s.default.hasClass(document.body, "lg-on") || (n.build(n.index), s.default.addClass(document.body, "lg-on"));
            });
          })(l);
    }, u.prototype.build = function(n) {
      var t = this;
      t.structure();
      for (var l in window.lgModules)
        t.modules[l] = new window.lgModules[l](t.el);
      if (t.slide(n, !1, !1), t.s.keyPress && t.keyPress(), t.items.length > 1 && (t.arrow(), setTimeout(function() {
        t.enableDrag(), t.enableSwipe();
      }, 50), t.s.mousewheel && t.mousewheel()), t.counter(), t.closeGallery(), s.default.trigger(t.el, "onAfterOpen"), t.s.hideBarsDelay > 0) {
        var c = setTimeout(function() {
          s.default.addClass(t.outer, "lg-hide-items");
        }, t.s.hideBarsDelay);
        s.default.on(t.outer, "mousemove.lg click.lg touchstart.lg", function() {
          clearTimeout(c), s.default.removeClass(t.outer, "lg-hide-items"), clearTimeout(t.hideBartimeout), t.hideBartimeout = setTimeout(function() {
            s.default.addClass(t.outer, "lg-hide-items");
          }, t.s.hideBarsDelay);
        });
      }
    }, u.prototype.structure = function() {
      var n = "", t = "", l = 0, c = "", f, d = this;
      for (document.body.insertAdjacentHTML("beforeend", '<div class="lg-backdrop"></div>'), s.default.setVendor(document.querySelector(".lg-backdrop"), "TransitionDuration", this.s.backdropDuration + "ms"), l = 0; l < this.items.length; l++)
        n += '<div class="lg-item"></div>';
      this.s.controls && this.items.length > 1 && (t = '<div class="lg-actions"><button type="button" aria-label="Previous slide" class="lg-prev lg-icon">' + this.s.prevHtml + '</button><button type="button" aria-label="Next slide" class="lg-next lg-icon">' + this.s.nextHtml + "</button></div>"), this.s.appendSubHtmlTo === ".lg-sub-html" && (c = '<div role="status" aria-live="polite" class="lg-sub-html"></div>');
      var h = this.s.ariaLabelledby ? 'aria-labelledby="' + this.s.ariaLabelledby + '"' : "", p = this.s.ariaDescribedby ? 'aria-describedby="' + this.s.ariaDescribedby + '"' : "";
      if (f = '<div tabindex="-1" aria-modal="true" ' + h + " " + p + ' role="dialog" class="lg-outer ' + this.s.addClass + " " + this.s.startClass + '"><div class="lg" style="width:' + this.s.width + "; height:" + this.s.height + '"><div class="lg-inner">' + n + '</div><div class="lg-toolbar lg-group"><button type="button" aria-label="Close gallery" class="lg-close lg-icon"></button></div>' + t + c + "</div></div>", document.body.insertAdjacentHTML("beforeend", f), this.outer = document.querySelector(".lg-outer"), this.outer.focus(), this.___slide = this.outer.querySelectorAll(".lg-item"), this.s.useLeft ? (s.default.addClass(this.outer, "lg-use-left"), this.s.mode = "lg-slide") : s.default.addClass(this.outer, "lg-use-css3"), d.setTop(), s.default.on(window, "resize.lg orientationchange.lg", function() {
        setTimeout(function() {
          d.setTop();
        }, 100);
      }), s.default.addClass(this.___slide[this.index], "lg-current"), this.doCss() ? s.default.addClass(this.outer, "lg-css3") : (s.default.addClass(this.outer, "lg-css"), this.s.speed = 0), s.default.addClass(this.outer, this.s.mode), this.s.enableDrag && this.items.length > 1 && s.default.addClass(this.outer, "lg-grab"), this.s.showAfterLoad && s.default.addClass(this.outer, "lg-show-after-load"), this.doCss()) {
        var g = this.outer.querySelector(".lg-inner");
        s.default.setVendor(g, "TransitionTimingFunction", this.s.cssEasing), s.default.setVendor(g, "TransitionDuration", this.s.speed + "ms");
      }
      setTimeout(function() {
        s.default.addClass(document.querySelector(".lg-backdrop"), "in");
      }), setTimeout(function() {
        s.default.addClass(d.outer, "lg-visible");
      }, this.s.backdropDuration), this.s.download && this.outer.querySelector(".lg-toolbar").insertAdjacentHTML("beforeend", '<a id="lg-download" aria-label="Download" target="_blank" download class="lg-download lg-icon"></a>'), this.prevScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    }, u.prototype.setTop = function() {
      if (this.s.height !== "100%") {
        var n = window.innerHeight, t = (n - parseInt(this.s.height, 10)) / 2, l = this.outer.querySelector(".lg");
        n >= parseInt(this.s.height, 10) ? l.style.top = t + "px" : l.style.top = "0px";
      }
    }, u.prototype.doCss = function() {
      var n = function() {
        var l = ["transition", "MozTransition", "WebkitTransition", "OTransition", "msTransition", "KhtmlTransition"], c = document.documentElement, f = 0;
        for (f = 0; f < l.length; f++)
          if (l[f] in c.style)
            return !0;
      };
      return !!n();
    }, u.prototype.isVideo = function(n, t) {
      var l;
      if (this.s.dynamic ? l = this.s.dynamicEl[t].html : l = this.items[t].getAttribute("data-html"), !n && l)
        return {
          html5: !0
        };
      var c = n.match(/\/\/(?:www\.)?youtu(?:\.be|be\.com|be-nocookie\.com)\/(?:watch\?v=|embed\/)?([a-z0-9\-\_\%]+)/i), f = n.match(/\/\/(?:www\.)?vimeo.com\/([0-9a-z\-_]+)/i), d = n.match(/\/\/(?:www\.)?dai.ly\/([0-9a-z\-_]+)/i), h = n.match(/\/\/(?:www\.)?(?:vk\.com|vkontakte\.ru)\/(?:video_ext\.php\?)(.*)/i);
      if (c)
        return {
          youtube: c
        };
      if (f)
        return {
          vimeo: f
        };
      if (d)
        return {
          dailymotion: d
        };
      if (h)
        return {
          vk: h
        };
    }, u.prototype.counter = function() {
      this.s.counter && this.outer.querySelector(this.s.appendCounterTo).insertAdjacentHTML("beforeend", '<div id="lg-counter" role="status" aria-live="polite"><span id="lg-counter-current">' + (parseInt(this.index, 10) + 1) + '</span> / <span id="lg-counter-all">' + this.items.length + "</span></div>");
    }, u.prototype.addHtml = function(n) {
      var t = null, l;
      if (this.s.dynamic ? t = this.s.dynamicEl[n].subHtml : (l = this.items[n], t = l.getAttribute("data-sub-html"), this.s.getCaptionFromTitleOrAlt && !t && (t = l.getAttribute("title"), t && l.querySelector("img") && (t = l.querySelector("img").getAttribute("alt")))), typeof t < "u" && t !== null) {
        var c = t.substring(0, 1);
        (c === "." || c === "#") && (this.s.subHtmlSelectorRelative && !this.s.dynamic ? t = l.querySelector(t).innerHTML : t = document.querySelector(t).innerHTML);
      } else
        t = "";
      this.s.appendSubHtmlTo === ".lg-sub-html" ? this.outer.querySelector(this.s.appendSubHtmlTo).innerHTML = t : this.___slide[n].insertAdjacentHTML("beforeend", t), typeof t < "u" && t !== null && (t === "" ? s.default.addClass(this.outer.querySelector(this.s.appendSubHtmlTo), "lg-empty-html") : s.default.removeClass(this.outer.querySelector(this.s.appendSubHtmlTo), "lg-empty-html")), s.default.trigger(this.el, "onAfterAppendSubHtml", {
        index: n
      });
    }, u.prototype.preload = function(n) {
      var t = 1, l = 1;
      for (t = 1; t <= this.s.preload && !(t >= this.items.length - n); t++)
        this.loadContent(n + t, !1, 0);
      for (l = 1; l <= this.s.preload && !(n - l < 0); l++)
        this.loadContent(n - l, !1, 0);
    }, u.prototype.loadContent = function(n, t, l) {
      var c = this, f = !1, d, h, p, g, _, b, y, m = function(nt) {
        for (var De = [], ot = [], Ie = 0; Ie < nt.length; Ie++) {
          var fe = nt[Ie].split(" ");
          fe[0] === "" && fe.splice(0, 1), ot.push(fe[0]), De.push(fe[1]);
        }
        for (var ns = window.innerWidth, de = 0; de < De.length; de++)
          if (parseInt(De[de], 10) > ns) {
            h = ot[de];
            break;
          }
      };
      if (c.s.dynamic) {
        if (c.s.dynamicEl[n].poster && (f = !0, p = c.s.dynamicEl[n].poster), b = c.s.dynamicEl[n].html, h = c.s.dynamicEl[n].src, y = c.s.dynamicEl[n].alt, c.s.dynamicEl[n].responsive) {
          var M = c.s.dynamicEl[n].responsive.split(",");
          m(M);
        }
        g = c.s.dynamicEl[n].srcset, _ = c.s.dynamicEl[n].sizes;
      } else {
        if (c.items[n].getAttribute("data-poster") && (f = !0, p = c.items[n].getAttribute("data-poster")), b = c.items[n].getAttribute("data-html"), h = c.items[n].getAttribute("href") || c.items[n].getAttribute("data-src"), y = c.items[n].getAttribute("title"), c.items[n].querySelector("img") && (y = y || c.items[n].querySelector("img").getAttribute("alt")), c.items[n].getAttribute("data-responsive")) {
          var E = c.items[n].getAttribute("data-responsive").split(",");
          m(E);
        }
        g = c.items[n].getAttribute("data-srcset"), _ = c.items[n].getAttribute("data-sizes");
      }
      var N = !1;
      c.s.dynamic ? c.s.dynamicEl[n].iframe && (N = !0) : c.items[n].getAttribute("data-iframe") === "true" && (N = !0);
      var V = c.isVideo(h, n);
      if (!s.default.hasClass(c.___slide[n], "lg-loaded")) {
        if (N)
          c.___slide[n].insertAdjacentHTML("afterbegin", '<div class="lg-video-cont" style="max-width:' + c.s.iframeMaxWidth + '"><div class="lg-video"><iframe class="lg-object" frameborder="0" src="' + h + '"  allowfullscreen="true"></iframe></div></div>');
        else if (f) {
          var ue = "";
          V && V.youtube ? ue = "lg-has-youtube" : V && V.vimeo ? ue = "lg-has-vimeo" : ue = "lg-has-html5", c.___slide[n].insertAdjacentHTML("beforeend", '<div class="lg-video-cont ' + ue + ' "><div class="lg-video"><span class="lg-video-play"></span><img class="lg-object lg-has-poster" src="' + p + '" /></div></div>');
        } else
          V ? (c.___slide[n].insertAdjacentHTML("beforeend", '<div class="lg-video-cont "><div class="lg-video"></div></div>'), s.default.trigger(c.el, "hasVideo", {
            index: n,
            src: h,
            html: b
          })) : (y = y ? 'alt="' + y + '"' : "", c.___slide[n].insertAdjacentHTML("beforeend", '<div class="lg-img-wrap"><img class="lg-object lg-image" ' + y + ' src="' + h + '" /></div>'));
        if (s.default.trigger(c.el, "onAferAppendSlide", {
          index: n
        }), d = c.___slide[n].querySelector(".lg-object"), _ && d.setAttribute("sizes", _), g && (d.setAttribute("srcset", g), this.s.supportLegacyBrowser))
          try {
            picturefill({
              elements: [d[0]]
            });
          } catch {
            console.warn("If you want srcset to be supported for older browsers, please include picturefil javascript library in your document.");
          }
        this.s.appendSubHtmlTo !== ".lg-sub-html" && c.addHtml(n), s.default.addClass(c.___slide[n], "lg-loaded");
      }
      s.default.on(c.___slide[n].querySelector(".lg-object"), "load.lg error.lg", function() {
        var ce = 0;
        l && !s.default.hasClass(document.body, "lg-from-hash") && (ce = l), setTimeout(function() {
          s.default.addClass(c.___slide[n], "lg-complete"), s.default.trigger(c.el, "onSlideItemLoad", {
            index: n,
            delay: l || 0
          });
        }, ce);
      }), V && V.html5 && !f && s.default.addClass(c.___slide[n], "lg-complete"), t === !0 && (s.default.hasClass(c.___slide[n], "lg-complete") ? c.preload(n) : s.default.on(c.___slide[n].querySelector(".lg-object"), "load.lg error.lg", function() {
        c.preload(n);
      }));
    }, u.prototype.slide = function(n, t, l) {
      for (var c = 0, f = 0; f < this.___slide.length; f++)
        if (s.default.hasClass(this.___slide[f], "lg-current")) {
          c = f;
          break;
        }
      var d = this;
      if (!(d.lGalleryOn && c === n)) {
        var h = this.___slide.length, p = d.lGalleryOn ? this.s.speed : 0, g = !1, _ = !1;
        if (!d.lgBusy) {
          if (this.s.download) {
            var b;
            d.s.dynamic ? b = d.s.dynamicEl[n].downloadUrl !== !1 && (d.s.dynamicEl[n].downloadUrl || d.s.dynamicEl[n].src) : b = d.items[n].getAttribute("data-download-url") !== "false" && (d.items[n].getAttribute("data-download-url") || d.items[n].getAttribute("href") || d.items[n].getAttribute("data-src")), b ? (document.getElementById("lg-download").setAttribute("href", b), s.default.removeClass(d.outer, "lg-hide-download")) : s.default.addClass(d.outer, "lg-hide-download");
          }
          if (s.default.trigger(d.el, "onBeforeSlide", {
            prevIndex: c,
            index: n,
            fromTouch: t,
            fromThumb: l
          }), d.lgBusy = !0, clearTimeout(d.hideBartimeout), this.s.appendSubHtmlTo === ".lg-sub-html" && setTimeout(function() {
            d.addHtml(n);
          }, p), this.arrowDisable(n), t) {
            var m = n - 1, M = n + 1;
            (n === 0 && c === h - 1 || n === h - 1 && c === 0) && (M = 0, m = h - 1), s.default.removeClass(d.outer.querySelector(".lg-prev-slide"), "lg-prev-slide"), s.default.removeClass(d.outer.querySelector(".lg-current"), "lg-current"), s.default.removeClass(d.outer.querySelector(".lg-next-slide"), "lg-next-slide"), s.default.addClass(d.___slide[m], "lg-prev-slide"), s.default.addClass(d.___slide[M], "lg-next-slide"), s.default.addClass(d.___slide[n], "lg-current");
          } else {
            s.default.addClass(d.outer, "lg-no-trans");
            for (var y = 0; y < this.___slide.length; y++)
              s.default.removeClass(this.___slide[y], "lg-prev-slide"), s.default.removeClass(this.___slide[y], "lg-next-slide");
            n < c ? (_ = !0, n === 0 && c === h - 1 && !l && (_ = !1, g = !0)) : n > c && (g = !0, n === h - 1 && c === 0 && !l && (_ = !0, g = !1)), _ ? (s.default.addClass(this.___slide[n], "lg-prev-slide"), s.default.addClass(this.___slide[c], "lg-next-slide")) : g && (s.default.addClass(this.___slide[n], "lg-next-slide"), s.default.addClass(this.___slide[c], "lg-prev-slide")), setTimeout(function() {
              s.default.removeClass(d.outer.querySelector(".lg-current"), "lg-current"), s.default.addClass(d.___slide[n], "lg-current"), s.default.removeClass(d.outer, "lg-no-trans");
            }, 50);
          }
          d.lGalleryOn ? (setTimeout(function() {
            d.loadContent(n, !0, 0);
          }, this.s.speed + 50), setTimeout(function() {
            d.lgBusy = !1, s.default.trigger(d.el, "onAfterSlide", {
              prevIndex: c,
              index: n,
              fromTouch: t,
              fromThumb: l
            });
          }, this.s.speed)) : (d.loadContent(n, !0, d.s.backdropDuration), d.lgBusy = !1, s.default.trigger(d.el, "onAfterSlide", {
            prevIndex: c,
            index: n,
            fromTouch: t,
            fromThumb: l
          })), d.lGalleryOn = !0, this.s.counter && document.getElementById("lg-counter-current") && (document.getElementById("lg-counter-current").innerHTML = n + 1);
        }
      }
    }, u.prototype.goToNextSlide = function(n) {
      var t = this;
      t.lgBusy || (t.index + 1 < t.___slide.length ? (t.index++, s.default.trigger(t.el, "onBeforeNextSlide", {
        index: t.index
      }), t.slide(t.index, n, !1)) : t.s.loop ? (t.index = 0, s.default.trigger(t.el, "onBeforeNextSlide", {
        index: t.index
      }), t.slide(t.index, n, !1)) : t.s.slideEndAnimatoin && (s.default.addClass(t.outer, "lg-right-end"), setTimeout(function() {
        s.default.removeClass(t.outer, "lg-right-end");
      }, 400)));
    }, u.prototype.goToPrevSlide = function(n) {
      var t = this;
      t.lgBusy || (t.index > 0 ? (t.index--, s.default.trigger(t.el, "onBeforePrevSlide", {
        index: t.index,
        fromTouch: n
      }), t.slide(t.index, n, !1)) : t.s.loop ? (t.index = t.items.length - 1, s.default.trigger(t.el, "onBeforePrevSlide", {
        index: t.index,
        fromTouch: n
      }), t.slide(t.index, n, !1)) : t.s.slideEndAnimatoin && (s.default.addClass(t.outer, "lg-left-end"), setTimeout(function() {
        s.default.removeClass(t.outer, "lg-left-end");
      }, 400)));
    }, u.prototype.keyPress = function() {
      var n = this;
      this.items.length > 1 && s.default.on(window, "keyup.lg", function(t) {
        n.items.length > 1 && (t.keyCode === 37 && (t.preventDefault(), n.goToPrevSlide()), t.keyCode === 39 && (t.preventDefault(), n.goToNextSlide()));
      }), s.default.on(window, "keydown.lg", function(t) {
        n.s.escKey === !0 && t.keyCode === 27 && (t.preventDefault(), s.default.hasClass(n.outer, "lg-thumb-open") ? s.default.removeClass(n.outer, "lg-thumb-open") : n.destroy());
      });
    }, u.prototype.arrow = function() {
      var n = this;
      s.default.on(this.outer.querySelector(".lg-prev"), "click.lg", function() {
        n.goToPrevSlide();
      }), s.default.on(this.outer.querySelector(".lg-next"), "click.lg", function() {
        n.goToNextSlide();
      });
    }, u.prototype.arrowDisable = function(n) {
      if (!this.s.loop && this.s.hideControlOnEnd) {
        var t = this.outer.querySelector(".lg-next"), l = this.outer.querySelector(".lg-prev");
        n + 1 < this.___slide.length ? (t.removeAttribute("disabled"), s.default.removeClass(t, "disabled")) : (t.setAttribute("disabled", "disabled"), s.default.addClass(t, "disabled")), n > 0 ? (l.removeAttribute("disabled"), s.default.removeClass(l, "disabled")) : (l.setAttribute("disabled", "disabled"), s.default.addClass(l, "disabled"));
      }
    }, u.prototype.setTranslate = function(n, t, l) {
      this.s.useLeft ? n.style.left = t : s.default.setVendor(n, "Transform", "translate3d(" + t + "px, " + l + "px, 0px)");
    }, u.prototype.touchMove = function(n, t) {
      var l = t - n;
      Math.abs(l) > 15 && (s.default.addClass(this.outer, "lg-dragging"), this.setTranslate(this.___slide[this.index], l, 0), this.setTranslate(document.querySelector(".lg-prev-slide"), -this.___slide[this.index].clientWidth + l, 0), this.setTranslate(document.querySelector(".lg-next-slide"), this.___slide[this.index].clientWidth + l, 0));
    }, u.prototype.touchEnd = function(n) {
      var t = this;
      t.s.mode !== "lg-slide" && s.default.addClass(t.outer, "lg-slide");
      for (var l = 0; l < this.___slide.length; l++)
        !s.default.hasClass(this.___slide[l], "lg-current") && !s.default.hasClass(this.___slide[l], "lg-prev-slide") && !s.default.hasClass(this.___slide[l], "lg-next-slide") && (this.___slide[l].style.opacity = "0");
      setTimeout(function() {
        s.default.removeClass(t.outer, "lg-dragging"), n < 0 && Math.abs(n) > t.s.swipeThreshold ? t.goToNextSlide(!0) : n > 0 && Math.abs(n) > t.s.swipeThreshold ? t.goToPrevSlide(!0) : Math.abs(n) < 5 && s.default.trigger(t.el, "onSlideClick");
        for (var c = 0; c < t.___slide.length; c++)
          t.___slide[c].removeAttribute("style");
      }), setTimeout(function() {
        !s.default.hasClass(t.outer, "lg-dragging") && t.s.mode !== "lg-slide" && s.default.removeClass(t.outer, "lg-slide");
      }, t.s.speed + 100);
    }, u.prototype.enableSwipe = function() {
      var n = this, t = 0, l = 0, c = !1;
      if (n.s.enableSwipe && n.isTouch && n.doCss()) {
        for (var f = 0; f < n.___slide.length; f++)
          s.default.on(n.___slide[f], "touchstart.lg", function(p) {
            !s.default.hasClass(n.outer, "lg-zoomed") && !n.lgBusy && (p.preventDefault(), n.manageSwipeClass(), t = p.targetTouches[0].pageX);
          });
        for (var d = 0; d < n.___slide.length; d++)
          s.default.on(n.___slide[d], "touchmove.lg", function(p) {
            s.default.hasClass(n.outer, "lg-zoomed") || (p.preventDefault(), l = p.targetTouches[0].pageX, n.touchMove(t, l), c = !0);
          });
        for (var h = 0; h < n.___slide.length; h++)
          s.default.on(n.___slide[h], "touchend.lg", function() {
            s.default.hasClass(n.outer, "lg-zoomed") || (c ? (c = !1, n.touchEnd(l - t)) : s.default.trigger(n.el, "onSlideClick"));
          });
      }
    }, u.prototype.enableDrag = function() {
      var n = this, t = 0, l = 0, c = !1, f = !1;
      if (n.s.enableDrag && !n.isTouch && n.doCss()) {
        for (var d = 0; d < n.___slide.length; d++)
          s.default.on(n.___slide[d], "mousedown.lg", function(h) {
            s.default.hasClass(n.outer, "lg-zoomed") || (s.default.hasClass(h.target, "lg-object") || s.default.hasClass(h.target, "lg-video-play")) && (h.preventDefault(), n.lgBusy || (n.manageSwipeClass(), t = h.pageX, c = !0, n.outer.scrollLeft += 1, n.outer.scrollLeft -= 1, s.default.removeClass(n.outer, "lg-grab"), s.default.addClass(n.outer, "lg-grabbing"), s.default.trigger(n.el, "onDragstart")));
          });
        s.default.on(window, "mousemove.lg", function(h) {
          c && (f = !0, l = h.pageX, n.touchMove(t, l), s.default.trigger(n.el, "onDragmove"));
        }), s.default.on(window, "mouseup.lg", function(h) {
          f ? (f = !1, n.touchEnd(l - t), s.default.trigger(n.el, "onDragend")) : (s.default.hasClass(h.target, "lg-object") || s.default.hasClass(h.target, "lg-video-play")) && s.default.trigger(n.el, "onSlideClick"), c && (c = !1, s.default.removeClass(n.outer, "lg-grabbing"), s.default.addClass(n.outer, "lg-grab"));
        });
      }
    }, u.prototype.manageSwipeClass = function() {
      var n = this.index + 1, t = this.index - 1, l = this.___slide.length;
      this.s.loop && (this.index === 0 ? t = l - 1 : this.index === l - 1 && (n = 0));
      for (var c = 0; c < this.___slide.length; c++)
        s.default.removeClass(this.___slide[c], "lg-next-slide"), s.default.removeClass(this.___slide[c], "lg-prev-slide");
      t > -1 && s.default.addClass(this.___slide[t], "lg-prev-slide"), s.default.addClass(this.___slide[n], "lg-next-slide");
    }, u.prototype.mousewheel = function() {
      var n = this;
      s.default.on(n.outer, "mousewheel.lg", function(t) {
        t.deltaY && (t.deltaY > 0 ? n.goToPrevSlide() : n.goToNextSlide(), t.preventDefault());
      });
    }, u.prototype.closeGallery = function() {
      var n = this, t = !1;
      s.default.on(this.outer.querySelector(".lg-close"), "click.lg", function() {
        n.destroy();
      }), n.s.closable && (s.default.on(n.outer, "mousedown.lg", function(l) {
        s.default.hasClass(l.target, "lg-outer") || s.default.hasClass(l.target, "lg-item") || s.default.hasClass(l.target, "lg-img-wrap") ? t = !0 : t = !1;
      }), s.default.on(n.outer, "mouseup.lg", function(l) {
        (s.default.hasClass(l.target, "lg-outer") || s.default.hasClass(l.target, "lg-item") || s.default.hasClass(l.target, "lg-img-wrap") && t) && (s.default.hasClass(n.outer, "lg-dragging") || n.destroy());
      }));
    }, u.prototype.destroy = function(n) {
      var t = this;
      if (n || s.default.trigger(t.el, "onBeforeClose"), document.body.scrollTop = t.prevScrollTop, document.documentElement.scrollTop = t.prevScrollTop, n) {
        if (!t.s.dynamic)
          for (var l = 0; l < this.items.length; l++)
            s.default.off(this.items[l], ".lg"), s.default.off(this.items[l], ".lgcustom");
        var c = t.el.getAttribute("lg-uid");
        delete window.lgData[c], t.el.removeAttribute("lg-uid");
      }
      s.default.off(this.el, ".lgtm");
      for (var f in window.lgModules)
        t.modules[f] && t.modules[f].destroy(n);
      this.lGalleryOn = !1, clearTimeout(t.hideBartimeout), this.hideBartimeout = !1, s.default.off(window, ".lg"), s.default.removeClass(document.body, "lg-on"), s.default.removeClass(document.body, "lg-from-hash"), t.outer && s.default.removeClass(t.outer, "lg-visible"), s.default.removeClass(document.querySelector(".lg-backdrop"), "in"), setTimeout(function() {
        try {
          t.outer && t.outer.parentNode.removeChild(t.outer), document.querySelector(".lg-backdrop") && document.querySelector(".lg-backdrop").parentNode.removeChild(document.querySelector(".lg-backdrop")), n || s.default.trigger(t.el, "onCloseAfter"), t.el.focus();
        } catch {
        }
      }, t.s.backdropDuration + 50);
    }, window.lightGallery = function(n, t) {
      if (n)
        try {
          if (n.getAttribute("lg-uid"))
            window.lgData[n.getAttribute("lg-uid")].init();
          else {
            var l = "lg" + window.lgData.uid++;
            window.lgData[l] = new u(n, t), n.setAttribute("lg-uid", l);
          }
        } catch (c) {
          console.error("lightGallery has not initiated properly", c);
        }
    };
  });
})();
function T(e) {
  throw new Error('Could not dynamically require "' + e + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var lt = {}, is = {
  get exports() {
    return lt;
  },
  set exports(e) {
    lt = e;
  }
};
/**!
 * lg-fullscreen.js | 1.1.2 | September 14th 2019
 * http://sachinchoolur.github.io/lg-fullscreen.js
 * Copyright (c) 2016 Sachin N; 
 * @license GPLv3 
 */
(function(e, r) {
  (function(s) {
    e.exports = s();
  })(function() {
    return function() {
      function s(i, o, a) {
        function u(l, c) {
          if (!o[l]) {
            if (!i[l]) {
              var f = typeof T == "function" && T;
              if (!c && f)
                return f(l, !0);
              if (n)
                return n(l, !0);
              var d = new Error("Cannot find module '" + l + "'");
              throw d.code = "MODULE_NOT_FOUND", d;
            }
            var h = o[l] = { exports: {} };
            i[l][0].call(h.exports, function(p) {
              var g = i[l][1][p];
              return u(g || p);
            }, h, h.exports, s, i, o, a);
          }
          return o[l].exports;
        }
        for (var n = typeof T == "function" && T, t = 0; t < a.length; t++)
          u(a[t]);
        return u;
      }
      return s;
    }()({ 1: [function(s, i, o) {
      (function(a, u) {
        if (typeof o < "u")
          u();
        else {
          var n = {
            exports: {}
          };
          u(), a.lgFullscreen = n.exports;
        }
      })(this, function() {
        var a = Object.assign || function(t) {
          for (var l = 1; l < arguments.length; l++) {
            var c = arguments[l];
            for (var f in c)
              Object.prototype.hasOwnProperty.call(c, f) && (t[f] = c[f]);
          }
          return t;
        }, u = {
          fullScreen: !0
        }, n = function(l) {
          return this.el = l, this.core = window.lgData[this.el.getAttribute("lg-uid")], this.core.s = a({}, u, this.core.s), this.init(), this;
        };
        n.prototype.isFullScreen = function() {
          var t = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
          return t === this.core.outer;
        }, n.prototype.init = function() {
          var t = "";
          if (this.core.s.fullScreen) {
            if (!document.fullscreenEnabled && !document.webkitFullscreenEnabled && !document.mozFullScreenEnabled && !document.msFullscreenEnabled)
              return;
            t = '<span class="lg-fullscreen lg-icon"></span>', this.core.outer.querySelector(".lg-toolbar").insertAdjacentHTML("beforeend", t), this.fullScreen();
          }
        }, n.prototype.requestFullscreen = function() {
          var t = this.core.outer;
          t.requestFullscreen ? t.requestFullscreen() : t.msRequestFullscreen ? t.msRequestFullscreen() : t.mozRequestFullScreen ? t.mozRequestFullScreen() : t.webkitRequestFullscreen && t.webkitRequestFullscreen();
        }, n.prototype.exitFullscreen = function() {
          document.exitFullscreen ? document.exitFullscreen() : document.msExitFullscreen ? document.msExitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen && document.webkitExitFullscreen();
        }, n.prototype.fullScreen = function() {
          var t = this;
          utils.on(document, "fullscreenchange.lgfullscreen webkitfullscreenchange.lgfullscreen mozfullscreenchange.lgfullscreen MSFullscreenChange.lgfullscreen", function() {
            utils.hasClass(t.core.outer, "lg-fullscreen-on") ? utils.removeClass(t.core.outer, "lg-fullscreen-on") : utils.addClass(t.core.outer, "lg-fullscreen-on");
          }), utils.on(this.core.outer.querySelector(".lg-fullscreen"), "click.lg", function() {
            t.isFullScreen() ? t.exitFullscreen() : t.requestFullscreen();
          });
        }, n.prototype.destroy = function() {
          this.isFullScreen() && this.exitFullscreen(), utils.off(document, ".lgfullscreen");
        }, window.lgModules.fullscreen = n;
      });
    }, {}] }, {}, [1])(1);
  });
})(is);
var at = {}, ls = {
  get exports() {
    return at;
  },
  set exports(e) {
    at = e;
  }
};
/**!
 * lg-thumbnail.js | 1.2.0 | May 20th 2020
 * http://sachinchoolur.github.io/lg-thumbnail.js
 * Copyright (c) 2016 Sachin N; 
 * @license GPLv3 
 */
(function(e, r) {
  (function(s) {
    e.exports = s();
  })(function() {
    return function() {
      function s(i, o, a) {
        function u(l, c) {
          if (!o[l]) {
            if (!i[l]) {
              var f = typeof T == "function" && T;
              if (!c && f)
                return f(l, !0);
              if (n)
                return n(l, !0);
              var d = new Error("Cannot find module '" + l + "'");
              throw d.code = "MODULE_NOT_FOUND", d;
            }
            var h = o[l] = { exports: {} };
            i[l][0].call(h.exports, function(p) {
              var g = i[l][1][p];
              return u(g || p);
            }, h, h.exports, s, i, o, a);
          }
          return o[l].exports;
        }
        for (var n = typeof T == "function" && T, t = 0; t < a.length; t++)
          u(a[t]);
        return u;
      }
      return s;
    }()({ 1: [function(s, i, o) {
      (function(a, u) {
        if (typeof o < "u")
          u();
        else {
          var n = {
            exports: {}
          };
          u(), a.lgThumbnail = n.exports;
        }
      })(this, function() {
        var a = Object.assign || function(t) {
          for (var l = 1; l < arguments.length; l++) {
            var c = arguments[l];
            for (var f in c)
              Object.prototype.hasOwnProperty.call(c, f) && (t[f] = c[f]);
          }
          return t;
        }, u = {
          thumbnail: !0,
          animateThumb: !0,
          currentPagerPosition: "middle",
          thumbWidth: 100,
          thumbContHeight: 100,
          thumbMargin: 5,
          exThumbImage: !1,
          showThumbByDefault: !0,
          toggleThumb: !0,
          pullCaptionUp: !0,
          enableThumbDrag: !0,
          enableThumbSwipe: !0,
          swipeThreshold: 50,
          loadYoutubeThumbnail: !0,
          youtubeThumbSize: 1,
          loadVimeoThumbnail: !0,
          vimeoThumbSize: "thumbnail_small",
          loadDailymotionThumbnail: !0
        }, n = function(l) {
          return this.el = l, this.core = window.lgData[this.el.getAttribute("lg-uid")], this.core.s = a({}, u, this.core.s), this.thumbOuter = null, this.thumbOuterWidth = 0, this.thumbTotalWidth = this.core.items.length * (this.core.s.thumbWidth + this.core.s.thumbMargin), this.thumbIndex = this.core.index, this.left = 0, this.init(), this;
        };
        n.prototype.init = function() {
          var t = this;
          this.core.s.thumbnail && this.core.items.length > 1 && (this.core.s.showThumbByDefault && setTimeout(function() {
            utils.addClass(t.core.outer, "lg-thumb-open");
          }, 700), this.core.s.pullCaptionUp && utils.addClass(this.core.outer, "lg-pull-caption-up"), this.build(), this.core.s.animateThumb ? (this.core.s.enableThumbDrag && !this.core.isTouch && this.core.doCss() && this.enableThumbDrag(), this.core.s.enableThumbSwipe && this.core.isTouch && this.core.doCss() && this.enableThumbSwipe(), this.thumbClickable = !1) : this.thumbClickable = !0, this.toggle(), this.thumbkeyPress());
        }, n.prototype.build = function() {
          var t = this, l = "", c = "", f, d = '<div class="lg-thumb-outer"><div class="lg-thumb group"></div></div>';
          switch (this.core.s.vimeoThumbSize) {
            case "thumbnail_large":
              c = "640";
              break;
            case "thumbnail_medium":
              c = "200x150";
              break;
            case "thumbnail_small":
              c = "100x75";
          }
          utils.addClass(t.core.outer, "lg-has-thumb"), t.core.outer.querySelector(".lg").insertAdjacentHTML("beforeend", d), t.thumbOuter = t.core.outer.querySelector(".lg-thumb-outer"), t.thumbOuterWidth = t.thumbOuter.offsetWidth, t.core.s.animateThumb && (t.core.outer.querySelector(".lg-thumb").style.width = t.thumbTotalWidth + "px", t.core.outer.querySelector(".lg-thumb").style.position = "relative"), this.core.s.animateThumb && (t.thumbOuter.style.height = t.core.s.thumbContHeight + "px");
          function h(y, m, M) {
            var E = t.core.isVideo(y, M) || {}, N, V = "";
            E.youtube || E.vimeo || E.dailymotion ? E.youtube ? t.core.s.loadYoutubeThumbnail ? N = "//img.youtube.com/vi/" + E.youtube[1] + "/" + t.core.s.youtubeThumbSize + ".jpg" : N = m : E.vimeo ? t.core.s.loadVimeoThumbnail ? (N = "//i.vimeocdn.com/video/error_" + c + ".jpg", V = E.vimeo[1]) : N = m : E.dailymotion && (t.core.s.loadDailymotionThumbnail ? N = "//www.dailymotion.com/thumbnail/video/" + E.dailymotion[1] : N = m) : N = m, l += '<div data-vimeo-id="' + V + '" class="lg-thumb-item" style="width:' + t.core.s.thumbWidth + "px; margin-right: " + t.core.s.thumbMargin + 'px"><img src="' + N + '" /></div>', V = "";
          }
          if (t.core.s.dynamic)
            for (var p = 0; p < t.core.s.dynamicEl.length; p++)
              h(t.core.s.dynamicEl[p].src, t.core.s.dynamicEl[p].thumb, p);
          else
            for (var g = 0; g < t.core.items.length; g++)
              t.core.s.exThumbImage ? h(t.core.items[g].getAttribute("href") || t.core.items[g].getAttribute("data-src"), t.core.items[g].getAttribute(t.core.s.exThumbImage), g) : h(t.core.items[g].getAttribute("href") || t.core.items[g].getAttribute("data-src"), t.core.items[g].querySelector("img").getAttribute("src"), g);
          t.core.outer.querySelector(".lg-thumb").innerHTML = l, f = t.core.outer.querySelectorAll(".lg-thumb-item");
          for (var _ = 0; _ < f.length; _++)
            (function(y) {
              var m = f[y], M = m.getAttribute("data-vimeo-id");
              if (M) {
                window["lgJsonP" + t.el.getAttribute("lg-uid") + _] = function(N) {
                  m.querySelector("img").setAttribute("src", N[0][t.core.s.vimeoThumbSize]);
                };
                var E = document.createElement("script");
                E.className = "lg-script", E.src = "//www.vimeo.com/api/v2/video/" + M + ".json?callback=lgJsonP" + t.el.getAttribute("lg-uid") + _, document.body.appendChild(E);
              }
            })(_);
          utils.addClass(f[t.core.index], "active"), utils.on(t.core.el, "onBeforeSlide.lgtm", function() {
            for (var y = 0; y < f.length; y++)
              utils.removeClass(f[y], "active");
            utils.addClass(f[t.core.index], "active");
          });
          for (var b = 0; b < f.length; b++)
            (function(y) {
              utils.on(f[y], "click.lg touchend.lg", function() {
                setTimeout(function() {
                  (t.thumbClickable && !t.core.lgBusy || !t.core.doCss()) && (t.core.index = y, t.core.slide(t.core.index, !1, !0));
                }, 50);
              });
            })(b);
          utils.on(t.core.el, "onBeforeSlide.lgtm", function() {
            t.animateThumb(t.core.index);
          }), utils.on(window, "resize.lgthumb orientationchange.lgthumb", function() {
            setTimeout(function() {
              t.animateThumb(t.core.index), t.thumbOuterWidth = t.thumbOuter.offsetWidth;
            }, 200);
          });
        }, n.prototype.setTranslate = function(t) {
          utils.setVendor(this.core.outer.querySelector(".lg-thumb"), "Transform", "translate3d(-" + t + "px, 0px, 0px)");
        }, n.prototype.animateThumb = function(t) {
          var l = this.core.outer.querySelector(".lg-thumb");
          if (this.core.s.animateThumb) {
            var c;
            switch (this.core.s.currentPagerPosition) {
              case "left":
                c = 0;
                break;
              case "middle":
                c = this.thumbOuterWidth / 2 - this.core.s.thumbWidth / 2;
                break;
              case "right":
                c = this.thumbOuterWidth - this.core.s.thumbWidth;
            }
            this.left = (this.core.s.thumbWidth + this.core.s.thumbMargin) * t - 1 - c, this.left > this.thumbTotalWidth - this.thumbOuterWidth && (this.left = this.thumbTotalWidth - this.thumbOuterWidth), this.left < 0 && (this.left = 0), this.core.lGalleryOn ? (utils.hasClass(l, "on") || utils.setVendor(this.core.outer.querySelector(".lg-thumb"), "TransitionDuration", this.core.s.speed + "ms"), this.core.doCss() || (l.style.left = -this.left + "px")) : this.core.doCss() || (l.style.left = -this.left + "px"), this.setTranslate(this.left);
          }
        }, n.prototype.enableThumbDrag = function() {
          var t = this, l = 0, c = 0, f = !1, d = !1, h = 0;
          utils.addClass(t.thumbOuter, "lg-grab"), utils.on(t.core.outer.querySelector(".lg-thumb"), "mousedown.lgthumb", function(p) {
            t.thumbTotalWidth > t.thumbOuterWidth && (p.preventDefault(), l = p.pageX, f = !0, t.core.outer.scrollLeft += 1, t.core.outer.scrollLeft -= 1, t.thumbClickable = !1, utils.removeClass(t.thumbOuter, "lg-grab"), utils.addClass(t.thumbOuter, "lg-grabbing"));
          }), utils.on(window, "mousemove.lgthumb", function(p) {
            f && (h = t.left, d = !0, c = p.pageX, utils.addClass(t.thumbOuter, "lg-dragging"), h = h - (c - l), h > t.thumbTotalWidth - t.thumbOuterWidth && (h = t.thumbTotalWidth - t.thumbOuterWidth), h < 0 && (h = 0), t.setTranslate(h));
          }), utils.on(window, "mouseup.lgthumb", function() {
            d ? (d = !1, utils.removeClass(t.thumbOuter, "lg-dragging"), t.left = h, Math.abs(c - l) < t.core.s.swipeThreshold && (t.thumbClickable = !0)) : t.thumbClickable = !0, f && (f = !1, utils.removeClass(t.thumbOuter, "lg-grabbing"), utils.addClass(t.thumbOuter, "lg-grab"));
          });
        }, n.prototype.enableThumbSwipe = function() {
          var t = this, l = 0, c = 0, f = !1, d = 0;
          utils.on(t.core.outer.querySelector(".lg-thumb"), "touchstart.lg", function(h) {
            t.thumbTotalWidth > t.thumbOuterWidth && (h.preventDefault(), l = h.targetTouches[0].pageX, t.thumbClickable = !1);
          }), utils.on(t.core.outer.querySelector(".lg-thumb"), "touchmove.lg", function(h) {
            t.thumbTotalWidth > t.thumbOuterWidth && (h.preventDefault(), c = h.targetTouches[0].pageX, f = !0, utils.addClass(t.thumbOuter, "lg-dragging"), d = t.left, d = d - (c - l), d > t.thumbTotalWidth - t.thumbOuterWidth && (d = t.thumbTotalWidth - t.thumbOuterWidth), d < 0 && (d = 0), t.setTranslate(d));
          }), utils.on(t.core.outer.querySelector(".lg-thumb"), "touchend.lg", function() {
            t.thumbTotalWidth > t.thumbOuterWidth && f ? (f = !1, utils.removeClass(t.thumbOuter, "lg-dragging"), Math.abs(c - l) < t.core.s.swipeThreshold && (t.thumbClickable = !0), t.left = d) : t.thumbClickable = !0;
          });
        }, n.prototype.toggle = function() {
          var t = this;
          t.core.s.toggleThumb && (utils.addClass(t.core.outer, "lg-can-toggle"), t.thumbOuter.insertAdjacentHTML("beforeend", '<button aria-label="Toggle thumbnails" class="lg-toggle-thumb lg-icon"></button>'), utils.on(t.core.outer.querySelector(".lg-toggle-thumb"), "click.lg", function() {
            utils.hasClass(t.core.outer, "lg-thumb-open") ? utils.removeClass(t.core.outer, "lg-thumb-open") : utils.addClass(t.core.outer, "lg-thumb-open");
          }));
        }, n.prototype.thumbkeyPress = function() {
          var t = this;
          utils.on(window, "keydown.lgthumb", function(l) {
            l.keyCode === 38 ? (l.preventDefault(), utils.addClass(t.core.outer, "lg-thumb-open")) : l.keyCode === 40 && (l.preventDefault(), utils.removeClass(t.core.outer, "lg-thumb-open"));
          });
        }, n.prototype.destroy = function(t) {
          if (this.core.s.thumbnail && this.core.items.length > 1) {
            utils.off(window, ".lgthumb"), t || this.thumbOuter.parentNode.removeChild(this.thumbOuter), utils.removeClass(this.core.outer, "lg-has-thumb");
            for (var l = document.getElementsByClassName("lg-script"); l[0]; )
              l[0].parentNode.removeChild(l[0]);
          }
        }, window.lgModules.thumbnail = n;
      });
    }, {}] }, {}, [1])(1);
  });
})(ls);
var ut = {}, as = {
  get exports() {
    return ut;
  },
  set exports(e) {
    ut = e;
  }
};
/**!
 * lg-autoplay.js | 1.2.0 | May 20th 2020
 * http://sachinchoolur.github.io/lg-autoplay.js
 * Copyright (c) 2016 Sachin N; 
 * @license GPLv3 
 */
(function(e, r) {
  (function(s) {
    e.exports = s();
  })(function() {
    return function() {
      function s(i, o, a) {
        function u(l, c) {
          if (!o[l]) {
            if (!i[l]) {
              var f = typeof T == "function" && T;
              if (!c && f)
                return f(l, !0);
              if (n)
                return n(l, !0);
              var d = new Error("Cannot find module '" + l + "'");
              throw d.code = "MODULE_NOT_FOUND", d;
            }
            var h = o[l] = { exports: {} };
            i[l][0].call(h.exports, function(p) {
              var g = i[l][1][p];
              return u(g || p);
            }, h, h.exports, s, i, o, a);
          }
          return o[l].exports;
        }
        for (var n = typeof T == "function" && T, t = 0; t < a.length; t++)
          u(a[t]);
        return u;
      }
      return s;
    }()({ 1: [function(s, i, o) {
      (function(a, u) {
        if (typeof o < "u")
          u();
        else {
          var n = {
            exports: {}
          };
          u(), a.lgAutoplay = n.exports;
        }
      })(this, function() {
        var a = Object.assign || function(t) {
          for (var l = 1; l < arguments.length; l++) {
            var c = arguments[l];
            for (var f in c)
              Object.prototype.hasOwnProperty.call(c, f) && (t[f] = c[f]);
          }
          return t;
        }, u = {
          autoplay: !1,
          pause: 5e3,
          progressBar: !0,
          fourceAutoplay: !1,
          autoplayControls: !0,
          appendAutoplayControlsTo: ".lg-toolbar"
        }, n = function(l) {
          return this.el = l, this.core = window.lgData[this.el.getAttribute("lg-uid")], this.core.items.length < 2 ? !1 : (this.core.s = a({}, u, this.core.s), this.interval = !1, this.fromAuto = !0, this.canceledOnTouch = !1, this.fourceAutoplayTemp = this.core.s.fourceAutoplay, this.core.doCss() || (this.core.s.progressBar = !1), this.init(), this);
        };
        n.prototype.init = function() {
          var t = this;
          t.core.s.autoplayControls && t.controls(), t.core.s.progressBar && t.core.outer.querySelector(".lg").insertAdjacentHTML("beforeend", '<div class="lg-progress-bar"><div class="lg-progress"></div></div>'), t.progress(), t.core.s.autoplay && t.startlAuto(), utils.on(t.el, "onDragstart.lgtm touchstart.lgtm", function() {
            t.interval && (t.cancelAuto(), t.canceledOnTouch = !0);
          }), utils.on(t.el, "onDragend.lgtm touchend.lgtm onSlideClick.lgtm", function() {
            !t.interval && t.canceledOnTouch && (t.startlAuto(), t.canceledOnTouch = !1);
          });
        }, n.prototype.progress = function() {
          var t = this, l, c;
          utils.on(t.el, "onBeforeSlide.lgtm", function() {
            t.core.s.progressBar && t.fromAuto && (l = t.core.outer.querySelector(".lg-progress-bar"), c = t.core.outer.querySelector(".lg-progress"), t.interval && (c.removeAttribute("style"), utils.removeClass(l, "lg-start"), setTimeout(function() {
              utils.setVendor(c, "Transition", "width " + (t.core.s.speed + t.core.s.pause) + "ms ease 0s"), utils.addClass(l, "lg-start");
            }, 20))), !t.fromAuto && !t.core.s.fourceAutoplay && t.cancelAuto(), t.fromAuto = !1;
          });
        }, n.prototype.controls = function() {
          var t = this, l = '<button aria-label="Toggle autoplay" class="lg-autoplay-button lg-icon"></button>';
          t.core.outer.querySelector(this.core.s.appendAutoplayControlsTo).insertAdjacentHTML("beforeend", l), utils.on(t.core.outer.querySelector(".lg-autoplay-button"), "click.lg", function() {
            utils.hasClass(t.core.outer, "lg-show-autoplay") ? (t.cancelAuto(), t.core.s.fourceAutoplay = !1) : t.interval || (t.startlAuto(), t.core.s.fourceAutoplay = t.fourceAutoplayTemp);
          });
        }, n.prototype.startlAuto = function() {
          var t = this;
          utils.setVendor(t.core.outer.querySelector(".lg-progress"), "Transition", "width " + (t.core.s.speed + t.core.s.pause) + "ms ease 0s"), utils.addClass(t.core.outer, "lg-show-autoplay"), utils.addClass(t.core.outer.querySelector(".lg-progress-bar"), "lg-start"), t.interval = setInterval(function() {
            t.core.index + 1 < t.core.items.length ? t.core.index++ : t.core.index = 0, t.fromAuto = !0, t.core.slide(t.core.index, !1, !1);
          }, t.core.s.speed + t.core.s.pause);
        }, n.prototype.cancelAuto = function() {
          clearInterval(this.interval), this.interval = !1, this.core.outer.querySelector(".lg-progress") && this.core.outer.querySelector(".lg-progress").removeAttribute("style"), utils.removeClass(this.core.outer, "lg-show-autoplay"), utils.removeClass(this.core.outer.querySelector(".lg-progress-bar"), "lg-start");
        }, n.prototype.destroy = function() {
          this.cancelAuto(), this.core.outer.querySelector(".lg-progress-bar") && this.core.outer.querySelector(".lg-progress-bar").parentNode.removeChild(this.core.outer.querySelector(".lg-progress-bar"));
        }, window.lgModules.autoplay = n;
      });
    }, {}] }, {}, [1])(1);
  });
})(as);
var ct = {}, us = {
  get exports() {
    return ct;
  },
  set exports(e) {
    ct = e;
  }
};
/**!
 * lg-pager.js | 1.0.0 | October 5th 2016
 * http://sachinchoolur.github.io/lg-pager.js
 * Copyright (c) 2016 Sachin N; 
 * @license GPLv3 
 */
(function(e, r) {
  (function(s) {
    e.exports = s();
  })(function() {
    return function s(i, o, a) {
      function u(l, c) {
        if (!o[l]) {
          if (!i[l]) {
            var f = typeof T == "function" && T;
            if (!c && f)
              return f(l, !0);
            if (n)
              return n(l, !0);
            var d = new Error("Cannot find module '" + l + "'");
            throw d.code = "MODULE_NOT_FOUND", d;
          }
          var h = o[l] = { exports: {} };
          i[l][0].call(h.exports, function(p) {
            var g = i[l][1][p];
            return u(g || p);
          }, h, h.exports, s, i, o, a);
        }
        return o[l].exports;
      }
      for (var n = typeof T == "function" && T, t = 0; t < a.length; t++)
        u(a[t]);
      return u;
    }({ 1: [function(s, i, o) {
      (function(a, u) {
        if (typeof o < "u")
          u();
        else {
          var n = {
            exports: {}
          };
          u(), a.lgPager = n.exports;
        }
      })(this, function() {
        var a = Object.assign || function(t) {
          for (var l = 1; l < arguments.length; l++) {
            var c = arguments[l];
            for (var f in c)
              Object.prototype.hasOwnProperty.call(c, f) && (t[f] = c[f]);
          }
          return t;
        }, u = {
          pager: !1
        }, n = function(l) {
          return this.el = l, this.core = window.lgData[this.el.getAttribute("lg-uid")], this.core.s = a({}, u, this.core.s), this.core.s.pager && this.core.items.length > 1 && this.init(), this;
        };
        n.prototype.init = function() {
          var t = this, l = "", c, f, d;
          if (t.core.outer.querySelector(".lg").insertAdjacentHTML("beforeend", '<div class="lg-pager-outer"></div>'), t.core.s.dynamic)
            for (var h = 0; h < t.core.s.dynamicEl.length; h++)
              l += '<span class="lg-pager-cont"> <span class="lg-pager"></span><div class="lg-pager-thumb-cont"><span class="lg-caret"></span> <img src="' + t.core.s.dynamicEl[h].thumb + '" /></div></span>';
          else
            for (var p = 0; p < t.core.items.length; p++)
              t.core.s.exThumbImage ? l += '<span class="lg-pager-cont"> <span class="lg-pager"></span><div class="lg-pager-thumb-cont"><span class="lg-caret"></span> <img src="' + t.core.items[p].getAttribute(t.core.s.exThumbImage) + '" /></div></span>' : l += '<span class="lg-pager-cont"> <span class="lg-pager"></span><div class="lg-pager-thumb-cont"><span class="lg-caret"></span> <img src="' + t.core.items[p].querySelector("img").getAttribute("src") + '" /></div></span>';
          f = t.core.outer.querySelector(".lg-pager-outer"), f.innerHTML = l, c = t.core.outer.querySelectorAll(".lg-pager-cont");
          for (var g = 0; g < c.length; g++)
            (function(_) {
              utils.on(c[_], "click.lg touchend.lg", function() {
                t.core.index = _, t.core.slide(t.core.index, !1, !1);
              });
            })(g);
          utils.on(f, "mouseover.lg", function() {
            clearTimeout(d), utils.addClass(f, "lg-pager-hover");
          }), utils.on(f, "mouseout.lg", function() {
            d = setTimeout(function() {
              utils.removeClass(f, "lg-pager-hover");
            });
          }), utils.on(t.core.el, "onBeforeSlide.lgtm", function(_) {
            for (var b = 0; b < c.length; b++)
              utils.removeClass(c[b], "lg-pager-active"), _.detail.index === b && utils.addClass(c[b], "lg-pager-active");
          });
        }, n.prototype.destroy = function() {
        }, window.lgModules.pager = n;
      });
    }, {}] }, {}, [1])(1);
  });
})(us);
function cs(e, r) {
  const s = /* @__PURE__ */ Object.create(null), i = e.split(",");
  for (let o = 0; o < i.length; o++)
    s[i[o]] = !0;
  return r ? (o) => !!s[o.toLowerCase()] : (o) => !!s[o];
}
function Ue(e) {
  if (w(e)) {
    const r = {};
    for (let s = 0; s < e.length; s++) {
      const i = e[s], o = L(i) ? ps(i) : Ue(i);
      if (o)
        for (const a in o)
          r[a] = o[a];
    }
    return r;
  } else {
    if (L(e))
      return e;
    if (I(e))
      return e;
  }
}
const fs = /;(?![^(]*\))/g, ds = /:([^]+)/, hs = /\/\*.*?\*\//gs;
function ps(e) {
  const r = {};
  return e.replace(hs, "").split(fs).forEach((s) => {
    if (s) {
      const i = s.split(ds);
      i.length > 1 && (r[i[0].trim()] = i[1].trim());
    }
  }), r;
}
function ke(e) {
  let r = "";
  if (L(e))
    r = e;
  else if (w(e))
    for (let s = 0; s < e.length; s++) {
      const i = ke(e[s]);
      i && (r += i + " ");
    }
  else if (I(e))
    for (const s in e)
      e[s] && (r += s + " ");
  return r.trim();
}
const H = process.env.NODE_ENV !== "production" ? Object.freeze({}) : {}, gs = process.env.NODE_ENV !== "production" ? Object.freeze([]) : [], Ot = () => {
}, ms = () => !1, bs = /^on[^a-z]/, vs = (e) => bs.test(e), R = Object.assign, _s = (e, r) => {
  const s = e.indexOf(r);
  s > -1 && e.splice(s, 1);
}, ys = Object.prototype.hasOwnProperty, C = (e, r) => ys.call(e, r), w = Array.isArray, te = (e) => Ne(e) === "[object Map]", ws = (e) => Ne(e) === "[object Set]", x = (e) => typeof e == "function", L = (e) => typeof e == "string", Ke = (e) => typeof e == "symbol", I = (e) => e !== null && typeof e == "object", Cs = (e) => I(e) && x(e.then) && x(e.catch), Es = Object.prototype.toString, Ne = (e) => Es.call(e), xt = (e) => Ne(e).slice(8, -1), Ts = (e) => Ne(e) === "[object Object]", Ge = (e) => L(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Ss = (e) => {
  const r = /* @__PURE__ */ Object.create(null);
  return (s) => r[s] || (r[s] = e(s));
}, Os = Ss((e) => e.charAt(0).toUpperCase() + e.slice(1)), Ee = (e, r) => !Object.is(e, r), xs = (e, r, s) => {
  Object.defineProperty(e, r, {
    configurable: !0,
    enumerable: !1,
    value: s
  });
}, Ns = (e) => {
  const r = parseFloat(e);
  return isNaN(r) ? e : r;
};
let ft;
const As = () => ft || (ft = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function dt(e, ...r) {
  console.warn(`[Vue warn] ${e}`, ...r);
}
let Ds;
function Is(e, r = Ds) {
  r && r.active && r.effects.push(e);
}
const Pe = (e) => {
  const r = new Set(e);
  return r.w = 0, r.n = 0, r;
}, Nt = (e) => (e.w & U) > 0, At = (e) => (e.n & U) > 0, Ms = ({ deps: e }) => {
  if (e.length)
    for (let r = 0; r < e.length; r++)
      e[r].w |= U;
}, qs = (e) => {
  const { deps: r } = e;
  if (r.length) {
    let s = 0;
    for (let i = 0; i < r.length; i++) {
      const o = r[i];
      Nt(o) && !At(o) ? o.delete(e) : r[s++] = o, o.w &= ~U, o.n &= ~U;
    }
    r.length = s;
  }
}, Re = /* @__PURE__ */ new WeakMap();
let oe = 0, U = 1;
const Le = 30;
let A;
const G = Symbol(process.env.NODE_ENV !== "production" ? "iterate" : ""), $e = Symbol(process.env.NODE_ENV !== "production" ? "Map key iterate" : "");
class Vs {
  constructor(r, s = null, i) {
    this.fn = r, this.scheduler = s, this.active = !0, this.deps = [], this.parent = void 0, Is(this, i);
  }
  run() {
    if (!this.active)
      return this.fn();
    let r = A, s = J;
    for (; r; ) {
      if (r === this)
        return;
      r = r.parent;
    }
    try {
      return this.parent = A, A = this, J = !0, U = 1 << ++oe, oe <= Le ? Ms(this) : ht(this), this.fn();
    } finally {
      oe <= Le && qs(this), U = 1 << --oe, A = this.parent, J = s, this.parent = void 0, this.deferStop && this.stop();
    }
  }
  stop() {
    A === this ? this.deferStop = !0 : this.active && (ht(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function ht(e) {
  const { deps: r } = e;
  if (r.length) {
    for (let s = 0; s < r.length; s++)
      r[s].delete(e);
    r.length = 0;
  }
}
let J = !0;
const Dt = [];
function It() {
  Dt.push(J), J = !1;
}
function Mt() {
  const e = Dt.pop();
  J = e === void 0 ? !0 : e;
}
function q(e, r, s) {
  if (J && A) {
    let i = Re.get(e);
    i || Re.set(e, i = /* @__PURE__ */ new Map());
    let o = i.get(s);
    o || i.set(s, o = Pe());
    const a = process.env.NODE_ENV !== "production" ? { effect: A, target: e, type: r, key: s } : void 0;
    Fs(o, a);
  }
}
function Fs(e, r) {
  let s = !1;
  oe <= Le ? At(e) || (e.n |= U, s = !Nt(e)) : s = !e.has(A), s && (e.add(A), A.deps.push(e), process.env.NODE_ENV !== "production" && A.onTrack && A.onTrack(Object.assign({ effect: A }, r)));
}
function k(e, r, s, i, o, a) {
  const u = Re.get(e);
  if (!u)
    return;
  let n = [];
  if (r === "clear")
    n = [...u.values()];
  else if (s === "length" && w(e)) {
    const l = Ns(i);
    u.forEach((c, f) => {
      (f === "length" || f >= l) && n.push(c);
    });
  } else
    switch (s !== void 0 && n.push(u.get(s)), r) {
      case "add":
        w(e) ? Ge(s) && n.push(u.get("length")) : (n.push(u.get(G)), te(e) && n.push(u.get($e)));
        break;
      case "delete":
        w(e) || (n.push(u.get(G)), te(e) && n.push(u.get($e)));
        break;
      case "set":
        te(e) && n.push(u.get(G));
        break;
    }
  const t = process.env.NODE_ENV !== "production" ? { target: e, type: r, key: s, newValue: i, oldValue: o, oldTarget: a } : void 0;
  if (n.length === 1)
    n[0] && (process.env.NODE_ENV !== "production" ? he(n[0], t) : he(n[0]));
  else {
    const l = [];
    for (const c of n)
      c && l.push(...c);
    process.env.NODE_ENV !== "production" ? he(Pe(l), t) : he(Pe(l));
  }
}
function he(e, r) {
  const s = w(e) ? e : [...e];
  for (const i of s)
    i.computed && pt(i, r);
  for (const i of s)
    i.computed || pt(i, r);
}
function pt(e, r) {
  (e !== A || e.allowRecurse) && (process.env.NODE_ENV !== "production" && e.onTrigger && e.onTrigger(R({ effect: e }, r)), e.scheduler ? e.scheduler() : e.run());
}
const Ps = /* @__PURE__ */ cs("__proto__,__v_isRef,__isVue"), qt = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Ke)
), Rs = /* @__PURE__ */ Je(), Ls = /* @__PURE__ */ Je(!0), $s = /* @__PURE__ */ Je(!0, !0), gt = /* @__PURE__ */ Hs();
function Hs() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((r) => {
    e[r] = function(...s) {
      const i = v(this);
      for (let a = 0, u = this.length; a < u; a++)
        q(i, "get", a + "");
      const o = i[r](...s);
      return o === -1 || o === !1 ? i[r](...s.map(v)) : o;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((r) => {
    e[r] = function(...s) {
      It();
      const i = v(this)[r].apply(this, s);
      return Mt(), i;
    };
  }), e;
}
function Je(e = !1, r = !1) {
  return function(i, o, a) {
    if (o === "__v_isReactive")
      return !e;
    if (o === "__v_isReadonly")
      return e;
    if (o === "__v_isShallow")
      return r;
    if (o === "__v_raw" && a === (e ? r ? Lt : Rt : r ? sr : Pt).get(i))
      return i;
    const u = w(i);
    if (!e && u && C(gt, o))
      return Reflect.get(gt, o, a);
    const n = Reflect.get(i, o, a);
    return (Ke(o) ? qt.has(o) : Ps(o)) || (e || q(i, "get", o), r) ? n : D(n) ? u && Ge(o) ? n : n.value : I(n) ? e ? Ht(n) : $t(n) : n;
  };
}
const Ws = /* @__PURE__ */ Bs();
function Bs(e = !1) {
  return function(s, i, o, a) {
    let u = s[i];
    if (Z(u) && D(u) && !D(o))
      return !1;
    if (!e && (!He(o) && !Z(o) && (u = v(u), o = v(o)), !w(s) && D(u) && !D(o)))
      return u.value = o, !0;
    const n = w(s) && Ge(i) ? Number(i) < s.length : C(s, i), t = Reflect.set(s, i, o, a);
    return s === v(a) && (n ? Ee(o, u) && k(s, "set", i, o, u) : k(s, "add", i, o)), t;
  };
}
function js(e, r) {
  const s = C(e, r), i = e[r], o = Reflect.deleteProperty(e, r);
  return o && s && k(e, "delete", r, void 0, i), o;
}
function zs(e, r) {
  const s = Reflect.has(e, r);
  return (!Ke(r) || !qt.has(r)) && q(e, "has", r), s;
}
function Us(e) {
  return q(e, "iterate", w(e) ? "length" : G), Reflect.ownKeys(e);
}
const ks = {
  get: Rs,
  set: Ws,
  deleteProperty: js,
  has: zs,
  ownKeys: Us
}, Vt = {
  get: Ls,
  set(e, r) {
    return process.env.NODE_ENV !== "production" && dt(`Set operation on key "${String(r)}" failed: target is readonly.`, e), !0;
  },
  deleteProperty(e, r) {
    return process.env.NODE_ENV !== "production" && dt(`Delete operation on key "${String(r)}" failed: target is readonly.`, e), !0;
  }
}, Ks = /* @__PURE__ */ R({}, Vt, {
  get: $s
}), Ye = (e) => e, Ae = (e) => Reflect.getPrototypeOf(e);
function pe(e, r, s = !1, i = !1) {
  e = e.__v_raw;
  const o = v(e), a = v(r);
  s || (r !== a && q(o, "get", r), q(o, "get", a));
  const { has: u } = Ae(o), n = i ? Ye : s ? et : Ze;
  if (u.call(o, r))
    return n(e.get(r));
  if (u.call(o, a))
    return n(e.get(a));
  e !== o && e.get(r);
}
function ge(e, r = !1) {
  const s = this.__v_raw, i = v(s), o = v(e);
  return r || (e !== o && q(i, "has", e), q(i, "has", o)), e === o ? s.has(e) : s.has(e) || s.has(o);
}
function me(e, r = !1) {
  return e = e.__v_raw, !r && q(v(e), "iterate", G), Reflect.get(e, "size", e);
}
function mt(e) {
  e = v(e);
  const r = v(this);
  return Ae(r).has.call(r, e) || (r.add(e), k(r, "add", e, e)), this;
}
function bt(e, r) {
  r = v(r);
  const s = v(this), { has: i, get: o } = Ae(s);
  let a = i.call(s, e);
  a ? process.env.NODE_ENV !== "production" && Ft(s, i, e) : (e = v(e), a = i.call(s, e));
  const u = o.call(s, e);
  return s.set(e, r), a ? Ee(r, u) && k(s, "set", e, r, u) : k(s, "add", e, r), this;
}
function vt(e) {
  const r = v(this), { has: s, get: i } = Ae(r);
  let o = s.call(r, e);
  o ? process.env.NODE_ENV !== "production" && Ft(r, s, e) : (e = v(e), o = s.call(r, e));
  const a = i ? i.call(r, e) : void 0, u = r.delete(e);
  return o && k(r, "delete", e, void 0, a), u;
}
function _t() {
  const e = v(this), r = e.size !== 0, s = process.env.NODE_ENV !== "production" ? te(e) ? new Map(e) : new Set(e) : void 0, i = e.clear();
  return r && k(e, "clear", void 0, void 0, s), i;
}
function be(e, r) {
  return function(i, o) {
    const a = this, u = a.__v_raw, n = v(u), t = r ? Ye : e ? et : Ze;
    return !e && q(n, "iterate", G), u.forEach((l, c) => i.call(o, t(l), t(c), a));
  };
}
function ve(e, r, s) {
  return function(...i) {
    const o = this.__v_raw, a = v(o), u = te(a), n = e === "entries" || e === Symbol.iterator && u, t = e === "keys" && u, l = o[e](...i), c = s ? Ye : r ? et : Ze;
    return !r && q(a, "iterate", t ? $e : G), {
      next() {
        const { value: f, done: d } = l.next();
        return d ? { value: f, done: d } : {
          value: n ? [c(f[0]), c(f[1])] : c(f),
          done: d
        };
      },
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function W(e) {
  return function(...r) {
    if (process.env.NODE_ENV !== "production") {
      const s = r[0] ? `on key "${r[0]}" ` : "";
      console.warn(`${Os(e)} operation ${s}failed: target is readonly.`, v(this));
    }
    return e === "delete" ? !1 : this;
  };
}
function Gs() {
  const e = {
    get(a) {
      return pe(this, a);
    },
    get size() {
      return me(this);
    },
    has: ge,
    add: mt,
    set: bt,
    delete: vt,
    clear: _t,
    forEach: be(!1, !1)
  }, r = {
    get(a) {
      return pe(this, a, !1, !0);
    },
    get size() {
      return me(this);
    },
    has: ge,
    add: mt,
    set: bt,
    delete: vt,
    clear: _t,
    forEach: be(!1, !0)
  }, s = {
    get(a) {
      return pe(this, a, !0);
    },
    get size() {
      return me(this, !0);
    },
    has(a) {
      return ge.call(this, a, !0);
    },
    add: W("add"),
    set: W("set"),
    delete: W("delete"),
    clear: W("clear"),
    forEach: be(!0, !1)
  }, i = {
    get(a) {
      return pe(this, a, !0, !0);
    },
    get size() {
      return me(this, !0);
    },
    has(a) {
      return ge.call(this, a, !0);
    },
    add: W("add"),
    set: W("set"),
    delete: W("delete"),
    clear: W("clear"),
    forEach: be(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((a) => {
    e[a] = ve(a, !1, !1), s[a] = ve(a, !0, !1), r[a] = ve(a, !1, !0), i[a] = ve(a, !0, !0);
  }), [
    e,
    s,
    r,
    i
  ];
}
const [Js, Ys, Xs, Qs] = /* @__PURE__ */ Gs();
function Xe(e, r) {
  const s = r ? e ? Qs : Xs : e ? Ys : Js;
  return (i, o, a) => o === "__v_isReactive" ? !e : o === "__v_isReadonly" ? e : o === "__v_raw" ? i : Reflect.get(C(s, o) && o in i ? s : i, o, a);
}
const Zs = {
  get: /* @__PURE__ */ Xe(!1, !1)
}, er = {
  get: /* @__PURE__ */ Xe(!0, !1)
}, tr = {
  get: /* @__PURE__ */ Xe(!0, !0)
};
function Ft(e, r, s) {
  const i = v(s);
  if (i !== s && r.call(e, i)) {
    const o = xt(e);
    console.warn(`Reactive ${o} contains both the raw and reactive versions of the same object${o === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
  }
}
const Pt = /* @__PURE__ */ new WeakMap(), sr = /* @__PURE__ */ new WeakMap(), Rt = /* @__PURE__ */ new WeakMap(), Lt = /* @__PURE__ */ new WeakMap();
function rr(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function nr(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : rr(xt(e));
}
function $t(e) {
  return Z(e) ? e : Qe(e, !1, ks, Zs, Pt);
}
function Ht(e) {
  return Qe(e, !0, Vt, er, Rt);
}
function _e(e) {
  return Qe(e, !0, Ks, tr, Lt);
}
function Qe(e, r, s, i, o) {
  if (!I(e))
    return process.env.NODE_ENV !== "production" && console.warn(`value cannot be made reactive: ${String(e)}`), e;
  if (e.__v_raw && !(r && e.__v_isReactive))
    return e;
  const a = o.get(e);
  if (a)
    return a;
  const u = nr(e);
  if (u === 0)
    return e;
  const n = new Proxy(e, u === 2 ? i : s);
  return o.set(e, n), n;
}
function Y(e) {
  return Z(e) ? Y(e.__v_raw) : !!(e && e.__v_isReactive);
}
function Z(e) {
  return !!(e && e.__v_isReadonly);
}
function He(e) {
  return !!(e && e.__v_isShallow);
}
function We(e) {
  return Y(e) || Z(e);
}
function v(e) {
  const r = e && e.__v_raw;
  return r ? v(r) : e;
}
function or(e) {
  return xs(e, "__v_skip", !0), e;
}
const Ze = (e) => I(e) ? $t(e) : e, et = (e) => I(e) ? Ht(e) : e;
function D(e) {
  return !!(e && e.__v_isRef === !0);
}
function ir(e) {
  return D(e) ? e.value : e;
}
const lr = {
  get: (e, r, s) => ir(Reflect.get(e, r, s)),
  set: (e, r, s, i) => {
    const o = e[r];
    return D(o) && !D(s) ? (o.value = s, !0) : Reflect.set(e, r, s, i);
  }
};
function ar(e) {
  return Y(e) ? e : new Proxy(e, lr);
}
const X = [];
function ur(e) {
  X.push(e);
}
function cr() {
  X.pop();
}
function O(e, ...r) {
  if (process.env.NODE_ENV === "production")
    return;
  It();
  const s = X.length ? X[X.length - 1].component : null, i = s && s.appContext.config.warnHandler, o = fr();
  if (i)
    Q(i, s, 11, [
      e + r.join(""),
      s && s.proxy,
      o.map(({ vnode: a }) => `at <${ss(s, a.type)}>`).join(`
`),
      o
    ]);
  else {
    const a = [`[Vue warn]: ${e}`, ...r];
    o.length && a.push(`
`, ...dr(o)), console.warn(...a);
  }
  Mt();
}
function fr() {
  let e = X[X.length - 1];
  if (!e)
    return [];
  const r = [];
  for (; e; ) {
    const s = r[0];
    s && s.vnode === e ? s.recurseCount++ : r.push({
      vnode: e,
      recurseCount: 0
    });
    const i = e.component && e.component.parent;
    e = i && i.vnode;
  }
  return r;
}
function dr(e) {
  const r = [];
  return e.forEach((s, i) => {
    r.push(...i === 0 ? [] : [`
`], ...hr(s));
  }), r;
}
function hr({ vnode: e, recurseCount: r }) {
  const s = r > 0 ? `... (${r} recursive calls)` : "", i = e.component ? e.component.parent == null : !1, o = ` at <${ss(e.component, e.type, i)}`, a = ">" + s;
  return e.props ? [o, ...pr(e.props), a] : [o + a];
}
function pr(e) {
  const r = [], s = Object.keys(e);
  return s.slice(0, 3).forEach((i) => {
    r.push(...Wt(i, e[i]));
  }), s.length > 3 && r.push(" ..."), r;
}
function Wt(e, r, s) {
  return L(r) ? (r = JSON.stringify(r), s ? r : [`${e}=${r}`]) : typeof r == "number" || typeof r == "boolean" || r == null ? s ? r : [`${e}=${r}`] : D(r) ? (r = Wt(e, v(r.value), !0), s ? r : [`${e}=Ref<`, r, ">"]) : x(r) ? [`${e}=fn${r.name ? `<${r.name}>` : ""}`] : (r = v(r), s ? r : [`${e}=`, r]);
}
const Bt = {
  sp: "serverPrefetch hook",
  bc: "beforeCreate hook",
  c: "created hook",
  bm: "beforeMount hook",
  m: "mounted hook",
  bu: "beforeUpdate hook",
  u: "updated",
  bum: "beforeUnmount hook",
  um: "unmounted hook",
  a: "activated hook",
  da: "deactivated hook",
  ec: "errorCaptured hook",
  rtc: "renderTracked hook",
  rtg: "renderTriggered hook",
  [0]: "setup function",
  [1]: "render function",
  [2]: "watcher getter",
  [3]: "watcher callback",
  [4]: "watcher cleanup function",
  [5]: "native event handler",
  [6]: "component event handler",
  [7]: "vnode hook",
  [8]: "directive hook",
  [9]: "transition hook",
  [10]: "app errorHandler",
  [11]: "app warnHandler",
  [12]: "ref function",
  [13]: "async component loader",
  [14]: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/core"
};
function Q(e, r, s, i) {
  let o;
  try {
    o = i ? e(...i) : e();
  } catch (a) {
    jt(a, r, s);
  }
  return o;
}
function Be(e, r, s, i) {
  if (x(e)) {
    const a = Q(e, r, s, i);
    return a && Cs(a) && a.catch((u) => {
      jt(u, r, s);
    }), a;
  }
  const o = [];
  for (let a = 0; a < e.length; a++)
    o.push(Be(e[a], r, s, i));
  return o;
}
function jt(e, r, s, i = !0) {
  const o = r ? r.vnode : null;
  if (r) {
    let a = r.parent;
    const u = r.proxy, n = process.env.NODE_ENV !== "production" ? Bt[s] : s;
    for (; a; ) {
      const l = a.ec;
      if (l) {
        for (let c = 0; c < l.length; c++)
          if (l[c](e, u, n) === !1)
            return;
      }
      a = a.parent;
    }
    const t = r.appContext.config.errorHandler;
    if (t) {
      Q(t, null, 10, [e, u, n]);
      return;
    }
  }
  gr(e, s, o, i);
}
function gr(e, r, s, i = !0) {
  if (process.env.NODE_ENV !== "production") {
    const o = Bt[r];
    if (s && ur(s), O(`Unhandled error${o ? ` during execution of ${o}` : ""}`), s && cr(), i)
      throw e;
    console.error(e);
  } else
    console.error(e);
}
let Te = !1, je = !1;
const F = [];
let j = 0;
const se = [];
let $ = null, B = 0;
const zt = /* @__PURE__ */ Promise.resolve();
let tt = null;
const mr = 100;
function br(e) {
  const r = tt || zt;
  return e ? r.then(this ? e.bind(this) : e) : r;
}
function vr(e) {
  let r = j + 1, s = F.length;
  for (; r < s; ) {
    const i = r + s >>> 1;
    ae(F[i]) < e ? r = i + 1 : s = i;
  }
  return r;
}
function st(e) {
  (!F.length || !F.includes(e, Te && e.allowRecurse ? j + 1 : j)) && (e.id == null ? F.push(e) : F.splice(vr(e.id), 0, e), Ut());
}
function Ut() {
  !Te && !je && (je = !0, tt = zt.then(Kt));
}
function kt(e) {
  w(e) ? se.push(...e) : (!$ || !$.includes(e, e.allowRecurse ? B + 1 : B)) && se.push(e), Ut();
}
function _r(e) {
  if (se.length) {
    const r = [...new Set(se)];
    if (se.length = 0, $) {
      $.push(...r);
      return;
    }
    for ($ = r, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), $.sort((s, i) => ae(s) - ae(i)), B = 0; B < $.length; B++)
      process.env.NODE_ENV !== "production" && Gt(e, $[B]) || $[B]();
    $ = null, B = 0;
  }
}
const ae = (e) => e.id == null ? 1 / 0 : e.id, yr = (e, r) => {
  const s = ae(e) - ae(r);
  if (s === 0) {
    if (e.pre && !r.pre)
      return -1;
    if (r.pre && !e.pre)
      return 1;
  }
  return s;
};
function Kt(e) {
  je = !1, Te = !0, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), F.sort(yr);
  const r = process.env.NODE_ENV !== "production" ? (s) => Gt(e, s) : Ot;
  try {
    for (j = 0; j < F.length; j++) {
      const s = F[j];
      if (s && s.active !== !1) {
        if (process.env.NODE_ENV !== "production" && r(s))
          continue;
        Q(s, null, 14);
      }
    }
  } finally {
    j = 0, F.length = 0, _r(e), Te = !1, tt = null, (F.length || se.length) && Kt(e);
  }
}
function Gt(e, r) {
  if (!e.has(r))
    e.set(r, 1);
  else {
    const s = e.get(r);
    if (s > mr) {
      const i = r.ownerInstance, o = i && ts(i.type);
      return O(`Maximum recursive updates exceeded${o ? ` in component <${o}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`), !0;
    } else
      e.set(r, s + 1);
  }
}
const ne = /* @__PURE__ */ new Set();
process.env.NODE_ENV !== "production" && (As().__VUE_HMR_RUNTIME__ = {
  createRecord: qe(wr),
  rerender: qe(Cr),
  reload: qe(Er)
});
const Se = /* @__PURE__ */ new Map();
function wr(e, r) {
  return Se.has(e) ? !1 : (Se.set(e, {
    initialDef: ie(r),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function ie(e) {
  return rs(e) ? e.__vccOpts : e;
}
function Cr(e, r) {
  const s = Se.get(e);
  s && (s.initialDef.render = r, [...s.instances].forEach((i) => {
    r && (i.render = r, ie(i.type).render = r), i.renderCache = [], i.update();
  }));
}
function Er(e, r) {
  const s = Se.get(e);
  if (!s)
    return;
  r = ie(r), yt(s.initialDef, r);
  const i = [...s.instances];
  for (const o of i) {
    const a = ie(o.type);
    ne.has(a) || (a !== s.initialDef && yt(a, r), ne.add(a)), o.appContext.optionsCache.delete(o.type), o.ceReload ? (ne.add(a), o.ceReload(r.styles), ne.delete(a)) : o.parent ? st(o.parent.update) : o.appContext.reload ? o.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn("[HMR] Root or manually mounted instance modified. Full reload required.");
  }
  kt(() => {
    for (const o of i)
      ne.delete(ie(o.type));
  });
}
function yt(e, r) {
  R(e, r);
  for (const s in e)
    s !== "__file" && !(s in r) && delete e[s];
}
function qe(e) {
  return (r, s) => {
    try {
      return e(r, s);
    } catch (i) {
      console.error(i), console.warn("[HMR] Something went wrong during Vue component hot-reload. Full reload required.");
    }
  };
}
let z = null, Tr = null;
const Sr = (e) => e.__isSuspense;
function Or(e, r) {
  r && r.pendingBranch ? w(e) ? r.effects.push(...e) : r.effects.push(e) : kt(e);
}
const ye = {};
function xr(e, r, { immediate: s, deep: i, flush: o, onTrack: a, onTrigger: u } = H) {
  process.env.NODE_ENV !== "production" && !r && (s !== void 0 && O('watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'), i !== void 0 && O('watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'));
  const n = (m) => {
    O("Invalid watch source: ", m, "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.");
  }, t = re;
  let l, c = !1, f = !1;
  if (D(e) ? (l = () => e.value, c = He(e)) : Y(e) ? (l = () => e, i = !0) : w(e) ? (f = !0, c = e.some((m) => Y(m) || He(m)), l = () => e.map((m) => {
    if (D(m))
      return m.value;
    if (Y(m))
      return ee(m);
    if (x(m))
      return Q(m, t, 2);
    process.env.NODE_ENV !== "production" && n(m);
  })) : x(e) ? r ? l = () => Q(e, t, 2) : l = () => {
    if (!(t && t.isUnmounted))
      return d && d(), Be(e, t, 3, [h]);
  } : (l = Ot, process.env.NODE_ENV !== "production" && n(e)), r && i) {
    const m = l;
    l = () => ee(m());
  }
  let d, h = (m) => {
    d = b.onStop = () => {
      Q(m, t, 4);
    };
  }, p = f ? new Array(e.length).fill(ye) : ye;
  const g = () => {
    if (b.active)
      if (r) {
        const m = b.run();
        (i || c || (f ? m.some((M, E) => Ee(M, p[E])) : Ee(m, p))) && (d && d(), Be(r, t, 3, [
          m,
          p === ye ? void 0 : f && p[0] === ye ? [] : p,
          h
        ]), p = m);
      } else
        b.run();
  };
  g.allowRecurse = !!r;
  let _;
  o === "sync" ? _ = g : o === "post" ? _ = () => Et(g, t && t.suspense) : (g.pre = !0, t && (g.id = t.uid), _ = () => st(g));
  const b = new Vs(l, _);
  return process.env.NODE_ENV !== "production" && (b.onTrack = a, b.onTrigger = u), r ? s ? g() : p = b.run() : o === "post" ? Et(b.run.bind(b), t && t.suspense) : b.run(), () => {
    b.stop(), t && t.scope && _s(t.scope.effects, b);
  };
}
function Nr(e, r, s) {
  const i = this.proxy, o = L(e) ? e.includes(".") ? Ar(i, e) : () => i[e] : e.bind(i, i);
  let a;
  x(r) ? a = r : (a = r.handler, s = r);
  const u = re;
  Tt(this);
  const n = xr(o, a.bind(i), s);
  return u ? Tt(u) : Xr(), n;
}
function Ar(e, r) {
  const s = r.split(".");
  return () => {
    let i = e;
    for (let o = 0; o < s.length && i; o++)
      i = i[s[o]];
    return i;
  };
}
function ee(e, r) {
  if (!I(e) || e.__v_skip || (r = r || /* @__PURE__ */ new Set(), r.has(e)))
    return e;
  if (r.add(e), D(e))
    ee(e.value, r);
  else if (w(e))
    for (let s = 0; s < e.length; s++)
      ee(e[s], r);
  else if (ws(e) || te(e))
    e.forEach((s) => {
      ee(s, r);
    });
  else if (Ts(e))
    for (const s in e)
      ee(e[s], r);
  return e;
}
const Dr = Symbol(), ze = (e) => e ? Qr(e) ? Zr(e) || e.proxy : ze(e.parent) : null, le = /* @__PURE__ */ R(/* @__PURE__ */ Object.create(null), {
  $: (e) => e,
  $el: (e) => e.vnode.el,
  $data: (e) => e.data,
  $props: (e) => process.env.NODE_ENV !== "production" ? _e(e.props) : e.props,
  $attrs: (e) => process.env.NODE_ENV !== "production" ? _e(e.attrs) : e.attrs,
  $slots: (e) => process.env.NODE_ENV !== "production" ? _e(e.slots) : e.slots,
  $refs: (e) => process.env.NODE_ENV !== "production" ? _e(e.refs) : e.refs,
  $parent: (e) => ze(e.parent),
  $root: (e) => ze(e.root),
  $emit: (e) => e.emit,
  $options: (e) => qr(e),
  $forceUpdate: (e) => e.f || (e.f = () => st(e.update)),
  $nextTick: (e) => e.n || (e.n = br.bind(e.proxy)),
  $watch: (e) => Nr.bind(e)
}), Ir = (e) => e === "_" || e === "$", Ve = (e, r) => e !== H && !e.__isScriptSetup && C(e, r), Mr = {
  get({ _: e }, r) {
    const { ctx: s, setupState: i, data: o, props: a, accessCache: u, type: n, appContext: t } = e;
    if (process.env.NODE_ENV !== "production" && r === "__isVue")
      return !0;
    let l;
    if (r[0] !== "$") {
      const h = u[r];
      if (h !== void 0)
        switch (h) {
          case 1:
            return i[r];
          case 2:
            return o[r];
          case 4:
            return s[r];
          case 3:
            return a[r];
        }
      else {
        if (Ve(i, r))
          return u[r] = 1, i[r];
        if (o !== H && C(o, r))
          return u[r] = 2, o[r];
        if ((l = e.propsOptions[0]) && C(l, r))
          return u[r] = 3, a[r];
        if (s !== H && C(s, r))
          return u[r] = 4, s[r];
        u[r] = 0;
      }
    }
    const c = le[r];
    let f, d;
    if (c)
      return r === "$attrs" && (q(e, "get", r), process.env.NODE_ENV !== "production" && void 0), c(e);
    if ((f = n.__cssModules) && (f = f[r]))
      return f;
    if (s !== H && C(s, r))
      return u[r] = 4, s[r];
    if (d = t.config.globalProperties, C(d, r))
      return d[r];
    process.env.NODE_ENV !== "production" && z && (!L(r) || r.indexOf("__v") !== 0) && (o !== H && Ir(r[0]) && C(o, r) ? O(`Property ${JSON.stringify(r)} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`) : e === z && O(`Property ${JSON.stringify(r)} was accessed during render but is not defined on instance.`));
  },
  set({ _: e }, r, s) {
    const { data: i, setupState: o, ctx: a } = e;
    return Ve(o, r) ? (o[r] = s, !0) : process.env.NODE_ENV !== "production" && o.__isScriptSetup && C(o, r) ? (O(`Cannot mutate <script setup> binding "${r}" from Options API.`), !1) : i !== H && C(i, r) ? (i[r] = s, !0) : C(e.props, r) ? (process.env.NODE_ENV !== "production" && O(`Attempting to mutate prop "${r}". Props are readonly.`), !1) : r[0] === "$" && r.slice(1) in e ? (process.env.NODE_ENV !== "production" && O(`Attempting to mutate public property "${r}". Properties starting with $ are reserved and readonly.`), !1) : (process.env.NODE_ENV !== "production" && r in e.appContext.config.globalProperties ? Object.defineProperty(a, r, {
      enumerable: !0,
      configurable: !0,
      value: s
    }) : a[r] = s, !0);
  },
  has({ _: { data: e, setupState: r, accessCache: s, ctx: i, appContext: o, propsOptions: a } }, u) {
    let n;
    return !!s[u] || e !== H && C(e, u) || Ve(r, u) || (n = a[0]) && C(n, u) || C(i, u) || C(le, u) || C(o.config.globalProperties, u);
  },
  defineProperty(e, r, s) {
    return s.get != null ? e._.accessCache[r] = 0 : C(s, "value") && this.set(e, r, s.value, null), Reflect.defineProperty(e, r, s);
  }
};
process.env.NODE_ENV !== "production" && (Mr.ownKeys = (e) => (O("Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."), Reflect.ownKeys(e)));
function qr(e) {
  const r = e.type, { mixins: s, extends: i } = r, { mixins: o, optionsCache: a, config: { optionMergeStrategies: u } } = e.appContext, n = a.get(r);
  let t;
  return n ? t = n : !o.length && !s && !i ? t = r : (t = {}, o.length && o.forEach((l) => Oe(t, l, u, !0)), Oe(t, r, u)), I(r) && a.set(r, t), t;
}
function Oe(e, r, s, i = !1) {
  const { mixins: o, extends: a } = r;
  a && Oe(e, a, s, !0), o && o.forEach((u) => Oe(e, u, s, !0));
  for (const u in r)
    if (i && u === "expose")
      process.env.NODE_ENV !== "production" && O('"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.');
    else {
      const n = Vr[u] || s && s[u];
      e[u] = n ? n(e[u], r[u]) : r[u];
    }
  return e;
}
const Vr = {
  data: wt,
  props: K,
  emits: K,
  methods: K,
  computed: K,
  beforeCreate: S,
  created: S,
  beforeMount: S,
  mounted: S,
  beforeUpdate: S,
  updated: S,
  beforeDestroy: S,
  beforeUnmount: S,
  destroyed: S,
  unmounted: S,
  activated: S,
  deactivated: S,
  errorCaptured: S,
  serverPrefetch: S,
  components: K,
  directives: K,
  watch: Pr,
  provide: wt,
  inject: Fr
};
function wt(e, r) {
  return r ? e ? function() {
    return R(x(e) ? e.call(this, this) : e, x(r) ? r.call(this, this) : r);
  } : r : e;
}
function Fr(e, r) {
  return K(Ct(e), Ct(r));
}
function Ct(e) {
  if (w(e)) {
    const r = {};
    for (let s = 0; s < e.length; s++)
      r[e[s]] = e[s];
    return r;
  }
  return e;
}
function S(e, r) {
  return e ? [...new Set([].concat(e, r))] : r;
}
function K(e, r) {
  return e ? R(R(/* @__PURE__ */ Object.create(null), e), r) : r;
}
function Pr(e, r) {
  if (!e)
    return r;
  if (!r)
    return e;
  const s = R(/* @__PURE__ */ Object.create(null), e);
  for (const i in r)
    s[i] = S(e[i], r[i]);
  return s;
}
function Rr() {
  return {
    app: null,
    config: {
      isNativeTag: ms,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
const Et = Or, Lr = (e) => e.__isTeleport, Jt = Symbol(process.env.NODE_ENV !== "production" ? "Fragment" : void 0), $r = Symbol(process.env.NODE_ENV !== "production" ? "Text" : void 0), Hr = Symbol(process.env.NODE_ENV !== "production" ? "Comment" : void 0);
Symbol(process.env.NODE_ENV !== "production" ? "Static" : void 0);
const we = [];
let P = null;
function Wr(e = !1) {
  we.push(P = e ? null : []);
}
function Br() {
  we.pop(), P = we[we.length - 1] || null;
}
function jr(e) {
  return e.dynamicChildren = P || gs, Br(), P && P.push(e), e;
}
function zr(e, r, s, i, o, a) {
  return jr(Qt(e, r, s, i, o, a, !0));
}
function Ur(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
const kr = (...e) => Zt(...e), Yt = "__vInternal", Xt = ({ key: e }) => e ?? null, Ce = ({ ref: e, ref_key: r, ref_for: s }) => e != null ? L(e) || D(e) || x(e) ? { i: z, r: e, k: r, f: !!s } : e : null;
function Qt(e, r = null, s = null, i = 0, o = null, a = e === Jt ? 0 : 1, u = !1, n = !1) {
  const t = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: r,
    key: r && Xt(r),
    ref: r && Ce(r),
    scopeId: Tr,
    slotScopeIds: null,
    children: s,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: a,
    patchFlag: i,
    dynamicProps: o,
    dynamicChildren: null,
    appContext: null,
    ctx: z
  };
  return n ? (rt(t, s), a & 128 && e.normalize(t)) : s && (t.shapeFlag |= L(s) ? 8 : 16), process.env.NODE_ENV !== "production" && t.key !== t.key && O("VNode created with invalid key (NaN). VNode type:", t.type), !u && P && (t.patchFlag > 0 || a & 6) && t.patchFlag !== 32 && P.push(t), t;
}
const Kr = process.env.NODE_ENV !== "production" ? kr : Zt;
function Zt(e, r = null, s = null, i = 0, o = null, a = !1) {
  if ((!e || e === Dr) && (process.env.NODE_ENV !== "production" && !e && O(`Invalid vnode type when creating vnode: ${e}.`), e = Hr), Ur(e)) {
    const n = xe(e, r, !0);
    return s && rt(n, s), !a && P && (n.shapeFlag & 6 ? P[P.indexOf(e)] = n : P.push(n)), n.patchFlag |= -2, n;
  }
  if (rs(e) && (e = e.__vccOpts), r) {
    r = Gr(r);
    let { class: n, style: t } = r;
    n && !L(n) && (r.class = ke(n)), I(t) && (We(t) && !w(t) && (t = R({}, t)), r.style = Ue(t));
  }
  const u = L(e) ? 1 : Sr(e) ? 128 : Lr(e) ? 64 : I(e) ? 4 : x(e) ? 2 : 0;
  return process.env.NODE_ENV !== "production" && u & 4 && We(e) && (e = v(e), O("Vue received a Component which was made a reactive object. This can lead to unnecessary performance overhead, and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.", `
Component that was made reactive: `, e)), Qt(e, r, s, i, o, u, a, !0);
}
function Gr(e) {
  return e ? We(e) || Yt in e ? R({}, e) : e : null;
}
function xe(e, r, s = !1) {
  const { props: i, ref: o, patchFlag: a, children: u } = e, n = r ? Yr(i || {}, r) : i;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: n,
    key: n && Xt(n),
    ref: r && r.ref ? s && o ? w(o) ? o.concat(Ce(r)) : [o, Ce(r)] : Ce(r) : o,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: process.env.NODE_ENV !== "production" && a === -1 && w(u) ? u.map(es) : u,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: r && e.type !== Jt ? a === -1 ? 16 : a | 16 : a,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && xe(e.ssContent),
    ssFallback: e.ssFallback && xe(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx
  };
}
function es(e) {
  const r = xe(e);
  return w(e.children) && (r.children = e.children.map(es)), r;
}
function Jr(e = " ", r = 0) {
  return Kr($r, null, e, r);
}
function rt(e, r) {
  let s = 0;
  const { shapeFlag: i } = e;
  if (r == null)
    r = null;
  else if (w(r))
    s = 16;
  else if (typeof r == "object")
    if (i & 65) {
      const o = r.default;
      o && (o._c && (o._d = !1), rt(e, o()), o._c && (o._d = !0));
      return;
    } else {
      s = 32;
      const o = r._;
      !o && !(Yt in r) ? r._ctx = z : o === 3 && z && (z.slots._ === 1 ? r._ = 1 : (r._ = 2, e.patchFlag |= 1024));
    }
  else
    x(r) ? (r = { default: r, _ctx: z }, s = 32) : (r = String(r), i & 64 ? (s = 16, r = [Jr(r)]) : s = 8);
  e.children = r, e.shapeFlag |= s;
}
function Yr(...e) {
  const r = {};
  for (let s = 0; s < e.length; s++) {
    const i = e[s];
    for (const o in i)
      if (o === "class")
        r.class !== i.class && (r.class = ke([r.class, i.class]));
      else if (o === "style")
        r.style = Ue([r.style, i.style]);
      else if (vs(o)) {
        const a = r[o], u = i[o];
        u && a !== u && !(w(a) && a.includes(u)) && (r[o] = a ? [].concat(a, u) : u);
      } else
        o !== "" && (r[o] = i[o]);
  }
  return r;
}
Rr();
let re = null;
const Tt = (e) => {
  re = e, e.scope.on();
}, Xr = () => {
  re && re.scope.off(), re = null;
};
function Qr(e) {
  return e.vnode.shapeFlag & 4;
}
function Zr(e) {
  if (e.exposed)
    return e.exposeProxy || (e.exposeProxy = new Proxy(ar(or(e.exposed)), {
      get(r, s) {
        if (s in r)
          return r[s];
        if (s in le)
          return le[s](e);
      },
      has(r, s) {
        return s in r || s in le;
      }
    }));
}
const en = /(?:^|[-_])(\w)/g, tn = (e) => e.replace(en, (r) => r.toUpperCase()).replace(/[-_]/g, "");
function ts(e, r = !0) {
  return x(e) ? e.displayName || e.name : e.name || r && e.__name;
}
function ss(e, r, s = !1) {
  let i = ts(r);
  if (!i && r.__file) {
    const o = r.__file.match(/([^/\\]+)\.\w+$/);
    o && (i = o[1]);
  }
  if (!i && e && e.parent) {
    const o = (a) => {
      for (const u in a)
        if (a[u] === r)
          return u;
    };
    i = o(e.components || e.parent.type.components) || o(e.appContext.components);
  }
  return i ? tn(i) : s ? "App" : "Anonymous";
}
function rs(e) {
  return x(e) && "__vccOpts" in e;
}
Symbol(process.env.NODE_ENV !== "production" ? "ssrContext" : "");
function Fe(e) {
  return !!(e && e.__v_isShallow);
}
function sn() {
  if (process.env.NODE_ENV === "production" || typeof window > "u")
    return;
  const e = { style: "color:#3ba776" }, r = { style: "color:#0b1bc9" }, s = { style: "color:#b62e24" }, i = { style: "color:#9d288c" }, o = {
    header(f) {
      return I(f) ? f.__isVue ? ["div", e, "VueInstance"] : D(f) ? [
        "div",
        {},
        ["span", e, c(f)],
        "<",
        n(f.value),
        ">"
      ] : Y(f) ? [
        "div",
        {},
        ["span", e, Fe(f) ? "ShallowReactive" : "Reactive"],
        "<",
        n(f),
        `>${Z(f) ? " (readonly)" : ""}`
      ] : Z(f) ? [
        "div",
        {},
        ["span", e, Fe(f) ? "ShallowReadonly" : "Readonly"],
        "<",
        n(f),
        ">"
      ] : null : null;
    },
    hasBody(f) {
      return f && f.__isVue;
    },
    body(f) {
      if (f && f.__isVue)
        return [
          "div",
          {},
          ...a(f.$)
        ];
    }
  };
  function a(f) {
    const d = [];
    f.type.props && f.props && d.push(u("props", v(f.props))), f.setupState !== H && d.push(u("setup", f.setupState)), f.data !== H && d.push(u("data", v(f.data)));
    const h = t(f, "computed");
    h && d.push(u("computed", h));
    const p = t(f, "inject");
    return p && d.push(u("injected", p)), d.push([
      "div",
      {},
      [
        "span",
        {
          style: i.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: f }]
    ]), d;
  }
  function u(f, d) {
    return d = R({}, d), Object.keys(d).length ? [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        f
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(d).map((h) => [
          "div",
          {},
          ["span", i, h + ": "],
          n(d[h], !1)
        ])
      ]
    ] : ["span", {}];
  }
  function n(f, d = !0) {
    return typeof f == "number" ? ["span", r, f] : typeof f == "string" ? ["span", s, JSON.stringify(f)] : typeof f == "boolean" ? ["span", i, f] : I(f) ? ["object", { object: d ? v(f) : f }] : ["span", s, String(f)];
  }
  function t(f, d) {
    const h = f.type;
    if (x(h))
      return;
    const p = {};
    for (const g in f.ctx)
      l(h, g, d) && (p[g] = f.ctx[g]);
    return p;
  }
  function l(f, d, h) {
    const p = f[h];
    if (w(p) && p.includes(d) || I(p) && d in p || f.extends && l(f.extends, d, h) || f.mixins && f.mixins.some((g) => l(g, d, h)))
      return !0;
  }
  function c(f) {
    return Fe(f) ? "ShallowRef" : f.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(o) : window.devtoolsFormatters = [o];
}
function rn() {
  sn();
}
process.env.NODE_ENV !== "production" && rn();
const nn = (e, r) => {
  const s = e.__vccOpts || e;
  for (const [i, o] of r)
    s[i] = o;
  return s;
}, on = {
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
      default: "lightgallery"
    }
  },
  data() {
    return {
      el: null,
      gallery: null,
      instance: null,
      curIndex: 0,
      isClosed: !1
    };
  },
  watch: {},
  mounted() {
  },
  destroyed() {
  },
  computed: {},
  methods: {
    open(e = 0) {
      this.curIndex = e;
      const r = Object.assign({
        index: e,
        mode: "lg-fade",
        closable: !1,
        mousewheel: !0,
        speed: 600,
        addClass: "",
        startClass: "lg-start-zoom",
        backdropDuration: 150,
        hideBarsDelay: 1e3,
        useLeft: !1,
        loop: !0,
        controls: !0,
        getCaptionFromTitleOrAlt: !0,
        preload: 2,
        download: !0,
        counter: !0,
        swipeThreshold: 50,
        dynamic: !0,
        dynamicEl: this.images,
        thumbnail: !0,
        pager: !1
      }, this.options);
      this.el = document.querySelector(`#${this.id}`);
      let s = this;
      this.el.addEventListener("onBeforeSlide", function(i) {
        s.curIndex = i.detail.index, s.$emit("onBeforeSlide", { prevIndex: i.detail.prevIndex, index: i.detail.index, fromTouch: i.detail.fromTouch, fromThumb: i.detail.fromThumb });
      }, !1), this.el.addEventListener("onAfterSlide", function(i) {
        s.curIndex = i.detail.index, s.$emit("onAfterSlide", { prevIndex: i.detail.prevIndex, index: i.detail.index, fromTouch: i.detail.fromTouch, fromThumb: i.detail.fromThumb });
      }, !1), this.el.addEventListener("onSlideItemLoad", function(i) {
        s.$emit("onSlideItemLoad", { index: i.detail.index });
      }, !1), this.el.addEventListener("onBeforeClose", function(i) {
        s.$emit("onBeforeClose", {});
      }, !1), this.el.addEventListener("onCloseAfter", function(i) {
        s.isClosed = !0, s.$emit("onCloseAfter", {});
      }, !1), this.gallery = window.lightGallery(this.el, r), this.instance = window.lgData[this.el.getAttribute("lg-uid")];
    },
    getIndex() {
      return this.curIndex;
    },
    getConfig() {
      return this.instance.s;
    },
    getCurImg() {
      return document.querySelector(".lg-current img");
    },
    getCurThumbImg() {
      return document.querySelector(".lg-thumb-item.active img");
    },
    slideIndex(e) {
      this.curIndex = e, this.instance.s.index = e, this.instance.slide(e);
    },
    close() {
      this.isClosed || (this.instance.destroy(!0), this.gallery !== null && (this.gallery = null), this.instance !== null && (this.instance = null));
    },
    enterFullScreen() {
      this.instance.modules.fullscreen.isFullScreen() || this.instance.modules.fullscreen.requestFullscreen();
    },
    exitFullScreen() {
      this.instance.modules.fullscreen.isFullScreen() && this.instance.modules.fullscreen.exitFullscreen();
    },
    toggleFullScreen() {
      this.instance.modules.fullscreen.isFullScreen() ? this.exitFullScreen() : this.enterFullScreen();
    },
    next() {
      this.instance.goToNextSlide();
    },
    prev() {
      this.instance.goToPrevSlide();
    },
    play() {
      this.instance.modules.autoplay.startlAuto();
    },
    pause() {
      this.instance.modules.autoplay.cancelAuto();
    }
  }
}, ln = ["id"];
function an(e, r, s, i, o, a) {
  return Wr(), zr("div", { id: s.id }, null, 8, ln);
}
const un = /* @__PURE__ */ nn(on, [["render", an]]);
export {
  un as default
};
