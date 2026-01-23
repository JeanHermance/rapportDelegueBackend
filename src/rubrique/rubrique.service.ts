import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRubriqueDto } from './dto/create-rubrique.dto';
import { UpdateRubriqueDto } from './dto/update-rubrique.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Rubrique } from './entities/rubrique.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class RubriqueService {
  constructor(
    @InjectRepository(Rubrique)
    private readonly rubriqueRepository: Repository<Rubrique>
  ){}
  async ajoutRubrique(createRubriqueDto: CreateRubriqueDto) {
    try {
      const existeRubrique = await this.rubriqueRepository.findOne({where: {nomRubrique: createRubriqueDto.nomRubrique}})
      if(existeRubrique){
        throw new Error('Rubrique existe deja')
      }
      let rubrique = this.rubriqueRepository.create(createRubriqueDto)
      rubrique = await this.rubriqueRepository.save(rubrique)

      return {
        message: "Rubrique ajouter avec succes",
        data: rubrique,
        status: 201
      }
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async listeRubrique(limit: number =10, page: number =1, search: string ="") {
    try {
      const [rubriques, total] = await this.rubriqueRepository.findAndCount({
        where: [
          {nomRubrique: Like(`%${search}%`)},
          {descriptionRubrique: Like(`%${search}%`)},
        ],
        take: limit,
        skip: (page - 1) * limit,
      })
      return {
        message: "Rubrique lister avec succes",
        data: rubriques,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
        status: 200
      }
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async editerRubrique(id: string) {
    try {
      const rubrique = await this.rubriqueRepository.findOne({where: {idRubrique: id}})
      if(!rubrique){
        throw new Error('Rubrique non trouvée')
      }
      return rubrique
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async miseAJourRubrique(id: string, updateRubriqueDto: UpdateRubriqueDto) {
    try {
      const rubrique = await this.rubriqueRepository.findOne({where: {idRubrique: id}})
      if(!rubrique){
        throw new Error('Rubrique non trouvée')
      }
      Object.assign(rubrique, updateRubriqueDto)
      const rubriqueMiseAJour = await this.rubriqueRepository.save(rubrique)
      return {
        message: "Rubrique mise à jour avec succes",
        data: rubriqueMiseAJour,
        status: 200
      }
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async supprimerRubrique(id: string) {
    try {
      const rubrique = await this.rubriqueRepository.findOne({where: {idRubrique: id}})
      if(!rubrique){
        throw new Error('Rubrique non trouvée')
      }
      const rubriqueSupprime = await this.rubriqueRepository.remove(rubrique)
      return {
        message: "Rubrique supprimée avec succes",
        data: rubriqueSupprime,
        status: 200
      }
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }
}
