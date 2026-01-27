import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePieceJointeDto } from './dto/create-piece-jointe.dto';
import { UpdatePieceJointeDto } from './dto/update-piece-jointe.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PieceJointe } from './entities/piece-jointe.entity';
import { Repository } from 'typeorm';
import { Observation } from 'src/observation/entities/observation.entity';
import { CloudinaryService } from 'src/auth/cloudinary/cloudinary.service';

@Injectable()
export class PieceJointeService {
  constructor(
    @InjectRepository(PieceJointe)
    private readonly piecejointeRepository: Repository<PieceJointe>,
    @InjectRepository(Observation)
    private readonly observationRepository: Repository<Observation>,
    private readonly cloudinaryService: CloudinaryService,
  ) { }
  async insertPieceJointe(createPieceJointeDto: CreatePieceJointeDto, fichier: Express.Multer.File) {
    try {
      const observation = await this.observationRepository.findOne({ where: { idObservation: createPieceJointeDto.idObservation } })
      if (!observation) {
        throw new Error("Observation non trouvée")
      }

      const isImage = fichier.mimetype.startsWith('image/');

      const uploadResult = isImage
        ? await this.cloudinaryService.uploadImage(fichier)
        : await this.cloudinaryService.uploadFile(fichier);

      console.log('PieceJointeService Upload Result:', uploadResult);


      let pieceJointe = this.piecejointeRepository.create({
        nomPieceJointe: fichier.originalname,
        urlPieceJointe: uploadResult.secure_url,
        typePieceJointe: fichier.mimetype,
        taillePieceJointe: fichier.size,
        observation: observation
      });

      pieceJointe = await this.piecejointeRepository.save(pieceJointe)

      return {
        message: "Piece insert avec succès",
        data: pieceJointe,
        status: 201
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async listesPieceJointeUneObservation(limit: number = 10, page: number = 1, idObservation: string) {
    try {
      const [data, count] = await this.piecejointeRepository.findAndCount({
        where: [
          { observation: { idObservation: idObservation } }
        ],
        take: limit,
        skip: (page - 1) * limit
      })

      return {
        message: "liste des Piece Jointe",
        date: data,
        pagination: {
          page,
          limit,
          total: count,
          totalPage: Math.ceil(count / limit)
        }
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async editerPieceJointe(id: string) {
    try {
      const pieceJointe = await this.piecejointeRepository.findOne({ where: { idPieceJointe: id } })
      if (!pieceJointe) {
        throw new Error('Piece Jointe non trouvée')
      }
      return pieceJointe
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async supprimerPieceJoint(id: string) {
    try {
      const pieceJointe = await this.piecejointeRepository.findOne({ where: { idPieceJointe: id } })
      if (!pieceJointe) {
        throw new Error('Piece Jointe non trouvée')
      }
      const fileName = pieceJointe.urlPieceJointe.split('/').pop();
      if (!fileName) {
        throw new BadRequestException('URL invalide pour la pièce jointe');
      }
      const publicId = fileName.split('.')[0];
      await this.cloudinaryService.deleteFile(publicId);

      const pieceJointeDelete = await this.piecejointeRepository.remove(pieceJointe);
      return {
        message: "suppression d'une piéce jointe avec succé",
        date: pieceJointeDelete,
        status: 200
      }
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }
}
