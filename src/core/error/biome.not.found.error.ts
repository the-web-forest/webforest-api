import { CustomError } from './custom.error';

export default class BiomeNotFoundError extends CustomError {
  constructor() {
    super('Biome Not Found', '0006');
  }
}
