import { Request, Response, NextFunction } from 'express';
import prisma from '../config/db';
import { Prisma } from '@prisma/client';

export const getAllProspects = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { search } = req.query;
    const where: Prisma.ProspectWhereInput = search
      ? {
          OR: [
            { name: { contains: search as string, mode: 'insensitive' } },
            { email: { contains: search as string, mode: 'insensitive' } },
            { company: { contains: search as string, mode: 'insensitive' } },
          ],
        }
      : {};

    const prospects = await prisma.prospect.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
    res.status(200).json(prospects);
  } catch (error) {
    next(error);
  }
};

export const createProspect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newProspect = await prisma.prospect.create({
      data: req.body,
    });
    res.status(201).json(newProspect);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return res.status(409).json({ message: 'A prospect with this email already exists.' });
    }
    next(error);
  }
};

export const getProspectById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const prospect = await prisma.prospect.findUnique({
      where: { id },
    });
    if (!prospect) {
      return res.status(404).json({ message: 'Prospect not found' });
    }
    res.status(200).json(prospect);
  } catch (error) {
    next(error);
  }
};

export const updateProspect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updatedProspect = await prisma.prospect.update({
      where: { id },
      data: req.body,
    });
    res.status(200).json(updatedProspect);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return res.status(404).json({ message: 'Prospect not found' });
    }
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return res.status(409).json({ message: 'A prospect with this email already exists.' });
    }
    next(error);
  }
};

export const deleteProspect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await prisma.prospect.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return res.status(404).json({ message: 'Prospect not found' });
    }
    next(error);
  }
};