export interface AuthorTypes{
    fullName:string;
    age:number;
    gender:string;
    contactDetails:string;
    email:string;
    socialMediaLinks:string;
    previousWork:string;
    previousWorkLink:string;
    bio:string;
    education:string;
    currentOrganization:string;
    domain:string;
    otherDomain:string;
    profilePicture:File | null;



}

interface ImageFormat {
    ext: string;
    url: string;
    hash: string;
    mime: string;
    blurhash: string;
    name: string;
    path: string | null;
    size: number;
    width: number;
    height: number;
  }
  
  export interface ImageAttributes {
    // To Do reduce incomming objects (query optimization)
  
    id: number;
    name: string;
    alternativeText: string;
    caption: string;
    width: number;
    height: number;
    formats: {
      small: ImageFormat;
      thumbnail: ImageFormat;
    };
    blurhash: string;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
  
    previewUrl: string | null;
    provider: string;
    provider_metadata: any | null;
    createdAt: string;
    updatedAt: string;
  }