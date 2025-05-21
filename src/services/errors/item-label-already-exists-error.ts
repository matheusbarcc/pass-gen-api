export class ItemLabelAlreadyExistsError extends Error {
  constructor() {
    super("Já existe uma senha com esse nome.")
  }
}