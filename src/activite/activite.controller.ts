import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ActiviteService } from './activite.service';
import { CreateActiviteDto } from './dto/create-activite.dto';
import { UpdateActiviteDto } from './dto/update-activite.dto';
import { ApiBadRequestResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';

@Controller('activite')
export class ActiviteController {
  constructor(private readonly activiteService: ActiviteService) {}

  @Post()
  @ApiOperation({summary: "Ajouter une activite"})
  @ApiBadRequestResponse({description: "Erreur lors de la creation de l'activite"})
  create(@Body() createActiviteDto: CreateActiviteDto) {
    return this.activiteService.creationActivite(createActiviteDto);
  }

  @Get()
  @ApiOperation({summary: "Lister les activites"})
  @ApiBadRequestResponse({description: "Erreur lors de la listage des activites"})
  @ApiQuery({name: 'page', required: false, type: Number})
  @ApiQuery({name: 'limit', required: false, type: Number})
  @ApiQuery({name: 'search', required: false, type: String})
  @ApiQuery({name: 'idRubrique', required: false, type: String})
  findAll(@Query("page") page: number, @Query("limit") limit: number, @Query("search") search: string, @Query("idRubrique") idRubrique: string) {
    return this.activiteService.listeActivites(page, limit, search, idRubrique);
  }

  @Get("utilisateur")
  @ApiOperation({summary: "Lister les activites d'un utilisateur"})
  @ApiBadRequestResponse({description: "Erreur lors de la listage des activites d'un utilisateur"})
  @ApiQuery({name: 'idUtilisateur', required: true, type: String})
  @ApiQuery({name: 'idRubrique', required: false, type: String, default: ''})
  listActiviteUtilisateur(@Query("idUtilisateur") idUtilisateur: string, @Query("idRubrique") idRubrique: string) {
    return this.activiteService.listActiviteUtilisateur(idUtilisateur, idRubrique);
  }

  @Get(':id')
  @ApiOperation({summary: "Lister une activite"})
  @ApiBadRequestResponse({description: "Erreur lors de la listage d'une activite"})
  findOne(@Param('id') id: string) {
    return this.activiteService.editerActivite(id);
  }

  @Patch(':id')
  @ApiOperation({summary: "Modifier une activite"})
  @ApiBadRequestResponse({description: "Erreur lors de la modification d'une activite"})
  update(@Param('id') id: string, @Body() updateActiviteDto: UpdateActiviteDto) {
    return this.activiteService.miseAJourActivite(id, updateActiviteDto);
  }

  @Delete(':id')
  @ApiOperation({summary: "Supprimer une activite"})
  @ApiBadRequestResponse({description: "Erreur lors de la suppression d'une activite"})
  remove(@Param('id') id: string) {
    return this.activiteService.supprimerActivite(id);
  }
}
