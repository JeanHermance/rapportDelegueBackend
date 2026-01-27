import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateObservationDto } from './dto/create-observation.dto';
import { UpdateObservationDto } from './dto/update-observation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Observation } from './entities/observation.entity';
import { Like, Repository } from 'typeorm';
import { Activite } from 'src/activite/entities/activite.entity';

@Injectable()
export class ObservationService {
  constructor(
    @InjectRepository(Observation)
    private readonly observationRepository: Repository<Observation>,
    @InjectRepository(Activite)
    private readonly activiteRepository: Repository<Activite>
  ){}
  async creationObservation(createObservationDto: CreateObservationDto) {
    try {
      let activite = await this.activiteRepository.findOneBy({idActivite: createObservationDto.idActivite})
      if(!activite){
        throw new Error("Activite non trouvée")
      }
      let observation = this.observationRepository.create({
        ...createObservationDto,
        activite
      });

      observation = await this.observationRepository.save(observation);

      return {
        message: "Observation créée avec succès",
        data: observation,
        status: 201
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async listeObservationActivite(limit: number=10,page: number=1,search: string="",idActivite: string="") {
    try {
      const [data, count] = await this.observationRepository.findAndCount({
        where: [
          {activite: {idActivite: idActivite}},
          {description: Like(`%${search}%`)}
        ],
        take: limit,
        skip: (page - 1) * limit
      })
      return {
        message: "liste des observations d'une activité",
        data: data,
        pagination: {
          page,
          limit,
          total: count,
          totalPage: Math.ceil(count / limit)
        }
      }
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async editerObservation(id: string) {
    try {
      const observation = await this.observationRepository.findOne({ where: { idObservation: id } })
      if (!observation) {
        throw new Error('Observation non trouvée')
      }
      return observation
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async miseAJourObservation(id: string, updateObservationDto: UpdateObservationDto) {
    try {
      const observation = await this.observationRepository.findOne({ where: { idObservation: id } })
      if (!observation) {
        throw new Error('Observation non trouvée')
      }
      Object.assign(observation, updateObservationDto)
      const observationUpdate = await this.observationRepository.save(observation)
      return {
        message: 'Observation mise à jour avec succès',
        observation: observationUpdate,
        status: 200
      }
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async supprimerObservation(id: string) {
    try {
      const observation = await this.observationRepository.findOne({ where: { idObservation: id } })
      if (!observation) {
        throw new Error('Observation non trouvée')
      }
      const observationUpdate = await this.observationRepository.remove(observation)
      return {
        message: 'Observation supprimée avec succès',
        observation: observationUpdate,
        status: 200
      }
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }
}
