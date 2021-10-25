export class DatabaseError {
  constructor(message, name, data) {
    this.type = "DatabaseError";
    this.name = name;
    this.message = message;
    this.data = data || null;
  }
}