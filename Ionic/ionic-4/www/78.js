(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[78],{

/***/ "./node_modules/@ionic/core/dist/esm/legacy/ion-split-pane-ios.entry.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/legacy/ion-split-pane-ios.entry.js ***!
  \******************************************************************************/
/*! exports provided: ion_split_pane */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ion_split_pane", function() { return SplitPane; });
/* harmony import */ var _chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chunk-f257aad1.js */ "./node_modules/@ionic/core/dist/esm/legacy/chunk-f257aad1.js");
/* harmony import */ var _chunk_1074393c_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chunk-1074393c.js */ "./node_modules/@ionic/core/dist/esm/legacy/chunk-1074393c.js");


var SPLIT_PANE_MAIN = 'split-pane-main';
var SPLIT_PANE_SIDE = 'split-pane-side';
var QUERY = {
    'xs': '(min-width: 0px)',
    'sm': '(min-width: 576px)',
    'md': '(min-width: 768px)',
    'lg': '(min-width: 992px)',
    'xl': '(min-width: 1200px)',
    'never': ''
};
var SplitPane = /** @class */ (function () {
    function SplitPane(hostRef) {
        Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
        this.visible = false;
        /**
         * If `true`, the split pane will be hidden.
         */
        this.disabled = false;
        /**
         * When the split-pane should be shown.
         * Can be a CSS media query expression, or a shortcut expression.
         * Can also be a boolean expression.
         */
        this.when = QUERY['lg'];
        this.ionSplitPaneVisible = Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_0__["c"])(this, "ionSplitPaneVisible", 7);
    }
    SplitPane.prototype.visibleChanged = function (visible) {
        var detail = { visible: visible, isPane: this.isPane.bind(this) };
        this.ionSplitPaneVisible.emit(detail);
    };
    SplitPane.prototype.componentDidLoad = function () {
        this.styleChildren();
        this.updateState();
    };
    SplitPane.prototype.componentDidUnload = function () {
        if (this.rmL) {
            this.rmL();
            this.rmL = undefined;
        }
    };
    SplitPane.prototype.updateState = function () {
        var _this = this;
        if (this.rmL) {
            this.rmL();
            this.rmL = undefined;
        }
        // Check if the split-pane is disabled
        if (this.disabled) {
            this.visible = false;
            return;
        }
        // When query is a boolean
        var query = this.when;
        if (typeof query === 'boolean') {
            this.visible = query;
            return;
        }
        // When query is a string, let's find first if it is a shortcut
        var mediaQuery = QUERY[query] || query;
        // Media query is empty or null, we hide it
        if (mediaQuery.length === 0) {
            this.visible = false;
            return;
        }
        if (window.matchMedia) {
            // Listen on media query
            var callback_1 = function (q) {
                _this.visible = q.matches;
            };
            var mediaList_1 = window.matchMedia(mediaQuery);
            mediaList_1.addListener(callback_1);
            this.rmL = function () { return mediaList_1.removeListener(callback_1); };
            this.visible = mediaList_1.matches;
        }
    };
    SplitPane.prototype.isPane = function (element) {
        if (!this.visible) {
            return false;
        }
        return element.parentElement === this.el
            && element.classList.contains(SPLIT_PANE_SIDE);
    };
    SplitPane.prototype.styleChildren = function () {
        var contentId = this.contentId;
        var children = this.el.children;
        var nu = this.el.childElementCount;
        var foundMain = false;
        for (var i = 0; i < nu; i++) {
            var child = children[i];
            var isMain = contentId !== undefined ? child.id === contentId : child.hasAttribute('main');
            if (isMain) {
                if (foundMain) {
                    console.warn('split pane cannot have more than one main node');
                    return;
                }
                foundMain = true;
            }
            setPaneClass(child, isMain);
        }
        if (!foundMain) {
            console.warn('split pane does not have a specified main node');
        }
    };
    SplitPane.prototype.hostData = function () {
        var _a;
        var mode = Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_0__["d"])(this);
        return {
            class: (_a = {},
                _a[mode] = true,
                // Used internally for styling
                _a["split-pane-" + mode] = true,
                _a['split-pane-visible'] = this.visible,
                _a)
        };
    };
    Object.defineProperty(SplitPane.prototype, "el", {
        get: function () { return Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_0__["e"])(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitPane, "watchers", {
        get: function () {
            return {
                "visible": ["visibleChanged"],
                "disabled": ["updateState"],
                "when": ["updateState"]
            };
        },
        enumerable: true,
        configurable: true
    });
    SplitPane.prototype.render = function () { return Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_0__["h"])(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_0__["H"], this.hostData()); };
    Object.defineProperty(SplitPane, "style", {
        get: function () { return "ion-split-pane{left:0;right:0;top:0;bottom:0;display:-ms-flexbox;display:flex;position:absolute;-ms-flex-direction:row;flex-direction:row;-ms-flex-wrap:nowrap;flex-wrap:nowrap;contain:strict}.split-pane-visible>.split-pane-main,.split-pane-visible>.split-pane-side{left:0;right:0;top:0;bottom:0;position:relative;-ms-flex:1;flex:1;-webkit-box-shadow:none!important;box-shadow:none!important;z-index:0}.split-pane-visible>.split-pane-side:not(ion-menu),.split-pane-visible>ion-menu.split-pane-side.menu-enabled{display:-ms-flexbox;display:flex;-ms-flex-negative:0;flex-shrink:0}.split-pane-side:not(ion-menu){display:none}.split-pane-visible>.split-pane-side{-ms-flex-order:-1;order:-1}.split-pane-visible>.split-pane-side[side=end]{-ms-flex-order:1;order:1}.split-pane-ios{--border:0.55px solid var(--ion-item-border-color,var(--ion-border-color,var(--ion-color-step-150,#c8c7cc)))}.split-pane-ios.split-pane-visible>.split-pane-side{min-width:270px;max-width:28%;border-right:var(--border);border-left:0}.split-pane-ios.split-pane-visible>.split-pane-side[side=end]{min-width:270px;max-width:28%;border-right:0;border-left:var(--border)}"; },
        enumerable: true,
        configurable: true
    });
    return SplitPane;
}());
function setPaneClass(el, isMain) {
    var toAdd;
    var toRemove;
    if (isMain) {
        toAdd = SPLIT_PANE_MAIN;
        toRemove = SPLIT_PANE_SIDE;
    }
    else {
        toAdd = SPLIT_PANE_SIDE;
        toRemove = SPLIT_PANE_MAIN;
    }
    var classList = el.classList;
    classList.add(toAdd);
    classList.remove(toRemove);
}



/***/ })

}]);
//# sourceMappingURL=78.js.map