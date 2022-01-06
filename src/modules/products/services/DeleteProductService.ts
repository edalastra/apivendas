import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';
import AppError from '@shared/errors/AppError';

interface Irequest {
  id: string;
}

class DeleteProductService {
  public async execute({ id }: Irequest): Promise<void> {
    const productsRepository = getCustomRepository(ProductRepository);

    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found.', 404);
    }

    await productsRepository.remove(product);
  }
}

export default DeleteProductService;
