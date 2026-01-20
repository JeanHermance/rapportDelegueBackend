import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDelegueCommuneDto } from './dto/create-delegue-commune.dto';
import { UpdateDelegueCommuneDto } from './dto/update-delegue-commune.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DelegueCommune } from './entities/delegue-commune.entity';
import { Repository, Like } from 'typeorm';
import { Auth } from 'src/auth/entities/auth.entity';
import { Commune } from 'src/commune/entities/commune.entity';
import { StatutUtilisateur } from '../enum/statututilisateur.enum';

@Injectable()
export class DelegueCommuneService {
  constructor(
    @InjectRepository(DelegueCommune)
    private readonly delegueCommuneRepository: Repository<DelegueCommune>,
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
    @InjectRepository(Commune)
    private readonly communeRepository: Repository<Commune>,
  ) { }
  async assignationUtilisateur(createDelegueCommuneDto: CreateDelegueCommuneDto) {
    try {
      const utilisateur = await this.authRepository.findOne({ where: { idUtilisateur: createDelegueCommuneDto.idUtilisateur, statutUtilisateur: StatutUtilisateur.ACTIF } });
      if (!utilisateur) {
        throw new BadRequestException('Utilisateur non trouvé');
      }

      const commune = await this.communeRepository.findOne({ where: { idCommune: createDelegueCommuneDto.idCommune , statusCommune: true} });
      if (!commune) {
        throw new BadRequestException('Commune non trouvé');
      }

      const existeDelegueCommune = await this.delegueCommuneRepository.findOne({ where: { utilisateur: { idUtilisateur: utilisateur.idUtilisateur }, commune: { idCommune: commune.idCommune } } });
      if (existeDelegueCommune) {
        throw new BadRequestException('DelegueCommune existe deja');
      }

      const delegueCommune = this.delegueCommuneRepository.create({
        utilisateur,
        commune,
      });
      const savedDelegueCommune = await this.delegueCommuneRepository.save(delegueCommune);

      return {
        message: 'DelegueCommune assignee avec succes',
        data: savedDelegueCommune,
        status: 200
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async listeDelegueCommune(limit: number = 10, page: number = 1, search: string = '') {
    try {
      if (search) {
        const [delegue, count] = await this.delegueCommuneRepository.findAndCount({
          take: limit,
          skip: (page - 1) * limit,
          where: [
            { utilisateur: { nom: Like(`%${search}%`) } },
            { utilisateur: { prenom: Like(`%${search}%`) } },
            { utilisateur: { cin: Like(`%${search}%`) } },
            { utilisateur: { telephone: Like(`%${search}%`) } },
            { utilisateur: { email: Like(`%${search}%`) } },
            { commune: { nomCommune: Like(`%${search}%`) } },
          ],
          relations: ['utilisateur', 'commune']
        })

        return {
          message: 'DelegueCommune listes avec succes',
          data: delegue,
          pagination: {
            page,
            limit,
            total: count,
            totalPages: Math.ceil(count / limit)
          },
          status: 200
        }
      } else {
        const [delegue, count] = await this.delegueCommuneRepository.findAndCount({
          take: limit,
          skip: (page - 1) * limit,
          relations: ['utilisateur', 'commune']
        })

        return {
          message: 'DelegueCommune listes avec succes',
          data: delegue,
          pagination: {
            page,
            limit,
            total: count,
            totalPages: Math.ceil(count / limit)
          },
          status: 200
        }
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async editerDelegueCommune(id: string) {
    try {
      const delegueCommune = await this.delegueCommuneRepository.findOne({ where: { idDelegueCommune: id }, relations: ['utilisateur', 'commune'] });
      if (!delegueCommune) {
        throw new BadRequestException('DelegueCommune non trouvé');
      }
      return delegueCommune;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async miseAJourDelegueCommune(id: string, updateDelegueCommuneDto: UpdateDelegueCommuneDto) {
    try {
      const delegueCommune = await this.delegueCommuneRepository.findOne({ where: { idDelegueCommune: id }, relations: ['utilisateur', 'commune'] });
      if (!delegueCommune) {
        throw new BadRequestException('DelegueCommune non trouvé');
      }

      const utilisateur = await this.authRepository.findOne({ where: { idUtilisateur: updateDelegueCommuneDto.idUtilisateur, statutUtilisateur: StatutUtilisateur.ACTIF } });
      if (!utilisateur) {
        throw new BadRequestException('Utilisateur non trouvé');
      }

      const commune = await this.communeRepository.findOne({ where: { idCommune: updateDelegueCommuneDto.idCommune, statusCommune: true } });
      if (!commune) {
        throw new BadRequestException('Commune non trouvé');
      }

      Object.assign(delegueCommune, updateDelegueCommuneDto);
      const delegueCommuneUpdate = await this.delegueCommuneRepository.save(delegueCommune);
      return {
        message: 'DelegueCommune mise a jour avec succes',
        data: delegueCommuneUpdate,
        status: 200
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async miseAJourStatut(id: string) {
    try {
      const delegueCommune = await this.delegueCommuneRepository.findOne({ where: { idDelegueCommune: id }, relations: ['utilisateur', 'commune'] });
      if (!delegueCommune) {
        throw new BadRequestException('DelegueCommune non trouvé');
      }

      delegueCommune.statusDelegueCommune = !delegueCommune.statusDelegueCommune;
      const delegueCommuneUpdate = await this.delegueCommuneRepository.save(delegueCommune);
      return {
        message: 'DelegueCommune mise a jour avec succes',
        data: delegueCommuneUpdate,
        status: 200
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
