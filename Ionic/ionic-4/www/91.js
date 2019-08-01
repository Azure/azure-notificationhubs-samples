(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[91],{

/***/ "./node_modules/@ionic/core/dist/esm/legacy/md.transition-9c1a17b7.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/legacy/md.transition-9c1a17b7.js ***!
  \****************************************************************************/
/*! exports provided: mdTransitionAnimation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mdTransitionAnimation", function() { return mdTransitionAnimation; });
var TRANSLATEY = 'translateY';
var OFF_BOTTOM = '40px';
var CENTER = '0px';
function mdTransitionAnimation(AnimationC, _, opts) {
    var enteringEl = opts.enteringEl;
    var leavingEl = opts.leavingEl;
    var ionPageElement = getIonPageElement(enteringEl);
    var rootTransition = new AnimationC();
    rootTransition
        .addElement(ionPageElement)
        .beforeRemoveClass('ion-page-invisible');
    var backDirection = (opts.direction === 'back');
    // animate the component itself
    if (backDirection) {
        rootTransition
            .duration(opts.duration || 200)
            .easing('cubic-bezier(0.47,0,0.745,0.715)');
    }
    else {
        rootTransition
            .duration(opts.duration || 280)
            .easing('cubic-bezier(0.36,0.66,0.04,1)')
            .fromTo(TRANSLATEY, OFF_BOTTOM, CENTER, true)
            .fromTo('opacity', 0.01, 1, true);
    }
    // Animate toolbar if it's there
    var enteringToolbarEle = ionPageElement.querySelector('ion-toolbar');
    if (enteringToolbarEle) {
        var enteringToolBar = new AnimationC();
        enteringToolBar.addElement(enteringToolbarEle);
        rootTransition.add(enteringToolBar);
    }
    // setup leaving view
    if (leavingEl && backDirection) {
        // leaving content
        rootTransition
            .duration(opts.duration || 200)
            .easing('cubic-bezier(0.47,0,0.745,0.715)');
        var leavingPage = new AnimationC();
        leavingPage
            .addElement(getIonPageElement(leavingEl))
            .fromTo(TRANSLATEY, CENTER, OFF_BOTTOM)
            .fromTo('opacity', 1, 0);
        rootTransition.add(leavingPage);
    }
    return Promise.resolve(rootTransition);
}
function getIonPageElement(element) {
    if (element.classList.contains('ion-page')) {
        return element;
    }
    var ionPage = element.querySelector(':scope > .ion-page, :scope > ion-nav, :scope > ion-tabs');
    if (ionPage) {
        return ionPage;
    }
    // idk, return the original element so at least something animates and we don't have a null pointer
    return element;
}



/***/ })

}]);
//# sourceMappingURL=91.js.map