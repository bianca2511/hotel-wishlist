export type HotelType = {
    id: number;
    name: string;
    stars: number;
    page_url: string;
    photo: string;
    facilities: string[];
  };
  
  export type Wishlist = {
    name: string;
    hotels: HotelType[];
  }

  export type WishlistWithFlag = Wishlist & {
    containsHotel: boolean;
  };
  