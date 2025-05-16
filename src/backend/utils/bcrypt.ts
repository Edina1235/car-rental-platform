import bcrypt from 'bcrypt';

export class Bcrypt {
  static SALT_ROUNDS = 10;
  static hashPassword(password: string): string {
    let hashedPassword = ""
    hashedPassword = bcrypt.hashSync(password, Bcrypt.SALT_ROUNDS);

    if (hashedPassword === "") {
      throw new Error("Could not hash password")
    }
    return hashedPassword
  }

  static comparePassword(hashedPassword: string, passport: string): boolean {
    return bcrypt.compareSync(passport, hashedPassword);
  }

}
