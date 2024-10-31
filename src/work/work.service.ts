import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWorkDto } from './create-work.dto';

@Injectable()
export class WorkService {
    private works = [];

    create(createWorkDto: CreateWorkDto) {
      const newWork = { id: Date.now(), ...createWorkDto };
      this.works.push(newWork);
      return newWork;
    }

    findAll(filter?: string) {
      if (filter === 'published') {
          return this.works.filter(work => work.status);
      } else if (filter === 'hidden') {
          return this.works.filter(work => !work.status);
      }
      return this.works;
  }
  

    findOne(id: number) {
      const work = this.works.find(work => work.id === id);
      if (!work) {
        throw new NotFoundException(`The work with id ${id} was not found`);
      }
      return work;
    }

    update(id: number, updateWorkDto: CreateWorkDto) {
      const index = this.works.findIndex(work => work.id === id);
      if (index === -1) {
        throw new NotFoundException(`The work with id ${id} was not found`);
      }
      this.works[index] = { ...this.works[index], ...updateWorkDto };
      return this.works[index];
    }

    remove(id: number) {
      const index = this.works.findIndex(work => work.id === id);
      if (index === -1) {
        throw new NotFoundException(`The work with id ${id} was not found.`);
      }
      const deleted = this.works.splice(index, 1);
      return deleted[0];
    }
}
