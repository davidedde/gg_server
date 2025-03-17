import { 
    Controller, 
    Get, 
    Post, 
    Patch, 
    Delete, 
    Body, 
    Param, 
    UseGuards,
    HttpCode,
    HttpStatus
  } from '@nestjs/common';

import { ConversationService } from './providers/conversation.service';
import { CreateDirectConversationDto } from './dtos/direct-conversation.dto';
import { ConversationResponseDto } from './dtos/conversation-response.dto';
import { UpdateGroupConversationDto } from './dtos/updategroup-conversation';
import { CreateGroupConversationDto } from './dtos/creategroup-conversation.dto';




@Controller('conversations')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Post('direct')
  createDirectConversation(
    @Body() createDirectConversationDto: CreateDirectConversationDto
  ): Promise<ConversationResponseDto> {
    return this.conversationService.createDirectConversation(createDirectConversationDto);
  }

  @Post('group')
  createGroupConversation(
    @Body() createGroupConversationDto: CreateGroupConversationDto
  ): Promise<ConversationResponseDto> {
    return this.conversationService.createGroupConversation(createGroupConversationDto);
  }

  @Get()
  getUserConversations(@Request() req): Promise<ConversationResponseDto[]> {
    const userId = req.user.id;
    return this.conversationService.getUserConversations(userId);
  }

  @Get(':id')
  getConversation(@Param('id') id: string): Promise<ConversationResponseDto> {
    return this.conversationService.getConversationById(id);
  }

  @Patch('group/:id')
  updateGroupConversation(
    @Param('id') id: string,
    @Body() updateGroupConversationDto: UpdateGroupConversationDto
  ): Promise<ConversationResponseDto> {
    return this.conversationService.updateGroupConversation(id, updateGroupConversationDto);
  }

  @Post('group/:id/users/:userId')
  addUserToGroupConversation(
    @Param('id') id: string,
    @Param('userId') userId: string
  ): Promise<ConversationResponseDto> {
    return this.conversationService.addUserToGroupConversation(id, userId);
  }

  @Delete('group/:id/users/:userId')
  removeUserFromGroupConversation(
    @Param('id') id: string,
    @Param('userId') userId: string
  ): Promise<ConversationResponseDto> {
    return this.conversationService.removeUserFromGroupConversation(id, userId);
  }

  @Post(':id/archive')
  @HttpCode(HttpStatus.OK)
  archiveConversation(@Param('id') id: string): Promise<ConversationResponseDto> {
    return this.conversationService.updateGroupConversation(id, { isActive: false });
  }

  @Post(':id/restore')
  @HttpCode(HttpStatus.OK)
  restoreConversation(@Param('id') id: string): Promise<ConversationResponseDto> {
    return this.conversationService.updateGroupConversation(id, { isActive: true });
  }
}