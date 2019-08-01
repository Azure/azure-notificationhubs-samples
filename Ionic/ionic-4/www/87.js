(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[87],{

/***/ "./node_modules/@ionic/core/dist/esm/legacy/ion-toggle-ios.entry.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/legacy/ion-toggle-ios.entry.js ***!
  \**************************************************************************/
/*! exports provided: ion_toggle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ion_toggle", function() { return Toggle; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chunk-f257aad1.js */ "./node_modules/@ionic/core/dist/esm/legacy/chunk-f257aad1.js");
/* harmony import */ var _chunk_1074393c_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./chunk-1074393c.js */ "./node_modules/@ionic/core/dist/esm/legacy/chunk-1074393c.js");
/* harmony import */ var _chunk_9d21e8e5_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./chunk-9d21e8e5.js */ "./node_modules/@ionic/core/dist/esm/legacy/chunk-9d21e8e5.js");
/* harmony import */ var _chunk_6c3d2f60_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./chunk-6c3d2f60.js */ "./node_modules/@ionic/core/dist/esm/legacy/chunk-6c3d2f60.js");
/* harmony import */ var _chunk_d102c9d1_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./chunk-d102c9d1.js */ "./node_modules/@ionic/core/dist/esm/legacy/chunk-d102c9d1.js");






/**
 * @virtualProp {"ios" | "md"} mode - The mode determines which platform styles to use.
 */
var Toggle = /** @class */ (function () {
    function Toggle(hostRef) {
        var _this = this;
        Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["r"])(this, hostRef);
        this.inputId = "ion-tg-" + toggleIds++;
        this.lastDrag = 0;
        this.activated = false;
        /**
         * The name of the control, which is submitted with the form data.
         */
        this.name = this.inputId;
        /**
         * If `true`, the toggle is selected.
         */
        this.checked = false;
        /**
         * If `true`, the user cannot interact with the toggle.
         */
        this.disabled = false;
        /**
         * The value of the toggle does not mean if it's checked or not, use the `checked`
         * property for that.
         *
         * The value of a toggle is analogous to the value of a `<input type="checkbox">`,
         * it's only used when the toggle participates in a native `<form>`.
         */
        this.value = 'on';
        this.onClick = function () {
            if (_this.lastDrag + 300 < Date.now()) {
                _this.checked = !_this.checked;
            }
        };
        this.onFocus = function () {
            _this.ionFocus.emit();
        };
        this.onBlur = function () {
            _this.ionBlur.emit();
        };
        this.ionChange = Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["c"])(this, "ionChange", 7);
        this.ionFocus = Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["c"])(this, "ionFocus", 7);
        this.ionBlur = Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["c"])(this, "ionBlur", 7);
        this.ionStyle = Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["c"])(this, "ionStyle", 7);
    }
    Toggle.prototype.checkedChanged = function (isChecked) {
        this.ionChange.emit({
            checked: isChecked,
            value: this.value
        });
    };
    Toggle.prototype.disabledChanged = function () {
        this.emitStyle();
        if (this.gesture) {
            this.gesture.setDisabled(this.disabled);
        }
    };
    Toggle.prototype.componentWillLoad = function () {
        this.emitStyle();
    };
    Toggle.prototype.componentDidLoad = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e("common")]).then(__webpack_require__.bind(null, /*! ./index-0303391f.js */ "./node_modules/@ionic/core/dist/esm/legacy/index-0303391f.js"))];
                    case 1:
                        _a.gesture = (_b.sent()).createGesture({
                            el: this.el,
                            gestureName: 'toggle',
                            gesturePriority: 100,
                            threshold: 5,
                            passive: false,
                            onStart: function () { return _this.onStart(); },
                            onMove: function (ev) { return _this.onMove(ev); },
                            onEnd: function (ev) { return _this.onEnd(ev); },
                        });
                        this.disabledChanged();
                        return [2 /*return*/];
                }
            });
        });
    };
    Toggle.prototype.componentDidUnload = function () {
        if (this.gesture) {
            this.gesture.destroy();
            this.gesture = undefined;
        }
    };
    Toggle.prototype.emitStyle = function () {
        this.ionStyle.emit({
            'interactive-disabled': this.disabled,
        });
    };
    Toggle.prototype.onStart = function () {
        this.activated = true;
        // touch-action does not work in iOS
        this.setFocus();
    };
    Toggle.prototype.onMove = function (detail) {
        if (shouldToggle(document, this.checked, detail.deltaX, -10)) {
            this.checked = !this.checked;
            Object(_chunk_6c3d2f60_js__WEBPACK_IMPORTED_MODULE_4__["h"])();
        }
    };
    Toggle.prototype.onEnd = function (ev) {
        this.activated = false;
        this.lastDrag = Date.now();
        ev.event.preventDefault();
        ev.event.stopImmediatePropagation();
    };
    Toggle.prototype.getValue = function () {
        return this.value || '';
    };
    Toggle.prototype.setFocus = function () {
        if (this.buttonEl) {
            this.buttonEl.focus();
        }
    };
    Toggle.prototype.render = function () {
        var _a;
        var _this = this;
        var _b = this, inputId = _b.inputId, disabled = _b.disabled, checked = _b.checked, activated = _b.activated, color = _b.color, el = _b.el;
        var mode = Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["d"])(this);
        var labelId = inputId + '-lbl';
        var label = Object(_chunk_d102c9d1_js__WEBPACK_IMPORTED_MODULE_5__["f"])(el);
        var value = this.getValue();
        if (label) {
            label.id = labelId;
        }
        Object(_chunk_d102c9d1_js__WEBPACK_IMPORTED_MODULE_5__["r"])(true, el, this.name, (checked ? value : ''), disabled);
        return (Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["h"])(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["H"], { onClick: this.onClick, role: "checkbox", "aria-disabled": disabled ? 'true' : null, "aria-checked": "" + checked, "aria-labelledby": labelId, class: Object.assign({}, Object(_chunk_9d21e8e5_js__WEBPACK_IMPORTED_MODULE_3__["c"])(color), (_a = {}, _a[mode] = true, _a['in-item'] = Object(_chunk_9d21e8e5_js__WEBPACK_IMPORTED_MODULE_3__["h"])('ion-item', el), _a['toggle-activated'] = activated, _a['toggle-checked'] = checked, _a['toggle-disabled'] = disabled, _a['interactive'] = true, _a)) }, Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["h"])("div", { class: "toggle-icon" }, Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["h"])("div", { class: "toggle-inner" })), Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["h"])("button", { type: "button", onFocus: this.onFocus, onBlur: this.onBlur, disabled: disabled, ref: function (btnEl) { return _this.buttonEl = btnEl; } })));
    };
    Object.defineProperty(Toggle.prototype, "el", {
        get: function () { return Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["e"])(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Toggle, "watchers", {
        get: function () {
            return {
                "checked": ["checkedChanged"],
                "disabled": ["disabledChanged"]
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Toggle, "style", {
        get: function () { return ":host{-webkit-box-sizing:content-box!important;box-sizing:content-box!important;display:inline-block;outline:none;contain:content;cursor:pointer;-ms-touch-action:none;touch-action:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:2}:host(.ion-focused) input{border:2px solid #5e9ed6}:host(.toggle-disabled){pointer-events:none}button{left:0;top:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;position:absolute;width:100%;height:100%;border:0;background:transparent;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;outline:none}:host-context([dir=rtl]) button,[dir=rtl] button{left:unset;right:unset;right:0}button::-moz-focus-inner{border:0}:host{--background:var(--ion-item-background,var(--ion-background-color,#fff));--background-checked:var(--ion-color-primary,#3880ff);--handle-background:var(--ion-item-background,var(--ion-background-color,#fff));--handle-background-checked:var(--ion-item-background,var(--ion-background-color,#fff));-webkit-box-sizing:content-box;box-sizing:content-box;position:relative;width:51px;height:32px;contain:strict}:host(.ion-color.toggle-checked) .toggle-icon{background:var(--ion-color-base)}.toggle-icon{border-radius:16px;display:block;position:relative;width:100%;height:100%;-webkit-transform:translateZ(0);transform:translateZ(0);-webkit-transition:background-color .3s;transition:background-color .3s;background-color:var(--ion-color-step-50,#f2f2f2);overflow:hidden;pointer-events:none}.toggle-icon:before{right:2px;bottom:2px;border-radius:16px;-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transition:-webkit-transform .3s;transition:-webkit-transform .3s;transition:transform .3s;transition:transform .3s,-webkit-transform .3s;background:var(--background);content:\"\"}.toggle-icon:before,.toggle-inner{left:2px;top:2px;position:absolute}.toggle-inner{border-radius:14px;width:28px;height:28px;-webkit-transition:width .12s ease-in-out 80ms,left .11s ease-in-out 80ms,right .11s ease-in-out 80ms,-webkit-transform .3s;transition:width .12s ease-in-out 80ms,left .11s ease-in-out 80ms,right .11s ease-in-out 80ms,-webkit-transform .3s;transition:transform .3s,width .12s ease-in-out 80ms,left .11s ease-in-out 80ms,right .11s ease-in-out 80ms;transition:transform .3s,width .12s ease-in-out 80ms,left .11s ease-in-out 80ms,right .11s ease-in-out 80ms,-webkit-transform .3s;background:var(--handle-background);-webkit-box-shadow:0 3px 12px rgba(0,0,0,.16),0 3px 1px rgba(0,0,0,.1);box-shadow:0 3px 12px rgba(0,0,0,.16),0 3px 1px rgba(0,0,0,.1);will-change:transform;contain:strict}:host-context([dir=rtl]) .toggle-inner,[dir=rtl] .toggle-inner{left:unset;right:unset;right:2px}:host(.toggle-checked) .toggle-icon{background:var(--background-checked)}:host(.toggle-activated) .toggle-icon:before,:host(.toggle-checked) .toggle-icon:before{-webkit-transform:scale3d(0,0,0);transform:scale3d(0,0,0)}:host(.toggle-checked) .toggle-inner{-webkit-transform:translate3d(19px,0,0);transform:translate3d(19px,0,0);background:var(--handle-background-checked)}:host-context([dir=rtl]).toggle-checked .toggle-inner,:host-context([dir=rtl]):host(.toggle-checked) .toggle-inner{-webkit-transform:translate3d(calc(-1 * 19px),0,0);transform:translate3d(calc(-1 * 19px),0,0)}:host(.toggle-activated.toggle-checked) .toggle-inner:before{-webkit-transform:scale3d(0,0,0);transform:scale3d(0,0,0)}:host(.toggle-activated) .toggle-inner{width:34px}:host(.toggle-activated.toggle-checked) .toggle-inner{left:-4px}:host-context([dir=rtl]).toggle-activated.toggle-checked .toggle-inner,:host-context([dir=rtl]):host(.toggle-activated.toggle-checked) .toggle-inner{left:unset;right:unset;right:-4px}:host(.toggle-disabled){opacity:.3}:host(.in-item[slot]){margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:16px;padding-right:8px;padding-top:6px;padding-bottom:5px}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){:host(.in-item[slot]){padding-left:unset;padding-right:unset;-webkit-padding-start:16px;padding-inline-start:16px;-webkit-padding-end:8px;padding-inline-end:8px}}:host(.in-item[slot=start]){padding-left:0;padding-right:16px;padding-top:6px;padding-bottom:5px}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){:host(.in-item[slot=start]){padding-left:unset;padding-right:unset;-webkit-padding-start:0;padding-inline-start:0;-webkit-padding-end:16px;padding-inline-end:16px}}"; },
        enumerable: true,
        configurable: true
    });
    return Toggle;
}());
function shouldToggle(doc, checked, deltaX, margin) {
    var isRTL = doc.dir === 'rtl';
    if (checked) {
        return (!isRTL && (margin > deltaX)) ||
            (isRTL && (-margin < deltaX));
    }
    else {
        return (!isRTL && (-margin < deltaX)) ||
            (isRTL && (margin > deltaX));
    }
}
var toggleIds = 0;



/***/ })

}]);
//# sourceMappingURL=87.js.map