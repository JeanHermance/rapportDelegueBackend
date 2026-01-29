import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFile, Res, StreamableFile } from '@nestjs/common';
import { PieceJointeService } from './piece-jointe.service';
import { CreatePieceJointeDto } from './dto/create-piece-jointe.dto';
import { UpdatePieceJointeDto } from './dto/update-piece-jointe.dto';
import { ApiBadRequestResponse, ApiConsumes, ApiOperation, ApiProduces, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';

@Controller('piece-jointe')
export class PieceJointeController {
  constructor(private readonly pieceJointeService: PieceJointeService) { }

  @Post()
  @ApiOperation({ summary: "Ajouter une piece jointe" })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('fichier'))
  @ApiBadRequestResponse({ description: "Erreur lors de l'ajout d'une piece jointe" })
  create(@Body() createPieceJointeDto: CreatePieceJointeDto, @UploadedFile() fichier: Express.Multer.File) {
    return this.pieceJointeService.insertPieceJointe(createPieceJointeDto, fichier);
  }

  @Get()
  @ApiOperation({ description: "Lister les pieces jointes d'une observation" })
  @ApiBadRequestResponse({ description: "Erreur lors de la liste des pieces jointes" })
  @ApiQuery({ type: 'number', name: 'limit', required: false })
  @ApiQuery({ type: 'number', name: 'page', required: false })
  @ApiQuery({ type: 'string', name: 'idObservation', required: true })
  findAll(@Query('limit') limit: number, @Query('page') page: number, @Query('idObservation') idObservation: string) {
    return this.pieceJointeService.listesPieceJointeUneObservation(limit, page, idObservation);
  }

  @Get(':id')
  @ApiOperation({ summary: "Editer une piece jointe" })
  @ApiBadRequestResponse({ description: "Erreur lors de l'edition d'une piece jointe" })
  findOne(@Param('id') id: string) {
    return this.pieceJointeService.editerPieceJointe(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: "Supprimer une piece jointe" })
  @ApiBadRequestResponse({ description: "Erreur lors de la suppression d'une piece jointe" })
  remove(@Param('id') id: string) {
    return this.pieceJointeService.supprimerPieceJoint(id);
  }

  @Get(':id/telecharger')
  @ApiOperation({ summary: 'Télécharger une pièce jointe' })
  @ApiResponse({ status: 200, description: 'Pièce jointe téléchargée avec succès' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiConsumes('application/json')
  @ApiProduces('application/octet-stream')
  async download(@Param('id') id: string, @Res({ passthrough: true }) res: Response) {
    const { stream, typePieceJointe, nomPieceJointe, taillePieceJointe } = await this.pieceJointeService.download(id);

    res.set({
      'Content-Type': typePieceJointe,
      'Content-Disposition': `attachment; filename="${nomPieceJointe}"`,
      'Content-Length': taillePieceJointe,
    });
    return new StreamableFile(stream);
  }
}
