import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RubriqueService } from './rubrique.service';
import { CreateRubriqueDto } from './dto/create-rubrique.dto';
import { UpdateRubriqueDto } from './dto/update-rubrique.dto';
import { ApiBadRequestResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';

@Controller('rubrique')
export class RubriqueController {
  constructor(private readonly rubriqueService: RubriqueService) {}

  @Post()
  @ApiOperation({summary: "Ajouter une rubrique"})
  @ApiBadRequestResponse({description: "Erreur lors de l'ajout de la rubrique"})
  create(@Body() createRubriqueDto: CreateRubriqueDto) {
    return this.rubriqueService.ajoutRubrique(createRubriqueDto);
  }

  @Get()
  @ApiOperation({summary: "Lister les rubriques"})
  @ApiBadRequestResponse({description: "Erreur lors de la récupération des rubriques"})
  @ApiQuery({name: "limit", required: false, type: Number})
  @ApiQuery({name: "page", required: false, type: Number})
  @ApiQuery({name: "search", required: false, type: String})
  findAll(@Query('limit') limit: number, @Query('page') page: number, @Query('search') search: string) {
    return this.rubriqueService.listeRubrique(limit, page, search);
  }

  @Get(':id')
  @ApiOperation({summary: "Récupérer une rubrique"})
  @ApiBadRequestResponse({description: "Erreur lors de la récupération d'une rubrique"})
  findOne(@Param('id') id: string) {
    return this.rubriqueService.editerRubrique(id);
  }

  @Patch(':id')
  @ApiOperation({summary: "Modifier une rubrique"})
  @ApiBadRequestResponse({description: "Erreur lors de la modification d'une rubrique"})
  update(@Param('id') id: string, @Body() updateRubriqueDto: UpdateRubriqueDto) {
    return this.rubriqueService.miseAJourRubrique(id, updateRubriqueDto);
  }

  @Delete(':id')
  @ApiOperation({summary: "Supprimer une rubrique"})
  @ApiBadRequestResponse({description: "Erreur lors de la suppression d'une rubrique"})
  remove(@Param('id') id: string) {
    return this.rubriqueService.supprimerRubrique(id);
  }
}
