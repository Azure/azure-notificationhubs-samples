(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[49],{

/***/ "./node_modules/@ionic/core/dist/esm/legacy/ion-loading-ios.entry.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/legacy/ion-loading-ios.entry.js ***!
  \***************************************************************************/
/*! exports provided: ion_loading */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ion_loading", function() { return Loading; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chunk-f257aad1.js */ "./node_modules/@ionic/core/dist/esm/legacy/chunk-f257aad1.js");
/* harmony import */ var _chunk_1074393c_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./chunk-1074393c.js */ "./node_modules/@ionic/core/dist/esm/legacy/chunk-1074393c.js");
/* harmony import */ var _chunk_24212d31_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./chunk-24212d31.js */ "./node_modules/@ionic/core/dist/esm/legacy/chunk-24212d31.js");
/* harmony import */ var _chunk_9d21e8e5_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./chunk-9d21e8e5.js */ "./node_modules/@ionic/core/dist/esm/legacy/chunk-9d21e8e5.js");
/* harmony import */ var _chunk_cae2ca23_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./chunk-cae2ca23.js */ "./node_modules/@ionic/core/dist/esm/legacy/chunk-cae2ca23.js");






/**
 * iOS Loading Enter Animation
 */
function iosEnterAnimation(AnimationC, baseEl) {
    var baseAnimation = new AnimationC();
    var backdropAnimation = new AnimationC();
    backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));
    var wrapperAnimation = new AnimationC();
    wrapperAnimation.addElement(baseEl.querySelector('.loading-wrapper'));
    backdropAnimation.fromTo('opacity', 0.01, 0.3);
    wrapperAnimation.fromTo('opacity', 0.01, 1)
        .fromTo('scale', 1.1, 1);
    return Promise.resolve(baseAnimation
        .addElement(baseEl)
        .easing('ease-in-out')
        .duration(200)
        .add(backdropAnimation)
        .add(wrapperAnimation));
}
/**
 * iOS Loading Leave Animation
 */
function iosLeaveAnimation(AnimationC, baseEl) {
    var baseAnimation = new AnimationC();
    var backdropAnimation = new AnimationC();
    backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));
    var wrapperAnimation = new AnimationC();
    wrapperAnimation.addElement(baseEl.querySelector('.loading-wrapper'));
    backdropAnimation.fromTo('opacity', 0.3, 0);
    wrapperAnimation.fromTo('opacity', 0.99, 0)
        .fromTo('scale', 1, 0.9);
    return Promise.resolve(baseAnimation
        .addElement(baseEl)
        .easing('ease-in-out')
        .duration(200)
        .add(backdropAnimation)
        .add(wrapperAnimation));
}
/**
 * Md Loading Enter Animation
 */
function mdEnterAnimation(AnimationC, baseEl) {
    var baseAnimation = new AnimationC();
    var backdropAnimation = new AnimationC();
    backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));
    var wrapperAnimation = new AnimationC();
    wrapperAnimation.addElement(baseEl.querySelector('.loading-wrapper'));
    backdropAnimation.fromTo('opacity', 0.01, 0.32);
    wrapperAnimation.fromTo('opacity', 0.01, 1).fromTo('scale', 1.1, 1);
    return Promise.resolve(baseAnimation
        .addElement(baseEl)
        .easing('ease-in-out')
        .duration(200)
        .add(backdropAnimation)
        .add(wrapperAnimation));
}
/**
 * Md Loading Leave Animation
 */
function mdLeaveAnimation(AnimationC, baseEl) {
    var baseAnimation = new AnimationC();
    var backdropAnimation = new AnimationC();
    backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));
    var wrapperAnimation = new AnimationC();
    wrapperAnimation.addElement(baseEl.querySelector('.loading-wrapper'));
    backdropAnimation.fromTo('opacity', 0.32, 0);
    wrapperAnimation.fromTo('opacity', 0.99, 0).fromTo('scale', 1, 0.9);
    return Promise.resolve(baseAnimation
        .addElement(baseEl)
        .easing('ease-in-out')
        .duration(200)
        .add(backdropAnimation)
        .add(wrapperAnimation));
}
/**
 * @virtualProp {"ios" | "md"} mode - The mode determines which platform styles to use.
 */
var Loading = /** @class */ (function () {
    function Loading(hostRef) {
        var _this = this;
        Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["r"])(this, hostRef);
        this.presented = false;
        this.mode = Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["d"])(this);
        /**
         * If `true`, the keyboard will be automatically dismissed when the overlay is presented.
         */
        this.keyboardClose = true;
        /**
         * Number of milliseconds to wait before dismissing the loading indicator.
         */
        this.duration = 0;
        /**
         * If `true`, the loading indicator will be dismissed when the backdrop is clicked.
         */
        this.backdropDismiss = false;
        /**
         * If `true`, a backdrop will be displayed behind the loading indicator.
         */
        this.showBackdrop = true;
        /**
         * If `true`, the loading indicator will be translucent.
         */
        this.translucent = false;
        /**
         * If `true`, the loading indicator will animate.
         */
        this.animated = true;
        this.onBackdropTap = function () {
            _this.dismiss(undefined, _chunk_24212d31_js__WEBPACK_IMPORTED_MODULE_3__["B"]);
        };
        this.didPresent = Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["c"])(this, "ionLoadingDidPresent", 7);
        this.willPresent = Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["c"])(this, "ionLoadingWillPresent", 7);
        this.willDismiss = Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["c"])(this, "ionLoadingWillDismiss", 7);
        this.didDismiss = Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["c"])(this, "ionLoadingDidDismiss", 7);
    }
    Loading.prototype.componentWillLoad = function () {
        if (this.spinner === undefined) {
            var mode = Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["d"])(this);
            this.spinner = _chunk_1074393c_js__WEBPACK_IMPORTED_MODULE_2__["b"].get('loadingSpinner', _chunk_1074393c_js__WEBPACK_IMPORTED_MODULE_2__["b"].get('spinner', mode === 'ios' ? 'lines' : 'crescent'));
        }
    };
    /**
     * Present the loading overlay after it has been created.
     */
    Loading.prototype.present = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Object(_chunk_24212d31_js__WEBPACK_IMPORTED_MODULE_3__["d"])(this, 'loadingEnter', iosEnterAnimation, mdEnterAnimation, undefined)];
                    case 1:
                        _a.sent();
                        if (this.duration > 0) {
                            this.durationTimeout = setTimeout(function () { return _this.dismiss(); }, this.duration + 10);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Dismiss the loading overlay after it has been presented.
     *
     * @param data Any data to emit in the dismiss events.
     * @param role The role of the element that is dismissing the loading.
     * This can be useful in a button handler for determining which button was
     * clicked to dismiss the loading.
     * Some examples include: ``"cancel"`, `"destructive"`, "selected"`, and `"backdrop"`.
     */
    Loading.prototype.dismiss = function (data, role) {
        if (this.durationTimeout) {
            clearTimeout(this.durationTimeout);
        }
        return Object(_chunk_24212d31_js__WEBPACK_IMPORTED_MODULE_3__["e"])(this, data, role, 'loadingLeave', iosLeaveAnimation, mdLeaveAnimation);
    };
    /**
     * Returns a promise that resolves when the loading did dismiss.
     */
    Loading.prototype.onDidDismiss = function () {
        return Object(_chunk_24212d31_js__WEBPACK_IMPORTED_MODULE_3__["f"])(this.el, 'ionLoadingDidDismiss');
    };
    /**
     * Returns a promise that resolves when the loading will dismiss.
     */
    Loading.prototype.onWillDismiss = function () {
        return Object(_chunk_24212d31_js__WEBPACK_IMPORTED_MODULE_3__["f"])(this.el, 'ionLoadingWillDismiss');
    };
    Loading.prototype.render = function () {
        var _a;
        var _b = this, message = _b.message, spinner = _b.spinner;
        var mode = Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["d"])(this);
        return (Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["h"])(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["H"], { onIonBackdropTap: this.onBackdropTap, style: {
                zIndex: "" + (40000 + this.overlayIndex)
            }, class: Object.assign({}, Object(_chunk_9d21e8e5_js__WEBPACK_IMPORTED_MODULE_4__["g"])(this.cssClass), (_a = {}, _a[mode] = true, _a['loading-translucent'] = this.translucent, _a)) }, Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["h"])("ion-backdrop", { visible: this.showBackdrop, tappable: this.backdropDismiss }), Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["h"])("div", { class: "loading-wrapper", role: "dialog" }, spinner && (Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["h"])("div", { class: "loading-spinner" }, Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["h"])("ion-spinner", { name: spinner }))), message && Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["h"])("div", { class: "loading-content", innerHTML: Object(_chunk_cae2ca23_js__WEBPACK_IMPORTED_MODULE_5__["s"])(message) }))));
    };
    Object.defineProperty(Loading.prototype, "el", {
        get: function () { return Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["e"])(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Loading, "style", {
        get: function () { return ".sc-ion-loading-ios-h{--min-width:auto;--width:auto;--min-height:auto;--height:auto;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;left:0;right:0;top:0;bottom:0;display:-ms-flexbox;display:flex;position:fixed;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;font-family:var(--ion-font-family,inherit);contain:strict;-ms-touch-action:none;touch-action:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:1000}.overlay-hidden.sc-ion-loading-ios-h{display:none}.loading-wrapper.sc-ion-loading-ios{display:-ms-flexbox;display:flex;-ms-flex-align:inherit;align-items:inherit;-ms-flex-pack:inherit;justify-content:inherit;width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);background:var(--background);opacity:0;z-index:10}.spinner-bubbles.sc-ion-loading-ios, .spinner-circles.sc-ion-loading-ios, .spinner-crescent.sc-ion-loading-ios, .spinner-dots.sc-ion-loading-ios, .spinner-lines.sc-ion-loading-ios, .spinner-lines-small.sc-ion-loading-ios{color:var(--spinner-color)}.sc-ion-loading-ios-h{--background:var(--ion-color-step-50,#f2f2f2);--max-width:270px;--max-height:90%;--spinner-color:var(--ion-color-step-600,#666);color:var(--ion-text-color,#000);font-size:14px}.loading-wrapper.sc-ion-loading-ios{border-radius:8px;padding-left:34px;padding-right:34px;padding-top:24px;padding-bottom:24px}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.loading-wrapper.sc-ion-loading-ios{padding-left:unset;padding-right:unset;-webkit-padding-start:34px;padding-inline-start:34px;-webkit-padding-end:34px;padding-inline-end:34px}}.loading-translucent.sc-ion-loading-ios-h .loading-wrapper.sc-ion-loading-ios{background-color:rgba(var(--ion-background-color-rgb,255,255,255),.8);-webkit-backdrop-filter:saturate(180%) blur(20px);backdrop-filter:saturate(180%) blur(20px)}.loading-content.sc-ion-loading-ios{font-weight:700}.loading-spinner.sc-ion-loading-ios + .loading-content.sc-ion-loading-ios{margin-left:16px}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.loading-spinner.sc-ion-loading-ios + .loading-content.sc-ion-loading-ios{margin-left:unset;-webkit-margin-start:16px;margin-inline-start:16px}}"; },
        enumerable: true,
        configurable: true
    });
    return Loading;
}());



/***/ })

}]);
//# sourceMappingURL=49.js.map