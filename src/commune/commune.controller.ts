import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { CommuneService } from './commune.service';
import { CreateCommuneDto } from './dto/create-commune.dto';
import { UpdateCommuneDto } from './dto/update-commune.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBadRequestResponse, ApiConsumes, ApiOperation, ApiQuery } from '@nestjs/swagger';

@Controller('commune')
export class CommuneController {
  constructor(private readonly communeService: CommuneService) { }

  @Post()
  @UseInterceptors(FileInterceptor('logoCommune'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: "Ajouter une commune" })
  @ApiBadRequestResponse({ description: "Erreur lors de l'ajout de la commune" })
  create(@Body() createCommuneDto: CreateCommuneDto, @UploadedFile() logoCommune: Express.Multer.File) {
    return this.communeService.creationCommune(createCommuneDto, logoCommune);
  }

  @Get()
  @ApiOperation({ summary: "Lister les communes" })
  @ApiBadRequestResponse({ description: "Erreur lors de la récupération des communes" })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  findAll(@Query('limit') limit: number, @Query('page') page: number, @Query('search') search: string) {
    return this.communeService.ListeCommunes(limit, page, search);
  }

  @Get(':id')
  @ApiOperation({ summary: "Lister une commune" })
  @ApiBadRequestResponse({ description: "Erreur lors de la récupération d'une commune" })
  findOne(@Param('id') id: string) {
    return this.communeService.editerCommune(id);
  }

  @Patch('/modifier-statut/:id')
  @ApiOperation({ summary: "Mise à jour du statut d'une commune" })
  @ApiBadRequestResponse({ description: "Erreur lors de la mise à jour du statut d'une commune" })
  updateStatus(@Param('id') id: string) {
    return this.communeService.miseAjourStatut(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: "Modifier une commune" })
  @ApiBadRequestResponse({ description: "Erreur lors de la modification d'une commune" })
  update(@Param('id') id: string, @Body() updateCommuneDto: UpdateCommuneDto) {
    return this.communeService.miseAjourCommune(id, updateCommuneDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: "Supprimer une commune" })
  @ApiBadRequestResponse({ description: "Erreur lors de la suppression d'une commune" })
  remove(@Param('id') id: string) {
    return this.communeService.suppressionCommune(id);
  }
}
