import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

import { GameService } from "./game.service";
import { CreateGameDto } from "./dto/create-game.dto";
import { UpdateGameDto } from "./dto/update-game.dto";

@ApiTags("games")
@Controller("games")
export class GameController {
  constructor(
    private readonly gameService: GameService,
  ) {}

  @Post()
  @ApiOperation({ summary: "Create a new game" })
  @ApiResponse({
    status: 201,
    description: "Game created successfully",
  })
  create(
    @Body() createGameDto: CreateGameDto,
  ) {
    return this.gameService.create(createGameDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all games" })
  @ApiResponse({
    status: 200,
    description: "List of games",
  })
  findAll() {
    return this.gameService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a game by id" })
  @ApiResponse({
    status: 200,
    description: "Game found",
  })
  @ApiResponse({
    status: 404,
    description: "Game not found",
  })
  findById(
    @Param("id") id: string,
  ) {
    return this.gameService.findById(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a game" })
  @ApiResponse({
    status: 200,
    description: "Game updated successfully",
  })
  @ApiResponse({
    status: 404,
    description: "Game not found",
  })
  update(
    @Param("id") id: string,
    @Body() updateGameDto: UpdateGameDto,
  ) {
    return this.gameService.update(id, updateGameDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a game" })
  @ApiResponse({
    status: 200,
    description: "Game deleted successfully",
  })
  @ApiResponse({
    status: 404,
    description: "Game not found",
  })
  delete(
    @Param("id") id: string,
  ) {
    return this.gameService.delete(id);
  }
}