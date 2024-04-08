import { Model } from "mongoose";
import { Injectable, Inject, Logger } from "@nestjs/common";
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
    constructor(
      @Inject('USER_MODEL') 
      private readonly userModel: Model<User>
    ) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
      try {
        return new this.userModel(createUserDto)
          .save()
      } catch (error) {
        this.logger.log('Unable to create new User', error)
      }
    }

    async findAll(): Promise<User[]> {
      try {
        return this.userModel
          .find()
          .exec()
      } catch (error) {
        this.logger.log('Unable to find all Users', error)
      }
    }

    async findOne(name: string): Promise<User> {
      try {
        return this.userModel
          .findOne({ userName: name })
      } catch (error) {
        this.logger.log(`Unable to find User by Name: ${name}`, error)
      }
    }

    async findUserById(id: string): Promise<User> {
      try {
        return this.userModel
          .findById(id)
          .exec()
      } catch (error) {
        this.logger.log(`Unable to find User by Id: ${id}`, error)
      }
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {;
        try {
          return await this.userModel
            .findByIdAndUpdate(id, updateUserDto, { new: true })
        } catch (error) {
          this.logger.log(`Unable to update User`, error)          
        }
    }

    async delete(id: string): Promise<User> {
      try {
        return await this.userModel
          .findByIdAndDelete(id)
          .exec();
      } catch (error) {
        this.logger.log(`Unable to delete User`, error)          
      }
    }
}