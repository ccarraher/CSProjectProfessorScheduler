export interface User {
  readonly netId: number;
  readonly firstName: string;
  readonly lastName: string;
  readonly role: Role;
  readonly authToken: string;
}

export interface Role {
  readonly roleId: number;
  readonly type: "ADMIN" | "USER";
}
