import { Model } from "mongoose";
import { Injectable, Inject } from "@nestjs/common";
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @Inject('USER_MODEL')
        private readonly userModel: Model<User>,
        private readonly users: User[] = [],
    ) {}


    async create(createUserDto: CreateUserDto): Promise<User> {
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async findOne(id: string): Promise<any> {
        return this.userModel.find(user => user.id === id);
    }
    
    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex === -1) {
          return null;
        }
        // this.users[userIndex] = { ...this.users[userIndex], ...updateUserDto };
        this.users[userIndex];
        return this.users[userIndex];
    }

    async delete(id: string): Promise<User> {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex === -1) {
            return null;
        }
        const deletedUser = this.users[userIndex];
        this.users.splice(userIndex, 1);
        return deletedUser;
    }
}