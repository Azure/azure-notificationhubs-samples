(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

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

/***/ "./node_modules/@ionic/core/dist/esm/legacy/chunk-815c1888.js":
/*!********************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/legacy/chunk-815c1888.js ***!
  \********************************************************************/
/*! exports provided: d, l, s, t */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return deepReady; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return lifecycle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s", function() { return setPageHidden; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "t", function() { return transition; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chunk-f257aad1.js */ "./node_modules/@ionic/core/dist/esm/legacy/chunk-f257aad1.js");
/* harmony import */ var _chunk_94c4865f_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./chunk-94c4865f.js */ "./node_modules/@ionic/core/dist/esm/legacy/chunk-94c4865f.js");



var iosTransitionAnimation = function () { return __webpack_require__.e(/*! import() */ 90).then(__webpack_require__.bind(null, /*! ./ios.transition-080db2c2.js */ "./node_modules/@ionic/core/dist/esm/legacy/ios.transition-080db2c2.js")); };
var mdTransitionAnimation = function () { return __webpack_require__.e(/*! import() */ 91).then(__webpack_require__.bind(null, /*! ./md.transition-9c1a17b7.js */ "./node_modules/@ionic/core/dist/esm/legacy/md.transition-9c1a17b7.js")); };
function transition(opts) {
    return new Promise(function (resolve, reject) {
        Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["w"])(function () {
            beforeTransition(opts);
            runTransition(opts).then(function (result) {
                if (result.animation) {
                    result.animation.destroy();
                }
                afterTransition(opts);
                resolve(result);
            }, function (error) {
                afterTransition(opts);
                reject(error);
            });
        });
    });
}
function beforeTransition(opts) {
    var enteringEl = opts.enteringEl;
    var leavingEl = opts.leavingEl;
    setZIndex(enteringEl, leavingEl, opts.direction);
    if (opts.showGoBack) {
        enteringEl.classList.add('can-go-back');
    }
    else {
        enteringEl.classList.remove('can-go-back');
    }
    setPageHidden(enteringEl, false);
    if (leavingEl) {
        setPageHidden(leavingEl, false);
    }
}
function runTransition(opts) {
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
        var animationBuilder, ani;
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getAnimationBuilder(opts)];
                case 1:
                    animationBuilder = _a.sent();
                    ani = (animationBuilder)
                        ? animation(animationBuilder, opts)
                        : noAnimation(opts);
                    return [2 /*return*/, ani];
            }
        });
    });
}
function afterTransition(opts) {
    var enteringEl = opts.enteringEl;
    var leavingEl = opts.leavingEl;
    enteringEl.classList.remove('ion-page-invisible');
    if (leavingEl !== undefined) {
        leavingEl.classList.remove('ion-page-invisible');
    }
}
function getAnimationBuilder(opts) {
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
        var builder, _a;
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!opts.leavingEl || !opts.animated || opts.duration === 0) {
                        return [2 /*return*/, undefined];
                    }
                    if (opts.animationBuilder) {
                        return [2 /*return*/, opts.animationBuilder];
                    }
                    if (!(opts.mode === 'ios')) return [3 /*break*/, 2];
                    return [4 /*yield*/, iosTransitionAnimation()];
                case 1:
                    _a = (_b.sent()).iosTransitionAnimation;
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, mdTransitionAnimation()];
                case 3:
                    _a = (_b.sent()).mdTransitionAnimation;
                    _b.label = 4;
                case 4:
                    builder = _a;
                    return [2 /*return*/, builder];
            }
        });
    });
}
function animation(animationBuilder, opts) {
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
        var trans;
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, waitForReady(opts, true)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, __webpack_require__.e(/*! import() */ 2).then(__webpack_require__.bind(null, /*! ./index-8ec7f6e0.js */ "./node_modules/@ionic/core/dist/esm/legacy/index-8ec7f6e0.js")).then(function (mod) { return mod.create(animationBuilder, opts.baseEl, opts); })];
                case 2:
                    trans = _a.sent();
                    fireWillEvents(opts.enteringEl, opts.leavingEl);
                    return [4 /*yield*/, playTransition(trans, opts)];
                case 3:
                    _a.sent();
                    if (opts.progressCallback) {
                        opts.progressCallback(undefined);
                    }
                    if (trans.hasCompleted) {
                        fireDidEvents(opts.enteringEl, opts.leavingEl);
                    }
                    return [2 /*return*/, {
                            hasCompleted: trans.hasCompleted,
                            animation: trans
                        }];
            }
        });
    });
}
function noAnimation(opts) {
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
        var enteringEl, leavingEl;
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
            switch (_a.label) {
                case 0:
                    enteringEl = opts.enteringEl;
                    leavingEl = opts.leavingEl;
                    return [4 /*yield*/, waitForReady(opts, false)];
                case 1:
                    _a.sent();
                    fireWillEvents(enteringEl, leavingEl);
                    fireDidEvents(enteringEl, leavingEl);
                    return [2 /*return*/, {
                            hasCompleted: true
                        }];
            }
        });
    });
}
function waitForReady(opts, defaultDeep) {
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
        var deep, promises;
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
            switch (_a.label) {
                case 0:
                    deep = opts.deepWait !== undefined ? opts.deepWait : defaultDeep;
                    promises = deep ? [
                        deepReady(opts.enteringEl),
                        deepReady(opts.leavingEl),
                    ] : [
                        shallowReady(opts.enteringEl),
                        shallowReady(opts.leavingEl),
                    ];
                    return [4 /*yield*/, Promise.all(promises)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, notifyViewReady(opts.viewIsReady, opts.enteringEl)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function notifyViewReady(viewIsReady, enteringEl) {
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!viewIsReady) return [3 /*break*/, 2];
                    return [4 /*yield*/, viewIsReady(enteringEl)];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    });
}
function playTransition(trans, opts) {
    var progressCallback = opts.progressCallback;
    var promise = new Promise(function (resolve) { return trans.onFinish(resolve); });
    // cool, let's do this, start the transition
    if (progressCallback) {
        // this is a swipe to go back, just get the transition progress ready
        // kick off the swipe animation start
        trans.progressStart();
        progressCallback(trans);
    }
    else {
        // only the top level transition should actually start "play"
        // kick it off and let it play through
        // ******** DOM WRITE ****************
        trans.play();
    }
    // create a callback for when the animation is done
    return promise;
}
function fireWillEvents(enteringEl, leavingEl) {
    lifecycle(leavingEl, _chunk_94c4865f_js__WEBPACK_IMPORTED_MODULE_2__["b"]);
    lifecycle(enteringEl, _chunk_94c4865f_js__WEBPACK_IMPORTED_MODULE_2__["L"]);
}
function fireDidEvents(enteringEl, leavingEl) {
    lifecycle(enteringEl, _chunk_94c4865f_js__WEBPACK_IMPORTED_MODULE_2__["a"]);
    lifecycle(leavingEl, _chunk_94c4865f_js__WEBPACK_IMPORTED_MODULE_2__["c"]);
}
function lifecycle(el, eventName) {
    if (el) {
        var ev = new CustomEvent(eventName, {
            bubbles: false,
            cancelable: false,
        });
        el.dispatchEvent(ev);
    }
}
function shallowReady(el) {
    if (el && el.componentOnReady) {
        return el.componentOnReady();
    }
    return Promise.resolve();
}
function deepReady(el) {
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
        var element, stencilEl;
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
            switch (_a.label) {
                case 0:
                    element = el;
                    if (!element) return [3 /*break*/, 4];
                    if (!(element.componentOnReady != null)) return [3 /*break*/, 2];
                    return [4 /*yield*/, element.componentOnReady()];
                case 1:
                    stencilEl = _a.sent();
                    if (stencilEl != null) {
                        return [2 /*return*/];
                    }
                    _a.label = 2;
                case 2: return [4 /*yield*/, Promise.all(Array.from(element.children).map(deepReady))];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
function setPageHidden(el, hidden) {
    if (hidden) {
        el.setAttribute('aria-hidden', 'true');
        el.classList.add('ion-page-hidden');
    }
    else {
        el.hidden = false;
        el.removeAttribute('aria-hidden');
        el.classList.remove('ion-page-hidden');
    }
}
function setZIndex(enteringEl, leavingEl, direction) {
    if (enteringEl !== undefined) {
        enteringEl.style.zIndex = (direction === 'back')
            ? '99'
            : '101';
    }
    if (leavingEl !== undefined) {
        leavingEl.style.zIndex = '100';
    }
}



/***/ })

}]);
//# sourceMappingURL=1.js.map