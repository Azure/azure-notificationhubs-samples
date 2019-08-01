(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[6],{

/***/ "./node_modules/@ionic/core/dist/esm/legacy/status-tap-fcd5899f.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/legacy/status-tap-fcd5899f.js ***!
  \*************************************************************************/
/*! exports provided: startStatusTap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "startStatusTap", function() { return startStatusTap; });
/* harmony import */ var _chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chunk-f257aad1.js */ "./node_modules/@ionic/core/dist/esm/legacy/chunk-f257aad1.js");
/* harmony import */ var _chunk_1074393c_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chunk-1074393c.js */ "./node_modules/@ionic/core/dist/esm/legacy/chunk-1074393c.js");


function startStatusTap() {
    var win = window;
    win.addEventListener('statusTap', function () {
        Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_0__["f"])(function () {
            var width = win.innerWidth;
            var height = win.innerHeight;
            var el = document.elementFromPoint(width / 2, height / 2);
            if (!el) {
                return;
            }
            var contentEl = el.closest('ion-content');
            if (contentEl) {
                contentEl.componentOnReady().then(function () {
                    Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_0__["w"])(function () { return contentEl.scrollToTop(300); });
                });
            }
        });
    });
}



/***/ })

}]);
//# sourceMappingURL=6.js.map