export class ItemNotFoundError extends Error {
  constructor() {
    super("Item não encontrado.")
  }
}