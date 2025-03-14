// src/types/express.d.ts
import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: any;  // Declara que el objeto Request puede tener una propiedad 'user'
    }
  }
}
