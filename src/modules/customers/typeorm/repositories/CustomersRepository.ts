import { EntityRepository, Repository } from 'typeorm';
import Customer from '../entities/Customer';

@EntityRepository(Customer)
class CustomersRepository extends Repository<Customer> {
  public async findByName(name: string): Promise<Customer | undefined> {
    const user = await this.findOne({ name });
    return user;
  }

  public async findById(id: string): Promise<Customer | undefined> {
    const user = await this.findOne({ id });
    return user;
  }

  public async findByEmail(email: string): Promise<Customer | undefined> {
    const user = await this.findOne({ email });
    return user;
  }
}

export default CustomersRepository;
