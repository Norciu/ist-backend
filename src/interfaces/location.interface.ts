export interface Location {
  clientInfo?: LocationOwner;
  address: LocationAddress;
  technology: string;
}

export interface LocationAddress {
  city: string;
  street: string;
  flatNo?: string;
  homeNo: string;
  plotNo?: string;
}

export type LocationOwner = LocationOwnerCompany | LocationOwnerPerson;

export interface LocationOwnerCompany{
  clientType: '2';
  companyName: string;
  firstName: string;
  lastName: string;
  phoneNo?: string;
  email?: string;
}

export interface LocationOwnerPerson {
  clientType: '1';
  firstName: string;
  lastName: string;
  phoneNo?: string;
  email?: string;
}
