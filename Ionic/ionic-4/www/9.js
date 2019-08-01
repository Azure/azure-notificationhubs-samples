(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[9],{

/***/ "./node_modules/@ionic/core/dist/esm/legacy/tap-click-0b550e56.js":
/*!************************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/legacy/tap-click-0b550e56.js ***!
  \************************************************************************/
/*! exports provided: startTapClick */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "startTapClick", function() { return startTapClick; });
/* harmony import */ var _chunk_d102c9d1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chunk-d102c9d1.js */ "./node_modules/@ionic/core/dist/esm/legacy/chunk-d102c9d1.js");

function startTapClick(config) {
    var lastTouch = -MOUSE_WAIT * 10;
    var lastActivated = 0;
    var scrollingEl;
    var activatableEle;
    var activeRipple;
    var activeDefer;
    var useRippleEffect = config.getBoolean('animated', true) && config.getBoolean('rippleEffect', true);
    var clearDefers = new WeakMap();
    function isScrolling() {
        return scrollingEl !== undefined && scrollingEl.parentElement !== null;
    }
    // Touch Events
    function onTouchStart(ev) {
        lastTouch = Object(_chunk_d102c9d1_js__WEBPACK_IMPORTED_MODULE_0__["n"])(ev);
        pointerDown(ev);
    }
    function onTouchEnd(ev) {
        lastTouch = Object(_chunk_d102c9d1_js__WEBPACK_IMPORTED_MODULE_0__["n"])(ev);
        pointerUp(ev);
    }
    function onMouseDown(ev) {
        var t = Object(_chunk_d102c9d1_js__WEBPACK_IMPORTED_MODULE_0__["n"])(ev) - MOUSE_WAIT;
        if (lastTouch < t) {
            pointerDown(ev);
        }
    }
    function onMouseUp(ev) {
        var t = Object(_chunk_d102c9d1_js__WEBPACK_IMPORTED_MODULE_0__["n"])(ev) - MOUSE_WAIT;
        if (lastTouch < t) {
            pointerUp(ev);
        }
    }
    function cancelActive() {
        clearTimeout(activeDefer);
        activeDefer = undefined;
        if (activatableEle) {
            removeActivated(false);
            activatableEle = undefined;
        }
    }
    function pointerDown(ev) {
        if (activatableEle || isScrolling()) {
            return;
        }
        scrollingEl = undefined;
        setActivatedElement(getActivatableTarget(ev), ev);
    }
    function pointerUp(ev) {
        setActivatedElement(undefined, ev);
    }
    function setActivatedElement(el, ev) {
        // do nothing
        if (el && el === activatableEle) {
            return;
        }
        clearTimeout(activeDefer);
        activeDefer = undefined;
        var _a = Object(_chunk_d102c9d1_js__WEBPACK_IMPORTED_MODULE_0__["p"])(ev), x = _a.x, y = _a.y;
        // deactivate selected
        if (activatableEle) {
            if (clearDefers.has(activatableEle)) {
                throw new Error('internal error');
            }
            if (!activatableEle.classList.contains(ACTIVATED)) {
                addActivated(activatableEle, x, y);
            }
            removeActivated(true);
        }
        // activate
        if (el) {
            var deferId = clearDefers.get(el);
            if (deferId) {
                clearTimeout(deferId);
                clearDefers.delete(el);
            }
            var delay = isInstant(el) ? 0 : ADD_ACTIVATED_DEFERS;
            el.classList.remove(ACTIVATED);
            activeDefer = setTimeout(function () {
                addActivated(el, x, y);
                activeDefer = undefined;
            }, delay);
        }
        activatableEle = el;
    }
    function addActivated(el, x, y) {
        lastActivated = Date.now();
        el.classList.add(ACTIVATED);
        var rippleEffect = useRippleEffect && getRippleEffect(el);
        if (rippleEffect && rippleEffect.addRipple) {
            activeRipple = rippleEffect.addRipple(x, y);
        }
    }
    function removeActivated(smooth) {
        if (activeRipple !== undefined) {
            activeRipple.then(function (remove) { return remove(); });
        }
        var active = activatableEle;
        if (!active) {
            return;
        }
        var time = CLEAR_STATE_DEFERS - Date.now() + lastActivated;
        if (smooth && time > 0 && !isInstant(active)) {
            var deferId = setTimeout(function () {
                active.classList.remove(ACTIVATED);
                clearDefers.delete(active);
            }, CLEAR_STATE_DEFERS);
            clearDefers.set(active, deferId);
        }
        else {
            active.classList.remove(ACTIVATED);
        }
    }
    var doc = document;
    doc.addEventListener('ionScrollStart', function (ev) {
        scrollingEl = ev.target;
        cancelActive();
    });
    doc.addEventListener('ionScrollEnd', function () {
        scrollingEl = undefined;
    });
    doc.addEventListener('ionGestureCaptured', cancelActive);
    doc.addEventListener('touchstart', onTouchStart, true);
    doc.addEventListener('touchcancel', onTouchEnd, true);
    doc.addEventListener('touchend', onTouchEnd, true);
    doc.addEventListener('mousedown', onMouseDown, true);
    doc.addEventListener('mouseup', onMouseUp, true);
}
function getActivatableTarget(ev) {
    if (ev.composedPath) {
        var path = ev.composedPath();
        for (var i = 0; i < path.length - 2; i++) {
            var el = path[i];
            if (el.classList && el.classList.contains('ion-activatable')) {
                return el;
            }
        }
    }
    else {
        return ev.target.closest('.ion-activatable');
    }
}
function isInstant(el) {
    return el.classList.contains('ion-activatable-instant');
}
function getRippleEffect(el) {
    if (el.shadowRoot) {
        var ripple = el.shadowRoot.querySelector('ion-ripple-effect');
        if (ripple) {
            return ripple;
        }
    }
    return el.querySelector('ion-ripple-effect');
}
var ACTIVATED = 'activated';
var ADD_ACTIVATED_DEFERS = 200;
var CLEAR_STATE_DEFERS = 200;
var MOUSE_WAIT = 2500;



/***/ })

}]);
//# sourceMappingURL=9.js.map