"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeOutputObjectType = void 0;
const __1 = require("..");
const writeSelect_1 = require("./writeSelect");
const writeOutputObjectType = ({ fileWriter, dmmf, getSingleFileContent = false }, field) => {
    const { writer, writeImportSet, writeHeading } = fileWriter;
    const { useMultipleFiles, useTypeAssertions } = dmmf.generatorConfig;
    if (useMultipleFiles && !getSingleFileContent) {
        writeImportSet(field.argTypeImports);
        const modelWithSelect = dmmf.schema.getModelWithIncludeAndSelect(field);
        if (modelWithSelect && field.generatorConfig.addSelectType) {
            const filterdImports = [
                ...modelWithSelect.includeImports,
                ...modelWithSelect.selectImports,
            ].filter((imp) => !!field.argName && !imp.includes(`/${field.argName}`));
            writeImportSet(new Set(filterdImports));
            if (field.writeSelectAndIncludeArgs) {
                writeHeading('Select schema needs to be in file to prevent circular imports');
                (0, writeSelect_1.writeSelect)({ fileWriter, dmmf, getSingleFileContent: true }, modelWithSelect);
            }
        }
    }
    writer
        .blankLine()
        .write(`export const ${field.argName}Schema: `)
        .write(field.customArgType)
        .write(` = `)
        .write(`z.object(`)
        .inlineBlock(() => {
        writer
            .conditionalWriteLine(field.writeSelectArg, `select: ${field.modelType}SelectSchema.optional(),`)
            .conditionalWriteLine(field.writeIncludeArg, `include: ${field.modelType}IncludeSchema.optional(),`);
        field.args.forEach((arg) => {
            writer.write(`${arg.name}: `);
            const { isOptional, isNullable } = arg;
            if (arg.hasMultipleTypes) {
                writer.write(`z.union([ `);
                arg.inputTypes.forEach((inputType, idx) => {
                    const writeComma = idx !== arg.inputTypes.length - 1;
                    (0, __1.writeScalarType)(writer, {
                        inputType,
                        writeLazy: false,
                        writeComma,
                    });
                    (0, __1.writeNonScalarType)(writer, {
                        inputType,
                        writeLazy: false,
                        writeComma,
                    });
                    (0, __1.writeSpecialType)(writer, {
                        inputType,
                        writeLazy: false,
                        writeComma,
                    });
                });
                writer
                    .write(` ])`)
                    .conditionalWrite(arg.isOptional, `.optional()`)
                    .conditionalWrite(arg.isNullable, `.nullable()`)
                    .write(`,`);
            }
            else {
                (0, __1.writeScalarType)(writer, {
                    inputType: arg.inputTypes[0],
                    writeLazy: false,
                    isNullable,
                    isOptional,
                });
                (0, __1.writeNonScalarType)(writer, {
                    inputType: arg.inputTypes[0],
                    writeLazy: false,
                    isNullable,
                    isOptional,
                });
                (0, __1.writeSpecialType)(writer, {
                    inputType: arg.inputTypes[0],
                    writeLazy: false,
                    isNullable,
                    isOptional,
                });
            }
            writer.newLine();
        });
    })
        .write(`).strict() `)
        .conditionalWrite(useTypeAssertions, `as ${field.customArgType};`)
        .conditionalWrite(!useTypeAssertions, `;`);
    if (useMultipleFiles && !getSingleFileContent) {
        writer.blankLine().writeLine(`export default ${field.argName}Schema;`);
    }
};
exports.writeOutputObjectType = writeOutputObjectType;
//# sourceMappingURL=writeOutputObjectType.js.map