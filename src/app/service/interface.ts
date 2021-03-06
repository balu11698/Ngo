export interface personDetails {
    firstname: string,
    middlename: string,
    lastname: string,
    gender: string,
    age: string,
    idType: string,
    idNumber: string,
    occupation: string,
    skills: string,
    address: string,
    city: string,
    district: string,
    state: string,
    pincode: string,
    email: string,
    phonenumber: string,
    associated_ngo: string,
    affectedDate: string,
    affectedReason: string,
    additionalDetail: string,
    submitterDetail: string,
    id: string,
    action: string,
    submitterName: string,
    submitterContact: string,
    isSolved: string,
    createdAt: string,
    resolvedAt: string
}

export interface MapPoint {
    name: string;
    latitude: number;
    longitude: number;
  }
export interface totalData {
    "totalCases":number,
    "resolvedCases":number
}

export interface applicantDetails{
    applicationId:string
    applicationStatus:string
    appliedOn:string
    comments:string
    email:string
    fullname:string
    phonenumber:string
    resume:string
    id:string
}
export interface totalRegisteredData{
    count:string
}