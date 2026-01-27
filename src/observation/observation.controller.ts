import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ObservationService } from './observation.service';
import { CreateObservationDto } from './dto/create-observation.dto';
import { UpdateObservationDto } from './dto/update-observation.dto';
import { ApiBadRequestResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';

@Controller('observation')
export class ObservationController {
  constructor(private readonly observationService: ObservationService) {}

  @Post()
  @ApiOperation({summary: "Création d'une observation"})
  @ApiBadRequestResponse({description: "Erreur lors de la création de l'observation"})
  create(@Body() createObservationDto: CreateObservationDto) {
    return this.observationService.creationObservation(createObservationDto);
  }

  @Get()
  @ApiOperation({summary: "Récupération de toutes les observations d'une activité"})
  @ApiBadRequestResponse({description: "Erreur lors de la récupération de toutes les observations"})
  @ApiQuery({type: 'number', name: 'limit', required: false})
  @ApiQuery({type: 'number', name: 'page', required: false})
  @ApiQuery({type: 'string', name: 'search', required: false})
  @ApiQuery({type: 'string', name: 'idActivite', required: true})
  findAll(@Query('limit') limit: number, @Query('page') page: number, @Query('search') search: string, @Query('idActivite') idActivite: string) {
    return this.observationService.listeObservationActivite(limit, page, search, idActivite);
  }

  @Get(':id')
  @ApiOperation({summary: "Récupération d'une observation"})
  @ApiBadRequestResponse({description: "Erreur lors de la récupération d'une observation"})
  findOne(@Param('id') id: string) {
    return this.observationService.editerObservation(id);
  }

  @Patch(':id')
  @ApiOperation({summary: "Mise à jour d'une observation"})
  @ApiBadRequestResponse({description: "Erreur lors de la mise à jour d'une observation"}) 
  update(@Param('id') id: string, @Body() updateObservationDto: UpdateObservationDto) {
    return this.observationService.miseAJourObservation(id, updateObservationDto);
  }

  @Delete(':id')
  @ApiOperation({summary: "Suppression d'une observation"})
  @ApiBadRequestResponse({description: "Erreur lors de la suppression d'une observation"})
  remove(@Param('id') id: string) {
    return this.observationService.supprimerObservation(id);
  }
}
