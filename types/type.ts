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
    description:string
}