import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCommuneDto } from './dto/create-commune.dto';
import { UpdateCommuneDto } from './dto/update-commune.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Commune } from './entities/commune.entity';
import { Repository, Like } from 'typeorm';
import { CloudinaryService } from 'src/auth/cloudinary/cloudinary.service';
import { count } from 'console';

@Injectable()
export class CommuneService {
  constructor(
    @InjectRepository(Commune)
    private readonly communeRepository: Repository<Commune>,
    private readonly cloudinaryService: CloudinaryService,
  ) { }
  async creationCommune(createCommuneDto: CreateCommuneDto, logoCommune: Express.Multer.File) {
    try {
      const commune = await this.communeRepository.findOne({ where: { nomCommune: createCommuneDto.nomCommune, codeCommune: createCommuneDto.codeCommune, emailCommune: createCommuneDto.emailCommune } });

      if (commune) {
        throw new Error('Commune existe déjà');
      }
      if (logoCommune) {
        const upload = await this.cloudinaryService.uploadImage(logoCommune);
        createCommuneDto.logoCommune = upload.url;
      }
      let newCommune = this.communeRepository.create(createCommuneDto);
      newCommune = await this.communeRepository.save(newCommune);

      return {
        message: "Commune ajouter avec succès",
        data: newCommune,
        status: 201
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async ListeCommunes(limit: number = 10, page: number = 1, search: string = "") {
    try {

      if (search) {
        const [listeCommunes, count] = await this.communeRepository.findAndCount({
          take: limit,
          skip: (page - 1) * limit,
          where: [
            { nomCommune: Like(`%${search}%`) },
            { codeCommune: Like(`%${search}%`) },
            { emailCommune: Like(`%${search}%`) },
          ],
          relations: ['fokotanys']
        });
        return {
          message: "Liste des communes",
          data: listeCommunes,
          pagination: {
            page: page,
            limit: limit,
            total: count,
            totalPages: Math.ceil(count / limit),
          },
          status: 200
        }
      } else {
        const [listeCommunes, count] = await this.communeRepository.findAndCount({
          take: limit,
          skip: (page - 1) * limit,
          relations: ['fokotanys']
        });

        return {
          message: "Liste des communes",
          data: listeCommunes,
          pagination: {
            page: page,
            limit: limit,
            total: count,
            totalPages: Math.ceil(count / limit),
          },
          status: 200
        }
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async fokotanyCommune(id: string) {
    try {
      const commune = await this.communeRepository.findOne({ where: { idCommune: id }, relations: ['fokotanys'] });
      if (!commune) {
        throw new Error('Commune non trouvée');
      }
      return {
        message: "Fokotany de la commune",
        data: commune,
        status: 200
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async editerCommune(id: string) {
    try {
      const commune = await this.communeRepository.findOne({ where: { idCommune: id }, relations: ['fokotanys'] });
      if (!commune) {
        throw new Error('Commune non trouvée');
      }
      return commune;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async miseAjourCommune(id: string, updateCommuneDto: UpdateCommuneDto) {
    try {
      const commune = await this.communeRepository.findOne({ where: { idCommune: id } });
      if (!commune) {
        throw new Error('Commune non trouvée');
      }
      Object.assign(commune, updateCommuneDto);
      const communeAJour = await this.communeRepository.save(commune);
      return {
        message: "Commune mise à jour avec succès",
        data: communeAJour,
        status: 200
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async suppressionCommune(id: string) {
    try {
      const commune = await this.communeRepository.findOne({ where: { idCommune: id } });
      if (!commune) {
        throw new Error('Commune non trouvée');
      }
      const filename = commune.logoCommune.split('/').pop();
      if (filename) {
        const publicId = filename.split('.')[0];
        await this.cloudinaryService.deleteFile(publicId);
      }
      const communeSupprime = await this.communeRepository.remove(commune);
      return {
        message: "Commune supprimée avec succès",
        data: communeSupprime,
        status: 200
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async miseAjourStatut(id: string) {
    try {
      const commune = await this.communeRepository.findOne({ where: { idCommune: id } });
      if (!commune) {
        throw new Error('Commune non trouvée');
      }
      if (commune.statusCommune == false) {
        commune.statusCommune = true;
      } else {
        commune.statusCommune = false;
      }
      const communeAJour = await this.communeRepository.save(commune);
      return {
        message: "Commune mise à jour avec succès",
        data: communeAJour,
        status: 200
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
