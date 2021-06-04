import { Service } from 'fastify-decorators';
import { getConnection, Repository } from 'typeorm';
import { Technology } from '../entity';

@Service()
export class TechnologyService {
  private readonly technologyRepository: Repository<Technology> = getConnection().getRepository(
    Technology
  );

  public async insertToDatabase(technologyName: string): Promise<Technology> {
    const tech = new Technology();
    tech.technologyName = technologyName;
    return await this.technologyRepository.save(tech);
  }

  public async getAvailable(): Promise<Technology[]> {
    return await this.technologyRepository.find({ select: ['technologyName', 'createdAt', 'updatedAt'] });
  }

  public async findTechnology(techName: string): Promise<Technology | undefined> {
    return await this.technologyRepository.findOne({ where: { technologyName: techName } });
  }
}

