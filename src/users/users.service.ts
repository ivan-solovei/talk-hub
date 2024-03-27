import { Model } from "mongoose";
import { Injectable, Inject } from "@nestjs/common";
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(
      @Inject('USER_MODEL') 
      private readonly userModel: Model<User>
    ) {}


    async create(createUserDto: CreateUserDto): Promise<User> {
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async findOne(name: string): Promise<User> {
        return this.userModel.findOne({ userName: name });
      }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {;
        const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
        return updatedUser;
    }

    async delete(id: string): Promise<User> {
        const deletedUser = await this.userModel
        .findByIdAndDelete({ _id: id })
        .exec();
      return deletedUser;
    }
}