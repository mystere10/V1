class User {
  constructor(id, fname, lname, email, phone, password) {
    this.id = id;
    this.fname = fname;
    this.lname = lname;
    this.email = email;
    this.phone = phone;
    this.password = password;
  }

  // setPassword(password) {
  //   // eslint-disable-next-line no-return-assign
  //   return this.password = password;
  // }
}
export default User;
