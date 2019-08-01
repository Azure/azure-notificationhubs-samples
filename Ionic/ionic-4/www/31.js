(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[31],{

/***/ "./node_modules/@ionic/core/dist/esm/legacy/ion-checkbox-ios.entry.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/legacy/ion-checkbox-ios.entry.js ***!
  \****************************************************************************/
/*! exports provided: ion_checkbox */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ion_checkbox", function() { return Checkbox; });
/* harmony import */ var _chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chunk-f257aad1.js */ "./node_modules/@ionic/core/dist/esm/legacy/chunk-f257aad1.js");
/* harmony import */ var _chunk_1074393c_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chunk-1074393c.js */ "./node_modules/@ionic/core/dist/esm/legacy/chunk-1074393c.js");
/* harmony import */ var _chunk_9d21e8e5_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./chunk-9d21e8e5.js */ "./node_modules/@ionic/core/dist/esm/legacy/chunk-9d21e8e5.js");
/* harmony import */ var _chunk_d102c9d1_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./chunk-d102c9d1.js */ "./node_modules/@ionic/core/dist/esm/legacy/chunk-d102c9d1.js");




/**
 * @virtualProp {"ios" | "md"} mode - The mode determines which platform styles to use.
 */
var Checkbox = /** @class */ (function () {
    function Checkbox(hostRef) {
        var _this = this;
        Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
        this.inputId = "ion-cb-" + checkboxIds++;
        /**
         * The name of the control, which is submitted with the form data.
         */
        this.name = this.inputId;
        /**
         * If `true`, the checkbox is selected.
         */
        this.checked = false;
        /**
         * If `true`, the checkbox will visually appear as indeterminate.
         */
        this.indeterminate = false;
        /**
         * If `true`, the user cannot interact with the checkbox.
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
            _this.setFocus();
            _this.checked = !_this.checked;
            _this.indeterminate = false;
        };
        this.onFocus = function () {
            _this.ionFocus.emit();
        };
        this.onBlur = function () {
            _this.ionBlur.emit();
        };
        this.ionChange = Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_0__["c"])(this, "ionChange", 7);
        this.ionFocus = Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_0__["c"])(this, "ionFocus", 7);
        this.ionBlur = Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_0__["c"])(this, "ionBlur", 7);
        this.ionStyle = Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_0__["c"])(this, "ionStyle", 7);
    }
    Checkbox.prototype.componentWillLoad = function () {
        this.emitStyle();
    };
    Checkbox.prototype.checkedChanged = function (isChecked) {
        this.ionChange.emit({
            checked: isChecked,
            value: this.value
        });
        this.emitStyle();
    };
    Checkbox.prototype.disabledChanged = function () {
        this.emitStyle();
    };
    Checkbox.prototype.emitStyle = function () {
        this.ionStyle.emit({
            'checkbox-checked': this.checked,
            'interactive-disabled': this.disabled,
        });
    };
    Checkbox.prototype.setFocus = function () {
        if (this.buttonEl) {
            this.buttonEl.focus();
        }
    };
    Checkbox.prototype.render = function () {
        var _a;
        var _this = this;
        var _b = this, inputId = _b.inputId, indeterminate = _b.indeterminate, disabled = _b.disabled, checked = _b.checked, value = _b.value, color = _b.color, el = _b.el;
        var labelId = inputId + '-lbl';
        var mode = Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_0__["d"])(this);
        var label = Object(_chunk_d102c9d1_js__WEBPACK_IMPORTED_MODULE_3__["f"])(el);
        if (label) {
            label.id = labelId;
        }
        Object(_chunk_d102c9d1_js__WEBPACK_IMPORTED_MODULE_3__["r"])(true, el, this.name, (checked ? value : ''), disabled);
        var path = indeterminate
            ? Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_0__["h"])("path", { d: "M6 12L18 12" })
            : Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_0__["h"])("path", { d: "M5.9,12.5l3.8,3.8l8.8-8.8" });
        if (mode === 'md') {
            path = indeterminate
                ? Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_0__["h"])("path", { d: "M2 12H22" })
                : Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_0__["h"])("path", { d: "M1.73,12.91 8.1,19.28 22.79,4.59" });
        }
        return (Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_0__["h"])(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_0__["H"], { onClick: this.onClick, role: "checkbox", "aria-disabled": disabled ? 'true' : null, "aria-checked": "" + checked, "aria-labelledby": labelId, class: Object.assign({}, Object(_chunk_9d21e8e5_js__WEBPACK_IMPORTED_MODULE_2__["c"])(color), (_a = {}, _a[mode] = true, _a['in-item'] = Object(_chunk_9d21e8e5_js__WEBPACK_IMPORTED_MODULE_2__["h"])('ion-item', el), _a['checkbox-checked'] = checked, _a['checkbox-disabled'] = disabled, _a['checkbox-indeterminate'] = indeterminate, _a['interactive'] = true, _a)) }, Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_0__["h"])("svg", { class: "checkbox-icon", viewBox: "0 0 24 24" }, path), Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_0__["h"])("button", { type: "button", onFocus: this.onFocus, onBlur: this.onBlur, disabled: this.disabled, ref: function (btnEl) { return _this.buttonEl = btnEl; } })));
    };
    Object.defineProperty(Checkbox.prototype, "el", {
        get: function () { return Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_0__["e"])(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Checkbox, "watchers", {
        get: function () {
            return {
                "checked": ["checkedChanged"],
                "disabled": ["disabledChanged"]
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Checkbox, "style", {
        get: function () { return ":host{--background-checked:var(--ion-color-primary,#3880ff);--border-color-checked:var(--ion-color-primary,#3880ff);--checkmark-color:var(--ion-color-primary-contrast,#fff);--transition:none;display:inline-block;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:2}:host(.ion-color){--background-checked:var(--ion-color-base);--border-color-checked:var(--ion-color-base);--checkmark-color:var(--ion-color-contrast)}button{left:0;top:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;position:absolute;width:100%;height:100%;border:0;background:transparent;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;outline:none}:host-context([dir=rtl]) button,[dir=rtl] button{left:unset;right:unset;right:0}button::-moz-focus-inner{border:0}.checkbox-icon{border-radius:var(--border-radius);display:block;position:relative;width:100%;height:100%;-webkit-transition:var(--transition);transition:var(--transition);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);background:var(--background);-webkit-box-sizing:border-box;box-sizing:border-box}.checkbox-icon path{fill:none;stroke:var(--checkmark-color);stroke-width:1;opacity:0}:host(.checkbox-checked) .checkbox-icon,:host(.checkbox-indeterminate) .checkbox-icon{border-color:var(--border-color-checked);background:var(--background-checked)}:host(.checkbox-checked) .checkbox-icon path,:host(.checkbox-indeterminate) .checkbox-icon path{opacity:1}:host(.checkbox-disabled){pointer-events:none}:host{--border-radius:50%;--border-width:1px;--border-style:solid;--border-color:var(--ion-item-border-color,var(--ion-border-color,var(--ion-color-step-150,#c8c7cc)));--background:var(--ion-item-background,var(--ion-background-color,#fff));--size:26px;width:var(--size);height:var(--size)}:host(.checkbox-disabled){opacity:.3}:host(.in-item){margin-left:0;margin-right:8px;margin-top:10px;margin-bottom:9px;display:block;position:static}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){:host(.in-item){margin-left:unset;margin-right:unset;-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:8px;margin-inline-end:8px}}:host(.in-item[slot=start]){margin-left:2px;margin-right:16px;margin-top:8px;margin-bottom:8px}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){:host(.in-item[slot=start]){margin-left:unset;margin-right:unset;-webkit-margin-start:2px;margin-inline-start:2px;-webkit-margin-end:16px;margin-inline-end:16px}}"; },
        enumerable: true,
        configurable: true
    });
    return Checkbox;
}());
var checkboxIds = 0;



/***/ })

}]);
//# sourceMappingURL=31.js.map