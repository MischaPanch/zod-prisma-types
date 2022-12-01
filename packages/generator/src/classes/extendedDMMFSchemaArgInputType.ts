import { DMMF } from '@prisma/generator-helper';

import { PRISMA_TYPE_MAP } from '../constants/objectMaps';
import { ZodPrismaScalarType } from '../types';

/////////////////////////////////////////////////
// CLASS
/////////////////////////////////////////////////

export class ExtendedDMMFSchemaArgInputType implements DMMF.SchemaArgInputType {
  readonly isJsonType: boolean;
  readonly isBytesType: boolean;
  readonly isList: DMMF.SchemaArgInputType['isList'];
  readonly type: DMMF.SchemaArgInputType['type'];
  readonly location: DMMF.SchemaArgInputType['location'];
  readonly namespace?: DMMF.SchemaArgInputType['namespace'];

  constructor(arg: DMMF.SchemaArgInputType) {
    this.isJsonType = this._setIsJsonType(arg);
    this.isBytesType = this._setIsBytesType(arg);
    this.isList = arg.isList;
    this.type = arg.type;
    this.location = arg.location;
    this.namespace = arg.namespace;
  }

  private _setIsJsonType(arg: DMMF.SchemaArgInputType) {
    return arg.type === 'Json';
  }

  private _setIsBytesType(arg: DMMF.SchemaArgInputType) {
    return arg.type === 'Bytes';
  }

  /**
   * Checks if the type is a scalar type and returns the corresponding zod scalar
   * e.g. String -> string, Int -> number, etc.
   * @returns zodScalarType or undefined
   */
  getZodScalarType = () => {
    if (!this.isStringType()) return;
    const zodType = PRISMA_TYPE_MAP[this.type as ZodPrismaScalarType];
    if (!zodType) return;
    return zodType;
  };

  /**
   * Checks if the type is a nont scalar type and returns the generated zod type
   * @returns non scalar type (e.g. `User`, `Post`, etc.), `z.instanceof(Buffer)` for Bytes type
   * or `InputJsonValue` for Json type
   */
  getZodNonScalarType = () => {
    if (!this.isStringType()) return;
    const zodType = PRISMA_TYPE_MAP[this.type as ZodPrismaScalarType];
    if (zodType || this.type === 'Null') return;
    if (this.isJsonType) return 'InputJsonValue';
    if (this.isBytesType) return `z.instanceof(Buffer)`;
    return this.type;
  };

  /**
   * Checks if the type is a null type and returns the corresponding zod null type string
   * @returns zodNullType or undefined
   */
  getZodNullType = () => {
    if (!this.isStringType()) return;
    if (!(this.type === 'Null')) return;
    return 'null';
  };

  /**
   * Type guard to check if the type is a string
   * @param type the type of SchameArgInputType - defaults to this.type
   * @returns true if the type is a string
   */
  isStringType = (type: DMMF.ArgType = this.type): type is string => {
    return typeof type === 'string';
  };

  /**
   * Type guard to check if the type is a DMMF.SchemaEnum
   * @param type type of SchameArgInputType - defaults to this.type
   * @returns true if type is DMMF.SchemaEnum
   */
  isSchemaEnum = (type: DMMF.ArgType = this.type): type is DMMF.SchemaEnum => {
    return (type as DMMF.SchemaEnum).values !== undefined;
  };

  /**
   * Type guard to check if the type is a DMMF.InputType
   * @param type type of SchameArgInputType - defaults to this.type
   * @returns true if type is DMMF.InputType
   */
  isInputType = (type: DMMF.ArgType = this.type): type is DMMF.InputType => {
    return (type as DMMF.InputType).fields !== undefined;
  };
}