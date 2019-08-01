(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[85],{

/***/ "./node_modules/@ionic/core/dist/esm/legacy/ion-toast-ios.entry.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/legacy/ion-toast-ios.entry.js ***!
  \*************************************************************************/
/*! exports provided: ion_toast */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ion_toast", function() { return Toast; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chunk-f257aad1.js */ "./node_modules/@ionic/core/dist/esm/legacy/chunk-f257aad1.js");
/* harmony import */ var _chunk_1074393c_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./chunk-1074393c.js */ "./node_modules/@ionic/core/dist/esm/legacy/chunk-1074393c.js");
/* harmony import */ var _chunk_24212d31_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./chunk-24212d31.js */ "./node_modules/@ionic/core/dist/esm/legacy/chunk-24212d31.js");
/* harmony import */ var _chunk_9d21e8e5_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./chunk-9d21e8e5.js */ "./node_modules/@ionic/core/dist/esm/legacy/chunk-9d21e8e5.js");
/* harmony import */ var _chunk_cae2ca23_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./chunk-cae2ca23.js */ "./node_modules/@ionic/core/dist/esm/legacy/chunk-cae2ca23.js");






/**
 * iOS Toast Enter Animation
 */
function iosEnterAnimation(AnimationC, baseEl, position) {
    var baseAnimation = new AnimationC();
    var wrapperAnimation = new AnimationC();
    var hostEl = baseEl.host || baseEl;
    var wrapperEl = baseEl.querySelector('.toast-wrapper');
    wrapperAnimation.addElement(wrapperEl);
    var bottom = "calc(-10px - var(--ion-safe-area-bottom, 0px))";
    var top = "calc(10px + var(--ion-safe-area-top, 0px))";
    switch (position) {
        case 'top':
            wrapperAnimation.fromTo('translateY', '-100%', top);
            break;
        case 'middle':
            var topPosition = Math.floor(hostEl.clientHeight / 2 - wrapperEl.clientHeight / 2);
            wrapperEl.style.top = topPosition + "px";
            wrapperAnimation.fromTo('opacity', 0.01, 1);
            break;
        default:
            wrapperAnimation.fromTo('translateY', '100%', bottom);
            break;
    }
    return Promise.resolve(baseAnimation
        .addElement(hostEl)
        .easing('cubic-bezier(.155,1.105,.295,1.12)')
        .duration(400)
        .add(wrapperAnimation));
}
/**
 * iOS Toast Leave Animation
 */
function iosLeaveAnimation(AnimationC, baseEl, position) {
    var baseAnimation = new AnimationC();
    var wrapperAnimation = new AnimationC();
    var hostEl = baseEl.host || baseEl;
    var wrapperEl = baseEl.querySelector('.toast-wrapper');
    wrapperAnimation.addElement(wrapperEl);
    var bottom = "calc(-10px - var(--ion-safe-area-bottom, 0px))";
    var top = "calc(10px + var(--ion-safe-area-top, 0px))";
    switch (position) {
        case 'top':
            wrapperAnimation.fromTo('translateY', top, '-100%');
            break;
        case 'middle':
            wrapperAnimation.fromTo('opacity', 0.99, 0);
            break;
        default:
            wrapperAnimation.fromTo('translateY', bottom, '100%');
            break;
    }
    return Promise.resolve(baseAnimation
        .addElement(hostEl)
        .easing('cubic-bezier(.36,.66,.04,1)')
        .duration(300)
        .add(wrapperAnimation));
}
/**
 * MD Toast Enter Animation
 */
function mdEnterAnimation(AnimationC, baseEl, position) {
    var baseAnimation = new AnimationC();
    var wrapperAnimation = new AnimationC();
    var hostEl = baseEl.host || baseEl;
    var wrapperEl = baseEl.querySelector('.toast-wrapper');
    wrapperAnimation.addElement(wrapperEl);
    var bottom = "calc(8px + var(--ion-safe-area-bottom, 0px))";
    var top = "calc(8px + var(--ion-safe-area-top, 0px))";
    switch (position) {
        case 'top':
            wrapperEl.style.top = top;
            wrapperAnimation.fromTo('opacity', 0.01, 1);
            break;
        case 'middle':
            var topPosition = Math.floor(hostEl.clientHeight / 2 - wrapperEl.clientHeight / 2);
            wrapperEl.style.top = topPosition + "px";
            wrapperAnimation.fromTo('opacity', 0.01, 1);
            break;
        default:
            wrapperEl.style.bottom = bottom;
            wrapperAnimation.fromTo('opacity', 0.01, 1);
            break;
    }
    return Promise.resolve(baseAnimation
        .addElement(hostEl)
        .easing('cubic-bezier(.36,.66,.04,1)')
        .duration(400)
        .add(wrapperAnimation));
}
/**
 * md Toast Leave Animation
 */
function mdLeaveAnimation(AnimationC, baseEl) {
    var baseAnimation = new AnimationC();
    var wrapperAnimation = new AnimationC();
    var hostEl = baseEl.host || baseEl;
    var wrapperEl = baseEl.querySelector('.toast-wrapper');
    wrapperAnimation.addElement(wrapperEl);
    wrapperAnimation.fromTo('opacity', 0.99, 0);
    return Promise.resolve(baseAnimation
        .addElement(hostEl)
        .easing('cubic-bezier(.36,.66,.04,1)')
        .duration(300)
        .add(wrapperAnimation));
}
/**
 * @virtualProp {"ios" | "md"} mode - The mode determines which platform styles to use.
 */
var Toast = /** @class */ (function () {
    function Toast(hostRef) {
        Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["r"])(this, hostRef);
        this.presented = false;
        this.mode = Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["d"])(this);
        /**
         * How many milliseconds to wait before hiding the toast. By default, it will show
         * until `dismiss()` is called.
         */
        this.duration = 0;
        /**
         * If `true`, the keyboard will be automatically dismissed when the overlay is presented.
         */
        this.keyboardClose = false;
        /**
         * The position of the toast on the screen.
         */
        this.position = 'bottom';
        /**
         * If `true`, the close button will be displayed.
         */
        this.showCloseButton = false;
        /**
         * If `true`, the toast will be translucent.
         */
        this.translucent = false;
        /**
         * If `true`, the toast will animate.
         */
        this.animated = true;
        this.didPresent = Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["c"])(this, "ionToastDidPresent", 7);
        this.willPresent = Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["c"])(this, "ionToastWillPresent", 7);
        this.willDismiss = Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["c"])(this, "ionToastWillDismiss", 7);
        this.didDismiss = Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["c"])(this, "ionToastDidDismiss", 7);
    }
    /**
     * Present the toast overlay after it has been created.
     */
    Toast.prototype.present = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Object(_chunk_24212d31_js__WEBPACK_IMPORTED_MODULE_3__["d"])(this, 'toastEnter', iosEnterAnimation, mdEnterAnimation, this.position)];
                    case 1:
                        _a.sent();
                        if (this.duration > 0) {
                            this.durationTimeout = setTimeout(function () { return _this.dismiss(undefined, 'timeout'); }, this.duration);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Dismiss the toast overlay after it has been presented.
     *
     * @param data Any data to emit in the dismiss events.
     * @param role The role of the element that is dismissing the toast.
     * This can be useful in a button handler for determining which button was
     * clicked to dismiss the toast.
     * Some examples include: ``"cancel"`, `"destructive"`, "selected"`, and `"backdrop"`.
     */
    Toast.prototype.dismiss = function (data, role) {
        if (this.durationTimeout) {
            clearTimeout(this.durationTimeout);
        }
        return Object(_chunk_24212d31_js__WEBPACK_IMPORTED_MODULE_3__["e"])(this, data, role, 'toastLeave', iosLeaveAnimation, mdLeaveAnimation, this.position);
    };
    /**
     * Returns a promise that resolves when the toast did dismiss.
     */
    Toast.prototype.onDidDismiss = function () {
        return Object(_chunk_24212d31_js__WEBPACK_IMPORTED_MODULE_3__["f"])(this.el, 'ionToastDidDismiss');
    };
    /**
     * Returns a promise that resolves when the toast will dismiss.
     */
    Toast.prototype.onWillDismiss = function () {
        return Object(_chunk_24212d31_js__WEBPACK_IMPORTED_MODULE_3__["f"])(this.el, 'ionToastWillDismiss');
    };
    Toast.prototype.getButtons = function () {
        var _this = this;
        var buttons = this.buttons
            ? this.buttons.map(function (b) {
                return (typeof b === 'string')
                    ? { text: b }
                    : b;
            })
            : [];
        if (this.showCloseButton) {
            buttons.push({
                text: this.closeButtonText || 'Close',
                handler: function () { return _this.dismiss(undefined, 'cancel'); }
            });
        }
        return buttons;
    };
    Toast.prototype.buttonClick = function (button) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var role, shouldDismiss;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        role = button.role;
                        if (Object(_chunk_24212d31_js__WEBPACK_IMPORTED_MODULE_3__["i"])(role)) {
                            return [2 /*return*/, this.dismiss(undefined, role)];
                        }
                        return [4 /*yield*/, this.callButtonHandler(button)];
                    case 1:
                        shouldDismiss = _a.sent();
                        if (shouldDismiss) {
                            return [2 /*return*/, this.dismiss(undefined, button.role)];
                        }
                        return [2 /*return*/, Promise.resolve()];
                }
            });
        });
    };
    Toast.prototype.callButtonHandler = function (button) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var rtn, e_1;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(button && button.handler)) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, button.handler()];
                    case 2:
                        rtn = _a.sent();
                        if (rtn === false) {
                            // if the return value of the handler is false then do not dismiss
                            return [2 /*return*/, false];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, true];
                }
            });
        });
    };
    Toast.prototype.hostData = function () {
        var _a;
        var mode = Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["d"])(this);
        return {
            style: {
                zIndex: 60000 + this.overlayIndex,
            },
            class: Object.assign((_a = {}, _a[mode] = true, _a), Object(_chunk_9d21e8e5_js__WEBPACK_IMPORTED_MODULE_4__["c"])(this.color), Object(_chunk_9d21e8e5_js__WEBPACK_IMPORTED_MODULE_4__["g"])(this.cssClass), { 'toast-translucent': this.translucent })
        };
    };
    Toast.prototype.renderButtons = function (buttons, side) {
        var _a;
        var _this = this;
        if (buttons.length === 0) {
            return;
        }
        var mode = Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["d"])(this);
        var buttonGroupsClasses = (_a = {
                'toast-button-group': true
            },
            _a["toast-button-group-" + side] = true,
            _a);
        return (Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["h"])("div", { class: buttonGroupsClasses }, buttons.map(function (b) { return Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["h"])("button", { type: "button", class: buttonClass(b), tabIndex: 0, onClick: function () { return _this.buttonClick(b); } }, Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["h"])("div", { class: "toast-button-inner" }, b.icon &&
            Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["h"])("ion-icon", { name: b.icon, slot: b.text === undefined ? 'icon-only' : undefined, class: "toast-icon" }), b.text), mode === 'md' && Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["h"])("ion-ripple-effect", { type: b.icon !== undefined && b.text === undefined ? 'unbounded' : 'bounded' })); })));
    };
    Toast.prototype.__stencil_render = function () {
        var _a;
        var allButtons = this.getButtons();
        var startButtons = allButtons.filter(function (b) { return b.side === 'start'; });
        var endButtons = allButtons.filter(function (b) { return b.side !== 'start'; });
        var wrapperClass = (_a = {
                'toast-wrapper': true
            },
            _a["toast-" + this.position] = true,
            _a);
        return (Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["h"])("div", { class: wrapperClass }, Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["h"])("div", { class: "toast-container" }, this.renderButtons(startButtons, 'start'), Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["h"])("div", { class: "toast-content" }, this.header !== undefined &&
            Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["h"])("div", { class: "toast-header" }, this.header), this.message !== undefined &&
            Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["h"])("div", { class: "toast-message", innerHTML: Object(_chunk_cae2ca23_js__WEBPACK_IMPORTED_MODULE_5__["s"])(this.message) })), this.renderButtons(endButtons, 'end'))));
    };
    Object.defineProperty(Toast.prototype, "el", {
        get: function () { return Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["e"])(this); },
        enumerable: true,
        configurable: true
    });
    Toast.prototype.render = function () { return Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["h"])(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["H"], this.hostData(), this.__stencil_render()); };
    Object.defineProperty(Toast, "style", {
        get: function () { return ":host{--border-width:0;--border-style:none;--border-color:initial;--box-shadow:none;--min-width:auto;--width:auto;--min-height:auto;--height:auto;--max-height:auto;left:0;top:0;display:block;position:absolute;width:100%;height:100%;color:var(--color);font-family:var(--ion-font-family,inherit);contain:strict;z-index:1000;pointer-events:none}:host-context([dir=rtl]){left:unset;right:unset;right:0}:host(.overlay-hidden){display:none}:host(.ion-color){--button-color:inherit;color:var(--ion-color-contrast)}:host(.ion-color) .toast-wrapper{background:var(--ion-color-base)}.toast-wrapper{border-radius:var(--border-radius);left:var(--start);right:var(--end);width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);background:var(--background);-webkit-box-shadow:var(--box-shadow);box-shadow:var(--box-shadow)}:host-context([dir=rtl]) .toast-wrapper,[dir=rtl] .toast-wrapper{left:unset;right:unset;left:var(--end);right:var(--start)}.toast-container{-ms-flex-align:center;align-items:center;pointer-events:auto;contain:content}.toast-container,.toast-content{display:-ms-flexbox;display:flex}.toast-content{-ms-flex:1;flex:1;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:center;justify-content:center}.toast-message{-ms-flex:1;flex:1;white-space:pre-wrap}.toast-button-group{display:-ms-flexbox;display:flex}.toast-button{outline:none;color:var(--button-color);z-index:0}.toast-icon{font-size:1.4em}.toast-button-inner{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}\@media (any-hover:hover){.toast-button:hover{cursor:pointer}}:host{--background:var(--ion-color-step-50,#f2f2f2);--border-radius:14px;--button-color:var(--ion-color-primary,#3880ff);--color:var(--ion-color-step-850,#262626);--max-width:700px;--start:10px;--end:10px;font-size:14px}.toast-wrapper{margin-left:auto;margin-right:auto;margin-top:auto;margin-bottom:auto;display:block;position:absolute;z-index:10}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.toast-wrapper{margin-left:unset;margin-right:unset;-webkit-margin-start:auto;margin-inline-start:auto;-webkit-margin-end:auto;margin-inline-end:auto}}:host(.toast-translucent) .toast-wrapper{background:rgba(var(--ion-background-color-rgb,255,255,255),.8);-webkit-backdrop-filter:saturate(180%) blur(20px);backdrop-filter:saturate(180%) blur(20px)}.toast-wrapper.toast-top{-webkit-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0);top:0}.toast-wrapper.toast-middle{opacity:.01}.toast-wrapper.toast-bottom{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0);bottom:0}.toast-content{padding-left:15px;padding-right:15px;padding-top:15px;padding-bottom:15px}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.toast-content{padding-left:unset;padding-right:unset;-webkit-padding-start:15px;padding-inline-start:15px;-webkit-padding-end:15px;padding-inline-end:15px}}.toast-header{margin-bottom:2px;font-weight:500}.toast-button{padding-left:15px;padding-right:15px;padding-top:10px;padding-bottom:10px;height:44px;-webkit-transition:background-color,opacity .1s linear;transition:background-color,opacity .1s linear;border:0;background-color:transparent;font-family:var(--ion-font-family);font-size:17px;font-weight:500;overflow:hidden}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.toast-button{padding-left:unset;padding-right:unset;-webkit-padding-start:15px;padding-inline-start:15px;-webkit-padding-end:15px;padding-inline-end:15px}}.toast-button.activated{opacity:.4}\@media (any-hover:hover){.toast-button:hover{opacity:.6}}"; },
        enumerable: true,
        configurable: true
    });
    return Toast;
}());
function buttonClass(button) {
    var _a;
    return Object.assign((_a = { 'toast-button': true, 'toast-button-icon-only': button.icon !== undefined && button.text === undefined }, _a["toast-button-" + button.role] = button.role !== undefined, _a['ion-focusable'] = true, _a['ion-activatable'] = true, _a), Object(_chunk_9d21e8e5_js__WEBPACK_IMPORTED_MODULE_4__["g"])(button.cssClass));
}



/***/ })

}]);
//# sourceMappingURL=85.js.map