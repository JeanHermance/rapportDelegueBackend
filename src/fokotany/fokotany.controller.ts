import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { FokotanyService } from './fokotany.service';
import { CreateFokotanyDto } from './dto/create-fokotany.dto';
import { UpdateFokotanyDto } from './dto/update-fokotany.dto';
import { ApiBadRequestResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';

@Controller('fokotany')
export class FokotanyController {
  constructor(private readonly fokotanyService: FokotanyService) {}

  @Post()
  @ApiOperation({summary: 'Creation de fokotany'})
  @ApiBadRequestResponse({description: "Erreur lors de la création de fokotany"})
  create(@Body() createFokotanyDto: CreateFokotanyDto) {
    return this.fokotanyService.creationFokotany(createFokotanyDto);
  }

  @Get()
  @ApiOperation({summary: 'Liste des fokotany'})
  @ApiBadRequestResponse({description: "Erreur lors de la liste des fokotany"})
  @ApiQuery({name: 'limit', required: false, type: Number})
  @ApiQuery({name: 'page', required: false, type: Number})
  @ApiQuery({name: 'search', required: false, type: String})
  findAll(@Query('limit') limit: number, @Query('page') page: number, @Query('search') search: string) {
    return this.fokotanyService.listFokotany(limit, page, search);
  }

  @Get(':id')
  @ApiOperation({summary: "Editer une fokotany"})
  @ApiBadRequestResponse({description: "Erreur lors de l'edition d'une fokotany"})
  findOne(@Param('id') id: string) {
    return this.fokotanyService.editerFokotany(id);
  }

  @Patch(':id')
  @ApiOperation({summary: "Mise a jour d'une fokotany"})
  @ApiBadRequestResponse({description: "Erreur lors de la mise a jour d'une fokotany"})
  update(@Param('id') id: string, @Body() updateFokotanyDto: UpdateFokotanyDto) {
    return this.fokotanyService.miseAJourFokotany(id, updateFokotanyDto);
  }

  @Delete(':id')
  @ApiOperation({summary: "Suppression d'une fokotany"})
  @ApiBadRequestResponse({description: "Erreur lors de la suppression d'une fokotany"})
  remove(@Param('id') id: string) {
    return this.fokotanyService.supprimerFokotany(id);
  }
}
