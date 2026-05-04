import { Role } from "@prisma/client";

export function isAdmin(user: any) {
  return user?.role === Role.ADMIN;
}

export function isMember(user: any) {
  return user?.role === Role.MEMBER;
}