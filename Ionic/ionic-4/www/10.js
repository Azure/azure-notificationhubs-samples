(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[10],{

/***/ "./node_modules/@ionic/core/dist/esm/legacy/chunk-25340090.js":
/*!********************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/legacy/chunk-25340090.js ***!
  \********************************************************************/
/*! exports provided: a, d */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return attachComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return detachComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

function attachComponent(delegate, container, component, cssClasses, componentProps) {
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
        var el;
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (delegate) {
                        return [2 /*return*/, delegate.attachViewToDom(container, component, componentProps, cssClasses)];
                    }
                    if (typeof component !== 'string' && !(component instanceof HTMLElement)) {
                        throw new Error('framework delegate is missing');
                    }
                    el = (typeof component === 'string')
                        ? container.ownerDocument && container.ownerDocument.createElement(component)
                        : component;
                    if (cssClasses) {
                        cssClasses.forEach(function (c) { return el.classList.add(c); });
                    }
                    if (componentProps) {
                        Object.assign(el, componentProps);
                    }
                    container.appendChild(el);
                    if (!el.componentOnReady) return [3 /*break*/, 2];
                    return [4 /*yield*/, el.componentOnReady()];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2: return [2 /*return*/, el];
            }
        });
    });
}
function detachComponent(delegate, element) {
    if (element) {
        if (delegate) {
            var container = element.parentElement;
            return delegate.removeViewFromDom(container, element);
        }
        element.remove();
    }
    return Promise.resolve();
}



/***/ }),

/***/ "./node_modules/@ionic/core/dist/esm/legacy/ion-tab_2.entry.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/legacy/ion-tab_2.entry.js ***!
  \*********************************************************************/
/*! exports provided: ion_tab, ion_tabs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ion_tab", function() { return Tab; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ion_tabs", function() { return Tabs; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chunk-f257aad1.js */ "./node_modules/@ionic/core/dist/esm/legacy/chunk-f257aad1.js");
/* harmony import */ var _chunk_1074393c_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./chunk-1074393c.js */ "./node_modules/@ionic/core/dist/esm/legacy/chunk-1074393c.js");
/* harmony import */ var _chunk_25340090_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./chunk-25340090.js */ "./node_modules/@ionic/core/dist/esm/legacy/chunk-25340090.js");




var Tab = /** @class */ (function () {
    function Tab(hostRef) {
        Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["r"])(this, hostRef);
        this.loaded = false;
        /** @internal */
        this.active = false;
    }
    Tab.prototype.componentWillLoad = function () {
    };
    /** Set the active component for the tab */
    Tab.prototype.setActive = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prepareLazyLoaded()];
                    case 1:
                        _a.sent();
                        this.active = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    Tab.prototype.prepareLazyLoaded = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                if (!this.loaded && this.component != null) {
                    this.loaded = true;
                    try {
                        return [2 /*return*/, Object(_chunk_25340090_js__WEBPACK_IMPORTED_MODULE_3__["a"])(this.delegate, this.el, this.component, ['ion-page'])];
                    }
                    catch (e) {
                        console.error(e);
                    }
                }
                return [2 /*return*/, undefined];
            });
        });
    };
    Tab.prototype.hostData = function () {
        var _a = this, tab = _a.tab, active = _a.active, component = _a.component;
        return {
            'role': 'tabpanel',
            'aria-hidden': !active ? 'true' : null,
            'aria-labelledby': "tab-button-" + tab,
            'class': {
                'ion-page': component === undefined,
                'tab-hidden': !active
            }
        };
    };
    Tab.prototype.__stencil_render = function () {
        return Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["h"])("slot", null);
    };
    Object.defineProperty(Tab.prototype, "el", {
        get: function () { return Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["e"])(this); },
        enumerable: true,
        configurable: true
    });
    Tab.prototype.render = function () { return Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["h"])(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["H"], this.hostData(), this.__stencil_render()); };
    Object.defineProperty(Tab, "style", {
        get: function () { return ":host(.tab-hidden){display:none!important}"; },
        enumerable: true,
        configurable: true
    });
    return Tab;
}());
/**
 * @slot - Content is placed between the named slots if provided without a slot.
 * @slot top - Content is placed at the top of the screen.
 * @slot bottom - Content is placed at the bottom of the screen.
 */
var Tabs = /** @class */ (function () {
    function Tabs(hostRef) {
        var _this = this;
        Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["r"])(this, hostRef);
        this.transitioning = false;
        this.tabs = [];
        /** @internal */
        this.useRouter = false;
        this.onTabClicked = function (ev) {
            var _a = ev.detail, href = _a.href, tab = _a.tab;
            var selectedTab = _this.tabs.find(function (t) { return t.tab === tab; });
            if (_this.useRouter && href !== undefined) {
                var router = document.querySelector('ion-router');
                if (router) {
                    router.push(href);
                }
            }
            else if (selectedTab) {
                _this.select(selectedTab);
            }
        };
        this.ionNavWillLoad = Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["c"])(this, "ionNavWillLoad", 7);
        this.ionTabsWillChange = Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["c"])(this, "ionTabsWillChange", 3);
        this.ionTabsDidChange = Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["c"])(this, "ionTabsDidChange", 3);
    }
    Tabs.prototype.componentWillLoad = function () {
        var _this = this;
        if (!this.useRouter) {
            this.useRouter = !!document.querySelector('ion-router') && !this.el.closest('[no-router]');
        }
        this.tabs = Array.from(this.el.querySelectorAll('ion-tab'));
        this.initSelect().then(function () {
            _this.ionNavWillLoad.emit();
            _this.componentWillUpdate();
        });
    };
    Tabs.prototype.componentDidUnload = function () {
        this.tabs.length = 0;
        this.selectedTab = this.leavingTab = undefined;
    };
    Tabs.prototype.componentWillUpdate = function () {
        var tabBar = this.el.querySelector('ion-tab-bar');
        if (tabBar) {
            var tab = this.selectedTab ? this.selectedTab.tab : undefined;
            tabBar.selectedTab = tab;
        }
    };
    /**
     * Select a tab by the value of its `tab` property or an element reference.
     *
     * @param tab The tab instance to select. If passed a string, it should be the value of the tab's `tab` property.
     */
    Tabs.prototype.select = function (tab) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var selectedTab;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getTab(tab)];
                    case 1:
                        selectedTab = _a.sent();
                        if (!this.shouldSwitch(selectedTab)) {
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, this.setActive(selectedTab)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.notifyRouter()];
                    case 3:
                        _a.sent();
                        this.tabSwitch();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    /**
     * Get a specific tab by the value of its `tab` property or an element reference.
     *
     * @param tab The tab instance to select. If passed a string, it should be the value of the tab's `tab` property.
     */
    Tabs.prototype.getTab = function (tab) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var tabEl;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                tabEl = (typeof tab === 'string')
                    ? this.tabs.find(function (t) { return t.tab === tab; })
                    : tab;
                if (!tabEl) {
                    console.error("tab with id: \"" + tabEl + "\" does not exist");
                }
                return [2 /*return*/, tabEl];
            });
        });
    };
    /**
     * Get the currently selected tab.
     */
    Tabs.prototype.getSelected = function () {
        return Promise.resolve(this.selectedTab ? this.selectedTab.tab : undefined);
    };
    /** @internal */
    Tabs.prototype.setRouteId = function (id) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var selectedTab;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getTab(id)];
                    case 1:
                        selectedTab = _a.sent();
                        if (!this.shouldSwitch(selectedTab)) {
                            return [2 /*return*/, { changed: false, element: this.selectedTab }];
                        }
                        return [4 /*yield*/, this.setActive(selectedTab)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, {
                                changed: true,
                                element: this.selectedTab,
                                markVisible: function () { return _this.tabSwitch(); },
                            }];
                }
            });
        });
    };
    /** @internal */
    Tabs.prototype.getRouteId = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var tabId;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                tabId = this.selectedTab && this.selectedTab.tab;
                return [2 /*return*/, tabId !== undefined ? { id: tabId, element: this.selectedTab } : undefined];
            });
        });
    };
    Tabs.prototype.initSelect = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.useRouter) {
                            return [2 /*return*/];
                        }
                        // wait for all tabs to be ready
                        return [4 /*yield*/, Promise.all(this.tabs.map(function (tab) { return tab.componentOnReady(); }))];
                    case 1:
                        // wait for all tabs to be ready
                        _a.sent();
                        return [4 /*yield*/, this.select(this.tabs[0])];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Tabs.prototype.setActive = function (selectedTab) {
        if (this.transitioning) {
            return Promise.reject('transitioning already happening');
        }
        this.transitioning = true;
        this.leavingTab = this.selectedTab;
        this.selectedTab = selectedTab;
        this.ionTabsWillChange.emit({ tab: selectedTab.tab });
        return selectedTab.setActive();
    };
    Tabs.prototype.tabSwitch = function () {
        var selectedTab = this.selectedTab;
        var leavingTab = this.leavingTab;
        this.leavingTab = undefined;
        this.transitioning = false;
        if (!selectedTab) {
            return;
        }
        if (leavingTab !== selectedTab) {
            if (leavingTab) {
                leavingTab.active = false;
            }
            this.ionTabsDidChange.emit({ tab: selectedTab.tab });
        }
    };
    Tabs.prototype.notifyRouter = function () {
        if (this.useRouter) {
            var router = document.querySelector('ion-router');
            if (router) {
                return router.navChanged('forward');
            }
        }
        return Promise.resolve(false);
    };
    Tabs.prototype.shouldSwitch = function (selectedTab) {
        var leavingTab = this.selectedTab;
        return selectedTab !== undefined && selectedTab !== leavingTab && !this.transitioning;
    };
    Tabs.prototype.render = function () {
        return (Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["h"])(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["H"], { onIonTabButtonClick: this.onTabClicked }, Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["h"])("slot", { name: "top" }), Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["h"])("div", { class: "tabs-inner" }, Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["h"])("slot", null)), Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["h"])("slot", { name: "bottom" })));
    };
    Object.defineProperty(Tabs.prototype, "el", {
        get: function () { return Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["e"])(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tabs, "style", {
        get: function () { return ":host{left:0;right:0;top:0;bottom:0;display:-ms-flexbox;display:flex;position:absolute;-ms-flex-direction:column;flex-direction:column;width:100%;height:100%;z-index:0}.tabs-inner,:host{contain:layout size style}.tabs-inner{position:relative;-ms-flex:1;flex:1}"; },
        enumerable: true,
        configurable: true
    });
    return Tabs;
}());



/***/ })

}]);
//# sourceMappingURL=10.js.map