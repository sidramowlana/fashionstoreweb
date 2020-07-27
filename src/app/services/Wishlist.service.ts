import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TokenStorageService } from "./tokenStorage.service";
import { ActivatedRoute } from "@angular/router";
import { Observable, Subject } from "rxjs";
import { Wishlist } from "../models/Wishlist.model";


const API = 'http://localhost:8080/api/wishlist/';
headers: new HttpHeaders({ 'Content-Type': 'application/json' })

const getHttpOptions = (token: String) => {
    return {
        headers: new HttpHeaders({ 'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        })
    }
}


@Injectable()
export class WishlistService {
    wishListFavouriteChange = new Subject<boolean>();
    // vehicleEditChange = new Subject<Vehicle>();

    constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) {

    }

    onAddRemoveWishlistService(productId): Observable<any> {
        const localHttpOptions = getHttpOptions(this.tokenStorageService.getToken());
        return this.http.post<any>(API + "add-wishlist/" + productId, {}, localHttpOptions);
    }
    getAllWishlistProductService():Observable<any>{
        const localHttpOptions = getHttpOptions(this.tokenStorageService.getToken());
        return this.http.get<any>(API+"wishlistAll/",localHttpOptions);
    }
    getAWishlistProductService(productId):Observable<any>{
        const localHttpOptions = getHttpOptions(this.tokenStorageService.getToken());
        return this.http.get<any>(API+"product/"+productId,localHttpOptions);
    }


}