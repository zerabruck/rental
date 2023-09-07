export interface HomeService{
    id:number,
    icon:string,
    title:string,
    information:string
}
export interface HomeInterest{
    id:number,
    url:string,
    propertyType:string,
    propertyAmount:number
}
export interface HomeStep{
    id:number,
    url:string,
    title:string,
    description:string,
    backGroundColor:string
}
export interface House{
    id:string,
    name:string,
    address:string,
    coverPhotoUrl:string,
    picturesUrl:string[]
    description:string,
    houseType:string,
    numberOfBathrooms:number,
    numberOfBedrooms:number,
    propertySize:number,
    price:number,
    userId:string,
    wantTo:string
}
export interface User{
    name:string,
    email:string,
    phoneNumber:string,
    profilePicture:string,
    userId:string
}