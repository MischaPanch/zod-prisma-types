"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedDMMFFieldValidatorMatch = exports.VALIDATOR_TYPE_REGEX = void 0;
const _01_extendedDMMFFieldBase_1 = require("./01_extendedDMMFFieldBase");
exports.VALIDATOR_TYPE_REGEX = /@zod(?<import>\.import\(\[(?<imports>[\w\s"@'${}/,;:.~*-]+)\]\))?\.(?<type>[\w]+){1}(?<customErrors>\([{][\w\p{Script=Latin}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}\p{M} (),'"。、ー|\\:+*#!§$%&/{}[\]=?~><°^\\-]+[}]\))?(?<validatorPattern>[\w\p{Script=Latin}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}\p{Punctuation}\p{M}\p{N} (),.'`"。、ー|\\:+*#!§$%&/{}[\]=?~><°^\\-]*[)])?/u;
class ExtendedDMMFFieldValidatorMatch extends _01_extendedDMMFFieldBase_1.ExtendedDMMFFieldBase {
    constructor(field, generatorConfig, modelName) {
        super(field, generatorConfig, modelName);
        Object.defineProperty(this, "_validatorMatch", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "clearedDocumentation", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this._validatorMatch = this._getValidatorMatchArray();
        this.clearedDocumentation = this._getClearedDocumentation();
    }
    _getValidatorMatchArray() {
        var _a;
        if (!this.documentation)
            return;
        return (_a = this.documentation.match(exports.VALIDATOR_TYPE_REGEX)) !== null && _a !== void 0 ? _a : undefined;
    }
    _getClearedDocumentation() {
        if (!this.documentation)
            return;
        return (this.documentation.replace(exports.VALIDATOR_TYPE_REGEX, '').trim() || undefined);
    }
}
exports.ExtendedDMMFFieldValidatorMatch = ExtendedDMMFFieldValidatorMatch;
//# sourceMappingURL=02_extendedDMMFFieldValidatorMatch.js.map