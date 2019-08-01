(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[5],{

/***/ "./node_modules/@ionic/core/dist/esm/legacy/input-shims-667d45fc.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/legacy/input-shims-667d45fc.js ***!
  \**************************************************************************/
/*! exports provided: startInputShims */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "startInputShims", function() { return startInputShims; });
/* harmony import */ var _chunk_d102c9d1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chunk-d102c9d1.js */ "./node_modules/@ionic/core/dist/esm/legacy/chunk-d102c9d1.js");

var cloneMap = new WeakMap();
function relocateInput(componentEl, inputEl, shouldRelocate, inputRelativeY) {
    if (inputRelativeY === void 0) { inputRelativeY = 0; }
    if (cloneMap.has(componentEl) === shouldRelocate) {
        return;
    }
    if (shouldRelocate) {
        addClone(componentEl, inputEl, inputRelativeY);
    }
    else {
        removeClone(componentEl, inputEl);
    }
}
function isFocused(input) {
    return input === input.getRootNode().activeElement;
}
function addClone(componentEl, inputEl, inputRelativeY) {
    // this allows for the actual input to receive the focus from
    // the user's touch event, but before it receives focus, it
    // moves the actual input to a location that will not screw
    // up the app's layout, and does not allow the native browser
    // to attempt to scroll the input into place (messing up headers/footers)
    // the cloned input fills the area of where native input should be
    // while the native input fakes out the browser by relocating itself
    // before it receives the actual focus event
    // We hide the focused input (with the visible caret) invisible by making it scale(0),
    var parentEl = inputEl.parentNode;
    // DOM WRITES
    var clonedEl = inputEl.cloneNode(false);
    clonedEl.classList.add('cloned-input');
    clonedEl.tabIndex = -1;
    parentEl.appendChild(clonedEl);
    cloneMap.set(componentEl, clonedEl);
    var doc = componentEl.ownerDocument;
    var tx = doc.dir === 'rtl' ? 9999 : -9999;
    componentEl.style.pointerEvents = 'none';
    inputEl.style.transform = "translate3d(" + tx + "px," + inputRelativeY + "px,0) scale(0)";
}
function removeClone(componentEl, inputEl) {
    var clone = cloneMap.get(componentEl);
    if (clone) {
        cloneMap.delete(componentEl);
        clone.remove();
    }
    componentEl.style.pointerEvents = '';
    inputEl.style.transform = '';
}
function enableHideCaretOnScroll(componentEl, inputEl, scrollEl) {
    if (!scrollEl || !inputEl) {
        return function () { return; };
    }
    var scrollHideCaret = function (shouldHideCaret) {
        if (isFocused(inputEl)) {
            relocateInput(componentEl, inputEl, shouldHideCaret);
        }
    };
    var onBlur = function () { return relocateInput(componentEl, inputEl, false); };
    var hideCaret = function () { return scrollHideCaret(true); };
    var showCaret = function () { return scrollHideCaret(false); };
    scrollEl.addEventListener('ionScrollStart', hideCaret);
    scrollEl.addEventListener('ionScrollEnd', showCaret);
    inputEl.addEventListener('blur', onBlur);
    return function () {
        scrollEl.removeEventListener('ionScrollStart', hideCaret);
        scrollEl.removeEventListener('ionScrollEnd', showCaret);
        inputEl.addEventListener('ionBlur', onBlur);
    };
}
var SKIP_SELECTOR = 'input, textarea, [no-blur]';
function enableInputBlurring() {
    var doc = document;
    var focused = true;
    var didScroll = false;
    function onScroll() {
        didScroll = true;
    }
    function onFocusin() {
        focused = true;
    }
    function onTouchend(ev) {
        // if app did scroll return early
        if (didScroll) {
            didScroll = false;
            return;
        }
        var active = doc.activeElement;
        if (!active) {
            return;
        }
        // only blur if the active element is a text-input or a textarea
        if (active.matches(SKIP_SELECTOR)) {
            return;
        }
        // if the selected target is the active element, do not blur
        var tapped = ev.target;
        if (tapped === active) {
            return;
        }
        if (tapped.matches(SKIP_SELECTOR) || tapped.closest(SKIP_SELECTOR)) {
            return;
        }
        focused = false;
        // TODO: find a better way, why 50ms?
        setTimeout(function () {
            if (!focused) {
                active.blur();
            }
        }, 50);
    }
    doc.addEventListener('ionScrollStart', onScroll);
    doc.addEventListener('focusin', onFocusin, true);
    doc.addEventListener('touchend', onTouchend, false);
    return function () {
        doc.removeEventListener('ionScrollStart', onScroll, true);
        doc.removeEventListener('focusin', onFocusin, true);
        doc.removeEventListener('touchend', onTouchend, false);
    };
}
var SCROLL_ASSIST_SPEED = 0.3;
function getScrollData(componentEl, contentEl, keyboardHeight) {
    var itemEl = componentEl.closest('ion-item,[ion-item]') || componentEl;
    return calcScrollData(itemEl.getBoundingClientRect(), contentEl.getBoundingClientRect(), keyboardHeight, componentEl.ownerDocument.defaultView.innerHeight);
}
function calcScrollData(inputRect, contentRect, keyboardHeight, platformHeight) {
    // compute input's Y values relative to the body
    var inputTop = inputRect.top;
    var inputBottom = inputRect.bottom;
    // compute visible area
    var visibleAreaTop = contentRect.top;
    var visibleAreaBottom = Math.min(contentRect.bottom, platformHeight - keyboardHeight);
    // compute safe area
    var safeAreaTop = visibleAreaTop + 15;
    var safeAreaBottom = visibleAreaBottom * 0.5;
    // figure out if each edge of the input is within the safe area
    var distanceToBottom = safeAreaBottom - inputBottom;
    var distanceToTop = safeAreaTop - inputTop;
    // desiredScrollAmount is the negated distance to the safe area according to our calculations.
    var desiredScrollAmount = Math.round((distanceToBottom < 0)
        ? -distanceToBottom
        : (distanceToTop > 0)
            ? -distanceToTop
            : 0);
    // our calculations make some assumptions that aren't always true, like the keyboard being closed when an input
    // gets focus, so make sure we don't scroll the input above the visible area
    var scrollAmount = Math.min(desiredScrollAmount, inputTop - visibleAreaTop);
    var distance = Math.abs(scrollAmount);
    var duration = distance / SCROLL_ASSIST_SPEED;
    var scrollDuration = Math.min(400, Math.max(150, duration));
    return {
        scrollAmount: scrollAmount,
        scrollDuration: scrollDuration,
        scrollPadding: keyboardHeight,
        inputSafeY: -(inputTop - safeAreaTop) + 4
    };
}
function enableScrollAssist(componentEl, inputEl, contentEl, keyboardHeight) {
    var coord;
    var touchStart = function (ev) {
        coord = Object(_chunk_d102c9d1_js__WEBPACK_IMPORTED_MODULE_0__["p"])(ev);
    };
    var touchEnd = function (ev) {
        // input cover touchend/mouseup
        if (!coord) {
            return;
        }
        // get where the touchend/mouseup ended
        var endCoord = Object(_chunk_d102c9d1_js__WEBPACK_IMPORTED_MODULE_0__["p"])(ev);
        // focus this input if the pointer hasn't moved XX pixels
        // and the input doesn't already have focus
        if (!hasPointerMoved(6, coord, endCoord) && !isFocused(inputEl)) {
            ev.preventDefault();
            ev.stopPropagation();
            // begin the input focus process
            jsSetFocus(componentEl, inputEl, contentEl, keyboardHeight);
        }
    };
    componentEl.addEventListener('touchstart', touchStart, true);
    componentEl.addEventListener('touchend', touchEnd, true);
    return function () {
        componentEl.removeEventListener('touchstart', touchStart, true);
        componentEl.removeEventListener('touchend', touchEnd, true);
    };
}
function jsSetFocus(componentEl, inputEl, contentEl, keyboardHeight) {
    var scrollData = getScrollData(componentEl, contentEl, keyboardHeight);
    if (Math.abs(scrollData.scrollAmount) < 4) {
        // the text input is in a safe position that doesn't
        // require it to be scrolled into view, just set focus now
        inputEl.focus();
        return;
    }
    // temporarily move the focus to the focus holder so the browser
    // doesn't freak out while it's trying to get the input in place
    // at this point the native text input still does not have focus
    relocateInput(componentEl, inputEl, true, scrollData.inputSafeY);
    inputEl.focus();
    // scroll the input into place
    contentEl.scrollByPoint(0, scrollData.scrollAmount, scrollData.scrollDuration).then(function () {
        // the scroll view is in the correct position now
        // give the native text input focus
        relocateInput(componentEl, inputEl, false, scrollData.inputSafeY);
        // ensure this is the focused input
        inputEl.focus();
    });
}
function hasPointerMoved(threshold, startCoord, endCoord) {
    if (startCoord && endCoord) {
        var deltaX = (startCoord.x - endCoord.x);
        var deltaY = (startCoord.y - endCoord.y);
        var distance = deltaX * deltaX + deltaY * deltaY;
        return distance > (threshold * threshold);
    }
    return false;
}
var PADDING_TIMER_KEY = '$ionPaddingTimer';
function enableScrollPadding(keyboardHeight) {
    var doc = document;
    function onFocusin(ev) {
        setScrollPadding(ev.target, keyboardHeight);
    }
    function onFocusout(ev) {
        setScrollPadding(ev.target, 0);
    }
    doc.addEventListener('focusin', onFocusin);
    doc.addEventListener('focusout', onFocusout);
    return function () {
        doc.removeEventListener('focusin', onFocusin);
        doc.removeEventListener('focusout', onFocusout);
    };
}
function setScrollPadding(input, keyboardHeight) {
    if (input.tagName !== 'INPUT') {
        return;
    }
    if (input.parentElement && input.parentElement.tagName === 'ION-INPUT') {
        return;
    }
    if (input.parentElement &&
        input.parentElement.parentElement &&
        input.parentElement.parentElement.tagName === 'ION-SEARCHBAR') {
        return;
    }
    var el = input.closest('ion-content');
    if (el === null) {
        return;
    }
    var timer = el[PADDING_TIMER_KEY];
    if (timer) {
        clearTimeout(timer);
    }
    if (keyboardHeight > 0) {
        el.style.setProperty('--keyboard-offset', keyboardHeight + "px");
    }
    else {
        el[PADDING_TIMER_KEY] = setTimeout(function () {
            el.style.setProperty('--keyboard-offset', '0px');
        }, 120);
    }
}
var INPUT_BLURRING = true;
var SCROLL_PADDING = true;
function startInputShims(config) {
    var doc = document;
    var keyboardHeight = config.getNumber('keyboardHeight', 290);
    var scrollAssist = config.getBoolean('scrollAssist', true);
    var hideCaret = config.getBoolean('hideCaretOnScroll', true);
    var inputBlurring = config.getBoolean('inputBlurring', true);
    var scrollPadding = config.getBoolean('scrollPadding', true);
    var hideCaretMap = new WeakMap();
    var scrollAssistMap = new WeakMap();
    function registerInput(componentEl) {
        var inputEl = (componentEl.shadowRoot || componentEl).querySelector('input') || (componentEl.shadowRoot || componentEl).querySelector('textarea');
        var scrollEl = componentEl.closest('ion-content');
        if (!inputEl) {
            return;
        }
        if (!!scrollEl && hideCaret && !hideCaretMap.has(componentEl)) {
            var rmFn = enableHideCaretOnScroll(componentEl, inputEl, scrollEl);
            hideCaretMap.set(componentEl, rmFn);
        }
        if (!!scrollEl && scrollAssist && !scrollAssistMap.has(componentEl)) {
            var rmFn = enableScrollAssist(componentEl, inputEl, scrollEl, keyboardHeight);
            scrollAssistMap.set(componentEl, rmFn);
        }
    }
    function unregisterInput(componentEl) {
        if (hideCaret) {
            var fn = hideCaretMap.get(componentEl);
            if (fn) {
                fn();
            }
            hideCaretMap.delete(componentEl);
        }
        if (scrollAssist) {
            var fn = scrollAssistMap.get(componentEl);
            if (fn) {
                fn();
            }
            scrollAssistMap.delete(componentEl);
        }
    }
    if (inputBlurring && INPUT_BLURRING) {
        enableInputBlurring();
    }
    if (scrollPadding && SCROLL_PADDING) {
        enableScrollPadding(keyboardHeight);
    }
    // Input might be already loaded in the DOM before ion-device-hacks did.
    // At this point we need to look for all of the inputs not registered yet
    // and register them.
    var inputs = Array.from(doc.querySelectorAll('ion-input, ion-textarea'));
    for (var _i = 0, inputs_1 = inputs; _i < inputs_1.length; _i++) {
        var input = inputs_1[_i];
        registerInput(input);
    }
    doc.body.addEventListener('ionInputDidLoad', function (event) {
        registerInput(event.target);
    });
    doc.body.addEventListener('ionInputDidUnload', function (event) {
        unregisterInput(event.target);
    });
}



/***/ })

}]);
//# sourceMappingURL=5.js.map