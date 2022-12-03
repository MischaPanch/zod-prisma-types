/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { GetStatements, Statement } from '../types';
import { writeConstStatement, writeHeading } from '../utils';

/////////////////////////////////////////////////
// FUNCTION
/////////////////////////////////////////////////

export const getModelStatements: GetStatements = (dmmf) => {
  const statements: Statement[] = [writeHeading(`MODELS`, 'FAT')];

  dmmf.datamodel.models.forEach((model) => {
    statements.push(
      writeHeading(`${model.formattedNames.upperCaseSpace}`, 'SLIM'),
      writeConstStatement({
        leadingTrivia: (writer) => writer.newLine(),
        declarations: [
          {
            name: `${model.formattedNames.pascalCase}`,
            initializer(writer) {
              writer.write(`z.object({`);
              [...model.enumFields, ...model.scalarFields].forEach((field) => {
                if (field.kind === 'enum') {
                  return writer
                    .write(`${field.formattedNames.camelCase}: `)
                    .write(field.zodType)
                    .conditionalWrite(field.isList, `.array()`)
                    .conditionalWrite(field.isNullable, `.nullable()`)
                    .write(`,`)
                    .newLine();
                }

                if (field.isJsonType) {
                  return writer
                    .write(`${field.formattedNames.camelCase}: `)
                    .write(`InputJsonValue`)
                    .conditionalWrite(field.isList, `.array()`)
                    .conditionalWrite(field.isNullable, `.nullable()`)
                    .write(`,`)
                    .newLine();
                }

                if (field.isBytesType) {
                  return writer
                    .write(`${field.formattedNames.camelCase}: `)
                    .write(`z.instanceof(Buffer)`)
                    .conditionalWrite(field.isList, `.array()`)
                    .conditionalWrite(field.isNullable, `.nullable()`)
                    .write(`,`)
                    .newLine();
                }

                if (field.isDecimalType && dmmf.useDecimalJs()) {
                  return writer
                    .write(`${field.formattedNames.camelCase}: `)
                    .write(`z.number(`)
                    .conditionalWrite(
                      !!field.zodCustomErrors,
                      field.zodCustomErrors!,
                    )
                    .write(`)`)
                    .write(`.refine((v) => Decimal.isDecimal(v),`)
                    .write(` { `)
                    .write(`message: 'Must be a Decimal', `)
                    .write(
                      `path: ['Models', '${model.formattedNames.pascalCase}']`,
                    )
                    .write(` }`)
                    .write(`)`)
                    .conditionalWrite(field.isList, `.array()`)
                    .conditionalWrite(field.isNullable, `.nullable()`)
                    .write(`,`)
                    .newLine();
                }

                if (field.isDecimalType && !dmmf.useDecimalJs()) {
                  return writer
                    .write(`${field.formattedNames.camelCase}: `)
                    .write(`z.number(`)
                    .conditionalWrite(
                      !!field.zodCustomErrors,
                      field.zodCustomErrors!,
                    )
                    .write(`)`)
                    .conditionalWrite(field.isList, `.array()`)
                    .conditionalWrite(field.isNullable, `.nullable()`)
                    .write(`,`)
                    .newLine();
                }

                return writer
                  .write(`${field.formattedNames.camelCase}: `)
                  .write(`z.${field.zodType}(`)
                  .conditionalWrite(
                    !!field.zodCustomErrors,
                    field.zodCustomErrors!,
                  )
                  .write(`)`)
                  .conditionalWrite(
                    !!field.zodValidatorString,
                    field.zodValidatorString!,
                  )
                  .conditionalWrite(field.isList, `.array()`)
                  .conditionalWrite(field.isNullable, `.nullable()`)
                  .write(`,`)
                  .newLine();
              });
              writer.write(`})`);
            },
          },
        ],
      }),
    );
  });

  return statements;
};
