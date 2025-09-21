class ConflictError extends Error {
  status: number;

  constructor(message: string) {
    super(message);
    this.status = 409;
    this.name = 'ConflictError';
  }
}

export default ConflictError;
