(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ "./node_modules/@ionic/core/dist/esm/legacy/index-8ec7f6e0.js":
/*!********************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/legacy/index-8ec7f6e0.js ***!
  \********************************************************************/
/*! exports provided: create */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
function transitionEnd(el, callback) {
    var unRegTrans;
    var opts = { passive: true };
    function unregister() {
        if (unRegTrans) {
            unRegTrans();
        }
    }
    function onTransitionEnd(ev) {
        if (el === ev.target) {
            unregister();
            callback(ev);
        }
    }
    if (el) {
        el.addEventListener('webkitTransitionEnd', onTransitionEnd, opts);
        el.addEventListener('transitionend', onTransitionEnd, opts);
        unRegTrans = function () {
            el.removeEventListener('webkitTransitionEnd', onTransitionEnd, opts);
            el.removeEventListener('transitionend', onTransitionEnd, opts);
        };
    }
    return unregister;
}
var CSS_VALUE_REGEX = /(^-?\d*\.?\d*)(.*)/;
var DURATION_MIN = 32;
var TRANSITION_END_FALLBACK_PADDING_MS = 400;
var TRANSFORM_PROPS = {
    'translateX': 1,
    'translateY': 1,
    'translateZ': 1,
    'scale': 1,
    'scaleX': 1,
    'scaleY': 1,
    'scaleZ': 1,
    'rotate': 1,
    'rotateX': 1,
    'rotateY': 1,
    'rotateZ': 1,
    'skewX': 1,
    'skewY': 1,
    'perspective': 1
};
var win = typeof window !== 'undefined' ? window : {};
var raf = win.requestAnimationFrame
    ? win.requestAnimationFrame.bind(win)
    : function (f) { return f(Date.now()); };
var Animator = /** @class */ (function () {
    function Animator() {
        this._hasDur = false;
        this._hasTweenEffect = false;
        this._isAsync = false;
        this._isReverse = false;
        this._destroyed = false;
        this.hasChildren = false;
        this.isPlaying = false;
        this.hasCompleted = false;
    }
    Animator.prototype.addElement = function (el) {
        if (el != null) {
            if (el.length > 0) {
                for (var i = 0; i < el.length; i++) {
                    this._addEl(el[i]);
                }
            }
            else {
                this._addEl(el);
            }
        }
        return this;
    };
    /**
     * NO DOM
     */
    Animator.prototype._addEl = function (el) {
        if (el.nodeType === 1) {
            (this._elements = this._elements || []).push(el);
        }
    };
    /**
     * Add a child animation to this animation.
     */
    Animator.prototype.add = function (childAnimation) {
        childAnimation.parent = this;
        this.hasChildren = true;
        (this._childAnimations = this._childAnimations || []).push(childAnimation);
        return this;
    };
    /**
     * Get the duration of this animation. If this animation does
     * not have a duration, then it'll get the duration from its parent.
     */
    Animator.prototype.getDuration = function (opts) {
        if (opts && opts.duration !== undefined) {
            return opts.duration;
        }
        else if (this._duration !== undefined) {
            return this._duration;
        }
        else if (this.parent) {
            return this.parent.getDuration();
        }
        return 0;
    };
    /**
     * Returns if the animation is a root one.
     */
    Animator.prototype.isRoot = function () {
        return !this.parent;
    };
    /**
     * Set the duration for this animation.
     */
    Animator.prototype.duration = function (milliseconds) {
        this._duration = milliseconds;
        return this;
    };
    /**
     * Get the easing of this animation. If this animation does
     * not have an easing, then it'll get the easing from its parent.
     */
    Animator.prototype.getEasing = function () {
        if (this._isReverse && this._reversedEasingName !== undefined) {
            return this._reversedEasingName;
        }
        return this._easingName !== undefined ? this._easingName : (this.parent && this.parent.getEasing()) || null;
    };
    /**
     * Set the easing for this animation.
     */
    Animator.prototype.easing = function (name) {
        this._easingName = name;
        return this;
    };
    /**
     * Set the easing for this reversed animation.
     */
    Animator.prototype.easingReverse = function (name) {
        this._reversedEasingName = name;
        return this;
    };
    /**
     * Add the "from" value for a specific property.
     */
    Animator.prototype.from = function (prop, val) {
        this._addProp('from', prop, val);
        return this;
    };
    /**
     * Add the "to" value for a specific property.
     */
    Animator.prototype.to = function (prop, val, clearProperyAfterTransition) {
        if (clearProperyAfterTransition === void 0) { clearProperyAfterTransition = false; }
        var fx = this._addProp('to', prop, val);
        if (clearProperyAfterTransition) {
            // if this effect is a transform then clear the transform effect
            // otherwise just clear the actual property
            this.afterClearStyles(fx.trans ? ['transform', '-webkit-transform'] : [prop]);
        }
        return this;
    };
    /**
     * Shortcut to add both the "from" and "to" for the same property.
     */
    Animator.prototype.fromTo = function (prop, fromVal, toVal, clearProperyAfterTransition) {
        return this.from(prop, fromVal).to(prop, toVal, clearProperyAfterTransition);
    };
    /**
     * NO DOM
     */
    Animator.prototype._getProp = function (name) {
        if (this._fxProperties) {
            return this._fxProperties.find(function (prop) { return prop.effectName === name; });
        }
        return undefined;
    };
    Animator.prototype._addProp = function (state, prop, val) {
        var fxProp = this._getProp(prop);
        if (!fxProp) {
            // first time we've see this EffectProperty
            var shouldTrans = (TRANSFORM_PROPS[prop] === 1);
            fxProp = {
                effectName: prop,
                trans: shouldTrans,
                // add the will-change property for transforms or opacity
                wc: (shouldTrans ? 'transform' : prop)
            };
            (this._fxProperties = this._fxProperties || []).push(fxProp);
        }
        // add from/to EffectState to the EffectProperty
        var fxState = {
            val: val,
            num: 0,
            effectUnit: '',
        };
        fxProp[state] = fxState;
        if (typeof val === 'string' && val.indexOf(' ') < 0) {
            var r = val.match(CSS_VALUE_REGEX);
            if (r) {
                var num = parseFloat(r[1]);
                if (!isNaN(num)) {
                    fxState.num = num;
                }
                fxState.effectUnit = (r[0] !== r[2] ? r[2] : '');
            }
        }
        else if (typeof val === 'number') {
            fxState.num = val;
        }
        return fxProp;
    };
    /**
     * Add CSS class to this animation's elements
     * before the animation begins.
     */
    Animator.prototype.beforeAddClass = function (className) {
        (this._beforeAddClasses = this._beforeAddClasses || []).push(className);
        return this;
    };
    /**
     * Remove CSS class from this animation's elements
     * before the animation begins.
     */
    Animator.prototype.beforeRemoveClass = function (className) {
        (this._beforeRemoveClasses = this._beforeRemoveClasses || []).push(className);
        return this;
    };
    /**
     * Set CSS inline styles to this animation's elements
     * before the animation begins.
     */
    Animator.prototype.beforeStyles = function (styles) {
        this._beforeStyles = styles;
        return this;
    };
    /**
     * Clear CSS inline styles from this animation's elements
     * before the animation begins.
     */
    Animator.prototype.beforeClearStyles = function (propertyNames) {
        this._beforeStyles = this._beforeStyles || {};
        for (var _i = 0, propertyNames_1 = propertyNames; _i < propertyNames_1.length; _i++) {
            var prop = propertyNames_1[_i];
            this._beforeStyles[prop] = '';
        }
        return this;
    };
    /**
     * Add a function which contains DOM reads, which will run
     * before the animation begins.
     */
    Animator.prototype.beforeAddRead = function (domReadFn) {
        (this._readCallbacks = this._readCallbacks || []).push(domReadFn);
        return this;
    };
    /**
     * Add a function which contains DOM writes, which will run
     * before the animation begins.
     */
    Animator.prototype.beforeAddWrite = function (domWriteFn) {
        (this._writeCallbacks = this._writeCallbacks || []).push(domWriteFn);
        return this;
    };
    /**
     * Add CSS class to this animation's elements
     * after the animation finishes.
     */
    Animator.prototype.afterAddClass = function (className) {
        (this._afterAddClasses = this._afterAddClasses || []).push(className);
        return this;
    };
    /**
     * Remove CSS class from this animation's elements
     * after the animation finishes.
     */
    Animator.prototype.afterRemoveClass = function (className) {
        (this._afterRemoveClasses = this._afterRemoveClasses || []).push(className);
        return this;
    };
    /**
     * Set CSS inline styles to this animation's elements
     * after the animation finishes.
     */
    Animator.prototype.afterStyles = function (styles) {
        this._afterStyles = styles;
        return this;
    };
    /**
     * Clear CSS inline styles from this animation's elements
     * after the animation finishes.
     */
    Animator.prototype.afterClearStyles = function (propertyNames) {
        this._afterStyles = this._afterStyles || {};
        for (var _i = 0, propertyNames_2 = propertyNames; _i < propertyNames_2.length; _i++) {
            var prop = propertyNames_2[_i];
            this._afterStyles[prop] = '';
        }
        return this;
    };
    /**
     * Play the animation.
     */
    Animator.prototype.play = function (opts) {
        var _this = this;
        // If the animation was already invalidated (it did finish), do nothing
        if (this._destroyed) {
            return;
        }
        // this is the top level animation and is in full control
        // of when the async play() should actually kick off
        // if there is no duration then it'll set the TO property immediately
        // if there is a duration, then it'll stage all animations at the
        // FROM property and transition duration, wait a few frames, then
        // kick off the animation by setting the TO property for each animation
        this._isAsync = this._hasDuration(opts);
        // ensure all past transition end events have been cleared
        this._clearAsync();
        // recursively kicks off the correct progress step for each child animation
        // ******** DOM WRITE ****************
        this._playInit(opts);
        // doubling up RAFs since this animation was probably triggered
        // from an input event, and just having one RAF would have this code
        // run within the same frame as the triggering input event, and the
        // input event probably already did way too much work for one frame
        raf(function () {
            raf(function () {
                _this._playDomInspect(opts);
            });
        });
    };
    Animator.prototype.playAsync = function (opts) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.onFinish(resolve, { oneTimeCallback: true, clearExistingCallbacks: true });
            _this.play(opts);
            return _this;
        });
    };
    Animator.prototype.playSync = function () {
        // If the animation was already invalidated (it did finish), do nothing
        if (!this._destroyed) {
            var opts = { duration: 0 };
            this._isAsync = false;
            this._clearAsync();
            this._playInit(opts);
            this._playDomInspect(opts);
        }
    };
    /**
     * DOM WRITE
     * RECURSION
     */
    Animator.prototype._playInit = function (opts) {
        // always default that an animation does not tween
        // a tween requires that an Animation class has an element
        // and that it has at least one FROM/TO effect
        // and that the FROM/TO effect can tween numeric values
        this._hasTweenEffect = false;
        this.isPlaying = true;
        this.hasCompleted = false;
        this._hasDur = (this.getDuration(opts) > DURATION_MIN);
        var children = this._childAnimations;
        if (children) {
            for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
                var child = children_1[_i];
                // ******** DOM WRITE ****************
                child._playInit(opts);
            }
        }
        if (this._hasDur) {
            // if there is a duration then we want to start at step 0
            // ******** DOM WRITE ****************
            this._progress(0);
            // add the will-change properties
            // ******** DOM WRITE ****************
            this._willChange(true);
        }
    };
    /**
     * DOM WRITE
     * NO RECURSION
     * ROOT ANIMATION
     */
    Animator.prototype._playDomInspect = function (opts) {
        var _this = this;
        // fire off all the "before" function that have DOM READS in them
        // elements will be in the DOM, however visibily hidden
        // so we can read their dimensions if need be
        // ******** DOM READ ****************
        // ******** DOM WRITE ****************
        this._beforeAnimation();
        // for the root animation only
        // set the async TRANSITION END event
        // and run onFinishes when the transition ends
        var dur = this.getDuration(opts);
        if (this._isAsync) {
            this._asyncEnd(dur, true);
        }
        // ******** DOM WRITE ****************
        this._playProgress(opts);
        if (this._isAsync && !this._destroyed) {
            // this animation has a duration so we need another RAF
            // for the CSS TRANSITION properties to kick in
            raf(function () {
                _this._playToStep(1);
            });
        }
    };
    /**
     * DOM WRITE
     * RECURSION
     */
    Animator.prototype._playProgress = function (opts) {
        var children = this._childAnimations;
        if (children) {
            for (var _i = 0, children_2 = children; _i < children_2.length; _i++) {
                var child = children_2[_i];
                // ******** DOM WRITE ****************
                child._playProgress(opts);
            }
        }
        if (this._hasDur) {
            // set the CSS TRANSITION duration/easing
            // ******** DOM WRITE ****************
            this._setTrans(this.getDuration(opts), false);
        }
        else {
            // this animation does not have a duration, so it should not animate
            // just go straight to the TO properties and call it done
            // ******** DOM WRITE ****************
            this._progress(1);
            // since there was no animation, immediately run the after
            // ******** DOM WRITE ****************
            this._setAfterStyles();
            // this animation has no duration, so it has finished
            // other animations could still be running
            this._didFinish(true);
        }
    };
    /**
     * DOM WRITE
     * RECURSION
     */
    Animator.prototype._playToStep = function (stepValue) {
        if (!this._destroyed) {
            var children = this._childAnimations;
            if (children) {
                for (var _i = 0, children_3 = children; _i < children_3.length; _i++) {
                    var child = children_3[_i];
                    // ******** DOM WRITE ****************
                    child._playToStep(stepValue);
                }
            }
            if (this._hasDur) {
                // browser had some time to render everything in place
                // and the transition duration/easing is set
                // now set the TO properties which will trigger the transition to begin
                // ******** DOM WRITE ****************
                this._progress(stepValue);
            }
        }
    };
    /**
     * DOM WRITE
     * NO RECURSION
     * ROOT ANIMATION
     */
    Animator.prototype._asyncEnd = function (dur, shouldComplete) {
        var self = this;
        function onTransitionEnd() {
            // congrats! a successful transition completed!
            // ensure transition end events and timeouts have been cleared
            self._clearAsync();
            // ******** DOM WRITE ****************
            self._playEnd();
            // transition finished
            self._didFinishAll(shouldComplete, true, false);
        }
        function onTransitionFallback() {
            // oh noz! the transition end event didn't fire in time!
            // instead the fallback timer when first
            // if all goes well this fallback should never fire
            // clear the other async end events from firing
            self._timerId = undefined;
            self._clearAsync();
            // set the after styles
            // ******** DOM WRITE ****************
            self._playEnd(shouldComplete ? 1 : 0);
            // transition finished
            self._didFinishAll(shouldComplete, true, false);
        }
        // set the TRANSITION END event on one of the transition elements
        self._unregisterTrnsEnd = transitionEnd(self._transEl(), onTransitionEnd);
        // set a fallback timeout if the transition end event never fires, or is too slow
        // transition end fallback: (animation duration + XXms)
        self._timerId = setTimeout(onTransitionFallback, (dur + TRANSITION_END_FALLBACK_PADDING_MS));
    };
    /**
     * DOM WRITE
     * RECURSION
     */
    Animator.prototype._playEnd = function (stepValue) {
        var children = this._childAnimations;
        if (children) {
            for (var _i = 0, children_4 = children; _i < children_4.length; _i++) {
                var child = children_4[_i];
                // ******** DOM WRITE ****************
                child._playEnd(stepValue);
            }
        }
        if (this._hasDur) {
            if (stepValue !== undefined) {
                // too late to have a smooth animation, just finish it
                // ******** DOM WRITE ****************
                this._setTrans(0, true);
                // ensure the ending progress step gets rendered
                // ******** DOM WRITE ****************
                this._progress(stepValue);
            }
            // set the after styles
            // ******** DOM WRITE ****************
            this._setAfterStyles();
            // remove the will-change properties
            // ******** DOM WRITE ****************
            this._willChange(false);
        }
    };
    /**
     * NO DOM
     * RECURSION
     */
    Animator.prototype._hasDuration = function (opts) {
        if (this.getDuration(opts) > DURATION_MIN) {
            return true;
        }
        var children = this._childAnimations;
        if (children) {
            for (var _i = 0, children_5 = children; _i < children_5.length; _i++) {
                var child = children_5[_i];
                if (child._hasDuration(opts)) {
                    return true;
                }
            }
        }
        return false;
    };
    /**
     * NO DOM
     * RECURSION
     */
    Animator.prototype._hasDomReads = function () {
        if (this._readCallbacks && this._readCallbacks.length > 0) {
            return true;
        }
        var children = this._childAnimations;
        if (children) {
            for (var _i = 0, children_6 = children; _i < children_6.length; _i++) {
                var child = children_6[_i];
                if (child._hasDomReads()) {
                    return true;
                }
            }
        }
        return false;
    };
    /**
     * Immediately stop at the end of the animation.
     */
    Animator.prototype.stop = function (stepValue) {
        if (stepValue === void 0) { stepValue = 1; }
        // ensure all past transition end events have been cleared
        this._clearAsync();
        this._hasDur = true;
        this._playEnd(stepValue);
    };
    /**
     * NO DOM
     * NO RECURSION
     */
    Animator.prototype._clearAsync = function () {
        if (this._unregisterTrnsEnd) {
            this._unregisterTrnsEnd();
        }
        if (this._timerId) {
            clearTimeout(this._timerId);
        }
        this._timerId = this._unregisterTrnsEnd = undefined;
    };
    /**
     * DOM WRITE
     * NO RECURSION
     */
    Animator.prototype._progress = function (stepValue) {
        // bread 'n butter
        var val;
        var elements = this._elements;
        var effects = this._fxProperties;
        if (!elements || elements.length === 0 || !effects || this._destroyed) {
            return;
        }
        // flip the number if we're going in reverse
        if (this._isReverse) {
            stepValue = 1 - stepValue;
        }
        var i = 0;
        var j = 0;
        var finalTransform = '';
        var fx;
        for (i = 0; i < effects.length; i++) {
            fx = effects[i];
            if (fx.from && fx.to) {
                var fromNum = fx.from.num;
                var toNum = fx.to.num;
                var tweenEffect = (fromNum !== toNum);
                if (tweenEffect) {
                    this._hasTweenEffect = true;
                }
                if (stepValue === 0) {
                    // FROM
                    val = fx.from.val;
                }
                else if (stepValue === 1) {
                    // TO
                    val = fx.to.val;
                }
                else if (tweenEffect) {
                    // EVERYTHING IN BETWEEN
                    var valNum = (((toNum - fromNum) * stepValue) + fromNum);
                    var unit = fx.to.effectUnit;
                    val = valNum + unit;
                }
                if (val !== null) {
                    var prop = fx.effectName;
                    if (fx.trans) {
                        finalTransform += prop + '(' + val + ') ';
                    }
                    else {
                        for (j = 0; j < elements.length; j++) {
                            // ******** DOM WRITE ****************
                            elements[j].style.setProperty(prop, val);
                        }
                    }
                }
            }
        }
        // place all transforms on the same property
        if (finalTransform.length > 0) {
            if (!this._isReverse && stepValue !== 1 || this._isReverse && stepValue !== 0) {
                finalTransform += 'translateZ(0px)';
            }
            for (i = 0; i < elements.length; i++) {
                // ******** DOM WRITE ****************
                elements[i].style.setProperty('transform', finalTransform);
                elements[i].style.setProperty('-webkit-transform', finalTransform);
            }
        }
    };
    /**
     * DOM WRITE
     * NO RECURSION
     */
    Animator.prototype._setTrans = function (dur, forcedLinearEasing) {
        // Transition is not enabled if there are not effects
        var elements = this._elements;
        if (!elements || elements.length === 0 || !this._fxProperties) {
            return;
        }
        // set the TRANSITION properties inline on the element
        var easing = (forcedLinearEasing ? 'linear' : this.getEasing());
        var durString = dur + 'ms';
        for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
            var style = elements_1[_i].style;
            if (dur > 0) {
                // ******** DOM WRITE ****************
                style.transitionDuration = durString;
                // each animation can have a different easing
                if (easing !== null) {
                    // ******** DOM WRITE ****************
                    style.transitionTimingFunction = easing;
                }
            }
            else {
                style.transitionDuration = '0';
            }
        }
    };
    /**
     * DOM READ
     * DOM WRITE
     * RECURSION
     */
    Animator.prototype._beforeAnimation = function () {
        // fire off all the "before" function that have DOM READS in them
        // elements will be in the DOM, however visibily hidden
        // so we can read their dimensions if need be
        // ******** DOM READ ****************
        this._fireBeforeReadFunc();
        // ******** DOM READS ABOVE / DOM WRITES BELOW ****************
        // fire off all the "before" function that have DOM WRITES in them
        // ******** DOM WRITE ****************
        this._fireBeforeWriteFunc();
        // stage all of the before css classes and inline styles
        // ******** DOM WRITE ****************
        this._setBeforeStyles();
    };
    /**
     * DOM WRITE
     * RECURSION
     */
    Animator.prototype._setBeforeStyles = function () {
        var children = this._childAnimations;
        if (children) {
            for (var _i = 0, children_7 = children; _i < children_7.length; _i++) {
                var child = children_7[_i];
                child._setBeforeStyles();
            }
        }
        var elements = this._elements;
        // before the animations have started
        // only set before styles if animation is not reversed
        if (!elements || elements.length === 0 || this._isReverse) {
            return;
        }
        var addClasses = this._beforeAddClasses;
        var removeClasses = this._beforeRemoveClasses;
        for (var _a = 0, elements_2 = elements; _a < elements_2.length; _a++) {
            var el = elements_2[_a];
            var elementClassList = el.classList;
            // css classes to add before the animation
            if (addClasses) {
                for (var _b = 0, addClasses_1 = addClasses; _b < addClasses_1.length; _b++) {
                    var c = addClasses_1[_b];
                    // ******** DOM WRITE ****************
                    elementClassList.add(c);
                }
            }
            // css classes to remove before the animation
            if (removeClasses) {
                for (var _c = 0, removeClasses_1 = removeClasses; _c < removeClasses_1.length; _c++) {
                    var c = removeClasses_1[_c];
                    // ******** DOM WRITE ****************
                    elementClassList.remove(c);
                }
            }
            // inline styles to add before the animation
            if (this._beforeStyles) {
                for (var _d = 0, _e = Object.entries(this._beforeStyles); _d < _e.length; _d++) {
                    var _f = _e[_d], key = _f[0], value = _f[1];
                    // ******** DOM WRITE ****************
                    el.style.setProperty(key, value);
                }
            }
        }
    };
    /**
     * DOM READ
     * RECURSION
     */
    Animator.prototype._fireBeforeReadFunc = function () {
        var children = this._childAnimations;
        if (children) {
            for (var _i = 0, children_8 = children; _i < children_8.length; _i++) {
                var child = children_8[_i];
                // ******** DOM READ ****************
                child._fireBeforeReadFunc();
            }
        }
        var readFunctions = this._readCallbacks;
        if (readFunctions) {
            for (var _a = 0, readFunctions_1 = readFunctions; _a < readFunctions_1.length; _a++) {
                var callback = readFunctions_1[_a];
                // ******** DOM READ ****************
                callback();
            }
        }
    };
    /**
     * DOM WRITE
     * RECURSION
     */
    Animator.prototype._fireBeforeWriteFunc = function () {
        var children = this._childAnimations;
        if (children) {
            for (var _i = 0, children_9 = children; _i < children_9.length; _i++) {
                var child = children_9[_i];
                // ******** DOM WRITE ****************
                child._fireBeforeWriteFunc();
            }
        }
        var writeFunctions = this._writeCallbacks;
        if (writeFunctions) {
            for (var _a = 0, writeFunctions_1 = writeFunctions; _a < writeFunctions_1.length; _a++) {
                var callback = writeFunctions_1[_a];
                // ******** DOM WRITE ****************
                callback();
            }
        }
    };
    /**
     * DOM WRITE
     */
    Animator.prototype._setAfterStyles = function () {
        var elements = this._elements;
        if (!elements) {
            return;
        }
        for (var _i = 0, elements_3 = elements; _i < elements_3.length; _i++) {
            var el = elements_3[_i];
            var elementClassList = el.classList;
            // remove the transition duration/easing
            // ******** DOM WRITE ****************
            el.style.transitionDuration = el.style.transitionTimingFunction = '';
            if (this._isReverse) {
                // finished in reverse direction
                // css classes that were added before the animation should be removed
                var beforeAddClasses = this._beforeAddClasses;
                if (beforeAddClasses) {
                    for (var _a = 0, beforeAddClasses_1 = beforeAddClasses; _a < beforeAddClasses_1.length; _a++) {
                        var c = beforeAddClasses_1[_a];
                        elementClassList.remove(c);
                    }
                }
                // css classes that were removed before the animation should be added
                var beforeRemoveClasses = this._beforeRemoveClasses;
                if (beforeRemoveClasses) {
                    for (var _b = 0, beforeRemoveClasses_1 = beforeRemoveClasses; _b < beforeRemoveClasses_1.length; _b++) {
                        var c = beforeRemoveClasses_1[_b];
                        elementClassList.add(c);
                    }
                }
                // inline styles that were added before the animation should be removed
                var beforeStyles = this._beforeStyles;
                if (beforeStyles) {
                    for (var _c = 0, _d = Object.keys(beforeStyles); _c < _d.length; _c++) {
                        var propName = _d[_c];
                        // ******** DOM WRITE ****************
                        el.style.removeProperty(propName);
                    }
                }
            }
            else {
                // finished in forward direction
                // css classes to add after the animation
                var afterAddClasses = this._afterAddClasses;
                if (afterAddClasses) {
                    for (var _e = 0, afterAddClasses_1 = afterAddClasses; _e < afterAddClasses_1.length; _e++) {
                        var c = afterAddClasses_1[_e];
                        // ******** DOM WRITE ****************
                        elementClassList.add(c);
                    }
                }
                // css classes to remove after the animation
                var afterRemoveClasses = this._afterRemoveClasses;
                if (afterRemoveClasses) {
                    for (var _f = 0, afterRemoveClasses_1 = afterRemoveClasses; _f < afterRemoveClasses_1.length; _f++) {
                        var c = afterRemoveClasses_1[_f];
                        // ******** DOM WRITE ****************
                        elementClassList.remove(c);
                    }
                }
                // inline styles to add after the animation
                var afterStyles = this._afterStyles;
                if (afterStyles) {
                    for (var _g = 0, _h = Object.entries(afterStyles); _g < _h.length; _g++) {
                        var _j = _h[_g], key = _j[0], value = _j[1];
                        el.style.setProperty(key, value);
                    }
                }
            }
        }
    };
    /**
     * DOM WRITE
     * NO RECURSION
     */
    Animator.prototype._willChange = function (addWillChange) {
        var wc;
        var effects = this._fxProperties;
        var willChange;
        if (addWillChange && effects) {
            wc = [];
            for (var _i = 0, effects_1 = effects; _i < effects_1.length; _i++) {
                var effect = effects_1[_i];
                var propWC = effect.wc;
                if (propWC === 'webkitTransform') {
                    wc.push('transform', '-webkit-transform');
                }
                else if (propWC !== undefined) {
                    wc.push(propWC);
                }
            }
            willChange = wc.join(',');
        }
        else {
            willChange = '';
        }
        var elements = this._elements;
        if (elements) {
            for (var _a = 0, elements_4 = elements; _a < elements_4.length; _a++) {
                var el = elements_4[_a];
                // ******** DOM WRITE ****************
                el.style.setProperty('will-change', willChange);
            }
        }
    };
    /**
     * Start the animation with a user controlled progress.
     */
    Animator.prototype.progressStart = function () {
        // ensure all past transition end events have been cleared
        this._clearAsync();
        // ******** DOM READ/WRITE ****************
        this._beforeAnimation();
        // ******** DOM WRITE ****************
        this._progressStart();
    };
    /**
     * DOM WRITE
     * RECURSION
     */
    Animator.prototype._progressStart = function () {
        var children = this._childAnimations;
        if (children) {
            for (var _i = 0, children_10 = children; _i < children_10.length; _i++) {
                var child = children_10[_i];
                // ******** DOM WRITE ****************
                child._progressStart();
            }
        }
        // force no duration, linear easing
        // ******** DOM WRITE ****************
        this._setTrans(0, true);
        // ******** DOM WRITE ****************
        this._willChange(true);
    };
    /**
     * Set the progress step for this animation.
     * progressStep() is not debounced, so it should not be called faster than 60FPS.
     */
    Animator.prototype.progressStep = function (stepValue) {
        // only update if the last update was more than 16ms ago
        stepValue = Math.min(1, Math.max(0, stepValue));
        var children = this._childAnimations;
        if (children) {
            for (var _i = 0, children_11 = children; _i < children_11.length; _i++) {
                var child = children_11[_i];
                // ******** DOM WRITE ****************
                child.progressStep(stepValue);
            }
        }
        // ******** DOM WRITE ****************
        this._progress(stepValue);
    };
    /**
     * End the progress animation.
     */
    Animator.prototype.progressEnd = function (shouldComplete, currentStepValue, dur) {
        var _this = this;
        if (dur === void 0) { dur = -1; }
        if (this._isReverse) {
            // if the animation is going in reverse then
            // flip the step value: 0 becomes 1, 1 becomes 0
            currentStepValue = 1 - currentStepValue;
        }
        var stepValue = shouldComplete ? 1 : 0;
        var diff = Math.abs(currentStepValue - stepValue);
        if (dur < 0) {
            dur = this._duration || 0;
        }
        else if (diff < 0.05) {
            dur = 0;
        }
        this._isAsync = (dur > 30);
        this._progressEnd(shouldComplete, stepValue, dur, this._isAsync);
        if (this._isAsync) {
            // for the root animation only
            // set the async TRANSITION END event
            // and run onFinishes when the transition ends
            // ******** DOM WRITE ****************
            this._asyncEnd(dur, shouldComplete);
            // this animation has a duration so we need another RAF
            // for the CSS TRANSITION properties to kick in
            if (!this._destroyed) {
                raf(function () {
                    _this._playToStep(stepValue);
                });
            }
        }
    };
    /**
     * DOM WRITE
     * RECURSION
     */
    Animator.prototype._progressEnd = function (shouldComplete, stepValue, dur, isAsync) {
        var children = this._childAnimations;
        if (children) {
            for (var _i = 0, children_12 = children; _i < children_12.length; _i++) {
                var child = children_12[_i];
                // ******** DOM WRITE ****************
                child._progressEnd(shouldComplete, stepValue, dur, isAsync);
            }
        }
        if (!isAsync) {
            // stop immediately
            // set all the animations to their final position
            // ******** DOM WRITE ****************
            this._progress(stepValue);
            this._willChange(false);
            this._setAfterStyles();
            this._didFinish(shouldComplete);
        }
        else {
            // animate it back to it's ending position
            this.isPlaying = true;
            this.hasCompleted = false;
            this._hasDur = true;
            // ******** DOM WRITE ****************
            this._willChange(true);
            this._setTrans(dur, false);
        }
    };
    /**
     * Add a callback to fire when the animation has finished.
     */
    Animator.prototype.onFinish = function (callback, opts) {
        if (opts && opts.clearExistingCallbacks) {
            this._onFinishCallbacks = this._onFinishOneTimeCallbacks = undefined;
        }
        if (opts && opts.oneTimeCallback) {
            this._onFinishOneTimeCallbacks = this._onFinishOneTimeCallbacks || [];
            this._onFinishOneTimeCallbacks.push(callback);
        }
        else {
            this._onFinishCallbacks = this._onFinishCallbacks || [];
            this._onFinishCallbacks.push(callback);
        }
        return this;
    };
    /**
     * NO DOM
     * RECURSION
     */
    Animator.prototype._didFinishAll = function (hasCompleted, finishAsyncAnimations, finishNoDurationAnimations) {
        var children = this._childAnimations;
        if (children) {
            for (var _i = 0, children_13 = children; _i < children_13.length; _i++) {
                var child = children_13[_i];
                child._didFinishAll(hasCompleted, finishAsyncAnimations, finishNoDurationAnimations);
            }
        }
        if (finishAsyncAnimations && this._isAsync || finishNoDurationAnimations && !this._isAsync) {
            this._didFinish(hasCompleted);
        }
    };
    /**
     * NO RECURSION
     */
    Animator.prototype._didFinish = function (hasCompleted) {
        this.isPlaying = false;
        this.hasCompleted = hasCompleted;
        if (this._onFinishCallbacks) {
            // run all finish callbacks
            for (var _i = 0, _a = this._onFinishCallbacks; _i < _a.length; _i++) {
                var callback = _a[_i];
                callback(this);
            }
        }
        if (this._onFinishOneTimeCallbacks) {
            // run all "onetime" finish callbacks
            for (var _b = 0, _c = this._onFinishOneTimeCallbacks; _b < _c.length; _b++) {
                var callback = _c[_b];
                callback(this);
            }
            this._onFinishOneTimeCallbacks.length = 0;
        }
    };
    /**
     * Reverse the animation.
     */
    Animator.prototype.reverse = function (shouldReverse) {
        if (shouldReverse === void 0) { shouldReverse = true; }
        var children = this._childAnimations;
        if (children) {
            for (var _i = 0, children_14 = children; _i < children_14.length; _i++) {
                var child = children_14[_i];
                child.reverse(shouldReverse);
            }
        }
        this._isReverse = !!shouldReverse;
        return this;
    };
    /**
     * Recursively destroy this animation and all child animations.
     */
    Animator.prototype.destroy = function () {
        this._didFinish(false);
        this._destroyed = true;
        var children = this._childAnimations;
        if (children) {
            for (var _i = 0, children_15 = children; _i < children_15.length; _i++) {
                var child = children_15[_i];
                child.destroy();
            }
        }
        this._clearAsync();
        if (this._elements) {
            this._elements.length = 0;
        }
        if (this._readCallbacks) {
            this._readCallbacks.length = 0;
        }
        if (this._writeCallbacks) {
            this._writeCallbacks.length = 0;
        }
        this.parent = undefined;
        if (this._childAnimations) {
            this._childAnimations.length = 0;
        }
        if (this._onFinishCallbacks) {
            this._onFinishCallbacks.length = 0;
        }
        if (this._onFinishOneTimeCallbacks) {
            this._onFinishOneTimeCallbacks.length = 0;
        }
    };
    /**
     * NO DOM
     */
    Animator.prototype._transEl = function () {
        // get the lowest level element that has an Animator
        var children = this._childAnimations;
        if (children) {
            for (var _i = 0, children_16 = children; _i < children_16.length; _i++) {
                var child = children_16[_i];
                var targetEl = child._transEl();
                if (targetEl) {
                    return targetEl;
                }
            }
        }
        return (this._hasTweenEffect &&
            this._hasDur &&
            this._elements !== undefined &&
            this._elements.length > 0 ?
            this._elements[0] : null);
    };
    return Animator;
}());
function create(animationBuilder, baseEl, opts) {
    if (animationBuilder) {
        return animationBuilder(Animator, baseEl, opts);
    }
    return Promise.resolve(new Animator());
}



/***/ })

}]);
//# sourceMappingURL=2.js.map