(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[55],{

/***/ "./node_modules/@ionic/core/dist/esm/legacy/ion-nav_4.entry.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/legacy/ion-nav_4.entry.js ***!
  \*********************************************************************/
/*! exports provided: ion_nav, ion_nav_pop, ion_nav_push, ion_nav_set_root */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ion_nav", function() { return Nav; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ion_nav_pop", function() { return NavPop; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ion_nav_push", function() { return NavPush; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ion_nav_set_root", function() { return NavSetRoot; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chunk-f257aad1.js */ "./node_modules/@ionic/core/dist/esm/legacy/chunk-f257aad1.js");
/* harmony import */ var _chunk_1074393c_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./chunk-1074393c.js */ "./node_modules/@ionic/core/dist/esm/legacy/chunk-1074393c.js");
/* harmony import */ var _chunk_94c4865f_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./chunk-94c4865f.js */ "./node_modules/@ionic/core/dist/esm/legacy/chunk-94c4865f.js");
/* harmony import */ var _chunk_d102c9d1_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./chunk-d102c9d1.js */ "./node_modules/@ionic/core/dist/esm/legacy/chunk-d102c9d1.js");
/* harmony import */ var _chunk_25340090_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./chunk-25340090.js */ "./node_modules/@ionic/core/dist/esm/legacy/chunk-25340090.js");
/* harmony import */ var _chunk_815c1888_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./chunk-815c1888.js */ "./node_modules/@ionic/core/dist/esm/legacy/chunk-815c1888.js");







var VIEW_STATE_NEW = 1;
var VIEW_STATE_ATTACHED = 2;
var VIEW_STATE_DESTROYED = 3;
var ViewController = /** @class */ (function () {
    function ViewController(component, params) {
        this.component = component;
        this.params = params;
        this.state = VIEW_STATE_NEW;
    }
    ViewController.prototype.init = function (container) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var component, _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.state = VIEW_STATE_ATTACHED;
                        if (!!this.element) return [3 /*break*/, 2];
                        component = this.component;
                        _a = this;
                        return [4 /*yield*/, Object(_chunk_25340090_js__WEBPACK_IMPORTED_MODULE_5__["a"])(this.delegate, container, component, ['ion-page', 'ion-page-invisible'], this.params)];
                    case 1:
                        _a.element = _b.sent();
                        _b.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * DOM WRITE
     */
    ViewController.prototype._destroy = function () {
        Object(_chunk_d102c9d1_js__WEBPACK_IMPORTED_MODULE_4__["b"])(this.state !== VIEW_STATE_DESTROYED, 'view state must be ATTACHED');
        var element = this.element;
        if (element) {
            if (this.delegate) {
                this.delegate.removeViewFromDom(element.parentElement, element);
            }
            else {
                element.remove();
            }
        }
        this.nav = undefined;
        this.state = VIEW_STATE_DESTROYED;
    };
    return ViewController;
}());
function matches(view, id, params) {
    if (!view) {
        return false;
    }
    if (view.component !== id) {
        return false;
    }
    var currentParams = view.params;
    if (currentParams === params) {
        return true;
    }
    if (!currentParams && !params) {
        return true;
    }
    if (!currentParams || !params) {
        return false;
    }
    var keysA = Object.keys(currentParams);
    var keysB = Object.keys(params);
    if (keysA.length !== keysB.length) {
        return false;
    }
    // Test for A's keys different from B.
    for (var _i = 0, keysA_1 = keysA; _i < keysA_1.length; _i++) {
        var key = keysA_1[_i];
        if (currentParams[key] !== params[key]) {
            return false;
        }
    }
    return true;
}
function convertToView(page, params) {
    if (!page) {
        return null;
    }
    if (page instanceof ViewController) {
        return page;
    }
    return new ViewController(page, params);
}
function convertToViews(pages) {
    return pages.map(function (page) {
        if (page instanceof ViewController) {
            return page;
        }
        if ('page' in page) {
            return convertToView(page.page, page.params);
        }
        return convertToView(page, undefined);
    }).filter(function (v) { return v !== null; });
}
var Nav = /** @class */ (function () {
    function Nav(hostRef) {
        Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["r"])(this, hostRef);
        this.transInstr = [];
        this.useRouter = false;
        this.isTransitioning = false;
        this.destroyed = false;
        this.views = [];
        /**
         * If `true`, the nav should animate the transition of components.
         */
        this.animated = true;
        this.ionNavWillLoad = Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["c"])(this, "ionNavWillLoad", 7);
        this.ionNavWillChange = Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["c"])(this, "ionNavWillChange", 3);
        this.ionNavDidChange = Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["c"])(this, "ionNavDidChange", 3);
    }
    Nav.prototype.swipeGestureChanged = function () {
        if (this.gesture) {
            this.gesture.setDisabled(this.swipeGesture !== true);
        }
    };
    Nav.prototype.rootChanged = function () {
        if (this.root !== undefined) {
            if (!this.useRouter) {
                this.setRoot(this.root, this.rootParams);
            }
        }
    };
    Nav.prototype.componentWillLoad = function () {
        this.useRouter =
            !!document.querySelector('ion-router') &&
                !this.el.closest('[no-router]');
        if (this.swipeGesture === undefined) {
            var mode = Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["d"])(this);
            this.swipeGesture = _chunk_1074393c_js__WEBPACK_IMPORTED_MODULE_2__["b"].getBoolean('swipeBackEnabled', mode === 'ios');
        }
        this.ionNavWillLoad.emit();
    };
    Nav.prototype.componentDidLoad = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.rootChanged();
                        _a = this;
                        return [4 /*yield*/, Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e("common"), __webpack_require__.e(7)]).then(__webpack_require__.bind(null, /*! ./swipe-back-8dc047dc.js */ "./node_modules/@ionic/core/dist/esm/legacy/swipe-back-8dc047dc.js"))];
                    case 1:
                        _a.gesture = (_b.sent()).createSwipeBackGesture(this.el, this.canStart.bind(this), this.onStart.bind(this), this.onMove.bind(this), this.onEnd.bind(this));
                        this.swipeGestureChanged();
                        return [2 /*return*/];
                }
            });
        });
    };
    Nav.prototype.componentDidUnload = function () {
        for (var _i = 0, _a = this.views; _i < _a.length; _i++) {
            var view = _a[_i];
            Object(_chunk_815c1888_js__WEBPACK_IMPORTED_MODULE_6__["l"])(view.element, _chunk_94c4865f_js__WEBPACK_IMPORTED_MODULE_3__["d"]);
            view._destroy();
        }
        if (this.gesture) {
            this.gesture.destroy();
            this.gesture = undefined;
        }
        // release swipe back gesture and transition
        this.transInstr.length = this.views.length = 0;
        this.destroyed = true;
    };
    /**
     * Push a new component onto the current navigation stack. Pass any additional
     * information along as an object. This additional information is accessible
     * through NavParams.
     *
     * @param component The component to push onto the navigation stack.
     * @param componentProps Any properties of the component.
     * @param opts The navigation options.
     * @param done The transition complete function.
     */
    Nav.prototype.push = function (component, componentProps, opts, done) {
        return this.queueTrns({
            insertStart: -1,
            insertViews: [{ page: component, params: componentProps }],
            opts: opts
        }, done);
    };
    /**
     * Inserts a component into the navigation stack at the specified index.
     * This is useful to add a component at any point in the navigation stack.
     *
     * @param insertIndex The index to insert the component at in the stack.
     * @param component The component to insert into the navigation stack.
     * @param componentProps Any properties of the component.
     * @param opts The navigation options.
     * @param done The transition complete function.
     */
    Nav.prototype.insert = function (insertIndex, component, componentProps, opts, done) {
        return this.queueTrns({
            insertStart: insertIndex,
            insertViews: [{ page: component, params: componentProps }],
            opts: opts
        }, done);
    };
    /**
     * Inserts an array of components into the navigation stack at the specified index.
     * The last component in the array will become instantiated as a view, and animate
     * in to become the active view.
     *
     * @param insertIndex The index to insert the components at in the stack.
     * @param insertComponents The components to insert into the navigation stack.
     * @param opts The navigation options.
     * @param done The transition complete function.
     */
    Nav.prototype.insertPages = function (insertIndex, insertComponents, opts, done) {
        return this.queueTrns({
            insertStart: insertIndex,
            insertViews: insertComponents,
            opts: opts
        }, done);
    };
    /**
     * Pop a component off of the navigation stack. Navigates back from the current
     * component.
     *
     * @param opts The navigation options.
     * @param done The transition complete function.
     */
    Nav.prototype.pop = function (opts, done) {
        return this.queueTrns({
            removeStart: -1,
            removeCount: 1,
            opts: opts
        }, done);
    };
    /**
     * Pop to a specific index in the navigation stack.
     *
     * @param indexOrViewCtrl The index or view controller to pop to.
     * @param opts The navigation options.
     * @param done The transition complete function.
     */
    Nav.prototype.popTo = function (indexOrViewCtrl, opts, done) {
        var tiConfig = {
            removeStart: -1,
            removeCount: -1,
            opts: opts
        };
        if (typeof indexOrViewCtrl === 'object' && indexOrViewCtrl.component) {
            tiConfig.removeView = indexOrViewCtrl;
            tiConfig.removeStart = 1;
        }
        else if (typeof indexOrViewCtrl === 'number') {
            tiConfig.removeStart = indexOrViewCtrl + 1;
        }
        return this.queueTrns(tiConfig, done);
    };
    /**
     * Navigate back to the root of the stack, no matter how far back that is.
     *
     * @param opts The navigation options.
     * @param done The transition complete function.
     */
    Nav.prototype.popToRoot = function (opts, done) {
        return this.queueTrns({
            removeStart: 1,
            removeCount: -1,
            opts: opts
        }, done);
    };
    /**
     * Removes a component from the navigation stack at the specified index.
     *
     * @param startIndex The number to begin removal at.
     * @param removeCount The number of components to remove.
     * @param opts The navigation options.
     * @param done The transition complete function.
     */
    Nav.prototype.removeIndex = function (startIndex, removeCount, opts, done) {
        if (removeCount === void 0) { removeCount = 1; }
        return this.queueTrns({
            removeStart: startIndex,
            removeCount: removeCount,
            opts: opts
        }, done);
    };
    /**
     * Set the root for the current navigation stack to a component.
     *
     * @param component The component to set as the root of the navigation stack.
     * @param componentProps Any properties of the component.
     * @param opts The navigation options.
     * @param done The transition complete function.
     */
    Nav.prototype.setRoot = function (component, componentProps, opts, done) {
        return this.setPages([{ page: component, params: componentProps }], opts, done);
    };
    /**
     * Set the views of the current navigation stack and navigate to the last view.
     * By default animations are disabled, but they can be enabled by passing options
     * to the navigation controller. Navigation parameters can also be passed to the
     * individual pages in the array.
     *
     * @param views The list of views to set as the navigation stack.
     * @param opts The navigation options.
     * @param done The transition complete function.
     */
    Nav.prototype.setPages = function (views, opts, done) {
        if (opts == null) {
            opts = {};
        }
        // if animation wasn't set to true then default it to NOT animate
        if (opts.animated !== true) {
            opts.animated = false;
        }
        return this.queueTrns({
            insertStart: 0,
            insertViews: views,
            removeStart: 0,
            removeCount: -1,
            opts: opts
        }, done);
    };
    /** @internal */
    Nav.prototype.setRouteId = function (id, params, direction) {
        var _this = this;
        var active = this.getActiveSync();
        if (matches(active, id, params)) {
            return Promise.resolve({
                changed: false,
                element: active.element
            });
        }
        var resolve;
        var promise = new Promise(function (r) { return (resolve = r); });
        var finish;
        var commonOpts = {
            updateURL: false,
            viewIsReady: function (enteringEl) {
                var mark;
                var p = new Promise(function (r) { return (mark = r); });
                resolve({
                    changed: true,
                    element: enteringEl,
                    markVisible: function () { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    mark();
                                    return [4 /*yield*/, finish];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); }
                });
                return p;
            }
        };
        if (direction === 'root') {
            finish = this.setRoot(id, params, commonOpts);
        }
        else {
            var viewController = this.views.find(function (v) { return matches(v, id, params); });
            if (viewController) {
                finish = this.popTo(viewController, Object.assign({}, commonOpts, { direction: 'back' }));
            }
            else if (direction === 'forward') {
                finish = this.push(id, params, commonOpts);
            }
            else if (direction === 'back') {
                finish = this.setRoot(id, params, Object.assign({}, commonOpts, { direction: 'back', animated: true }));
            }
        }
        return promise;
    };
    /** @internal */
    Nav.prototype.getRouteId = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var active;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                active = this.getActiveSync();
                return [2 /*return*/, active
                        ? {
                            id: active.element.tagName,
                            params: active.params,
                            element: active.element
                        }
                        : undefined];
            });
        });
    };
    /**
     * Get the active view.
     */
    Nav.prototype.getActive = function () {
        return Promise.resolve(this.getActiveSync());
    };
    /**
     * Get the view at the specified index.
     *
     * @param index The index of the view.
     */
    Nav.prototype.getByIndex = function (index) {
        return Promise.resolve(this.views[index]);
    };
    /**
     * Returns `true` if the current view can go back.
     *
     * @param view The view to check.
     */
    Nav.prototype.canGoBack = function (view) {
        return Promise.resolve(this.canGoBackSync(view));
    };
    /**
     * Get the previous view.
     *
     * @param view The view to get.
     */
    Nav.prototype.getPrevious = function (view) {
        return Promise.resolve(this.getPreviousSync(view));
    };
    Nav.prototype.getLength = function () {
        return this.views.length;
    };
    Nav.prototype.getActiveSync = function () {
        return this.views[this.views.length - 1];
    };
    Nav.prototype.canGoBackSync = function (view) {
        if (view === void 0) { view = this.getActiveSync(); }
        return !!(view && this.getPreviousSync(view));
    };
    Nav.prototype.getPreviousSync = function (view) {
        if (view === void 0) { view = this.getActiveSync(); }
        if (!view) {
            return undefined;
        }
        var views = this.views;
        var index = views.indexOf(view);
        return index > 0 ? views[index - 1] : undefined;
    };
    // _queueTrns() adds a navigation stack change to the queue and schedules it to run:
    // 1. _nextTrns(): consumes the next transition in the queue
    // 2. _viewInit(): initializes enteringView if required
    // 3. _viewTest(): ensures canLeave/canEnter Returns `true`, so the operation can continue
    // 4. _postViewInit(): add/remove the views from the navigation stack
    // 5. _transitionInit(): initializes the visual transition if required and schedules it to run
    // 6. _viewAttachToDOM(): attaches the enteringView to the DOM
    // 7. _transitionStart(): called once the transition actually starts, it initializes the Animation underneath.
    // 8. _transitionFinish(): called once the transition finishes
    // 9. _cleanup(): syncs the navigation internal state with the DOM. For example it removes the pages from the DOM or hides/show them.
    Nav.prototype.queueTrns = function (ti, done) {
        if (this.isTransitioning && ti.opts != null && ti.opts.skipIfBusy) {
            return Promise.resolve(false);
        }
        var promise = new Promise(function (resolve, reject) {
            ti.resolve = resolve;
            ti.reject = reject;
        });
        ti.done = done;
        // Normalize empty
        if (ti.insertViews && ti.insertViews.length === 0) {
            ti.insertViews = undefined;
        }
        // Enqueue transition instruction
        this.transInstr.push(ti);
        // if there isn't a transition already happening
        // then this will kick off this transition
        this.nextTrns();
        return promise;
    };
    Nav.prototype.success = function (result, ti) {
        if (this.destroyed) {
            this.fireError('nav controller was destroyed', ti);
            return;
        }
        if (ti.done) {
            ti.done(result.hasCompleted, result.requiresTransition, result.enteringView, result.leavingView, result.direction);
        }
        ti.resolve(result.hasCompleted);
        if (ti.opts.updateURL !== false && this.useRouter) {
            var router = document.querySelector('ion-router');
            if (router) {
                var direction = result.direction === 'back' ? 'back' : 'forward';
                router.navChanged(direction);
            }
        }
    };
    Nav.prototype.failed = function (rejectReason, ti) {
        if (this.destroyed) {
            this.fireError('nav controller was destroyed', ti);
            return;
        }
        this.transInstr.length = 0;
        this.fireError(rejectReason, ti);
    };
    Nav.prototype.fireError = function (rejectReason, ti) {
        if (ti.done) {
            ti.done(false, false, rejectReason);
        }
        if (ti.reject && !this.destroyed) {
            ti.reject(rejectReason);
        }
        else {
            ti.resolve(false);
        }
    };
    Nav.prototype.nextTrns = function () {
        // this is the framework's bread 'n butta function
        // only one transition is allowed at any given time
        if (this.isTransitioning) {
            return false;
        }
        // there is no transition happening right now
        // get the next instruction
        var ti = this.transInstr.shift();
        if (!ti) {
            return false;
        }
        this.runTransition(ti);
        return true;
    };
    Nav.prototype.runTransition = function (ti) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var leavingView, enteringView, requiresTransition, result, _a, rejectReason_1;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 6, , 7]);
                        // set that this nav is actively transitioning
                        this.ionNavWillChange.emit();
                        this.isTransitioning = true;
                        this.prepareTI(ti);
                        leavingView = this.getActiveSync();
                        enteringView = this.getEnteringView(ti, leavingView);
                        if (!leavingView && !enteringView) {
                            throw new Error('no views in the stack to be removed');
                        }
                        if (!(enteringView && enteringView.state === VIEW_STATE_NEW)) return [3 /*break*/, 2];
                        return [4 /*yield*/, enteringView.init(this.el)];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2:
                        this.postViewInit(enteringView, leavingView, ti);
                        requiresTransition = (ti.enteringRequiresTransition || ti.leavingRequiresTransition) &&
                            enteringView !== leavingView;
                        if (!requiresTransition) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.transition(enteringView, leavingView, ti)];
                    case 3:
                        _a = _b.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        _a = {
                            // transition is not required, so we are already done!
                            // they're inserting/removing the views somewhere in the middle or
                            // beginning, so visually nothing needs to animate/transition
                            // resolve immediately because there's no animation that's happening
                            hasCompleted: true,
                            requiresTransition: false
                        };
                        _b.label = 5;
                    case 5:
                        result = _a;
                        this.success(result, ti);
                        this.ionNavDidChange.emit();
                        return [3 /*break*/, 7];
                    case 6:
                        rejectReason_1 = _b.sent();
                        this.failed(rejectReason_1, ti);
                        return [3 /*break*/, 7];
                    case 7:
                        this.isTransitioning = false;
                        this.nextTrns();
                        return [2 /*return*/];
                }
            });
        });
    };
    Nav.prototype.prepareTI = function (ti) {
        var viewsLength = this.views.length;
        ti.opts = ti.opts || {};
        if (ti.opts.delegate === undefined) {
            ti.opts.delegate = this.delegate;
        }
        if (ti.removeView !== undefined) {
            Object(_chunk_d102c9d1_js__WEBPACK_IMPORTED_MODULE_4__["b"])(ti.removeStart !== undefined, 'removeView needs removeStart');
            Object(_chunk_d102c9d1_js__WEBPACK_IMPORTED_MODULE_4__["b"])(ti.removeCount !== undefined, 'removeView needs removeCount');
            var index = this.views.indexOf(ti.removeView);
            if (index < 0) {
                throw new Error('removeView was not found');
            }
            ti.removeStart += index;
        }
        if (ti.removeStart !== undefined) {
            if (ti.removeStart < 0) {
                ti.removeStart = viewsLength - 1;
            }
            if (ti.removeCount < 0) {
                ti.removeCount = viewsLength - ti.removeStart;
            }
            ti.leavingRequiresTransition =
                ti.removeCount > 0 && ti.removeStart + ti.removeCount === viewsLength;
        }
        if (ti.insertViews) {
            // allow -1 to be passed in to auto push it on the end
            // and clean up the index if it's larger then the size of the stack
            if (ti.insertStart < 0 || ti.insertStart > viewsLength) {
                ti.insertStart = viewsLength;
            }
            ti.enteringRequiresTransition = ti.insertStart === viewsLength;
        }
        var insertViews = ti.insertViews;
        if (!insertViews) {
            return;
        }
        Object(_chunk_d102c9d1_js__WEBPACK_IMPORTED_MODULE_4__["b"])(insertViews.length > 0, 'length can not be zero');
        var viewControllers = convertToViews(insertViews);
        if (viewControllers.length === 0) {
            throw new Error('invalid views to insert');
        }
        // Check all the inserted view are correct
        for (var _i = 0, viewControllers_1 = viewControllers; _i < viewControllers_1.length; _i++) {
            var view = viewControllers_1[_i];
            view.delegate = ti.opts.delegate;
            var nav = view.nav;
            if (nav && nav !== this) {
                throw new Error('inserted view was already inserted');
            }
            if (view.state === VIEW_STATE_DESTROYED) {
                throw new Error('inserted view was already destroyed');
            }
        }
        ti.insertViews = viewControllers;
    };
    Nav.prototype.getEnteringView = function (ti, leavingView) {
        var insertViews = ti.insertViews;
        if (insertViews !== undefined) {
            // grab the very last view of the views to be inserted
            // and initialize it as the new entering view
            return insertViews[insertViews.length - 1];
        }
        var removeStart = ti.removeStart;
        if (removeStart !== undefined) {
            var views = this.views;
            var removeEnd = removeStart + ti.removeCount;
            for (var i = views.length - 1; i >= 0; i--) {
                var view = views[i];
                if ((i < removeStart || i >= removeEnd) && view !== leavingView) {
                    return view;
                }
            }
        }
        return undefined;
    };
    Nav.prototype.postViewInit = function (enteringView, leavingView, ti) {
        Object(_chunk_d102c9d1_js__WEBPACK_IMPORTED_MODULE_4__["b"])(leavingView || enteringView, 'Both leavingView and enteringView are null');
        Object(_chunk_d102c9d1_js__WEBPACK_IMPORTED_MODULE_4__["b"])(ti.resolve, 'resolve must be valid');
        Object(_chunk_d102c9d1_js__WEBPACK_IMPORTED_MODULE_4__["b"])(ti.reject, 'reject must be valid');
        var opts = ti.opts;
        var insertViews = ti.insertViews;
        var removeStart = ti.removeStart;
        var removeCount = ti.removeCount;
        var destroyQueue;
        // there are views to remove
        if (removeStart !== undefined && removeCount !== undefined) {
            Object(_chunk_d102c9d1_js__WEBPACK_IMPORTED_MODULE_4__["b"])(removeStart >= 0, 'removeStart can not be negative');
            Object(_chunk_d102c9d1_js__WEBPACK_IMPORTED_MODULE_4__["b"])(removeCount >= 0, 'removeCount can not be negative');
            destroyQueue = [];
            for (var i = 0; i < removeCount; i++) {
                var view = this.views[i + removeStart];
                if (view && view !== enteringView && view !== leavingView) {
                    destroyQueue.push(view);
                }
            }
            // default the direction to "back"
            opts.direction = opts.direction || 'back';
        }
        var finalBalance = this.views.length +
            (insertViews !== undefined ? insertViews.length : 0) -
            (removeCount !== undefined ? removeCount : 0);
        Object(_chunk_d102c9d1_js__WEBPACK_IMPORTED_MODULE_4__["b"])(finalBalance >= 0, 'final balance can not be negative');
        if (finalBalance === 0) {
            console.warn("You can't remove all the pages in the navigation stack. nav.pop() is probably called too many times.", this, this.el);
            throw new Error('navigation stack needs at least one root page');
        }
        // At this point the transition can not be rejected, any throw should be an error
        // there are views to insert
        if (insertViews) {
            // add the views to the
            var insertIndex = ti.insertStart;
            for (var _i = 0, insertViews_1 = insertViews; _i < insertViews_1.length; _i++) {
                var view = insertViews_1[_i];
                this.insertViewAt(view, insertIndex);
                insertIndex++;
            }
            if (ti.enteringRequiresTransition) {
                // default to forward if not already set
                opts.direction = opts.direction || 'forward';
            }
        }
        // if the views to be removed are in the beginning or middle
        // and there is not a view that needs to visually transition out
        // then just destroy them and don't transition anything
        // batch all of lifecycles together
        // let's make sure, callbacks are zoned
        if (destroyQueue && destroyQueue.length > 0) {
            for (var _a = 0, destroyQueue_1 = destroyQueue; _a < destroyQueue_1.length; _a++) {
                var view = destroyQueue_1[_a];
                Object(_chunk_815c1888_js__WEBPACK_IMPORTED_MODULE_6__["l"])(view.element, _chunk_94c4865f_js__WEBPACK_IMPORTED_MODULE_3__["b"]);
                Object(_chunk_815c1888_js__WEBPACK_IMPORTED_MODULE_6__["l"])(view.element, _chunk_94c4865f_js__WEBPACK_IMPORTED_MODULE_3__["c"]);
                Object(_chunk_815c1888_js__WEBPACK_IMPORTED_MODULE_6__["l"])(view.element, _chunk_94c4865f_js__WEBPACK_IMPORTED_MODULE_3__["d"]);
            }
            // once all lifecycle events has been delivered, we can safely detroy the views
            for (var _b = 0, destroyQueue_2 = destroyQueue; _b < destroyQueue_2.length; _b++) {
                var view = destroyQueue_2[_b];
                this.destroyView(view);
            }
        }
    };
    Nav.prototype.transition = function (enteringView, leavingView, ti) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var opts, progressCallback, mode, enteringEl, leavingEl, animationOpts, hasCompleted;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        opts = ti.opts;
                        progressCallback = opts.progressAnimation
                            ? function (ani) { return _this.sbAni = ani; }
                            : undefined;
                        mode = Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["d"])(this);
                        enteringEl = enteringView.element;
                        leavingEl = leavingView && leavingView.element;
                        animationOpts = Object.assign({ mode: mode, showGoBack: this.canGoBackSync(enteringView), baseEl: this.el, animationBuilder: this.animation || opts.animationBuilder || _chunk_1074393c_js__WEBPACK_IMPORTED_MODULE_2__["b"].get('navAnimation'), progressCallback: progressCallback, animated: this.animated && _chunk_1074393c_js__WEBPACK_IMPORTED_MODULE_2__["b"].getBoolean('animated', true), enteringEl: enteringEl,
                            leavingEl: leavingEl }, opts);
                        return [4 /*yield*/, Object(_chunk_815c1888_js__WEBPACK_IMPORTED_MODULE_6__["t"])(animationOpts)];
                    case 1:
                        hasCompleted = (_a.sent()).hasCompleted;
                        return [2 /*return*/, this.transitionFinish(hasCompleted, enteringView, leavingView, opts)];
                }
            });
        });
    };
    Nav.prototype.transitionFinish = function (hasCompleted, enteringView, leavingView, opts) {
        var cleanupView = hasCompleted ? enteringView : leavingView;
        if (cleanupView) {
            this.cleanup(cleanupView);
        }
        return {
            hasCompleted: hasCompleted,
            requiresTransition: true,
            enteringView: enteringView,
            leavingView: leavingView,
            direction: opts.direction
        };
    };
    Nav.prototype.insertViewAt = function (view, index) {
        var views = this.views;
        var existingIndex = views.indexOf(view);
        if (existingIndex > -1) {
            // this view is already in the stack!!
            // move it to its new location
            Object(_chunk_d102c9d1_js__WEBPACK_IMPORTED_MODULE_4__["b"])(view.nav === this, 'view is not part of the nav');
            views.splice(index, 0, views.splice(existingIndex, 1)[0]);
        }
        else {
            Object(_chunk_d102c9d1_js__WEBPACK_IMPORTED_MODULE_4__["b"])(!view.nav, 'nav is used');
            // this is a new view to add to the stack
            // create the new entering view
            view.nav = this;
            // insert the entering view into the correct index in the stack
            views.splice(index, 0, view);
        }
    };
    Nav.prototype.removeView = function (view) {
        Object(_chunk_d102c9d1_js__WEBPACK_IMPORTED_MODULE_4__["b"])(view.state === VIEW_STATE_ATTACHED || view.state === VIEW_STATE_DESTROYED, 'view state should be loaded or destroyed');
        var views = this.views;
        var index = views.indexOf(view);
        Object(_chunk_d102c9d1_js__WEBPACK_IMPORTED_MODULE_4__["b"])(index > -1, 'view must be part of the stack');
        if (index >= 0) {
            views.splice(index, 1);
        }
    };
    Nav.prototype.destroyView = function (view) {
        view._destroy();
        this.removeView(view);
    };
    /**
     * DOM WRITE
     */
    Nav.prototype.cleanup = function (activeView) {
        // ok, cleanup time!! Destroy all of the views that are
        // INACTIVE and come after the active view
        // only do this if the views exist, though
        if (this.destroyed) {
            return;
        }
        var views = this.views;
        var activeViewIndex = views.indexOf(activeView);
        for (var i = views.length - 1; i >= 0; i--) {
            var view = views[i];
            var element = view.element;
            if (i > activeViewIndex) {
                // this view comes after the active view
                // let's unload it
                Object(_chunk_815c1888_js__WEBPACK_IMPORTED_MODULE_6__["l"])(element, _chunk_94c4865f_js__WEBPACK_IMPORTED_MODULE_3__["d"]);
                this.destroyView(view);
            }
            else if (i < activeViewIndex) {
                // this view comes before the active view
                // and it is not a portal then ensure it is hidden
                Object(_chunk_815c1888_js__WEBPACK_IMPORTED_MODULE_6__["s"])(element, true);
            }
        }
    };
    Nav.prototype.canStart = function () {
        return (!!this.swipeGesture &&
            !this.isTransitioning &&
            this.transInstr.length === 0 &&
            this.canGoBackSync());
    };
    Nav.prototype.onStart = function () {
        this.queueTrns({
            removeStart: -1,
            removeCount: 1,
            opts: {
                direction: 'back',
                progressAnimation: true
            }
        }, undefined);
    };
    Nav.prototype.onMove = function (stepValue) {
        if (this.sbAni) {
            this.sbAni.progressStep(stepValue);
        }
    };
    Nav.prototype.onEnd = function (shouldComplete, stepValue, dur) {
        if (this.sbAni) {
            this.sbAni.progressEnd(shouldComplete, stepValue, dur);
        }
    };
    Nav.prototype.render = function () {
        return (Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["h"])("slot", null));
    };
    Object.defineProperty(Nav.prototype, "el", {
        get: function () { return Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["e"])(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Nav, "watchers", {
        get: function () {
            return {
                "swipeGesture": ["swipeGestureChanged"],
                "root": ["rootChanged"]
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Nav, "style", {
        get: function () { return ":host{left:0;right:0;top:0;bottom:0;position:absolute;contain:layout size style;overflow:hidden;z-index:0}"; },
        enumerable: true,
        configurable: true
    });
    return Nav;
}());
var NavPop = /** @class */ (function () {
    function NavPop(hostRef) {
        Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["r"])(this, hostRef);
    }
    NavPop.prototype.pop = function () {
        var nav = this.el.closest('ion-nav');
        if (nav) {
            nav.pop({ skipIfBusy: true });
        }
    };
    Object.defineProperty(NavPop.prototype, "el", {
        get: function () { return Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["e"])(this); },
        enumerable: true,
        configurable: true
    });
    return NavPop;
}());
var NavPush = /** @class */ (function () {
    function NavPush(hostRef) {
        Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["r"])(this, hostRef);
    }
    NavPush.prototype.push = function () {
        var nav = this.el.closest('ion-nav');
        var toPush = this.component;
        if (nav && toPush !== undefined) {
            nav.push(toPush, this.componentProps, { skipIfBusy: true });
        }
    };
    Object.defineProperty(NavPush.prototype, "el", {
        get: function () { return Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["e"])(this); },
        enumerable: true,
        configurable: true
    });
    return NavPush;
}());
var NavSetRoot = /** @class */ (function () {
    function NavSetRoot(hostRef) {
        Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["r"])(this, hostRef);
    }
    NavSetRoot.prototype.push = function () {
        var nav = this.el.closest('ion-nav');
        var toPush = this.component;
        if (nav && toPush !== undefined) {
            nav.setRoot(toPush, this.componentProps, { skipIfBusy: true });
        }
    };
    Object.defineProperty(NavSetRoot.prototype, "el", {
        get: function () { return Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["e"])(this); },
        enumerable: true,
        configurable: true
    });
    return NavSetRoot;
}());



/***/ })

}]);
//# sourceMappingURL=55.js.map