class Parcel {
  constructor(id, userId, receipientname, weight, destinationtown, destinationcountry) {
    this.id = id;
    this.userId = userId;
    this.receipientname = receipientname;
    this.weight = weight;
    this.destinationtown = destinationtown;
    this.destinationcountry = destinationcountry;
  }
}

export default Parcel;
