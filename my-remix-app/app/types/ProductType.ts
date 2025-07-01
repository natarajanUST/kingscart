export interface ProductType {
    _id: string;
    product_name: string;
    main_image?: string;
    final_price: number;
    currency: string;
    brand?: string;
    category?: string;
    in_stock?: boolean;
    url?: string;
}