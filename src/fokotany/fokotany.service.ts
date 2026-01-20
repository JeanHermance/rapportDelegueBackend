import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFokotanyDto } from './dto/create-fokotany.dto';
import { UpdateFokotanyDto } from './dto/update-fokotany.dto';
import { Fokotany } from './entities/fokotany.entity';
import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Commune } from 'src/commune/entities/commune.entity';

@Injectable()
export class FokotanyService {
  constructor(
    @InjectRepository(Fokotany)
    private readonly fokotanyRepository: Repository<Fokotany>,
    @InjectRepository(Commune)
    private readonly communeRepository: Repository<Commune>
  ) { }

  async creationFokotany(createFokotanyDto: CreateFokotanyDto) {
    try {
      const commune = await this.communeRepository.findOne({ where: { idCommune: createFokotanyDto.idCommune } });
      if (!commune) {
        throw new Error('Commune n\'existe pas');
      }
      const fokotanyExiste = await this.fokotanyRepository.findOne({ where: { nomFokotany: createFokotanyDto.nomFokotany, codeFokotany: createFokotanyDto.codeFokotany } });
      if (fokotanyExiste) {
        throw new Error('Fokotany existe deja');
      }

      const fokotany = this.fokotanyRepository.create({
        ...createFokotanyDto,
        commune: commune
      });
      const fokotanySave = await this.fokotanyRepository.save(fokotany);
      return {
        message: 'Fokotany cree avec succes',
        fokotany: fokotanySave,
        status: 201
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async listFokotany(page: number = 1, limit: number = 10, search: string = '') {
    try {
      const [fokotanys, count] = await this.fokotanyRepository.findAndCount({
        take: limit,
        skip: (page - 1) * limit,
        where: [
          { nomFokotany: Like(`%${search}%`) },
          { codeFokotany: Like(`%${search}%`) },
          { descriptionFokotany: Like(`%${search}%`) },
          { commune: { nomCommune: Like(`%${search}%`) } }
        ],
        relations: ['commune']
      });


      return {
        message: 'Liste des fokotanys',
        data: fokotanys,
        pagination: {
          page: page,
          limit: limit,
          total: count,
          totalPages: Math.ceil(count / limit),
        },
        status: 200
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async editerFokotany(id: string) {
    try {
      const fokotany = await this.fokotanyRepository.findOne({ where: { idFokotany: id }, relations: ['commune'] });
      if (!fokotany) {
        throw new Error('Fokotany non trouvée');
      }
      return fokotany;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async miseAJourFokotany(id: string, updateFokotanyDto: UpdateFokotanyDto) {
    try {
      const fokotany = await this.fokotanyRepository.findOne({ where: { idFokotany: id }, relations: ['commune'] });
      if (!fokotany) {
        throw new Error('Fokotany non trouvée');
      }
      Object.assign(fokotany, updateFokotanyDto);
      const fokotanyUpdate = await this.fokotanyRepository.save(fokotany);
      return {
        message: 'Fokotany mise a jour avec succes',
        fokotany: fokotanyUpdate,
        status: 200
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async supprimerFokotany(id: string) {
    try {
      const fokotany = await this.fokotanyRepository.findOne({ where: { idFokotany: id }, relations: ['commune'] });
      if (!fokotany) {
        throw new Error('Fokotany non trouvée');
      }
      const fokotanyRemove = await this.fokotanyRepository.remove(fokotany);
      return {
        message: 'Fokotany supprimée avec succes',
        fokotany: fokotanyRemove,
        status: 200
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
