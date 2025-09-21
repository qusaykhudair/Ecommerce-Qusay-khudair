export type ProdctsType = {
sold?: number,
images: string[],
subcategory : SubcategoryType ,
ratingsQuantity: number,
_id: string,
title: string,
description: string,
price: number,
quantity: number,
slug: string,
imageCover: string,
category: CategoryType,
brand: BrandType,
createdAt: string,
updatedAt: string,
id : string,
ratingsAverage: number,
};


type SubcategoryType = {
_id: string,
name: string,
slug: string,
category: string
}

export type CategoryType = {
    _id: string,
name: string,
slug: string,
category: string,
image: string}

type BrandType = {
    _id: string,
name: string,
slug: string,
category: string}

export type OrderType = {
  _id: string;
  orderItems: {
    product: {
      title: string;
      imageCover: string;
    };
    count: number;
    price: number;
  }[];
  shippingAddress: {
    details: string;
    city: string;
    phone: string;
  };
  totalPrice: number;
  status: string;
  createdAt: string;
};
