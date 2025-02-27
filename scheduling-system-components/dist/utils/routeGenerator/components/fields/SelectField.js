"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectFieldImports = void 0;
exports.generateSelectField = generateSelectField;
function generateSelectField(attr, fieldName, defaultValue) {
    var _a, _b;
    var isMultiple = ((_a = attr.config) === null || _a === void 0 ? void 0 : _a.multiple) || false;
    var defaultVal = defaultValue ?
        (isMultiple ? defaultValue.split(',').map(function (v) { return ({ value: v.trim(), label: v.trim() }); })
            : { value: defaultValue, label: defaultValue })
        : null;
    return "\n    <div className=\"mb-4.5 w-full\">\n      <label className=\"mb-1 block text-sm font-medium text-black dark:text-white\">\n        ".concat(attr.name, " ").concat(((_b = attr.validations) === null || _b === void 0 ? void 0 : _b.required) ? '<span className="text-meta-1">*</span>' : '', "\n      </label>\n      <Controller\n        name=\"").concat(fieldName, "\"\n        control={control}\n        defaultValue={").concat(JSON.stringify(defaultVal), "}\n        render={({ field: { onChange, value, ...field } }) => (\n          <Select\n            {...field}\n            value={").concat(isMultiple, " \n              ? (Array.isArray(value) ? value.map(v => ({ value: v, label: v })) : [])\n              : value ? { value, label: value } : null\n            }\n            onChange={(option) => {\n              ").concat(isMultiple, "\n                ? onChange(option ? option.map((item) => item.value) : [])\n                : onChange(option ? option.value : null)\n            }}\n            isMulti={").concat(isMultiple, "}\n            options={[\n              ").concat((attr.options || []).map(function (opt) { return "\n                { value: \"".concat(opt.value, "\", label: \"").concat(opt.label || opt.value, "\" }\n              "); }).join(','), "\n            ]}\n            className=\"react-select\"\n            classNamePrefix=\"select\"\n            placeholder=\"Select ").concat(attr.name, "\"\n            isClearable\n          />\n        )}\n      />\n       {errors['").concat(fieldName, "'] && (\n        <p className=\"mt-1 text-sm text-meta-1\">{errors['").concat(fieldName, "']?.message}</p>\n      )}\n    </div>\n  ");
}
exports.selectFieldImports = "\nimport Select from 'react-select';\n";
