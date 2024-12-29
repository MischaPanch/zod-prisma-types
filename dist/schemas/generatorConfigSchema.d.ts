import { z } from 'zod';
export declare const configSchema: z.ZodObject<{
    useMultipleFiles: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodString>>, boolean, string | undefined>;
    writeBarrelFiles: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodString>>, boolean, string | undefined>;
    createInputTypes: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodString>>, boolean, string | undefined>;
    createModelTypes: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodString>>, boolean, string | undefined>;
    createOptionalDefaultValuesTypes: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodString>>, boolean, string | undefined>;
    createRelationValuesTypes: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodString>>, boolean, string | undefined>;
    createPartialTypes: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodString>>, boolean, string | undefined>;
    addInputTypeValidation: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodString>>, boolean, string | undefined>;
    addIncludeType: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodString>>, boolean, string | undefined>;
    addSelectType: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodString>>, boolean, string | undefined>;
    validateWhereUniqueInput: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodString>>, boolean, string | undefined>;
    useDefaultValidators: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodString>>, boolean, string | undefined>;
    coerceDate: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodString>>, boolean, string | undefined>;
    writeNullishInModelTypes: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodString>>, boolean, string | undefined>;
    useTypeAssertions: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodString>>, boolean, string | undefined>;
    prismaClientPath: z.ZodDefault<z.ZodString>;
    provider: z.ZodOptional<z.ZodString>;
    isMongoDb: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodString>>, boolean, string | undefined>;
    inputTypePath: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    outputTypePath: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    prismaVersion: z.ZodOptional<z.ZodObject<{
        major: z.ZodNumber;
        minor: z.ZodNumber;
        patch: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        major: number;
        minor: number;
        patch: number;
    }, {
        major: number;
        minor: number;
        patch: number;
    }>>;
    decimalJSInstalled: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    prismaClientPath: string;
    useMultipleFiles: boolean;
    writeBarrelFiles: boolean;
    createInputTypes: boolean;
    createModelTypes: boolean;
    createOptionalDefaultValuesTypes: boolean;
    createRelationValuesTypes: boolean;
    createPartialTypes: boolean;
    addInputTypeValidation: boolean;
    addIncludeType: boolean;
    addSelectType: boolean;
    validateWhereUniqueInput: boolean;
    useDefaultValidators: boolean;
    coerceDate: boolean;
    writeNullishInModelTypes: boolean;
    useTypeAssertions: boolean;
    isMongoDb: boolean;
    inputTypePath: string;
    outputTypePath: string;
    decimalJSInstalled: boolean;
    provider?: string | undefined;
    prismaVersion?: {
        major: number;
        minor: number;
        patch: number;
    } | undefined;
}, {
    prismaClientPath?: string | undefined;
    useMultipleFiles?: string | undefined;
    writeBarrelFiles?: string | undefined;
    createInputTypes?: string | undefined;
    createModelTypes?: string | undefined;
    createOptionalDefaultValuesTypes?: string | undefined;
    createRelationValuesTypes?: string | undefined;
    createPartialTypes?: string | undefined;
    addInputTypeValidation?: string | undefined;
    addIncludeType?: string | undefined;
    addSelectType?: string | undefined;
    validateWhereUniqueInput?: string | undefined;
    useDefaultValidators?: string | undefined;
    coerceDate?: string | undefined;
    writeNullishInModelTypes?: string | undefined;
    useTypeAssertions?: string | undefined;
    provider?: string | undefined;
    isMongoDb?: string | undefined;
    inputTypePath?: string | undefined;
    outputTypePath?: string | undefined;
    prismaVersion?: {
        major: number;
        minor: number;
        patch: number;
    } | undefined;
    decimalJSInstalled?: boolean | undefined;
}>;
export type GeneratorConfig = z.infer<typeof configSchema>;
//# sourceMappingURL=generatorConfigSchema.d.ts.map