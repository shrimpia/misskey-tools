/**
 * バージョン情報など、サーバーのメタデータを返すAPI
 * @author Xeltica
 */

import { BadRequestError, Body, CurrentUser, Delete, Get, JsonController, NotFoundError, OnUndefined, Param, Post, Put } from 'routing-controllers';
import { IUser } from 'tools-shared/dist/types/user.js';
import { AnnounceCreate } from './body/announce-create.js';
import { AnnounceUpdate } from './body/announce-update.js';
import { IdProp } from './body/id-prop.js';
import {prisma} from '../libs/prisma.js';

@JsonController('/announcements')
export class AnnouncementController {
  @Get() get() {
    return prisma.announcement.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  @OnUndefined(204)
  @Post() async post(@CurrentUser({ required: true }) user: IUser, @Body({required: true}) {title, body}: AnnounceCreate) {
    if (!user.isAdmin) {
      throw new BadRequestError('Not an Admin');
    }
    if (!title || !body) {
      throw new BadRequestError();
    }
    await prisma.announcement.create({
      data: {
        createdAt: new Date(),
        title,
        body,
      }
    });
  }

  @OnUndefined(204)
  @Put() async update(@CurrentUser({ required: true }) user: IUser, @Body() {id, title, body}: AnnounceUpdate) {
    if (!user.isAdmin) {
      throw new BadRequestError('Not an Admin');
    }
    if (!id || !title || !body) {
      throw new BadRequestError();
    }
    const announcement = await prisma.announcement.findUnique({ where: {id} });
    if (announcement == null) {
      throw new NotFoundError();
    }

    await prisma.announcement.update({
      where: {id},
      data: {
        title,
        body,
      }
    });
  }

  @OnUndefined(204)
  @Post('/like/:id') async like(@CurrentUser({ required: true }) user: IUser, @Param('id') id: string) {
    if (!user.isAdmin) {
      throw new BadRequestError('Not an Admin');
    }
    const idNumber = Number(id);
    if (isNaN(idNumber)) {
      throw new NotFoundError();
    }
    if (!id) {
      throw new BadRequestError();
    }

    const announcement = await prisma.announcement.findUnique({ where: {id: Number(idNumber)}});

    if (!announcement) {
      throw new NotFoundError();
    }

    await prisma.announcement.update({
      where: {id: Number(idNumber)},
      data: {
        like: announcement.like + 1,
      }
    });

    return announcement.like + 1;
  }

  @Delete() async delete(@CurrentUser({ required: true }) user: IUser, @Body() {id}: IdProp) {
    if (!user.isAdmin) {
      throw new BadRequestError('Not an Admin');
    }

    if (!id) {
      throw new BadRequestError();
    }

    await prisma.announcement.delete({where: {id}});
  }

  @Get('/:id') async getDetail(@Param('id') id: string) {
    const idNumber = Number(id);
    if (isNaN(idNumber)) {
      throw new NotFoundError();
    }
    const announcement = await prisma.announcement.findUnique({where: {id: idNumber}});
    if (!announcement) {
      throw new NotFoundError();
    }
    return announcement;
  }
}
