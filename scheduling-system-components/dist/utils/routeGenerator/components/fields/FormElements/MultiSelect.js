"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var MultiSelect = function (_a) {
    var id = _a.id;
    var _b = (0, react_1.useState)([]), options = _b[0], setOptions = _b[1];
    var _c = (0, react_1.useState)([]), selected = _c[0], setSelected = _c[1];
    var _d = (0, react_1.useState)(false), show = _d[0], setShow = _d[1];
    var dropdownRef = (0, react_1.useRef)(null);
    var trigger = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () {
        var loadOptions = function () {
            var select = document.getElementById(id);
            if (select) {
                var newOptions = [];
                for (var i = 0; i < select.options.length; i++) {
                    newOptions.push({
                        value: select.options[i].value,
                        text: select.options[i].innerText,
                        selected: select.options[i].hasAttribute("selected"),
                    });
                }
                setOptions(newOptions);
            }
        };
        loadOptions();
    }, [id]);
    var open = function () {
        setShow(true);
    };
    var isOpen = function () {
        return show === true;
    };
    var select = function (index, event) {
        var newOptions = __spreadArray([], options, true);
        if (!newOptions[index].selected) {
            newOptions[index].selected = true;
            newOptions[index].element = event.currentTarget;
            setSelected(__spreadArray(__spreadArray([], selected, true), [index], false));
        }
        else {
            var selectedIndex = selected.indexOf(index);
            if (selectedIndex !== -1) {
                newOptions[index].selected = false;
                setSelected(selected.filter(function (i) { return i !== index; }));
            }
        }
        setOptions(newOptions);
    };
    var remove = function (index) {
        var newOptions = __spreadArray([], options, true);
        var selectedIndex = selected.indexOf(index);
        if (selectedIndex !== -1) {
            newOptions[index].selected = false;
            setSelected(selected.filter(function (i) { return i !== index; }));
            setOptions(newOptions);
        }
    };
    var selectedValues = function () {
        return selected.map(function (option) { return options[option].value; });
    };
    (0, react_1.useEffect)(function () {
        var clickHandler = function (_a) {
            var target = _a.target;
            if (!dropdownRef.current)
                return;
            if (!show ||
                dropdownRef.current.contains(target) ||
                trigger.current.contains(target))
                return;
            setShow(false);
        };
        document.addEventListener("click", clickHandler);
        return function () { return document.removeEventListener("click", clickHandler); };
    });
    return ((0, jsx_runtime_1.jsxs)("div", { className: "relative z-50", children: [(0, jsx_runtime_1.jsx)("label", { className: "mb-1 block text-sm font-medium text-black dark:text-white", children: "Multiselect Dropdown" }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("select", { className: "hidden", id: id, children: [(0, jsx_runtime_1.jsx)("option", { value: "1", children: "Option 2" }), (0, jsx_runtime_1.jsx)("option", { value: "2", children: "Option 3" }), (0, jsx_runtime_1.jsx)("option", { value: "3", children: "Option 4" }), (0, jsx_runtime_1.jsx)("option", { value: "4", children: "Option 5" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center", children: [(0, jsx_runtime_1.jsx)("input", { name: "values", type: "hidden", defaultValue: selectedValues() }), (0, jsx_runtime_1.jsx)("div", { className: "relative z-20 inline-block w-full", children: (0, jsx_runtime_1.jsxs)("div", { className: "relative flex flex-col items-center", children: [(0, jsx_runtime_1.jsx)("div", { ref: trigger, onClick: open, className: "w-full", children: (0, jsx_runtime_1.jsxs)("div", { className: "mb-2 flex rounded border border-stroke py-2 pl-3 pr-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-auto flex-wrap gap-3", children: [selected.map(function (index) { return ((0, jsx_runtime_1.jsxs)("div", { className: "my-1.5 flex items-center justify-center rounded border-[.5px] border-stroke bg-gray px-2.5 py-1.5 text-sm font-medium dark:border-strokedark dark:bg-white/30", children: [(0, jsx_runtime_1.jsx)("div", { className: "max-w-full flex-initial", children: options[index].text }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-auto flex-row-reverse", children: (0, jsx_runtime_1.jsx)("div", { onClick: function () { return remove(index); }, className: "cursor-pointer pl-2 hover:text-danger", children: (0, jsx_runtime_1.jsx)("svg", { className: "fill-current", role: "button", width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: (0, jsx_runtime_1.jsx)("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M9.35355 3.35355C9.54882 3.15829 9.54882 2.84171 9.35355 2.64645C9.15829 2.45118 8.84171 2.45118 8.64645 2.64645L6 5.29289L3.35355 2.64645C3.15829 2.45118 2.84171 2.45118 2.64645 2.64645C2.45118 2.84171 2.45118 3.15829 2.64645 3.35355L5.29289 6L2.64645 8.64645C2.45118 8.84171 2.45118 9.15829 2.64645 9.35355C2.84171 9.54882 3.15829 9.54882 3.35355 9.35355L6 6.70711L8.64645 9.35355C8.84171 9.54882 9.15829 9.54882 9.35355 9.35355C9.54882 9.15829 9.54882 8.84171 9.35355 8.64645L6.70711 6L9.35355 3.35355Z", fill: "currentColor" }) }) }) })] }, index)); }), selected.length === 0 && ((0, jsx_runtime_1.jsx)("div", { className: "flex-1", children: (0, jsx_runtime_1.jsx)("input", { placeholder: "Select an option", className: "h-full w-full appearance-none bg-transparent p-1 px-2 outline-none", defaultValue: selectedValues() }) }))] }), (0, jsx_runtime_1.jsx)("div", { className: "flex w-8 items-center py-1 pl-1 pr-1", children: (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: open, className: "h-6 w-6 cursor-pointer outline-none focus:outline-none", children: (0, jsx_runtime_1.jsx)("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: (0, jsx_runtime_1.jsx)("g", { opacity: "0.8", children: (0, jsx_runtime_1.jsx)("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z", fill: "#637381" }) }) }) }) })] }) }), (0, jsx_runtime_1.jsx)("div", { className: "w-full px-4", children: (0, jsx_runtime_1.jsx)("div", { className: "max-h-select absolute left-0 top-full z-40 w-full overflow-y-auto rounded bg-white shadow dark:bg-form-input ".concat(isOpen() ? "" : "hidden"), ref: dropdownRef, onFocus: function () { return setShow(true); }, onBlur: function () { return setShow(false); }, children: (0, jsx_runtime_1.jsx)("div", { className: "flex w-full flex-col", children: options.map(function (option, index) { return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("div", { className: "w-full cursor-pointer rounded-t border-b border-stroke hover:bg-primary/5 dark:border-form-strokedark", onClick: function (event) { return select(index, event); }, children: (0, jsx_runtime_1.jsx)("div", { className: "relative flex w-full items-center border-l-2 border-transparent p-2 pl-2 ".concat(option.selected ? "border-primary" : ""), children: (0, jsx_runtime_1.jsx)("div", { className: "flex w-full items-center", children: (0, jsx_runtime_1.jsx)("div", { className: "mx-2 leading-6", children: option.text }) }) }) }) }, index)); }) }) }) })] }) })] })] })] }));
};
exports.default = MultiSelect;
