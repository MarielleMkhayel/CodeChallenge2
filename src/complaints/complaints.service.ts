import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { ComplaintStatus } from '../types/types';
import { User } from '../users/user.model';
import {ComplaintDocument} from './complaint.model';
import { CreateComplaintDto } from './dtos/create-complaint.dto';

@Injectable()
export class ComplaintsService {

    constructor(@InjectModel('Complaint') private complaintModel: Model<ComplaintDocument>,  
    @InjectModel(User.name) private userModel: Model<User>){}

    //create a complaint
    async createComplaint(complaintDto: CreateComplaintDto, user: mongoose.Types.ObjectId) {
        const complaint = new this.complaintModel(complaintDto);
        const userId = await this.userModel.findById(user);
        if(!userId){
            throw new NotFoundException('User not found')
        }
        complaint.user = userId.id;
        return complaint.save();
    }

    //get complaints pertaining to one user
    getUserComplaints(user: mongoose.Types.ObjectId){
        return this.complaintModel.find({user: user});
    }

    //get one complaint
    async findComplaint(id: mongoose.Types.ObjectId){
        const complaint = await this.complaintModel.findById(id);
        if(!id){
            throw new NotFoundException('Complaint not found');
        }
        return complaint;
    }

    //update complaint status
    async updateComplaint(id: mongoose.Types.ObjectId, status: ComplaintStatus) {
        const complaint = await this.complaintModel.findById(id);
        if (!complaint) {
          throw new NotFoundException('User not found');
        }
        complaint.status= status;
        return complaint.save();
    }

    //complaints query
    async getQueryResult(status?: ComplaintStatus) {
        return await this.complaintModel.aggregate([
            {$match: (status ? {status:status}: {})},
            {$sort: {createdAt: -1}},
            {$lookup: {
                from: 'users', 
                localField: 'user', 
                foreignField: '_id',
                as: 'user'
            }},
             {$unwind: '$user'},
             {
                $group: {
                _id: null,
                VIP: { $addToSet: {$cond: {if: '$user.isVIP', then: '$$ROOT', else: '' }}},
                nonVIP: { $addToSet: {$cond:[{$eq: ['$user.isVIP', false]}, '$$ROOT', '' ]},
                } 
                }},
            {$project: {
                "_id": 0,
                "VIP.title": 1,
                "VIP.body": 1,
                "VIP.createdAt": 1,
                "VIP.status": 1,
                "VIP.user.firstName": 1,
                "VIP.user.lastName": 1,
                "VIP.user.email": 1,
                "nonVIP.title": 1,
                "nonVIP.body": 1,
                "nonVIP.createdAt": 1,
                "nonVIP.status": 1,
                "nonVIP.user.firstName": 1,
                "nonVIP.user.lastName": 1,
                "nonVIP.user.email": 1,
                }}
        ])
    }
}