(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[52],{

/***/ "./node_modules/@ionic/core/dist/esm/legacy/ion-menu_4-md.entry.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/legacy/ion-menu_4-md.entry.js ***!
  \*************************************************************************/
/*! exports provided: ion_menu, ion_menu_button, ion_menu_controller, ion_menu_toggle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ion_menu", function() { return Menu; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ion_menu_button", function() { return MenuButton; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ion_menu_controller", function() { return MenuController; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ion_menu_toggle", function() { return MenuToggle; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chunk-f257aad1.js */ "./node_modules/@ionic/core/dist/esm/legacy/chunk-f257aad1.js");
/* harmony import */ var _chunk_1074393c_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./chunk-1074393c.js */ "./node_modules/@ionic/core/dist/esm/legacy/chunk-1074393c.js");
/* harmony import */ var _chunk_9d21e8e5_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./chunk-9d21e8e5.js */ "./node_modules/@ionic/core/dist/esm/legacy/chunk-9d21e8e5.js");
/* harmony import */ var _chunk_d102c9d1_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./chunk-d102c9d1.js */ "./node_modules/@ionic/core/dist/esm/legacy/chunk-d102c9d1.js");
/* harmony import */ var _index_0303391f_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./index-0303391f.js */ "./node_modules/@ionic/core/dist/esm/legacy/index-0303391f.js");






var Menu = /** @class */ (function () {
    function Menu(hostRef) {
        Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["r"])(this, hostRef);
        this.lastOnEnd = 0;
        this.blocker = _index_0303391f_js__WEBPACK_IMPORTED_MODULE_5__["GESTURE_CONTROLLER"].createBlocker({ disableScroll: true });
        this.mode = Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["d"])(this);
        this.isAnimating = false;
        this._isOpen = false;
        this.isPaneVisible = false;
        this.isEndSide = false;
        /**
         * If `true`, the menu is disabled.
         */
        this.disabled = false;
        /**
         * Which side of the view the menu should be placed.
         */
        this.side = 'start';
        /**
         * If `true`, swiping the menu is enabled.
         */
        this.swipeGesture = true;
        /**
         * The edge threshold for dragging the menu open.
         * If a drag/swipe happens over this value, the menu is not triggered.
         */
        this.maxEdgeStart = 50;
        this.ionWillOpen = Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["c"])(this, "ionWillOpen", 7);
        this.ionWillClose = Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["c"])(this, "ionWillClose", 7);
        this.ionDidOpen = Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["c"])(this, "ionDidOpen", 7);
        this.ionDidClose = Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["c"])(this, "ionDidClose", 7);
        this.ionMenuChange = Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["c"])(this, "ionMenuChange", 7);
        this.lazyMenuCtrl = Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["k"])(this, "ion-menu-controller");
    }
    Menu.prototype.typeChanged = function (type, oldType) {
        var contentEl = this.contentEl;
        if (contentEl) {
            if (oldType !== undefined) {
                contentEl.classList.remove("menu-content-" + oldType);
            }
            contentEl.classList.add("menu-content-" + type);
            contentEl.removeAttribute('style');
        }
        if (this.menuInnerEl) {
            // Remove effects of previous animations
            this.menuInnerEl.removeAttribute('style');
        }
        this.animation = undefined;
    };
    Menu.prototype.disabledChanged = function () {
        this.updateState();
        this.ionMenuChange.emit({
            disabled: this.disabled,
            open: this._isOpen
        });
    };
    Menu.prototype.sideChanged = function () {
        this.isEndSide = Object(_chunk_d102c9d1_js__WEBPACK_IMPORTED_MODULE_4__["i"])(this.side);
    };
    Menu.prototype.swipeGestureChanged = function () {
        this.updateState();
    };
    Menu.prototype.componentWillLoad = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var menuCtrl, _a, el, parent, content, _b;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.type === undefined) {
                            this.type = _chunk_1074393c_js__WEBPACK_IMPORTED_MODULE_2__["b"].get('menuType', this.mode === 'ios' ? 'reveal' : 'overlay');
                        }
                        _a = this;
                        return [4 /*yield*/, this.lazyMenuCtrl.componentOnReady().then(function (p) { return p._getInstance(); })];
                    case 1:
                        menuCtrl = _a.menuCtrl = _c.sent();
                        el = this.el;
                        parent = el.parentNode;
                        content = this.contentId !== undefined
                            ? document.getElementById(this.contentId)
                            : parent && parent.querySelector && parent.querySelector('[main]');
                        if (!content || !content.tagName) {
                            // requires content element
                            console.error('Menu: must have a "content" element to listen for drag events on.');
                            return [2 /*return*/];
                        }
                        this.contentEl = content;
                        // add menu's content classes
                        content.classList.add('menu-content');
                        this.typeChanged(this.type, undefined);
                        this.sideChanged();
                        // register this menu with the app's menu controller
                        menuCtrl._register(this);
                        _b = this;
                        return [4 /*yield*/, Promise.resolve(/*! import() */).then(__webpack_require__.bind(null, /*! ./index-0303391f.js */ "./node_modules/@ionic/core/dist/esm/legacy/index-0303391f.js"))];
                    case 2:
                        _b.gesture = (_c.sent()).createGesture({
                            el: document,
                            gestureName: 'menu-swipe',
                            gesturePriority: 30,
                            threshold: 10,
                            canStart: function (ev) { return _this.canStart(ev); },
                            onWillStart: function () { return _this.onWillStart(); },
                            onStart: function () { return _this.onStart(); },
                            onMove: function (ev) { return _this.onMove(ev); },
                            onEnd: function (ev) { return _this.onEnd(ev); },
                        });
                        this.updateState();
                        return [2 /*return*/];
                }
            });
        });
    };
    Menu.prototype.componentDidLoad = function () {
        this.ionMenuChange.emit({ disabled: this.disabled, open: this._isOpen });
    };
    Menu.prototype.componentDidUnload = function () {
        this.blocker.destroy();
        this.menuCtrl._unregister(this);
        if (this.animation) {
            this.animation.destroy();
        }
        if (this.gesture) {
            this.gesture.destroy();
            this.gesture = undefined;
        }
        this.animation = undefined;
        this.contentEl = this.backdropEl = this.menuInnerEl = undefined;
    };
    Menu.prototype.onSplitPaneChanged = function (ev) {
        this.isPaneVisible = ev.detail.isPane(this.el);
        this.updateState();
    };
    Menu.prototype.onBackdropClick = function (ev) {
        if (this._isOpen && this.lastOnEnd < ev.timeStamp - 100) {
            var shouldClose = (ev.composedPath)
                ? !ev.composedPath().includes(this.menuInnerEl)
                : false;
            if (shouldClose) {
                ev.preventDefault();
                ev.stopPropagation();
                this.close();
            }
        }
    };
    /**
     * Returns `true` is the menu is open.
     */
    Menu.prototype.isOpen = function () {
        return Promise.resolve(this._isOpen);
    };
    /**
     * Returns `true` is the menu is active.
     *
     * A menu is active when it can be opened or closed, meaning it's enabled
     * and it's not part of a `ion-split-pane`.
     */
    Menu.prototype.isActive = function () {
        return Promise.resolve(this._isActive());
    };
    /**
     * Opens the menu. If the menu is already open or it can't be opened,
     * it returns `false`.
     */
    Menu.prototype.open = function (animated) {
        if (animated === void 0) { animated = true; }
        return this.setOpen(true, animated);
    };
    /**
     * Closes the menu. If the menu is already closed or it can't be closed,
     * it returns `false`.
     */
    Menu.prototype.close = function (animated) {
        if (animated === void 0) { animated = true; }
        return this.setOpen(false, animated);
    };
    /**
     * Toggles the menu. If the menu is already open, it will try to close, otherwise it will try to open it.
     * If the operation can't be completed successfully, it returns `false`.
     */
    Menu.prototype.toggle = function (animated) {
        if (animated === void 0) { animated = true; }
        return this.setOpen(!this._isOpen, animated);
    };
    /**
     * Opens or closes the button.
     * If the operation can't be completed successfully, it returns `false`.
     */
    Menu.prototype.setOpen = function (shouldOpen, animated) {
        if (animated === void 0) { animated = true; }
        return this.menuCtrl._setOpen(this, shouldOpen, animated);
    };
    Menu.prototype._setOpen = function (shouldOpen, animated) {
        if (animated === void 0) { animated = true; }
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // If the menu is disabled or it is currently being animated, let's do nothing
                        if (!this._isActive() || this.isAnimating || shouldOpen === this._isOpen) {
                            return [2 /*return*/, false];
                        }
                        this.beforeAnimation(shouldOpen);
                        return [4 /*yield*/, this.loadAnimation()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.startAnimation(shouldOpen, animated)];
                    case 2:
                        _a.sent();
                        this.afterAnimation(shouldOpen);
                        return [2 /*return*/, true];
                }
            });
        });
    };
    Menu.prototype.loadAnimation = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var width, _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        width = this.menuInnerEl.offsetWidth;
                        if (width === this.width && this.animation !== undefined) {
                            return [2 /*return*/];
                        }
                        this.width = width;
                        // Destroy existing animation
                        if (this.animation) {
                            this.animation.destroy();
                            this.animation = undefined;
                        }
                        // Create new animation
                        _a = this;
                        return [4 /*yield*/, this.menuCtrl._createAnimation(this.type, this)];
                    case 1:
                        // Create new animation
                        _a.animation = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Menu.prototype.startAnimation = function (shouldOpen, animated) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var ani;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ani = this.animation.reverse(!shouldOpen);
                        if (!animated) return [3 /*break*/, 2];
                        return [4 /*yield*/, ani.playAsync()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ani.playSync();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Menu.prototype._isActive = function () {
        return !this.disabled && !this.isPaneVisible;
    };
    Menu.prototype.canSwipe = function () {
        return this.swipeGesture && !this.isAnimating && this._isActive();
    };
    Menu.prototype.canStart = function (detail) {
        if (!this.canSwipe()) {
            return false;
        }
        if (this._isOpen) {
            return true;
            // TODO error
        }
        else if (this.menuCtrl.getOpenSync()) {
            return false;
        }
        return checkEdgeSide(window, detail.currentX, this.isEndSide, this.maxEdgeStart);
    };
    Menu.prototype.onWillStart = function () {
        this.beforeAnimation(!this._isOpen);
        return this.loadAnimation();
    };
    Menu.prototype.onStart = function () {
        if (!this.isAnimating || !this.animation) {
            Object(_chunk_d102c9d1_js__WEBPACK_IMPORTED_MODULE_4__["b"])(false, 'isAnimating has to be true');
            return;
        }
        // the cloned animation should not use an easing curve during seek
        this.animation.reverse(this._isOpen).progressStart();
    };
    Menu.prototype.onMove = function (detail) {
        if (!this.isAnimating || !this.animation) {
            Object(_chunk_d102c9d1_js__WEBPACK_IMPORTED_MODULE_4__["b"])(false, 'isAnimating has to be true');
            return;
        }
        var delta = computeDelta(detail.deltaX, this._isOpen, this.isEndSide);
        var stepValue = delta / this.width;
        this.animation.progressStep(stepValue);
    };
    Menu.prototype.onEnd = function (detail) {
        var _this = this;
        if (!this.isAnimating || !this.animation) {
            Object(_chunk_d102c9d1_js__WEBPACK_IMPORTED_MODULE_4__["b"])(false, 'isAnimating has to be true');
            return;
        }
        var isOpen = this._isOpen;
        var isEndSide = this.isEndSide;
        var delta = computeDelta(detail.deltaX, isOpen, isEndSide);
        var width = this.width;
        var stepValue = delta / width;
        var velocity = detail.velocityX;
        var z = width / 2.0;
        var shouldCompleteRight = velocity >= 0 && (velocity > 0.2 || detail.deltaX > z);
        var shouldCompleteLeft = velocity <= 0 && (velocity < -0.2 || detail.deltaX < -z);
        var shouldComplete = isOpen
            ? isEndSide ? shouldCompleteRight : shouldCompleteLeft
            : isEndSide ? shouldCompleteLeft : shouldCompleteRight;
        var shouldOpen = !isOpen && shouldComplete;
        if (isOpen && !shouldComplete) {
            shouldOpen = true;
        }
        var missing = shouldComplete ? 1 - stepValue : stepValue;
        var missingDistance = missing * width;
        var realDur = 0;
        if (missingDistance > 5) {
            var dur = missingDistance / Math.abs(velocity);
            realDur = Math.min(dur, 300);
        }
        this.lastOnEnd = detail.timeStamp;
        this.animation
            .onFinish(function () { return _this.afterAnimation(shouldOpen); }, {
            clearExistingCallbacks: true,
            oneTimeCallback: true
        })
            .progressEnd(shouldComplete, stepValue, realDur);
    };
    Menu.prototype.beforeAnimation = function (shouldOpen) {
        Object(_chunk_d102c9d1_js__WEBPACK_IMPORTED_MODULE_4__["b"])(!this.isAnimating, '_before() should not be called while animating');
        // this places the menu into the correct location before it animates in
        // this css class doesn't actually kick off any animations
        this.el.classList.add(SHOW_MENU);
        if (this.backdropEl) {
            this.backdropEl.classList.add(SHOW_BACKDROP);
        }
        this.blocker.block();
        this.isAnimating = true;
        if (shouldOpen) {
            this.ionWillOpen.emit();
        }
        else {
            this.ionWillClose.emit();
        }
    };
    Menu.prototype.afterAnimation = function (isOpen) {
        Object(_chunk_d102c9d1_js__WEBPACK_IMPORTED_MODULE_4__["b"])(this.isAnimating, '_before() should be called while animating');
        // keep opening/closing the menu disabled for a touch more yet
        // only add listeners/css if it's enabled and isOpen
        // and only remove listeners/css if it's not open
        // emit opened/closed events
        this._isOpen = isOpen;
        this.isAnimating = false;
        if (!this._isOpen) {
            this.blocker.unblock();
        }
        if (isOpen) {
            // add css class
            if (this.contentEl) {
                this.contentEl.classList.add(MENU_CONTENT_OPEN);
            }
            // emit open event
            this.ionDidOpen.emit();
        }
        else {
            // remove css classes
            this.el.classList.remove(SHOW_MENU);
            if (this.contentEl) {
                this.contentEl.classList.remove(MENU_CONTENT_OPEN);
            }
            if (this.backdropEl) {
                this.backdropEl.classList.remove(SHOW_BACKDROP);
            }
            // emit close event
            this.ionDidClose.emit();
        }
    };
    Menu.prototype.updateState = function () {
        var isActive = this._isActive();
        if (this.gesture) {
            this.gesture.setDisabled(!isActive || !this.swipeGesture);
        }
        // Close menu immediately
        if (!isActive && this._isOpen) {
            // close if this menu is open, and should not be enabled
            this.forceClosing();
        }
        if (!this.disabled && this.menuCtrl) {
            this.menuCtrl._setActiveMenu(this);
        }
        Object(_chunk_d102c9d1_js__WEBPACK_IMPORTED_MODULE_4__["b"])(!this.isAnimating, 'can not be animating');
    };
    Menu.prototype.forceClosing = function () {
        Object(_chunk_d102c9d1_js__WEBPACK_IMPORTED_MODULE_4__["b"])(this._isOpen, 'menu cannot be closed');
        this.isAnimating = true;
        var ani = this.animation.reverse(true);
        ani.playSync();
        this.afterAnimation(false);
    };
    Menu.prototype.hostData = function () {
        var _a;
        var _b = this, isEndSide = _b.isEndSide, type = _b.type, disabled = _b.disabled, isPaneVisible = _b.isPaneVisible;
        return {
            role: 'navigation',
            class: (_a = {},
                _a["" + this.mode] = true,
                _a["menu-type-" + type] = true,
                _a['menu-enabled'] = !disabled,
                _a['menu-side-end'] = isEndSide,
                _a['menu-side-start'] = !isEndSide,
                _a['menu-pane-visible'] = isPaneVisible,
                _a)
        };
    };
    Menu.prototype.__stencil_render = function () {
        var _this = this;
        return [
            Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["h"])("div", { class: "menu-inner", ref: function (el) { return _this.menuInnerEl = el; } }, Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["h"])("slot", null)),
            Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["h"])("ion-backdrop", { ref: function (el) { return _this.backdropEl = el; }, class: "menu-backdrop", tappable: false, stopPropagation: false })
        ];
    };
    Object.defineProperty(Menu.prototype, "el", {
        get: function () { return Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["e"])(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Menu, "watchers", {
        get: function () {
            return {
                "type": ["typeChanged"],
                "disabled": ["disabledChanged"],
                "side": ["sideChanged"],
                "swipeGesture": ["swipeGestureChanged"]
            };
        },
        enumerable: true,
        configurable: true
    });
    Menu.prototype.render = function () { return Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["h"])(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["H"], this.hostData(), this.__stencil_render()); };
    Object.defineProperty(Menu, "style", {
        get: function () { return ":host{--width:304px;--min-width:auto;--max-width:auto;--height:100%;--min-height:auto;--max-height:auto;--background:var(--ion-background-color,#fff);left:0;right:0;top:0;bottom:0;display:none;position:absolute;contain:strict}:host(.show-menu){display:block}.menu-inner{left:0;right:auto;top:0;bottom:0;-webkit-transform:translate3d(-9999px,0,0);transform:translate3d(-9999px,0,0);display:-ms-flexbox;display:flex;position:absolute;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:justify;justify-content:space-between;width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);background:var(--background);contain:strict}:host-context([dir=rtl]) .menu-inner,[dir=rtl] .menu-inner{left:unset;right:unset;left:auto;right:0;-webkit-transform:translate3d(calc(-1 * -9999px),0,0);transform:translate3d(calc(-1 * -9999px),0,0)}:host(.menu-side-start) .menu-inner{--ion-safe-area-right:0px;right:auto;left:0}:host(.menu-side-end) .menu-inner{--ion-safe-area-left:0px;right:0;left:auto}ion-backdrop{display:none;opacity:.01;z-index:-1}\@media (max-width:340px){.menu-inner{--width:264px}}:host(.menu-type-reveal){z-index:0}:host(.menu-type-reveal.show-menu) .menu-inner{-webkit-transform:translateZ(0);transform:translateZ(0)}:host(.menu-type-overlay){z-index:80}:host(.menu-type-overlay) .show-backdrop{display:block;cursor:pointer}:host(.menu-pane-visible) .menu-inner{left:0;right:0;width:auto;-webkit-transform:none!important;transform:none!important;-webkit-box-shadow:none!important;box-shadow:none!important}:host(.menu-pane-visible) ion-backdrop{display:hidden!important}:host(.menu-type-overlay) .menu-inner{-webkit-box-shadow:0 2px 22px 0 rgba(0,0,0,.09),4px 0 16px 0 rgba(0,0,0,.18);box-shadow:0 2px 22px 0 rgba(0,0,0,.09),4px 0 16px 0 rgba(0,0,0,.18)}"; },
        enumerable: true,
        configurable: true
    });
    return Menu;
}());
function computeDelta(deltaX, isOpen, isEndSide) {
    return Math.max(0, isOpen !== isEndSide ? -deltaX : deltaX);
}
function checkEdgeSide(win, posX, isEndSide, maxEdgeStart) {
    if (isEndSide) {
        return posX >= win.innerWidth - maxEdgeStart;
    }
    else {
        return posX <= maxEdgeStart;
    }
}
var SHOW_MENU = 'show-menu';
var SHOW_BACKDROP = 'show-backdrop';
var MENU_CONTENT_OPEN = 'menu-content-open';
var MenuButton = /** @class */ (function () {
    function MenuButton(hostRef) {
        Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["r"])(this, hostRef);
        /**
         * If `true`, the user cannot interact with the menu button.
         */
        this.disabled = false;
        /**
         * Automatically hides the menu button when the corresponding menu is not active
         */
        this.autoHide = true;
        /**
         * The type of the button.
         */
        this.type = 'button';
    }
    MenuButton.prototype.hostData = function () {
        var _a;
        var mode = Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["d"])(this);
        var _b = this, color = _b.color, disabled = _b.disabled;
        return {
            'aria-disabled': disabled ? 'true' : null,
            class: Object.assign({}, Object(_chunk_9d21e8e5_js__WEBPACK_IMPORTED_MODULE_3__["c"])(color), (_a = {}, _a[mode] = true, _a['button'] = true, _a['menu-button-disabled'] = disabled, _a['ion-activatable'] = true, _a['ion-focusable'] = true, _a))
        };
    };
    MenuButton.prototype.__stencil_render = function () {
        var mode = Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["d"])(this);
        var menuIcon = _chunk_1074393c_js__WEBPACK_IMPORTED_MODULE_2__["b"].get('menuIcon', 'menu');
        var attrs = {
            type: this.type
        };
        return (Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["h"])("ion-menu-toggle", { menu: this.menu, autoHide: this.autoHide }, Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["h"])("button", Object.assign({}, attrs, { disabled: this.disabled, class: "button-native" }), Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["h"])("slot", null, Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["h"])("ion-icon", { icon: menuIcon, mode: mode, lazy: false })), mode === 'md' && Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["h"])("ion-ripple-effect", { type: "unbounded" }))));
    };
    MenuButton.prototype.render = function () { return Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["h"])(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["H"], this.hostData(), this.__stencil_render()); };
    Object.defineProperty(MenuButton, "style", {
        get: function () { return ":host{--background:transparent;--color-focused:var(--color);--border-radius:initial;--padding-top:0;--padding-bottom:0;color:var(--color);text-align:center;text-decoration:none;text-overflow:ellipsis;text-transform:none;white-space:nowrap;-webkit-font-kerning:none;font-kerning:none}.button-native{border-radius:var(--border-radius);font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:var(--padding-start);padding-right:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;display:-ms-flexbox;display:flex;position:relative;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-ms-flex-negative:0;flex-shrink:0;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:100%;height:100%;border:0;outline:none;background:var(--background);line-height:1;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:0;-webkit-appearance:none;-moz-appearance:none;appearance:none}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.button-native{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end)}}ion-icon{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;pointer-events:none}:host(.menu-button-disabled){cursor:default;opacity:.5;pointer-events:none}\@media (any-hover:hover){:host(:hover) .button-native{background:var(--background-hover);color:var(--color-hover)}}:host(.ion-focused) .button-native{background:var(--background-focused);color:var(--color-focused)}:host(.ion-color) .button-native{color:var(--ion-color-base)}:host-context(ion-toolbar:not(.ion-color)){color:var(--ion-toolbar-color,var(--color))}:host{--background-focused:rgba(66,66,66,0.24);--background-hover:rgba(66,66,66,0.08);--border-radius:50%;--color:initial;--padding-start:8px;--padding-end:8px;width:48px;height:48px}ion-icon{font-size:24px}\@media (any-hover:hover){:host(.ion-color:hover) .button-native{background:rgba(var(--ion-color-base-rgb),.08)}}:host(.ion-color.ion-focused) .button-native{background:rgba(var(--ion-color-base-rgb),.24);color:var(--ion-color-base)}"; },
        enumerable: true,
        configurable: true
    });
    return MenuButton;
}());
/**
 * baseAnimation
 * Base class which is extended by the various types. Each
 * type will provide their own animations for open and close
 * and registers itself with Menu.
 */
function baseAnimation(AnimationC) {
    // https://material.io/guidelines/motion/movement.html#movement-movement-in-out-of-screen-bounds
    // https://material.io/guidelines/motion/duration-easing.html#duration-easing-natural-easing-curves
    // "Apply the sharp curve to items temporarily leaving the screen that may return
    // from the same exit point. When they return, use the deceleration curve. On mobile,
    // this transition typically occurs over 300ms" -- MD Motion Guide
    return Promise.resolve(new AnimationC()
        .easing('cubic-bezier(0.0, 0.0, 0.2, 1)') // Deceleration curve (Entering the screen)
        .easingReverse('cubic-bezier(0.4, 0.0, 0.6, 1)') // Sharp curve (Temporarily leaving the screen)
        .duration(300));
}
var BOX_SHADOW_WIDTH = 8;
/**
 * Menu Overlay Type
 * The menu slides over the content. The content
 * itself, which is under the menu, does not move.
 */
function menuOverlayAnimation(AnimationC, _, menu) {
    var closedX;
    var openedX;
    var width = menu.width + BOX_SHADOW_WIDTH;
    if (menu.isEndSide) {
        // right side
        closedX = width + 'px';
        openedX = '0px';
    }
    else {
        // left side
        closedX = -width + 'px';
        openedX = '0px';
    }
    var menuAnimation = new AnimationC()
        .addElement(menu.menuInnerEl)
        .fromTo('translateX', closedX, openedX);
    var backdropAnimation = new AnimationC()
        .addElement(menu.backdropEl)
        .fromTo('opacity', 0.01, 0.32);
    return baseAnimation(AnimationC).then(function (animation) {
        return animation.add(menuAnimation)
            .add(backdropAnimation);
    });
}
/**
 * Menu Push Type
 * The content slides over to reveal the menu underneath.
 * The menu itself also slides over to reveal its bad self.
 */
function menuPushAnimation(AnimationC, _, menu) {
    var contentOpenedX;
    var menuClosedX;
    var width = menu.width;
    if (menu.isEndSide) {
        contentOpenedX = -width + 'px';
        menuClosedX = width + 'px';
    }
    else {
        contentOpenedX = width + 'px';
        menuClosedX = -width + 'px';
    }
    var menuAnimation = new AnimationC()
        .addElement(menu.menuInnerEl)
        .fromTo('translateX', menuClosedX, '0px');
    var contentAnimation = new AnimationC()
        .addElement(menu.contentEl)
        .fromTo('translateX', '0px', contentOpenedX);
    var backdropAnimation = new AnimationC()
        .addElement(menu.backdropEl)
        .fromTo('opacity', 0.01, 0.32);
    return baseAnimation(AnimationC).then(function (animation) {
        return animation.add(menuAnimation)
            .add(backdropAnimation)
            .add(contentAnimation);
    });
}
/**
 * Menu Reveal Type
 * The content slides over to reveal the menu underneath.
 * The menu itself, which is under the content, does not move.
 */
function menuRevealAnimation(AnimationC, _, menu) {
    var openedX = (menu.width * (menu.isEndSide ? -1 : 1)) + 'px';
    var contentOpen = new AnimationC()
        .addElement(menu.contentEl)
        .fromTo('translateX', '0px', openedX);
    return baseAnimation(AnimationC).then(function (animation) {
        return animation.add(contentOpen);
    });
}
var MenuController = /** @class */ (function () {
    function MenuController(hostRef) {
        Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["r"])(this, hostRef);
        this.menus = [];
        this.menuAnimations = new Map();
        this.registerAnimation('reveal', menuRevealAnimation);
        this.registerAnimation('push', menuPushAnimation);
        this.registerAnimation('overlay', menuOverlayAnimation);
    }
    /**
     * Open the menu. If a menu is not provided then it will open the first
     * menu found. If the specified menu is `start` or `end`, then it will open
     * the enabled menu on that side. Otherwise, it will try to find the menu
     * using the menu's `id` property. If a menu is not found then it will
     * return `false`.
     *
     * @param menu The menuId or side of the menu to open.
     */
    MenuController.prototype.open = function (menu) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var menuEl;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get(menu)];
                    case 1:
                        menuEl = _a.sent();
                        if (menuEl) {
                            return [2 /*return*/, menuEl.open()];
                        }
                        return [2 /*return*/, false];
                }
            });
        });
    };
    /**
     * Close the menu. If a menu is specified, it will close that menu.
     * If no menu is specified, then it will close any menu that is open.
     * If it does not find any open menus, it will return `false`.
     *
     * @param menu The menuId or side of the menu to close.
     */
    MenuController.prototype.close = function (menu) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var menuEl;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (menu !== undefined ? this.get(menu) : this.getOpen())];
                    case 1:
                        menuEl = _a.sent();
                        if (menuEl !== undefined) {
                            return [2 /*return*/, menuEl.close()];
                        }
                        return [2 /*return*/, false];
                }
            });
        });
    };
    /**
     * Toggle the menu open or closed. If the menu is already open, it will try to
     * close the menu, otherwise it will try to open it. Returns `false` if
     * a menu is not found.
     *
     * @param menu The menuId or side of the menu to toggle.
     */
    MenuController.prototype.toggle = function (menu) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var menuEl;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get(menu)];
                    case 1:
                        menuEl = _a.sent();
                        if (menuEl) {
                            return [2 /*return*/, menuEl.toggle()];
                        }
                        return [2 /*return*/, false];
                }
            });
        });
    };
    /**
     * Enable or disable a menu. Disabling a menu will not allow gestures
     * for that menu or any calls to open it. This is useful when there are
     * multiple menus on the same side and only one of them should be allowed
     * to open. Enabling a menu will automatically disable all other menus
     * on that side.
     *
     * @param enable If `true`, the menu should be enabled.
     * @param menu The menuId or side of the menu to enable or disable.
     */
    MenuController.prototype.enable = function (enable, menu) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var menuEl;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get(menu)];
                    case 1:
                        menuEl = _a.sent();
                        if (menuEl) {
                            menuEl.disabled = !enable;
                        }
                        return [2 /*return*/, menuEl];
                }
            });
        });
    };
    /**
     * Enable or disable the ability to swipe open the menu.
     *
     * @param enable If `true`, the menu swipe gesture should be enabled.
     * @param menu The menuId or side of the menu to enable or disable the swipe gesture on.
     */
    MenuController.prototype.swipeGesture = function (enable, menu) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var menuEl;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get(menu)];
                    case 1:
                        menuEl = _a.sent();
                        if (menuEl) {
                            menuEl.swipeGesture = enable;
                        }
                        return [2 /*return*/, menuEl];
                }
            });
        });
    };
    /**
     * Get whether or not the menu is open. Returns `true` if the specified
     * menu is open. If a menu is not specified, it will return `true` if
     * any menu is currently open.
     *
     * @param menu The menuId or side of the menu that is being checked.
     */
    MenuController.prototype.isOpen = function (menu) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var menuEl, menuEl;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(menu != null)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.get(menu)];
                    case 1:
                        menuEl = _a.sent();
                        return [2 /*return*/, (menuEl !== undefined && menuEl.isOpen())];
                    case 2: return [4 /*yield*/, this.getOpen()];
                    case 3:
                        menuEl = _a.sent();
                        return [2 /*return*/, menuEl !== undefined];
                }
            });
        });
    };
    /**
     * Get whether or not the menu is enabled. Returns `true` if the
     * specified menu is enabled. Returns `false` if a menu is disabled
     * or not found.
     *
     * @param menu The menuId or side of the menu that is being checked.
     */
    MenuController.prototype.isEnabled = function (menu) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var menuEl;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get(menu)];
                    case 1:
                        menuEl = _a.sent();
                        if (menuEl) {
                            return [2 /*return*/, !menuEl.disabled];
                        }
                        return [2 /*return*/, false];
                }
            });
        });
    };
    /**
     * Get a menu instance. If a menu is not provided then it will return the first
     * menu found. If the specified menu is `start` or `end`, then it will return the
     * enabled menu on that side. Otherwise, it will try to find the menu using the menu's
     * `id` property. If a menu is not found then it will return `null`.
     *
     * @param menu The menuId or side of the menu.
     */
    MenuController.prototype.get = function (menu) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var menuRef, menuEl;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.waitUntilReady()];
                    case 1:
                        _a.sent();
                        if (menu === 'start' || menu === 'end') {
                            menuRef = this.find(function (m) { return m.side === menu && !m.disabled; });
                            if (menuRef) {
                                return [2 /*return*/, menuRef];
                            }
                            // didn't find a menu side that is enabled
                            // so try to get the first menu side found
                            return [2 /*return*/, this.find(function (m) { return m.side === menu; })];
                        }
                        else if (menu != null) {
                            // the menuId was not left or right
                            // so try to get the menu by its "id"
                            return [2 /*return*/, this.find(function (m) { return m.menuId === menu; })];
                        }
                        menuEl = this.find(function (m) { return !m.disabled; });
                        if (menuEl) {
                            return [2 /*return*/, menuEl];
                        }
                        // get the first menu in the array, if one exists
                        return [2 /*return*/, this.menus.length > 0 ? this.menus[0].el : undefined];
                }
            });
        });
    };
    /**
     * Get the instance of the opened menu. Returns `null` if a menu is not found.
     */
    MenuController.prototype.getOpen = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.waitUntilReady()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.getOpenSync()];
                }
            });
        });
    };
    /**
     * Get all menu instances.
     */
    MenuController.prototype.getMenus = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.waitUntilReady()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.getMenusSync()];
                }
            });
        });
    };
    /**
     * Get whether or not a menu is animating. Returns `true` if any
     * menu is currently animating.
     */
    MenuController.prototype.isAnimating = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.waitUntilReady()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.isAnimatingSync()];
                }
            });
        });
    };
    /**
     * Registers a new animation that can be used with any `ion-menu` by
     * passing the name of the animation in its `type` property.
     *
     * @param name The name of the animation to register.
     * @param animation The animation function to register.
     */
    MenuController.prototype.registerAnimation = function (name, animation) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                this.menuAnimations.set(name, animation);
                return [2 /*return*/];
            });
        });
    };
    /**
     * @internal
     */
    MenuController.prototype._getInstance = function () {
        return Promise.resolve(this);
    };
    MenuController.prototype._register = function (menu) {
        var menus = this.menus;
        if (menus.indexOf(menu) < 0) {
            if (!menu.disabled) {
                this._setActiveMenu(menu);
            }
            menus.push(menu);
        }
    };
    MenuController.prototype._unregister = function (menu) {
        var index = this.menus.indexOf(menu);
        if (index > -1) {
            this.menus.splice(index, 1);
        }
    };
    MenuController.prototype._setActiveMenu = function (menu) {
        // if this menu should be enabled
        // then find all the other menus on this same side
        // and automatically disable other same side menus
        var side = menu.side;
        this.menus
            .filter(function (m) { return m.side === side && m !== menu; })
            .forEach(function (m) { return m.disabled = true; });
    };
    MenuController.prototype._setOpen = function (menu, shouldOpen, animated) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var openedMenu;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.isAnimatingSync()) {
                            return [2 /*return*/, false];
                        }
                        if (!shouldOpen) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.getOpen()];
                    case 1:
                        openedMenu = _a.sent();
                        if (!(openedMenu && menu.el !== openedMenu)) return [3 /*break*/, 3];
                        return [4 /*yield*/, openedMenu.setOpen(false, false)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/, menu._setOpen(shouldOpen, animated)];
                }
            });
        });
    };
    MenuController.prototype._createAnimation = function (type, menuCmp) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var animationBuilder, animation;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        animationBuilder = this.menuAnimations.get(type);
                        if (!animationBuilder) {
                            throw new Error('animation not registered');
                        }
                        return [4 /*yield*/, __webpack_require__.e(/*! import() */ 2).then(__webpack_require__.bind(null, /*! ./index-8ec7f6e0.js */ "./node_modules/@ionic/core/dist/esm/legacy/index-8ec7f6e0.js"))
                                .then(function (mod) { return mod.create(animationBuilder, null, menuCmp); })];
                    case 1:
                        animation = _a.sent();
                        if (!_chunk_1074393c_js__WEBPACK_IMPORTED_MODULE_2__["b"].getBoolean('animated', true)) {
                            animation.duration(0);
                        }
                        return [2 /*return*/, animation];
                }
            });
        });
    };
    MenuController.prototype.getOpenSync = function () {
        return this.find(function (m) { return m._isOpen; });
    };
    MenuController.prototype.getMenusSync = function () {
        return this.menus.map(function (menu) { return menu.el; });
    };
    MenuController.prototype.isAnimatingSync = function () {
        return this.menus.some(function (menu) { return menu.isAnimating; });
    };
    MenuController.prototype.find = function (predicate) {
        var instance = this.menus.find(predicate);
        if (instance !== undefined) {
            return instance.el;
        }
        return undefined;
    };
    MenuController.prototype.waitUntilReady = function () {
        return Promise.all(Array.from(document.querySelectorAll('ion-menu'))
            .map(function (menu) { return menu.componentOnReady(); }));
    };
    Object.defineProperty(MenuController, "style", {
        get: function () { return ".menu-content{-webkit-transform:translateZ(0);transform:translateZ(0)}.menu-content-open{cursor:pointer;-ms-touch-action:manipulation;touch-action:manipulation;pointer-events:none}.ios .menu-content-reveal{-webkit-box-shadow:-8px 0 42px rgba(0,0,0,.08);box-shadow:-8px 0 42px rgba(0,0,0,.08)}[dir=rtl].ios .menu-content-reveal{-webkit-box-shadow:8px 0 42px rgba(0,0,0,.08);box-shadow:8px 0 42px rgba(0,0,0,.08)}.md .menu-content-push,.md .menu-content-reveal{-webkit-box-shadow:0 2px 22px 0 rgba(0,0,0,.09),4px 0 16px 0 rgba(0,0,0,.18);box-shadow:0 2px 22px 0 rgba(0,0,0,.09),4px 0 16px 0 rgba(0,0,0,.18)}"; },
        enumerable: true,
        configurable: true
    });
    return MenuController;
}());
var MenuToggle = /** @class */ (function () {
    function MenuToggle(hostRef) {
        var _this = this;
        Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["r"])(this, hostRef);
        this.visible = false;
        /**
         * Automatically hides the content when the corresponding menu is not active.
         *
         * By default, it's `true`. Change it to `false` in order to
         * keep `ion-menu-toggle` always visible regardless the state of the menu.
         */
        this.autoHide = true;
        this.onClick = function () { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            var menuCtrl, menu;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getMenuController(document)];
                    case 1:
                        menuCtrl = _a.sent();
                        if (!menuCtrl) return [3 /*break*/, 3];
                        return [4 /*yield*/, menuCtrl.get(this.menu)];
                    case 2:
                        menu = _a.sent();
                        if (menu) {
                            menuCtrl.toggle(this.menu);
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
    }
    MenuToggle.prototype.componentDidLoad = function () {
        return this.updateVisibility();
    };
    MenuToggle.prototype.updateVisibility = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var menuCtrl, menu, _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, getMenuController(document)];
                    case 1:
                        menuCtrl = _b.sent();
                        if (!menuCtrl) return [3 /*break*/, 5];
                        return [4 /*yield*/, menuCtrl.get(this.menu)];
                    case 2:
                        menu = _b.sent();
                        _a = menu;
                        if (!_a) return [3 /*break*/, 4];
                        return [4 /*yield*/, menu.isActive()];
                    case 3:
                        _a = (_b.sent());
                        _b.label = 4;
                    case 4:
                        if (_a) {
                            this.visible = true;
                            return [2 /*return*/];
                        }
                        _b.label = 5;
                    case 5:
                        this.visible = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    MenuToggle.prototype.render = function () {
        var _a;
        var mode = Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["d"])(this);
        var hidden = this.autoHide && !this.visible;
        return (Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["h"])(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["H"], { onClick: this.onClick, "aria-hidden": hidden ? 'true' : null, class: (_a = {},
                _a[mode] = true,
                _a['menu-toggle-hidden'] = hidden,
                _a) }, Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["h"])("slot", null)));
    };
    Object.defineProperty(MenuToggle, "style", {
        get: function () { return ":host(.menu-toggle-hidden){display:none}"; },
        enumerable: true,
        configurable: true
    });
    return MenuToggle;
}());
function getMenuController(doc) {
    var menuControllerElement = doc.querySelector('ion-menu-controller');
    if (!menuControllerElement) {
        return Promise.resolve(undefined);
    }
    return menuControllerElement.componentOnReady();
}



/***/ })

}]);
//# sourceMappingURL=52.js.map