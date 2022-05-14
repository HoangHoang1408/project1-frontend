/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum OrderStatus {
  Completed = "Completed",
  CustomerCancelled = "CustomerCancelled",
  CustomerReject = "CustomerReject",
  DriverAbort = "DriverAbort",
  DriverDelivered = "DriverDelivered",
  DriverDelivering = "DriverDelivering",
  PendingOrder = "PendingOrder",
  RestaurantCooked = "RestaurantCooked",
  RestaurantCooking = "RestaurantCooking",
  RestaurantReject = "RestaurantReject",
}

export enum PaymentMethods {
  ByCash = "ByCash",
}

export enum UserRole {
  Admin = "Admin",
  Customer = "Customer",
  Driver = "Driver",
  Owner = "Owner",
}

export interface AddDishCommentInput {
  text: string;
  rating: number;
  orderItemId: string;
}

export interface ChoosenOptionInputType {
  typeName: string;
  optionName: string;
}

export interface CoordinateInputType {
  latitude: number;
  longtitude: number;
}

export interface CreateOrderInput {
  deliveryAddress: string;
  addressCoordinates: CoordinateInputType;
  addressDetail?: string | null;
  deliveryNote?: string | null;
  deliveryTime: any;
  method: PaymentMethods;
  orderItemsInput: CreateOrderItemInput[];
  restaurantId: string;
}

export interface CreateOrderItemInput {
  extraRequirement: string;
  quantity: number;
  choosenOptions?: ChoosenOptionInputType[] | null;
  dishId: string;
}

export interface ForgotPasswordInput {
  email: string;
}

export interface GetDishBySlugInput {
  slug: string;
}

export interface GetOrderInput {
  orderId: number;
}

export interface GetOrdersInput {
  orderStatus?: OrderStatus | null;
}

export interface GetRestaurantInput {
  restaurantId: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface SignUpInput {
  email: string;
  password: string;
  name: string;
  role: UserRole;
}

export interface UpdateOrderStatusInput {
  orderStatus: OrderStatus;
  orderId: number;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
