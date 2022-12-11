import {Body, Controller,Patch, Post, Get, Param, UseGuards, Query} from '@nestjs/common';
import { ComplaintsService } from './complaints.service';
import { CreateComplaintDto } from './dtos/create-complaint.dto';
import { UpdateComplaintDto } from './dtos/update-complaint.dto';
import mongoose from 'mongoose';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { AdminUserGuard } from '../guards/adminUser.guard';
import { isAdmin } from '../decorators/adminUser.decorator';
import { ComplaintStatus } from '../types/types';

@Controller('/complaints')
export class ComplaintsController {
    constructor(private complaintsService: ComplaintsService){}
    
    @UseGuards(AdminUserGuard)
    @isAdmin(false)
    @Post('/createComplaint')
    async createComplaint(@Body() body: CreateComplaintDto, @CurrentUser() user: mongoose.Types.ObjectId){
        return await this.complaintsService.createComplaint(body, user);
    }

    @UseGuards(AdminUserGuard)
    @isAdmin(false)
    @Get('/viewUserComplaints')
    viewUserComplaints(@CurrentUser() user: mongoose.Types.ObjectId){
        return this.complaintsService.getUserComplaints(user);
    }

    @UseGuards(AdminUserGuard)
    @isAdmin(true)
    @Get('/getComplaint/:id')
    findComplaint(@Param('id') id: mongoose.Types.ObjectId){
        return this.complaintsService.findComplaint(id);
    }

    @UseGuards(AdminUserGuard)
    @isAdmin(true)
    @Patch('/updateComplaintStatus/:id')
    updateComplaint(@Param('id') id: mongoose.Types.ObjectId, @Body() body: UpdateComplaintDto){
        return this.complaintsService.updateComplaint(id, body.status);
    }

    @UseGuards(AdminUserGuard)
    @isAdmin(true)
    @Get('/query')
    async queryComplaints(@Query('status') status?: ComplaintStatus){
        return await this.complaintsService.getQueryResult(status);
    }
}

