import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TokenStorageService } from "./tokenStorage.service";
import { Observable, Subject } from "rxjs";
import { ProductInquiry } from "../models/ProductInquiry.model";

const API = 'http://localhost:8080/api/inquiry/';


const getHttpOptions = (token: String) => {
    return {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        })
    }
}

@Injectable()
export class ProductInquiryService {
    productInquiryListUpdate= new Subject<ProductInquiry[]>();
    constructor(private http: HttpClient,
        private tokenStorageService: TokenStorageService) {
    }
    onAddProductInquiryByProductIdService(id,formData,date):Observable<any>{
        const localHttpOptions = getHttpOptions(this.tokenStorageService.getToken());
        console.log('date: '+date)
        return this.http.post(API + 'product/'+id,{
            question:formData.value.question,
            date:date
        },localHttpOptions);    
    }

    onGetAllInquiriesNotAnswered(isAnswered:boolean): Observable<any> {
        const localHttpOptions = getHttpOptions(this.tokenStorageService.getToken());
        return this.http.get(API + 'answered/'+isAnswered, localHttpOptions);
    }

    onGetInquiryByIdService(id): Observable<any> {
        const localHttpOptions = getHttpOptions(this.tokenStorageService.getToken());
        return this.http.get(API + 'product/' + id, localHttpOptions);
    }

    onAddAnswerByProductInquiryIdService(id, formData): Observable<any> {
        const localHttpOptions = getHttpOptions(this.tokenStorageService.getToken());
        return this.http.post<any>(API + 'product-answer/' + id,
            { answers: formData.value.answers },
            localHttpOptions);
    }
    onGetAllProductInquiryByProductId(productId):Observable<any>{
        const localHttpOptions = getHttpOptions(this.tokenStorageService.getToken());
        return this.http.get(API + 'product-all/' + productId, localHttpOptions);
    }
}