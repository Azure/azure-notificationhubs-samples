(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

/***/ "./node_modules/@ionic/core/dist/esm/legacy/focus-visible-2e541376.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/legacy/focus-visible-2e541376.js ***!
  \****************************************************************************/
/*! exports provided: startFocusVisible */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "startFocusVisible", function() { return startFocusVisible; });
var ION_FOCUSED = 'ion-focused';
var ION_FOCUSABLE = 'ion-focusable';
var FOCUS_KEYS = ['Tab', 'ArrowDown', 'Space', 'Escape', ' ', 'Shift', 'Enter', 'ArrowLeft', 'ArrowRight', 'ArrowUp'];
function startFocusVisible() {
    var doc = document;
    var currentFocus = [];
    var keyboardMode = true;
    function setFocus(elements) {
        currentFocus.forEach(function (el) { return el.classList.remove(ION_FOCUSED); });
        elements.forEach(function (el) { return el.classList.add(ION_FOCUSED); });
        currentFocus = elements;
    }
    doc.addEventListener('keydown', function (ev) {
        keyboardMode = FOCUS_KEYS.includes(ev.key);
        if (!keyboardMode) {
            setFocus([]);
        }
    });
    var pointerDown = function () {
        keyboardMode = false;
        setFocus([]);
    };
    doc.addEventListener('focusin', function (ev) {
        if (keyboardMode && ev.composedPath) {
            var toFocus = ev.composedPath().filter(function (el) {
                if (el.classList) {
                    return el.classList.contains(ION_FOCUSABLE);
                }
                return false;
            });
            setFocus(toFocus);
        }
    });
    doc.addEventListener('focusout', function () {
        if (doc.activeElement === doc.body) {
            setFocus([]);
        }
    });
    doc.addEventListener('touchstart', pointerDown);
    doc.addEventListener('mousedown', pointerDown);
}



/***/ })

}]);
//# sourceMappingURL=3.js.map