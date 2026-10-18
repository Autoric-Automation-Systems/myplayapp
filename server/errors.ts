export class AppError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AppError';
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Recurso não encontrado.') {
    super(message);
    this.name = 'NotFoundError';
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Você não tem permissão para esta ação.') {
    super(message);
    this.name = 'ForbiddenError';
  }
}
