// src/types/express.d.ts
import "express";

declare global {
  namespace Express {
    // Itt mondjuk meg, hogy a passport által betett user milyen alakú
    interface User {
      id: number;
      email: string;
    }
  }
}

export {};
