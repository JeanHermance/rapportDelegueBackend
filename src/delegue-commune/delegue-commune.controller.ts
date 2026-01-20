import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DelegueCommuneService } from './delegue-commune.service';
import { CreateDelegueCommuneDto } from './dto/create-delegue-commune.dto';
import { UpdateDelegueCommuneDto } from './dto/update-delegue-commune.dto';
import { ApiBadRequestResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorator/role.decorator';
import { Role } from '../enum/role.enum';
import { UseGuards } from '@nestjs/common';

@Controller('delegue-commune')
export class DelegueCommuneController {
  constructor(private readonly delegueCommuneService: DelegueCommuneService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: "Assigner une delegue a une commune"})
  @ApiBadRequestResponse({description: "Erreur lors de l'assignation d'une delegue a une commune"})
  create(@Body() createDelegueCommuneDto: CreateDelegueCommuneDto) {
    return this.delegueCommuneService.assignationUtilisateur(createDelegueCommuneDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: "Lister les delegues assignees a une commune"})
  @ApiBadRequestResponse({description: "Erreur lors de la liste des delegues assignees a une commune"})
  @ApiQuery({name: 'limit', required: false, type: Number})
  @ApiQuery({name: 'page', required: false, type: Number})
  @ApiQuery({name: 'search', required: false, type: String})
  findAll(@Query('limit') limit: number, @Query('page') page: number, @Query('search') search: string) {
    return this.delegueCommuneService.listeDelegueCommune(limit, page, search);
  }


  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Editer une delegue de commune"})
  @ApiBadRequestResponse({description: "Erreur lors de l'edition d'une delegue de commune"})
  findOne(@Param('id') id: string) {
    return this.delegueCommuneService.editerDelegueCommune(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: "Modifier une delegue de commune"})
  @ApiBadRequestResponse({description: "Erreur lors de la modification d'une delegue de commune"})
  update(@Param('id') id: string, @Body() updateDelegueCommuneDto: UpdateDelegueCommuneDto) {
    return this.delegueCommuneService.miseAJourDelegueCommune(id, updateDelegueCommuneDto);
  }

  @Patch('/modifier-statut/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: "Modifier le statut d'une delegue de commune"})
  @ApiBadRequestResponse({description: "Erreur lors de la modification du statut d'une delegue de commune"})
  updateStatut(@Param('id') id: string) {
    return this.delegueCommuneService.miseAJourStatut(id);
  }
}
