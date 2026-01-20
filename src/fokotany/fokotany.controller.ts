import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { FokotanyService } from './fokotany.service';
import { CreateFokotanyDto } from './dto/create-fokotany.dto';
import { UpdateFokotanyDto } from './dto/update-fokotany.dto';
import { ApiBadRequestResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorator/role.decorator';
import { Role } from '../enum/role.enum';

@Controller('fokotany')
export class FokotanyController {
  constructor(private readonly fokotanyService: FokotanyService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({summary: 'Creation de fokotany'})
  @ApiBadRequestResponse({description: "Erreur lors de la création de fokotany"})
  create(@Body() createFokotanyDto: CreateFokotanyDto) {
    return this.fokotanyService.creationFokotany(createFokotanyDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({summary: 'Liste des fokotany'})
  @ApiBadRequestResponse({description: "Erreur lors de la liste des fokotany"})
  @ApiQuery({name: 'limit', required: false, type: Number})
  @ApiQuery({name: 'page', required: false, type: Number})
  @ApiQuery({name: 'search', required: false, type: String})
  findAll(@Query('limit') limit: number, @Query('page') page: number, @Query('search') search: string) {
    return this.fokotanyService.listFokotany(limit, page, search);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({summary: "Editer une fokotany"})
  @ApiBadRequestResponse({description: "Erreur lors de l'edition d'une fokotany"})
  findOne(@Param('id') id: string) {
    return this.fokotanyService.editerFokotany(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({summary: "Mise a jour d'une fokotany"})
  @ApiBadRequestResponse({description: "Erreur lors de la mise a jour d'une fokotany"})
  update(@Param('id') id: string, @Body() updateFokotanyDto: UpdateFokotanyDto) {
    return this.fokotanyService.miseAJourFokotany(id, updateFokotanyDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({summary: "Suppression d'une fokotany"})
  @ApiBadRequestResponse({description: "Erreur lors de la suppression d'une fokotany"})
  remove(@Param('id') id: string) {
    return this.fokotanyService.supprimerFokotany(id);
  }
}
