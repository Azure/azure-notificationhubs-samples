(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[74],{

/***/ "./node_modules/@ionic/core/dist/esm/legacy/ion-select_3-md.entry.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/legacy/ion-select_3-md.entry.js ***!
  \***************************************************************************/
/*! exports provided: ion_select, ion_select_option, ion_select_popover */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ion_select", function() { return Select; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ion_select_option", function() { return SelectOption; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ion_select_popover", function() { return SelectPopover; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chunk-f257aad1.js */ "./node_modules/@ionic/core/dist/esm/legacy/chunk-f257aad1.js");
/* harmony import */ var _chunk_1074393c_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./chunk-1074393c.js */ "./node_modules/@ionic/core/dist/esm/legacy/chunk-1074393c.js");
/* harmony import */ var _chunk_24212d31_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./chunk-24212d31.js */ "./node_modules/@ionic/core/dist/esm/legacy/chunk-24212d31.js");
/* harmony import */ var _chunk_9d21e8e5_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./chunk-9d21e8e5.js */ "./node_modules/@ionic/core/dist/esm/legacy/chunk-9d21e8e5.js");
/* harmony import */ var _chunk_d102c9d1_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./chunk-d102c9d1.js */ "./node_modules/@ionic/core/dist/esm/legacy/chunk-d102c9d1.js");






/**
 * @virtualProp {"ios" | "md"} mode - The mode determines which platform styles to use.
 */
var Select = /** @class */ (function () {
    function Select(hostRef) {
        var _this = this;
        Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["r"])(this, hostRef);
        this.childOpts = [];
        this.inputId = "ion-sel-" + selectIds++;
        this.didInit = false;
        this.isExpanded = false;
        /**
         * If `true`, the user cannot interact with the select.
         */
        this.disabled = false;
        /**
         * The text to display on the cancel button.
         */
        this.cancelText = 'Cancel';
        /**
         * The text to display on the ok button.
         */
        this.okText = 'OK';
        /**
         * The name of the control, which is submitted with the form data.
         */
        this.name = this.inputId;
        /**
         * If `true`, the select can accept multiple values.
         */
        this.multiple = false;
        /**
         * The interface the select should use: `action-sheet`, `popover` or `alert`.
         */
        this.interface = 'alert';
        /**
         * Any additional options that the `alert`, `action-sheet` or `popover` interface
         * can take. See the [AlertController API docs](../../alert/AlertController/#create), the
         * [ActionSheetController API docs](../../action-sheet/ActionSheetController/#create) and the
         * [PopoverController API docs](../../popover/PopoverController/#create) for the
         * create options for each interface.
         */
        this.interfaceOptions = {};
        this.onClick = function (ev) {
            _this.setFocus();
            _this.open(ev);
        };
        this.onFocus = function () {
            _this.ionFocus.emit();
        };
        this.onBlur = function () {
            _this.ionBlur.emit();
        };
        this.ionChange = Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["c"])(this, "ionChange", 7);
        this.ionCancel = Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["c"])(this, "ionCancel", 7);
        this.ionFocus = Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["c"])(this, "ionFocus", 7);
        this.ionBlur = Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["c"])(this, "ionBlur", 7);
        this.ionStyle = Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["c"])(this, "ionStyle", 7);
    }
    Select.prototype.disabledChanged = function () {
        this.emitStyle();
    };
    Select.prototype.valueChanged = function () {
        if (this.didInit) {
            this.updateOptions();
            this.ionChange.emit({
                value: this.value,
            });
            this.emitStyle();
        }
    };
    Select.prototype.selectOptionChanged = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadOptions()];
                    case 1:
                        _a.sent();
                        if (this.didInit) {
                            this.updateOptions();
                            this.updateOverlayOptions();
                            this.emitStyle();
                            /**
                             * In the event that options
                             * are not loaded at component load
                             * this ensures that any value that is
                             * set is properly rendered once
                             * options have been loaded
                             */
                            if (this.value !== undefined) {
                                this.el.forceUpdate();
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Select.prototype.componentDidLoad = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var checked, checked;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadOptions()];
                    case 1:
                        _a.sent();
                        if (this.value === undefined) {
                            if (this.multiple) {
                                checked = this.childOpts.filter(function (o) { return o.selected; });
                                this.value = checked.map(function (o) { return o.value; });
                            }
                            else {
                                checked = this.childOpts.find(function (o) { return o.selected; });
                                if (checked) {
                                    this.value = checked.value;
                                }
                            }
                        }
                        this.updateOptions();
                        this.emitStyle();
                        this.el.forceUpdate();
                        this.didInit = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Open the select overlay. The overlay is either an alert, action sheet, or popover,
     * depending on the `interface` property on the `ion-select`.
     *
     * @param event The user interface event that called the open.
     */
    Select.prototype.open = function (event) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var overlay, _a;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.disabled || this.isExpanded) {
                            return [2 /*return*/, undefined];
                        }
                        _a = this;
                        return [4 /*yield*/, this.createOverlay(event)];
                    case 1:
                        overlay = _a.overlay = _b.sent();
                        this.isExpanded = true;
                        overlay.onDidDismiss().then(function () {
                            _this.overlay = undefined;
                            _this.isExpanded = false;
                            _this.setFocus();
                        });
                        return [4 /*yield*/, overlay.present()];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, overlay];
                }
            });
        });
    };
    Select.prototype.createOverlay = function (ev) {
        var selectInterface = this.interface;
        if ((selectInterface === 'action-sheet' || selectInterface === 'popover') && this.multiple) {
            console.warn("Select interface cannot be \"" + selectInterface + "\" with a multi-value select. Using the \"alert\" interface instead.");
            selectInterface = 'alert';
        }
        if (selectInterface === 'popover' && !ev) {
            console.warn('Select interface cannot be a "popover" without passing an event. Using the "alert" interface instead.');
            selectInterface = 'alert';
        }
        if (selectInterface === 'popover') {
            return this.openPopover(ev);
        }
        if (selectInterface === 'action-sheet') {
            return this.openActionSheet();
        }
        return this.openAlert();
    };
    Select.prototype.updateOverlayOptions = function () {
        if (!this.overlay) {
            return;
        }
        var overlay = this.overlay;
        switch (this.interface) {
            case 'action-sheet':
                overlay.buttons = this.createActionSheetButtons(this.childOpts);
                break;
            case 'popover':
                var popover = overlay.querySelector('ion-select-popover');
                if (popover) {
                    popover.options = this.createPopoverOptions(this.childOpts);
                }
                break;
            default:
                var inputType = (this.multiple ? 'checkbox' : 'radio');
                overlay.inputs = this.createAlertInputs(this.childOpts, inputType);
                break;
        }
    };
    Select.prototype.createActionSheetButtons = function (data) {
        var _this = this;
        var actionSheetButtons = data.map(function (option) {
            return {
                role: (option.selected ? 'selected' : ''),
                text: option.textContent,
                handler: function () {
                    _this.value = option.value;
                }
            };
        });
        // Add "cancel" button
        actionSheetButtons.push({
            text: this.cancelText,
            role: 'cancel',
            handler: function () {
                _this.ionCancel.emit();
            }
        });
        return actionSheetButtons;
    };
    Select.prototype.createAlertInputs = function (data, inputType) {
        return data.map(function (o) {
            return {
                type: inputType,
                label: o.textContent,
                value: o.value,
                checked: o.selected,
                disabled: o.disabled
            };
        });
    };
    Select.prototype.createPopoverOptions = function (data) {
        var _this = this;
        return data.map(function (o) {
            return {
                text: o.textContent,
                value: o.value,
                checked: o.selected,
                disabled: o.disabled,
                handler: function () {
                    _this.value = o.value;
                    _this.close();
                }
            };
        });
    };
    Select.prototype.openPopover = function (ev) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var interfaceOptions, mode, popoverOpts;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                interfaceOptions = this.interfaceOptions;
                mode = Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["d"])(this);
                popoverOpts = Object.assign({ mode: mode }, interfaceOptions, { component: 'ion-select-popover', cssClass: ['select-popover', interfaceOptions.cssClass], event: ev, componentProps: {
                        header: interfaceOptions.header,
                        subHeader: interfaceOptions.subHeader,
                        message: interfaceOptions.message,
                        value: this.value,
                        options: this.createPopoverOptions(this.childOpts)
                    } });
                return [2 /*return*/, _chunk_24212d31_js__WEBPACK_IMPORTED_MODULE_3__["c"].create(popoverOpts)];
            });
        });
    };
    Select.prototype.openActionSheet = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var mode, interfaceOptions, actionSheetOpts;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                mode = Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["d"])(this);
                interfaceOptions = this.interfaceOptions;
                actionSheetOpts = Object.assign({ mode: mode }, interfaceOptions, { buttons: this.createActionSheetButtons(this.childOpts), cssClass: ['select-action-sheet', interfaceOptions.cssClass] });
                return [2 /*return*/, _chunk_24212d31_js__WEBPACK_IMPORTED_MODULE_3__["b"].create(actionSheetOpts)];
            });
        });
    };
    Select.prototype.openAlert = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var label, labelText, interfaceOptions, inputType, mode, alertOpts;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                label = this.getLabel();
                labelText = (label) ? label.textContent : null;
                interfaceOptions = this.interfaceOptions;
                inputType = (this.multiple ? 'checkbox' : 'radio');
                mode = Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["d"])(this);
                alertOpts = Object.assign({ mode: mode }, interfaceOptions, { header: interfaceOptions.header ? interfaceOptions.header : labelText, inputs: this.createAlertInputs(this.childOpts, inputType), buttons: [
                        {
                            text: this.cancelText,
                            role: 'cancel',
                            handler: function () {
                                _this.ionCancel.emit();
                            }
                        },
                        {
                            text: this.okText,
                            handler: function (selectedValues) {
                                _this.value = selectedValues;
                            }
                        }
                    ], cssClass: ['select-alert', interfaceOptions.cssClass,
                        (this.multiple ? 'multiple-select-alert' : 'single-select-alert')] });
                return [2 /*return*/, _chunk_24212d31_js__WEBPACK_IMPORTED_MODULE_3__["a"].create(alertOpts)];
            });
        });
    };
    /**
     * Close the select interface.
     */
    Select.prototype.close = function () {
        // TODO check !this.overlay || !this.isFocus()
        if (!this.overlay) {
            return Promise.resolve(false);
        }
        return this.overlay.dismiss();
    };
    Select.prototype.loadOptions = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, Promise.all(Array.from(this.el.querySelectorAll('ion-select-option')).map(function (o) { return o.componentOnReady(); }))];
                    case 1:
                        _a.childOpts = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Select.prototype.updateOptions = function () {
        // iterate all options, updating the selected prop
        var canSelect = true;
        for (var _i = 0, _a = this.childOpts; _i < _a.length; _i++) {
            var selectOption = _a[_i];
            var selected = canSelect && isOptionSelected(this.value, selectOption.value, this.compareWith);
            selectOption.selected = selected;
            // if current option is selected and select is single-option, we can't select
            // any option more
            if (selected && !this.multiple) {
                canSelect = false;
            }
        }
    };
    Select.prototype.getLabel = function () {
        return Object(_chunk_d102c9d1_js__WEBPACK_IMPORTED_MODULE_5__["f"])(this.el);
    };
    Select.prototype.hasValue = function () {
        return this.getText() !== '';
    };
    Select.prototype.getText = function () {
        var selectedText = this.selectedText;
        if (selectedText != null && selectedText !== '') {
            return selectedText;
        }
        return generateText(this.childOpts, this.value, this.compareWith);
    };
    Select.prototype.setFocus = function () {
        if (this.buttonEl) {
            this.buttonEl.focus();
        }
    };
    Select.prototype.emitStyle = function () {
        this.ionStyle.emit({
            'interactive': true,
            'select': true,
            'has-placeholder': this.placeholder != null,
            'has-value': this.hasValue(),
            'interactive-disabled': this.disabled,
            'select-disabled': this.disabled
        });
    };
    Select.prototype.render = function () {
        var _a;
        var _this = this;
        var _b = this, placeholder = _b.placeholder, name = _b.name, disabled = _b.disabled, isExpanded = _b.isExpanded, value = _b.value, el = _b.el;
        var mode = Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["d"])(this);
        var labelId = this.inputId + '-lbl';
        var label = Object(_chunk_d102c9d1_js__WEBPACK_IMPORTED_MODULE_5__["f"])(el);
        if (label) {
            label.id = labelId;
        }
        var addPlaceholderClass = false;
        var selectText = this.getText();
        if (selectText === '' && placeholder != null) {
            selectText = placeholder;
            addPlaceholderClass = true;
        }
        Object(_chunk_d102c9d1_js__WEBPACK_IMPORTED_MODULE_5__["r"])(true, el, name, parseValue(value), disabled);
        var selectTextClasses = {
            'select-text': true,
            'select-placeholder': addPlaceholderClass
        };
        return (Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["h"])(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["H"], { onClick: this.onClick, role: "combobox", "aria-haspopup": "dialog", "aria-disabled": disabled ? 'true' : null, "aria-expanded": "" + isExpanded, "aria-labelledby": labelId, class: (_a = {},
                _a[mode] = true,
                _a['in-item'] = Object(_chunk_9d21e8e5_js__WEBPACK_IMPORTED_MODULE_4__["h"])('ion-item', el),
                _a['select-disabled'] = disabled,
                _a) }, Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["h"])("div", { class: selectTextClasses }, selectText), Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["h"])("div", { class: "select-icon", role: "presentation" }, Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["h"])("div", { class: "select-icon-inner" })), Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["h"])("button", { type: "button", onFocus: this.onFocus, onBlur: this.onBlur, disabled: disabled, ref: (function (btnEl) { return _this.buttonEl = btnEl; }) })));
    };
    Object.defineProperty(Select.prototype, "el", {
        get: function () { return Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["e"])(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Select, "watchers", {
        get: function () {
            return {
                "disabled": ["disabledChanged"],
                "value": ["valueChanged"]
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Select, "style", {
        get: function () { return ":host{padding-left:var(--padding-start);padding-right:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);display:-ms-flexbox;display:flex;position:relative;font-family:var(--ion-font-family,inherit);overflow:hidden;z-index:2}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){:host{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end)}}:host(.in-item){position:static;max-width:45%}:host(.select-disabled){opacity:.4;pointer-events:none}:host(.ion-focused) button{border:2px solid #5e9ed6}.select-placeholder{color:currentColor;opacity:.33}button{left:0;top:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;position:absolute;width:100%;height:100%;border:0;background:transparent;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;outline:none}:host-context([dir=rtl]) button,[dir=rtl] button{left:unset;right:unset;right:0}button::-moz-focus-inner{border:0}.select-icon{position:relative}.select-text{-ms-flex:1;flex:1;min-width:16px;font-size:inherit;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.select-icon-inner{left:5px;top:50%;margin-top:-3px;position:absolute;width:0;height:0;border-top:5px solid;border-right:5px solid transparent;border-left:5px solid transparent;color:currentColor;opacity:.33;pointer-events:none}:host-context([dir=rtl]) .select-icon-inner,[dir=rtl] .select-icon-inner{left:unset;right:unset;right:5px}:host{--padding-top:10px;--padding-end:0;--padding-bottom:11px;--padding-start:16px}.select-icon{width:19px;height:19px}"; },
        enumerable: true,
        configurable: true
    });
    return Select;
}());
function parseValue(value) {
    if (value == null) {
        return undefined;
    }
    if (Array.isArray(value)) {
        return value.join(',');
    }
    return value.toString();
}
function isOptionSelected(currentValue, compareValue, compareWith) {
    if (currentValue === undefined) {
        return false;
    }
    if (Array.isArray(currentValue)) {
        return currentValue.some(function (val) { return compareOptions(val, compareValue, compareWith); });
    }
    else {
        return compareOptions(currentValue, compareValue, compareWith);
    }
}
function compareOptions(currentValue, compareValue, compareWith) {
    if (typeof compareWith === 'function') {
        return compareWith(currentValue, compareValue);
    }
    else if (typeof compareWith === 'string') {
        return currentValue[compareWith] === compareValue[compareWith];
    }
    else {
        return currentValue === compareValue;
    }
}
function generateText(opts, value, compareWith) {
    if (value === undefined) {
        return '';
    }
    if (Array.isArray(value)) {
        return value
            .map(function (v) { return textForValue(opts, v, compareWith); })
            .filter(function (opt) { return opt !== null; })
            .join(', ');
    }
    else {
        return textForValue(opts, value, compareWith) || '';
    }
}
function textForValue(opts, value, compareWith) {
    var selectOpt = opts.find(function (opt) {
        return compareOptions(opt.value, value, compareWith);
    });
    return selectOpt
        ? selectOpt.textContent
        : null;
}
var selectIds = 0;
var SelectOption = /** @class */ (function () {
    function SelectOption(hostRef) {
        Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["r"])(this, hostRef);
        this.inputId = "ion-selopt-" + selectOptionIds++;
        /**
         * If `true`, the user cannot interact with the select option.
         */
        this.disabled = false;
        /**
         * If `true`, the element is selected.
         */
        this.selected = false;
        this.ionSelectOptionDidLoad = Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["c"])(this, "ionSelectOptionDidLoad", 7);
        this.ionSelectOptionDidUnload = Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["c"])(this, "ionSelectOptionDidUnload", 7);
    }
    SelectOption.prototype.componentWillLoad = function () {
        if (this.value === undefined) {
            this.value = this.el.textContent || '';
        }
    };
    SelectOption.prototype.componentDidLoad = function () {
        this.ionSelectOptionDidLoad.emit();
    };
    SelectOption.prototype.componentDidUnload = function () {
        this.ionSelectOptionDidUnload.emit();
    };
    SelectOption.prototype.hostData = function () {
        var _a;
        var mode = Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["d"])(this);
        return {
            'role': 'option',
            'id': this.inputId,
            class: (_a = {},
                _a[mode] = true,
                _a)
        };
    };
    Object.defineProperty(SelectOption.prototype, "el", {
        get: function () { return Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["e"])(this); },
        enumerable: true,
        configurable: true
    });
    SelectOption.prototype.render = function () { return Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["h"])(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["H"], this.hostData()); };
    Object.defineProperty(SelectOption, "style", {
        get: function () { return ":host{display:none}"; },
        enumerable: true,
        configurable: true
    });
    return SelectOption;
}());
var selectOptionIds = 0;
/**
 * @internal
 */
var SelectPopover = /** @class */ (function () {
    function SelectPopover(hostRef) {
        Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["r"])(this, hostRef);
        /** Array of options for the popover */
        this.options = [];
    }
    SelectPopover.prototype.onSelect = function (ev) {
        var option = this.options.find(function (o) { return o.value === ev.target.value; });
        if (option && option.handler) {
            option.handler();
        }
    };
    SelectPopover.prototype.hostData = function () {
        var _a;
        var mode = Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["d"])(this);
        return {
            class: (_a = {},
                _a[mode] = true,
                _a)
        };
    };
    SelectPopover.prototype.__stencil_render = function () {
        return (Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["h"])("ion-list", null, this.header !== undefined && Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["h"])("ion-list-header", null, this.header), (this.subHeader !== undefined || this.message !== undefined) &&
            Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["h"])("ion-item", null, Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["h"])("ion-label", { "text-wrap": true }, this.subHeader !== undefined && Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["h"])("h3", null, this.subHeader), this.message !== undefined && Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["h"])("p", null, this.message))), Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["h"])("ion-radio-group", null, this.options.map(function (option) { return Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["h"])("ion-item", null, Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["h"])("ion-label", null, option.text), Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["h"])("ion-radio", { checked: option.checked, value: option.value, disabled: option.disabled })); }))));
    };
    SelectPopover.prototype.render = function () { return Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["h"])(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["H"], this.hostData(), this.__stencil_render()); };
    Object.defineProperty(SelectPopover, "style", {
        get: function () { return ".sc-ion-select-popover-h ion-list.sc-ion-select-popover{margin-left:0;margin-right:0;margin-top:-1px;margin-bottom:-1px}.sc-ion-select-popover-h ion-label.sc-ion-select-popover, .sc-ion-select-popover-h ion-list-header.sc-ion-select-popover{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0}"; },
        enumerable: true,
        configurable: true
    });
    return SelectPopover;
}());



/***/ })

}]);
//# sourceMappingURL=74.js.map