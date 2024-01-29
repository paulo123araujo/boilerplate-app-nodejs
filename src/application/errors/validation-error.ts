import { CustomError } from './custom-error';

export class ValidationError extends CustomError {
  public fields: FieldIssueBase[];

  public showMessage: boolean;

  constructor(fields: FieldIssueBase[], showMessage: boolean = false) {
    super('Atributos inválidos', 'ValidationError');
    this.fields = fields;
    this.showMessage = showMessage;
  }
}

type FieldIssueBase = {
  path: (string | number)[];
  message?: string;
};
