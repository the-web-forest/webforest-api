import { CustomError } from './custom.error';

export default class BiomeAlreadyRegisteredError extends CustomError {
  constructor() {
    super('Biome Already Registered', '0005');
  }
}
