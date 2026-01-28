import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateActiviteDto } from './dto/create-activite.dto';
import { UpdateActiviteDto } from './dto/update-activite.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Activite } from './entities/activite.entity';
import { Like, Repository } from 'typeorm';
import { Rubrique } from 'src/rubrique/entities/rubrique.entity';
import { Auth } from 'src/auth/entities/auth.entity';

@Injectable()
export class ActiviteService {
  constructor(
    @InjectRepository(Activite)
    private readonly activiteRepository: Repository<Activite>,
    @InjectRepository(Rubrique)
    private readonly rubriqueRepository: Repository<Rubrique>,
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>
  ) { }
  async creationActivite(createActiviteDto: CreateActiviteDto) {
    try {
      let rubrique = await this.rubriqueRepository.findOne({ where: { idRubrique: createActiviteDto.idRubrique } });
      if (!rubrique) {
        throw new BadRequestException("Rubrique non trouvee");
      }

      let auth = await this.authRepository.findOne({ where: { idUtilisateur: createActiviteDto.idUtilisateur } });
      if (!auth) {
        throw new BadRequestException("Utilisateur non trouve");
      }

      let activite = this.activiteRepository.create({
        ...createActiviteDto,
        rubrique: rubrique,
        auth: auth
      });

      activite = await this.activiteRepository.save(activite);

      return {
        message: "Activite cree avec succes",
        data: activite,
        status: 201
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async listeActivites(limit: number = 10, page: number = 1, search: string = "", idRubrique?: string) {
    try {
      if (idRubrique) {
        const rubrique = await this.rubriqueRepository.findOne({ where: { idRubrique: idRubrique } });
        if (!rubrique) {
          throw new BadRequestException("Rubrique non trouvee");
        }
      }
      const [activites, count] = await this.activiteRepository.findAndCount({
        where: [
          { titre: Like(`%${search}%`) },
          { rubrique: { nomRubrique: Like(`%${search}%`) } },
          { rubrique: { descriptionRubrique: Like(`%${search}%`) } },
          { auth: { nom: Like(`%${search}%`) } },
          { auth: { prenom: Like(`%${search}%`) } },
          { auth: { email: Like(`%${search}%`) } },
          { rubrique: { idRubrique: idRubrique } }
        ],
        relations: ['rubrique', 'auth', 'observations', 'observations.pieceJointes'],
        take: limit,
        skip: (page - 1) * limit
      });

      return {
        message: "Liste des activites",
        data: activites,
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

  async listActiviteUtilisateur(idUtilisateur: string, idRubrique?: string, statut?: boolean) {
    try {
      const auth = await this.authRepository.findOne({ where: { idUtilisateur: idUtilisateur } });
      if (!auth) {
        throw new BadRequestException("Utilisateur non trouve");
      }

      if (idRubrique) {
        const rubrique = await this.rubriqueRepository.findOne({ where: { idRubrique: idRubrique } });
        if (!rubrique) {
          throw new BadRequestException("Rubrique non trouvee");
        }
      }

      const where: any = {
        auth: { idUtilisateur: idUtilisateur }
      };

      if (idRubrique) {
        where.rubrique = { idRubrique: idRubrique };
      }

      if (statut !== undefined) {
        // Handle string 'true'/'false' if transformation isn't perfect, though boolean is expected
        where.statut = statut;
      }

      const activites = await this.activiteRepository.find({
        where: where,
        relations: ['rubrique', 'observations', 'observations.pieceJointes']
      });

      return {
        message: "Liste des activites",
        data: activites,
        status: 200
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }


  async editerActivite(id: string) {
    try {
      const activite = await this.activiteRepository.findOne({ where: { idActivite: id }, relations: ['rubrique', 'auth', 'observations', 'observations.pieceJointes'] });
      if (!activite) {
        throw new Error('Activite non trouvee');
      }
      return activite;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async miseAJourActivite(id: string, updateActiviteDto: UpdateActiviteDto) {
    try {
      const activite = await this.activiteRepository.findOne({ where: { idActivite: id } ,relations: ['auth']});
      if (!activite) {
        throw new Error('Activite non trouvee');
      }

      console.log(activite.auth.idUtilisateur, updateActiviteDto.idUtilisateur);

      if (activite.auth.idUtilisateur !== updateActiviteDto.idUtilisateur) {
        throw new Error('Vous n\'avez pas le droit de modifier cette activite');
      }

      Object.assign(activite, updateActiviteDto);
      const activiteUpdate = await this.activiteRepository.save(activite);
      return {
        message: 'Activite mise a jour avec succes',
        activite: activiteUpdate,
        status: 200
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async miseAJourStatutActivite(id: string) {
    try {
      const activite = await this.activiteRepository.findOne({ where: { idActivite: id } });
      if (!activite) {
        throw new Error('Activite non trouvee');
      }

      activite.statut = !activite.statut;
      const activiteUpdate = await this.activiteRepository.save(activite);
      return {
        message: 'Statut de l\'activite mise a jour avec succes',
        activite: activiteUpdate,
        status: 200
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async supprimerActivite(id: string) {
    try {
      const activite = await this.activiteRepository.findOne({ where: { idActivite: id }, relations: ['rubrique', 'auth'] });
      if (!activite) {
        throw new Error('Activite non trouvee');
      }

      const activiteUpdate = await this.activiteRepository.remove(activite);
      return {
        message: 'Activite supprimee avec succes',
        activite: activiteUpdate,
        status: 200
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
