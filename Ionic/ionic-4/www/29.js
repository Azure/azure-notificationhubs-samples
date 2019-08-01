(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[29],{

/***/ "./node_modules/@ionic/core/dist/esm/legacy/ion-card_5-ios.entry.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/legacy/ion-card_5-ios.entry.js ***!
  \**************************************************************************/
/*! exports provided: ion_card, ion_card_content, ion_card_header, ion_card_subtitle, ion_card_title */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ion_card", function() { return Card; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ion_card_content", function() { return CardContent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ion_card_header", function() { return CardHeader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ion_card_subtitle", function() { return CardSubtitle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ion_card_title", function() { return CardTitle; });
/* harmony import */ var _chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chunk-f257aad1.js */ "./node_modules/@ionic/core/dist/esm/legacy/chunk-f257aad1.js");
/* harmony import */ var _chunk_1074393c_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chunk-1074393c.js */ "./node_modules/@ionic/core/dist/esm/legacy/chunk-1074393c.js");
/* harmony import */ var _chunk_9d21e8e5_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./chunk-9d21e8e5.js */ "./node_modules/@ionic/core/dist/esm/legacy/chunk-9d21e8e5.js");



/**
 * @virtualProp {"ios" | "md"} mode - The mode determines which platform styles to use.
 */
var Card = /** @class */ (function () {
    function Card(hostRef) {
        Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
        /**
         * If `true`, a button tag will be rendered and the card will be tappable.
         */
        this.button = false;
        /**
         * The type of the button. Only used when an `onclick` or `button` property is present.
         */
        this.type = 'button';
        /**
         * If `true`, the user cannot interact with the card.
         */
        this.disabled = false;
        /**
         * When using a router, it specifies the transition direction when navigating to
         * another page using `href`.
         */
        this.routerDirection = 'forward';
    }
    Card.prototype.isClickable = function () {
        return (this.href !== undefined || this.button);
    };
    Card.prototype.hostData = function () {
        var _a;
        var mode = Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_0__["d"])(this);
        return {
            class: Object.assign((_a = {}, _a[mode] = true, _a), Object(_chunk_9d21e8e5_js__WEBPACK_IMPORTED_MODULE_2__["c"])(this.color), { 'card-disabled': this.disabled, 'ion-activatable': this.isClickable() })
        };
    };
    Card.prototype.__stencil_render = function () {
        var clickable = this.isClickable();
        if (!clickable) {
            return [
                Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", null)
            ];
        }
        var mode = Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_0__["d"])(this);
        var _a = this, href = _a.href, routerDirection = _a.routerDirection;
        var TagType = clickable ? (href === undefined ? 'button' : 'a') : 'div';
        var attrs = (TagType === 'button')
            ? { type: this.type }
            : {
                download: this.download,
                href: this.href,
                rel: this.rel,
                target: this.target
            };
        return (Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_0__["h"])(TagType, Object.assign({}, attrs, { class: "card-native", disabled: this.disabled, onClick: function (ev) { return Object(_chunk_9d21e8e5_js__WEBPACK_IMPORTED_MODULE_2__["o"])(href, ev, routerDirection); } }), Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", null), clickable && mode === 'md' && Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_0__["h"])("ion-ripple-effect", null)));
    };
    Card.prototype.render = function () { return Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_0__["h"])(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_0__["H"], this.hostData(), this.__stencil_render()); };
    Object.defineProperty(Card, "style", {
        get: function () { return ".sc-ion-card-ios-h{--ion-safe-area-left:0px;--ion-safe-area-right:0px;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;display:block;position:relative;background:var(--background);color:var(--color);font-family:var(--ion-font-family,inherit);overflow:hidden}.ion-color.sc-ion-card-ios-h{background:var(--ion-color-base)}.ion-color.sc-ion-card-ios-h, .sc-ion-card-ios-h.ion-color.sc-ion-card-ios-s  ion-card-header , .sc-ion-card-ios-h.ion-color.sc-ion-card-ios-s  ion-card-subtitle , .sc-ion-card-ios-h.ion-color.sc-ion-card-ios-s  ion-card-title {color:var(--ion-color-contrast)}.sc-ion-card-ios-s  img {display:block;width:100%}.sc-ion-card-ios-s  ion-list {margin-left:0;margin-right:0;margin-top:0;margin-bottom:0}.card-disabled.sc-ion-card-ios-h{cursor:default;opacity:.3;pointer-events:none}.card-native.sc-ion-card-ios{font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;display:block;width:100%;min-height:var(--min-height);-webkit-transition:var(--transition);transition:var(--transition);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);outline:none;background:var(--background)}.card-native.sc-ion-card-ios::-moz-focus-inner{border:0}a.sc-ion-card-ios, button.sc-ion-card-ios{cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-user-drag:none}ion-ripple-effect.sc-ion-card-ios{color:var(--ripple-color)}.sc-ion-card-ios-h{--background:var(--ion-item-background,transparent);--color:var(--ion-color-step-600,#666);margin-left:16px;margin-right:16px;margin-top:24px;margin-bottom:24px;border-radius:8px;-webkit-transform:translateZ(0);transform:translateZ(0);-webkit-transition:-webkit-transform .5s cubic-bezier(.12,.72,.29,1);transition:-webkit-transform .5s cubic-bezier(.12,.72,.29,1);transition:transform .5s cubic-bezier(.12,.72,.29,1);transition:transform .5s cubic-bezier(.12,.72,.29,1),-webkit-transform .5s cubic-bezier(.12,.72,.29,1);font-size:14px;-webkit-box-shadow:0 4px 16px rgba(0,0,0,.12);box-shadow:0 4px 16px rgba(0,0,0,.12)}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.sc-ion-card-ios-h{margin-left:unset;margin-right:unset;-webkit-margin-start:16px;margin-inline-start:16px;-webkit-margin-end:16px;margin-inline-end:16px}}.activated.sc-ion-card-ios-h{-webkit-transform:scale3d(.97,.97,1);transform:scale3d(.97,.97,1)}"; },
        enumerable: true,
        configurable: true
    });
    return Card;
}());
/**
 * @virtualProp {"ios" | "md"} mode - The mode determines which platform styles to use.
 */
var CardContent = /** @class */ (function () {
    function CardContent(hostRef) {
        Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
    }
    CardContent.prototype.hostData = function () {
        var _a;
        var mode = Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_0__["d"])(this);
        return {
            class: (_a = {},
                _a[mode] = true,
                // Used internally for styling
                _a["card-content-" + mode] = true,
                _a)
        };
    };
    CardContent.prototype.render = function () { return Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_0__["h"])(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_0__["H"], this.hostData()); };
    Object.defineProperty(CardContent, "style", {
        get: function () { return "ion-card-content{display:block;position:relative}.card-content-ios{padding-left:20px;padding-right:20px;padding-top:20px;padding-bottom:20px;font-size:16px;line-height:1.4}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.card-content-ios{padding-left:unset;padding-right:unset;-webkit-padding-start:20px;padding-inline-start:20px;-webkit-padding-end:20px;padding-inline-end:20px}}.card-content-ios h1{margin-left:0;margin-right:0;margin-top:0;margin-bottom:2px;font-size:24px;font-weight:400}.card-content-ios h2{margin-left:0;margin-right:0;margin-top:2px;margin-bottom:2px;font-size:16px;font-weight:400}.card-content-ios h3,.card-content-ios h4,.card-content-ios h5,.card-content-ios h6{margin-left:0;margin-right:0;margin-top:2px;margin-bottom:2px;font-size:14px;font-weight:400}.card-content-ios p{margin-left:0;margin-right:0;margin-top:0;margin-bottom:2px;font-size:14px}"; },
        enumerable: true,
        configurable: true
    });
    return CardContent;
}());
/**
 * @virtualProp {"ios" | "md"} mode - The mode determines which platform styles to use.
 */
var CardHeader = /** @class */ (function () {
    function CardHeader(hostRef) {
        Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
        /**
         * If `true`, the card header will be translucent.
         */
        this.translucent = false;
    }
    CardHeader.prototype.hostData = function () {
        var _a;
        var mode = Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_0__["d"])(this);
        return {
            class: Object.assign({}, Object(_chunk_9d21e8e5_js__WEBPACK_IMPORTED_MODULE_2__["c"])(this.color), (_a = { 'card-header-translucent': this.translucent }, _a[mode] = true, _a))
        };
    };
    CardHeader.prototype.__stencil_render = function () {
        return Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", null);
    };
    CardHeader.prototype.render = function () { return Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_0__["h"])(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_0__["H"], this.hostData(), this.__stencil_render()); };
    Object.defineProperty(CardHeader, "style", {
        get: function () { return ":host{display:block;position:relative;background:var(--background);color:var(--color)}:host(.ion-color){background:var(--ion-color-base);color:var(--ion-color-contrast)}:host(.ion-color) ::slotted(ion-card-subtitle),:host(.ion-color) ::slotted(ion-card-title){color:currentColor}:host{padding-left:20px;padding-right:20px;padding-top:20px;padding-bottom:16px}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){:host{padding-left:unset;padding-right:unset;-webkit-padding-start:20px;padding-inline-start:20px;-webkit-padding-end:20px;padding-inline-end:20px}}:host(.card-header-translucent){background-color:rgba(var(--ion-background-color-rgb,255,255,255),.9);-webkit-backdrop-filter:saturate(180%) blur(30px);backdrop-filter:saturate(180%) blur(30px)}"; },
        enumerable: true,
        configurable: true
    });
    return CardHeader;
}());
/**
 * @virtualProp {"ios" | "md"} mode - The mode determines which platform styles to use.
 */
var CardSubtitle = /** @class */ (function () {
    function CardSubtitle(hostRef) {
        Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
    }
    CardSubtitle.prototype.hostData = function () {
        var _a;
        var mode = Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_0__["d"])(this);
        return {
            class: Object.assign({}, Object(_chunk_9d21e8e5_js__WEBPACK_IMPORTED_MODULE_2__["c"])(this.color), (_a = {}, _a[mode] = true, _a)),
            'role': 'heading',
            'aria-level': '3'
        };
    };
    CardSubtitle.prototype.__stencil_render = function () {
        return Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", null);
    };
    CardSubtitle.prototype.render = function () { return Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_0__["h"])(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_0__["H"], this.hostData(), this.__stencil_render()); };
    Object.defineProperty(CardSubtitle, "style", {
        get: function () { return ":host{display:block;position:relative;color:var(--color)}:host(.ion-color){color:var(--ion-color-base)}:host{--color:var(--ion-color-step-600,#666);margin-left:0;margin-right:0;margin-top:0;margin-bottom:4px;padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;font-size:12px;font-weight:700;letter-spacing:.4px;text-transform:uppercase}"; },
        enumerable: true,
        configurable: true
    });
    return CardSubtitle;
}());
/**
 * @virtualProp {"ios" | "md"} mode - The mode determines which platform styles to use.
 */
var CardTitle = /** @class */ (function () {
    function CardTitle(hostRef) {
        Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
    }
    CardTitle.prototype.hostData = function () {
        var _a;
        var mode = Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_0__["d"])(this);
        return {
            class: Object.assign({}, Object(_chunk_9d21e8e5_js__WEBPACK_IMPORTED_MODULE_2__["c"])(this.color), (_a = {}, _a[mode] = true, _a)),
            'role': 'heading',
            'aria-level': '2'
        };
    };
    CardTitle.prototype.__stencil_render = function () {
        return Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", null);
    };
    CardTitle.prototype.render = function () { return Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_0__["h"])(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_0__["H"], this.hostData(), this.__stencil_render()); };
    Object.defineProperty(CardTitle, "style", {
        get: function () { return ":host{display:block;position:relative;color:var(--color)}:host(.ion-color){color:var(--ion-color-base)}:host{--color:var(--ion-text-color,#000);margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;font-size:28px;font-weight:700;line-height:1.2}"; },
        enumerable: true,
        configurable: true
    });
    return CardTitle;
}());



/***/ })

}]);
//# sourceMappingURL=29.js.map