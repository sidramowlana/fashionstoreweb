import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/Product.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { WishlistService } from 'src/app/services/Wishlist.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RateReviewServie } from 'src/app/services/RateReview.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-item-card',
  templateUrl: './product-item-card.component.html',
  styleUrls: ['./product-item-card.component.css']
})
export class ProductItemCardComponent implements OnInit {


  @Input() productElement: Product;
  @Input() index: number;
  isFavourite: boolean;
  message: String;
  isLogged;
  wishlistProduct: any;
  product: Product;
  totalRate;
  average;
  rateReviewList;
  
  constructor(private authService: AuthenticationService,private toastr:ToastrService,
    private wishlistService: WishlistService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private rateReviewService:RateReviewServie) { }

  ngOnInit() {
    this.wishlistService.getAWishlistProductService(this.productElement.productId).subscribe((data) => {
      this.wishlistProduct = data;
      if (data != null) {
        if (this.wishlistProduct.product.productId == this.productElement.productId) {
          this.isFavourite = true
        }
        else {
          this.isFavourite = false;
        }
       
      }
    });
    this.rateReviewService.onGetRateReviewByProductId(this.index).subscribe(data => {
      if (data.length != 0)
      {
        console.log(data);
        this.rateReviewList = data;
        this.average = this.rateReviewService.onCalculateAverage(this.rateReviewList);
      }
    });
  }
 

  onAddRemoveWishList(productId) {
    this.wishlistService.onAddRemoveWishlistService(productId).subscribe(() => {
      if (this.isFavourite == true) {
        this.isFavourite = false;
        console.log("item: "+this.isFavourite)
        this.wishlistService.wishListFavouriteChange.next(this.isFavourite);
        console.log("item: " + this.isFavourite)
        this.wishlistService.wishListFavouriteChange.next(this.isFavourite);
        this.toastr.success("Removed from your wishlist");

      }
      else {
        this.isFavourite = true;
        console.log("item: " + this.isFavourite)
        this.wishlistService.wishListFavouriteChange.next(this.isFavourite);
        this.toastr.success("Added to your wishlist");

      }
    },
      err => {
        console.log("error is: " + err.error.error.message);
        console.log("error is: " + err.error.error.stack);
      }
    );
  }

  onDetails(index) {
    // this.router.navigate([index+'/details/'+index],{relativeTo:this.activatedRoute});    
    this.router.navigate(['products/details/'+index],{relativeTo:this.activatedRoute});
  }
}