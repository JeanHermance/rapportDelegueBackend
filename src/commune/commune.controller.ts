import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Query, UseGuards } from '@nestjs/common';
import { CommuneService } from './commune.service';
import { CreateCommuneDto } from './dto/create-commune.dto';
import { UpdateCommuneDto } from './dto/update-commune.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBadRequestResponse, ApiConsumes, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorator/role.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Role } from '../enum/role.enum';

@Controller('commune')
export class CommuneController {
  constructor(private readonly communeService: CommuneService) { }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @UseInterceptors(FileInterceptor('logoCommune'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: "Ajouter une commune" })
  @ApiBadRequestResponse({ description: "Erreur lors de l'ajout de la commune" })
  create(@Body() createCommuneDto: CreateCommuneDto, @UploadedFile() logoCommune: Express.Multer.File) {
    return this.communeService.creationCommune(createCommuneDto, logoCommune);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Lister les communes" })
  @ApiBadRequestResponse({ description: "Erreur lors de la récupération des communes" })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  findAll(@Query('limit') limit: number, @Query('page') page: number, @Query('search') search: string) {
    return this.communeService.ListeCommunes(limit, page, search);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Editer une commune" })
  @ApiBadRequestResponse({ description: "Erreur lors de la récupération d'une commune" })
  findOne(@Param('id') id: string) {
    return this.communeService.editerCommune(id);
  }

  @Get('/fokotany/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Lister les fokotany d'une commune" })
  @ApiBadRequestResponse({ description: "Erreur lors de la récupération des fokotany d'une commune" })
  findAllFokotany(@Param('id') id: string) {
    return this.communeService.fokotanyCommune(id);
  }

  @Patch('/modifier-statut/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: "Mise à jour du statut d'une commune" })
  @ApiBadRequestResponse({ description: "Erreur lors de la mise à jour du statut d'une commune" })
  updateStatus(@Param('id') id: string) {
    return this.communeService.miseAjourStatut(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: "Modifier une commune" })
  @ApiBadRequestResponse({ description: "Erreur lors de la modification d'une commune" })
  update(@Param('id') id: string, @Body() updateCommuneDto: UpdateCommuneDto) {
    return this.communeService.miseAjourCommune(id, updateCommuneDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: "Supprimer une commune" })
  @ApiBadRequestResponse({ description: "Erreur lors de la suppression d'une commune" })
  remove(@Param('id') id: string) {
    return this.communeService.suppressionCommune(id);
  }
}
