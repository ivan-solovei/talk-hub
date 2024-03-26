import { Model } from "mongoose";
import { Injectable, Inject } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
// import { User } from './interfaces/user.interface';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(
      @Inject('USER_MODEL') 
      private readonly userModel: Model<User>
    ) {}

//   private readonly users: User[];
    // {
    //   userId: '1',
    //   userName: 'john',
    //   password: 'changeme',
    //   name: 'changeme',
    //   surname: 'changeme',
    //   email: 'changeme',
    // }
//   ];

    async create(createUserDto: CreateUserDto): Promise<User> {
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async findOne(name: string): Promise<User> {
        return this.userModel.findOne({ name: name }).exec();
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