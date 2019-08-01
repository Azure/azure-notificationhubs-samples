(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[89],{

/***/ "./node_modules/@ionic/core/dist/esm/legacy/ion-virtual-scroll.entry.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/legacy/ion-virtual-scroll.entry.js ***!
  \******************************************************************************/
/*! exports provided: ion_virtual_scroll */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ion_virtual_scroll", function() { return VirtualScroll; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chunk-f257aad1.js */ "./node_modules/@ionic/core/dist/esm/legacy/chunk-f257aad1.js");
/* harmony import */ var _chunk_1074393c_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./chunk-1074393c.js */ "./node_modules/@ionic/core/dist/esm/legacy/chunk-1074393c.js");



var CELL_TYPE_ITEM = 'item';
var CELL_TYPE_HEADER = 'header';
var CELL_TYPE_FOOTER = 'footer';
var NODE_CHANGE_NONE = 0;
var NODE_CHANGE_POSITION = 1;
var NODE_CHANGE_CELL = 2;
var MIN_READS = 2;
function updateVDom(dom, heightIndex, cells, range) {
    // reset dom
    for (var _i = 0, dom_1 = dom; _i < dom_1.length; _i++) {
        var node = dom_1[_i];
        node.change = NODE_CHANGE_NONE;
        node.d = true;
    }
    // try to match into exisiting dom
    var toMutate = [];
    var end = range.offset + range.length;
    var _loop_1 = function (i) {
        var cell = cells[i];
        var node = dom.find(function (n) { return n.d && n.cell === cell; });
        if (node) {
            var top = heightIndex[i];
            if (top !== node.top) {
                node.top = top;
                node.change = NODE_CHANGE_POSITION;
            }
            node.d = false;
        }
        else {
            toMutate.push(cell);
        }
    };
    for (var i = range.offset; i < end; i++) {
        _loop_1(i);
    }
    // needs to append
    var pool = dom.filter(function (n) { return n.d; });
    var _loop_2 = function (cell) {
        var node = pool.find(function (n) { return n.d && n.cell.type === cell.type; });
        var index = cell.i;
        if (node) {
            node.d = false;
            node.change = NODE_CHANGE_CELL;
            node.cell = cell;
            node.top = heightIndex[index];
        }
        else {
            dom.push({
                d: false,
                cell: cell,
                visible: true,
                change: NODE_CHANGE_CELL,
                top: heightIndex[index],
            });
        }
    };
    for (var _a = 0, toMutate_1 = toMutate; _a < toMutate_1.length; _a++) {
        var cell = toMutate_1[_a];
        _loop_2(cell);
    }
    dom
        .filter(function (n) { return n.d && n.top !== -9999; })
        .forEach(function (n) {
        n.change = NODE_CHANGE_POSITION;
        n.top = -9999;
    });
}
function doRender(el, nodeRender, dom, updateCellHeight) {
    var children = Array.from(el.children).filter(function (n) { return n.tagName !== 'TEMPLATE'; });
    var childrenNu = children.length;
    var child;
    for (var i = 0; i < dom.length; i++) {
        var node = dom[i];
        var cell = node.cell;
        // the cell change, the content must be updated
        if (node.change === NODE_CHANGE_CELL) {
            if (i < childrenNu) {
                child = children[i];
                nodeRender(child, cell, i);
            }
            else {
                var newChild = createNode(el, cell.type);
                child = nodeRender(newChild, cell, i) || newChild;
                child.classList.add('virtual-item');
                el.appendChild(child);
            }
            child['$ionCell'] = cell;
        }
        else {
            child = children[i];
        }
        // only update position when it changes
        if (node.change !== NODE_CHANGE_NONE) {
            child.style.transform = "translate3d(0," + node.top + "px,0)";
        }
        // update visibility
        var visible = cell.visible;
        if (node.visible !== visible) {
            if (visible) {
                child.classList.remove('virtual-loading');
            }
            else {
                child.classList.add('virtual-loading');
            }
            node.visible = visible;
        }
        // dynamic height
        if (cell.reads > 0) {
            updateCellHeight(cell, child);
            cell.reads--;
        }
    }
}
function createNode(el, type) {
    var template = getTemplate(el, type);
    if (template && el.ownerDocument) {
        return el.ownerDocument.importNode(template.content, true).children[0];
    }
    return null;
}
function getTemplate(el, type) {
    switch (type) {
        case CELL_TYPE_ITEM: return el.querySelector('template:not([name])');
        case CELL_TYPE_HEADER: return el.querySelector('template[name=header]');
        case CELL_TYPE_FOOTER: return el.querySelector('template[name=footer]');
    }
}
function getViewport(scrollTop, vierportHeight, margin) {
    return {
        top: Math.max(scrollTop - margin, 0),
        bottom: scrollTop + vierportHeight + margin
    };
}
function getRange(heightIndex, viewport, buffer) {
    var topPos = viewport.top;
    var bottomPos = viewport.bottom;
    // find top index
    var i = 0;
    for (; i < heightIndex.length; i++) {
        if (heightIndex[i] > topPos) {
            break;
        }
    }
    var offset = Math.max(i - buffer - 1, 0);
    // find bottom index
    for (; i < heightIndex.length; i++) {
        if (heightIndex[i] >= bottomPos) {
            break;
        }
    }
    var end = Math.min(i + buffer, heightIndex.length);
    var length = end - offset;
    return { offset: offset, length: length };
}
function getShouldUpdate(dirtyIndex, currentRange, range) {
    var end = range.offset + range.length;
    return (dirtyIndex <= end ||
        currentRange.offset !== range.offset ||
        currentRange.length !== range.length);
}
function findCellIndex(cells, index) {
    var max = cells.length > 0 ? cells[cells.length - 1].index : 0;
    if (index === 0) {
        return 0;
    }
    else if (index === max + 1) {
        return cells.length;
    }
    else {
        return cells.findIndex(function (c) { return c.index === index; });
    }
}
function inplaceUpdate(dst, src, offset) {
    if (offset === 0 && src.length >= dst.length) {
        return src;
    }
    for (var i = 0; i < src.length; i++) {
        dst[i + offset] = src[i];
    }
    return dst;
}
function calcCells(items, itemHeight, headerFn, footerFn, approxHeaderHeight, approxFooterHeight, approxItemHeight, j, offset, len) {
    var cells = [];
    var end = len + offset;
    for (var i = offset; i < end; i++) {
        var item = items[i];
        if (headerFn) {
            var value = headerFn(item, i, items);
            if (value != null) {
                cells.push({
                    i: j++,
                    type: CELL_TYPE_HEADER,
                    value: value,
                    index: i,
                    height: approxHeaderHeight,
                    reads: MIN_READS,
                    visible: false,
                });
            }
        }
        cells.push({
            i: j++,
            type: CELL_TYPE_ITEM,
            value: item,
            index: i,
            height: itemHeight ? itemHeight(item, i) : approxItemHeight,
            reads: itemHeight ? 0 : MIN_READS,
            visible: !!itemHeight,
        });
        if (footerFn) {
            var value = footerFn(item, i, items);
            if (value != null) {
                cells.push({
                    i: j++,
                    type: CELL_TYPE_FOOTER,
                    value: value,
                    index: i,
                    height: approxFooterHeight,
                    reads: 2,
                    visible: false,
                });
            }
        }
    }
    return cells;
}
function calcHeightIndex(buf, cells, index) {
    var acum = buf[index];
    for (var i = index; i < buf.length; i++) {
        buf[i] = acum;
        acum += cells[i].height;
    }
    return acum;
}
function resizeBuffer(buf, len) {
    if (!buf) {
        return new Uint32Array(len);
    }
    if (buf.length === len) {
        return buf;
    }
    else if (len > buf.length) {
        var newBuf = new Uint32Array(len);
        newBuf.set(buf);
        return newBuf;
    }
    else {
        return buf.subarray(0, len);
    }
}
function positionForIndex(index, cells, heightIndex) {
    var cell = cells.find(function (c) { return c.type === CELL_TYPE_ITEM && c.index === index; });
    if (cell) {
        return heightIndex[cell.i];
    }
    return -1;
}
var VirtualScroll = /** @class */ (function () {
    function VirtualScroll(hostRef) {
        var _this = this;
        Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["r"])(this, hostRef);
        this.range = { offset: 0, length: 0 };
        this.viewportHeight = 0;
        this.cells = [];
        this.virtualDom = [];
        this.isEnabled = false;
        this.viewportOffset = 0;
        this.currentScrollTop = 0;
        this.indexDirty = 0;
        this.lastItemLen = 0;
        this.totalHeight = 0;
        /**
         * It is important to provide this
         * if virtual item height will be significantly larger than the default
         * The approximate height of each virtual item template's cell.
         * This dimension is used to help determine how many cells should
         * be created when initialized, and to help calculate the height of
         * the scrollable area. This height value can only use `px` units.
         * Note that the actual rendered size of each cell comes from the
         * app's CSS, whereas this approximation is used to help calculate
         * initial dimensions before the item has been rendered.
         */
        this.approxItemHeight = 45;
        /**
         * The approximate height of each header template's cell.
         * This dimension is used to help determine how many cells should
         * be created when initialized, and to help calculate the height of
         * the scrollable area. This height value can only use `px` units.
         * Note that the actual rendered size of each cell comes from the
         * app's CSS, whereas this approximation is used to help calculate
         * initial dimensions before the item has been rendered.
         */
        this.approxHeaderHeight = 30;
        /**
         * The approximate width of each footer template's cell.
         * This dimension is used to help determine how many cells should
         * be created when initialized, and to help calculate the height of
         * the scrollable area. This height value can only use `px` units.
         * Note that the actual rendered size of each cell comes from the
         * app's CSS, whereas this approximation is used to help calculate
         * initial dimensions before the item has been rendered.
         */
        this.approxFooterHeight = 30;
        this.onScroll = function () {
            _this.updateVirtualScroll();
        };
    }
    VirtualScroll.prototype.itemsChanged = function () {
        this.calcCells();
        this.updateVirtualScroll();
    };
    VirtualScroll.prototype.componentDidLoad = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var contentEl, _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        contentEl = this.el.closest('ion-content');
                        if (!contentEl) {
                            console.error('virtual-scroll must be used inside ion-content');
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, contentEl.componentOnReady()];
                    case 1:
                        _b.sent();
                        this.contentEl = contentEl;
                        _a = this;
                        return [4 /*yield*/, contentEl.getScrollElement()];
                    case 2:
                        _a.scrollEl = _b.sent();
                        this.calcCells();
                        this.updateState();
                        return [2 /*return*/];
                }
            });
        });
    };
    VirtualScroll.prototype.componentDidUpdate = function () {
        this.updateState();
    };
    VirtualScroll.prototype.componentDidUnload = function () {
        this.scrollEl = undefined;
    };
    VirtualScroll.prototype.onResize = function () {
        this.updateVirtualScroll();
    };
    /**
     * Returns the position of the virtual item at the given index.
     */
    VirtualScroll.prototype.positionForItem = function (index) {
        return Promise.resolve(positionForIndex(index, this.cells, this.getHeightIndex()));
    };
    /**
     * This method marks a subset of items as dirty, so they can be re-rendered. Items should be marked as
     * dirty any time the content or their style changes.
     *
     * The subset of items to be updated can are specifing by an offset and a length.
     */
    VirtualScroll.prototype.checkRange = function (offset, len) {
        if (len === void 0) { len = -1; }
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var length, cellIndex, cells;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                // TODO: kind of hacky how we do in-place updated of the cells
                // array. this part needs a complete refactor
                if (!this.items) {
                    return [2 /*return*/];
                }
                length = (len === -1)
                    ? this.items.length - offset
                    : len;
                cellIndex = findCellIndex(this.cells, offset);
                cells = calcCells(this.items, this.itemHeight, this.headerFn, this.footerFn, this.approxHeaderHeight, this.approxFooterHeight, this.approxItemHeight, cellIndex, offset, length);
                this.cells = inplaceUpdate(this.cells, cells, cellIndex);
                this.lastItemLen = this.items.length;
                this.indexDirty = Math.max(offset - 1, 0);
                this.scheduleUpdate();
                return [2 /*return*/];
            });
        });
    };
    /**
     * This method marks the tail the items array as dirty, so they can be re-rendered.
     *
     * It's equivalent to calling:
     *
     * ```js
     * virtualScroll.checkRange(lastItemLen);
     * ```
     */
    VirtualScroll.prototype.checkEnd = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                if (this.items) {
                    this.checkRange(this.lastItemLen);
                }
                return [2 /*return*/];
            });
        });
    };
    VirtualScroll.prototype.updateVirtualScroll = function () {
        // do nothing if virtual-scroll is disabled
        if (!this.isEnabled || !this.scrollEl) {
            return;
        }
        // unschedule future updates
        if (this.timerUpdate) {
            clearTimeout(this.timerUpdate);
            this.timerUpdate = undefined;
        }
        // schedule DOM operations into the stencil queue
        Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["f"])(this.readVS.bind(this));
        Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["w"])(this.writeVS.bind(this));
    };
    VirtualScroll.prototype.readVS = function () {
        var _a = this, contentEl = _a.contentEl, scrollEl = _a.scrollEl, el = _a.el;
        var topOffset = 0;
        var node = el;
        while (node && node !== contentEl) {
            topOffset += node.offsetTop;
            node = node.parentElement;
        }
        this.viewportOffset = topOffset;
        if (scrollEl) {
            this.viewportHeight = scrollEl.offsetHeight;
            this.currentScrollTop = scrollEl.scrollTop;
        }
    };
    VirtualScroll.prototype.writeVS = function () {
        var dirtyIndex = this.indexDirty;
        // get visible viewport
        var scrollTop = this.currentScrollTop - this.viewportOffset;
        var viewport = getViewport(scrollTop, this.viewportHeight, 100);
        // compute lazily the height index
        var heightIndex = this.getHeightIndex();
        // get array bounds of visible cells base in the viewport
        var range = getRange(heightIndex, viewport, 2);
        // fast path, do nothing
        var shouldUpdate = getShouldUpdate(dirtyIndex, this.range, range);
        if (!shouldUpdate) {
            return;
        }
        this.range = range;
        // in place mutation of the virtual DOM
        updateVDom(this.virtualDom, heightIndex, this.cells, range);
        // Write DOM
        // Different code paths taken depending of the render API used
        if (this.nodeRender) {
            doRender(this.el, this.nodeRender, this.virtualDom, this.updateCellHeight.bind(this));
        }
        else if (this.domRender) {
            this.domRender(this.virtualDom);
        }
        else if (this.renderItem) {
            this.el.forceUpdate();
        }
    };
    VirtualScroll.prototype.updateCellHeight = function (cell, node) {
        var _this = this;
        var update = function () {
            if (node['$ionCell'] === cell) {
                var style = window.getComputedStyle(node);
                var height = node.offsetHeight + parseFloat(style.getPropertyValue('margin-bottom'));
                _this.setCellHeight(cell, height);
            }
        };
        if (node && node.componentOnReady) {
            node.componentOnReady().then(update);
        }
        else {
            update();
        }
    };
    VirtualScroll.prototype.setCellHeight = function (cell, height) {
        var index = cell.i;
        // the cell might changed since the height update was scheduled
        if (cell !== this.cells[index]) {
            return;
        }
        if (cell.height !== height || cell.visible !== true) {
            cell.visible = true;
            cell.height = height;
            this.indexDirty = Math.min(this.indexDirty, index);
            this.scheduleUpdate();
        }
    };
    VirtualScroll.prototype.scheduleUpdate = function () {
        var _this = this;
        clearTimeout(this.timerUpdate);
        this.timerUpdate = setTimeout(function () { return _this.updateVirtualScroll(); }, 100);
    };
    VirtualScroll.prototype.updateState = function () {
        var shouldEnable = !!(this.scrollEl &&
            this.cells);
        if (shouldEnable !== this.isEnabled) {
            this.enableScrollEvents(shouldEnable);
            if (shouldEnable) {
                this.updateVirtualScroll();
            }
        }
    };
    VirtualScroll.prototype.calcCells = function () {
        if (!this.items) {
            return;
        }
        this.lastItemLen = this.items.length;
        this.cells = calcCells(this.items, this.itemHeight, this.headerFn, this.footerFn, this.approxHeaderHeight, this.approxFooterHeight, this.approxItemHeight, 0, 0, this.lastItemLen);
        this.indexDirty = 0;
    };
    VirtualScroll.prototype.getHeightIndex = function () {
        if (this.indexDirty !== Infinity) {
            this.calcHeightIndex(this.indexDirty);
        }
        return this.heightIndex;
    };
    VirtualScroll.prototype.calcHeightIndex = function (index) {
        if (index === void 0) { index = 0; }
        // TODO: optimize, we don't need to calculate all the cells
        this.heightIndex = resizeBuffer(this.heightIndex, this.cells.length);
        this.totalHeight = calcHeightIndex(this.heightIndex, this.cells, index);
        this.indexDirty = Infinity;
    };
    VirtualScroll.prototype.enableScrollEvents = function (shouldListen) {
        var _this = this;
        if (this.rmEvent) {
            this.rmEvent();
            this.rmEvent = undefined;
        }
        var scrollEl = this.scrollEl;
        if (scrollEl) {
            this.isEnabled = shouldListen;
            scrollEl.addEventListener('scroll', this.onScroll);
            this.rmEvent = function () {
                scrollEl.removeEventListener('scroll', _this.onScroll);
            };
        }
    };
    VirtualScroll.prototype.renderVirtualNode = function (node) {
        var _a = node.cell, type = _a.type, value = _a.value, index = _a.index;
        switch (type) {
            case CELL_TYPE_ITEM: return this.renderItem(value, index);
            case CELL_TYPE_HEADER: return this.renderHeader(value, index);
            case CELL_TYPE_FOOTER: return this.renderFooter(value, index);
        }
    };
    VirtualScroll.prototype.hostData = function () {
        return {
            style: {
                height: this.totalHeight + "px"
            }
        };
    };
    VirtualScroll.prototype.__stencil_render = function () {
        var _this = this;
        if (this.renderItem) {
            return (Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["h"])(VirtualProxy, { dom: this.virtualDom }, this.virtualDom.map(function (node) { return _this.renderVirtualNode(node); })));
        }
        return undefined;
    };
    Object.defineProperty(VirtualScroll.prototype, "el", {
        get: function () { return Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["e"])(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VirtualScroll, "watchers", {
        get: function () {
            return {
                "itemHeight": ["itemsChanged"],
                "items": ["itemsChanged"]
            };
        },
        enumerable: true,
        configurable: true
    });
    VirtualScroll.prototype.render = function () { return Object(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["h"])(_chunk_f257aad1_js__WEBPACK_IMPORTED_MODULE_1__["H"], this.hostData(), this.__stencil_render()); };
    Object.defineProperty(VirtualScroll, "style", {
        get: function () { return "ion-virtual-scroll{display:block;position:relative;width:100%;contain:strict;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.virtual-loading{opacity:0}.virtual-item{left:0;right:0;top:0;position:absolute;-webkit-transition-duration:0ms;transition-duration:0ms;will-change:transform}"; },
        enumerable: true,
        configurable: true
    });
    return VirtualScroll;
}());
var VirtualProxy = function (_a, children, utils) {
    var dom = _a.dom;
    return utils.map(children, function (child, i) {
        var node = dom[i];
        var vattrs = child.vattrs || {};
        var classes = vattrs.class || '';
        classes += 'virtual-item ';
        if (!node.visible) {
            classes += 'virtual-loading';
        }
        return Object.assign({}, child, { vattrs: Object.assign({}, vattrs, { class: classes, style: Object.assign({}, vattrs.style, { transform: "translate3d(0," + node.top + "px,0)" }) }) });
    });
};



/***/ })

}]);
//# sourceMappingURL=89.js.map