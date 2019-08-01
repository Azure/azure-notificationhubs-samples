(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[7],{

/***/ "./node_modules/@ionic/core/dist/esm/legacy/swipe-back-8dc047dc.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/legacy/swipe-back-8dc047dc.js ***!
  \*************************************************************************/
/*! exports provided: createSwipeBackGesture */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createSwipeBackGesture", function() { return createSwipeBackGesture; });
/* harmony import */ var _chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chunk-f257aad1.js */ "./node_modules/@ionic/core/dist/esm/legacy/chunk-f257aad1.js");
/* harmony import */ var _chunk_1074393c_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chunk-1074393c.js */ "./node_modules/@ionic/core/dist/esm/legacy/chunk-1074393c.js");
/* harmony import */ var _index_0303391f_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index-0303391f.js */ "./node_modules/@ionic/core/dist/esm/legacy/index-0303391f.js");



function createSwipeBackGesture(el, canStartHandler, onStartHandler, onMoveHandler, onEndHandler) {
    var win = el.ownerDocument.defaultView;
    function canStart(detail) {
        return detail.startX <= 50 && canStartHandler();
    }
    function onMove(detail) {
        // set the transition animation's progress
        var delta = detail.deltaX;
        var stepValue = delta / win.innerWidth;
        onMoveHandler(stepValue);
    }
    function onEnd(detail) {
        // the swipe back gesture has ended
        var delta = detail.deltaX;
        var width = win.innerWidth;
        var stepValue = delta / width;
        var velocity = detail.velocityX;
        var z = width / 2.0;
        var shouldComplete = velocity >= 0 && (velocity > 0.2 || detail.deltaX > z);
        var missing = shouldComplete ? 1 - stepValue : stepValue;
        var missingDistance = missing * width;
        var realDur = 0;
        if (missingDistance > 5) {
            var dur = missingDistance / Math.abs(velocity);
            realDur = Math.min(dur, 300);
        }
        onEndHandler(shouldComplete, stepValue, realDur);
    }
    return Object(_index_0303391f_js__WEBPACK_IMPORTED_MODULE_2__["createGesture"])({
        el: el,
        gestureName: 'goback-swipe',
        gesturePriority: 40,
        threshold: 10,
        canStart: canStart,
        onStart: onStartHandler,
        onMove: onMove,
        onEnd: onEnd
    });
}



/***/ })

}]);
//# sourceMappingURL=7.js.map