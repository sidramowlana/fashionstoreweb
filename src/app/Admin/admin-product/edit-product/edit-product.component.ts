import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/Product.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Product } from 'src/app/models/Product.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  editProductForm: FormGroup;
  product: Product;
  id;
  productName;
  description;
  price;
  quantity;
  scaledImage;
  editMode;
  
  constructor(private productService: ProductService,private toastr:ToastrService,
    private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = true;

        this.initForm();

        console.log("this is id: " + this.id);
        this.productService.onGetProductByProductIdService(this.id).subscribe(data => {
          this.product = data;
          console.log(this.product);
          this.productName = this.product.productName
          this.description = this.product.shortDescription
          this.price = this.product.price
          this.quantity = this.product.quantity
          this.scaledImage = this.product.scaledImage
        });
      }
    );
  }

  initForm() {
    if (this.editMode) {
      this.productService.onGetProductByProductIdService(this.id).subscribe(data => {
        this.editProductForm.setValue({
          scaledImage: data.scaledImage,
          productName: data.productName,
          price: data.price,
          quantity: data.quantity,
          shortDescription: data.shortDescription
        });
      });
    }
    this.editProductForm = new FormGroup({
      'scaledImage': new FormControl(null, Validators.required),
      'productName': new FormControl(null, Validators.required),
      'price': new FormControl(null, Validators.required),
      'quantity': new FormControl(null, Validators.required),
      'shortDescription': new FormControl(null, Validators.required)
    });
  }
  onUpdateProduct() {
    this.productService.onUpdateProduct(this.id, this.editProductForm).subscribe(data => {
      this.toastr.success("Successfully updated")
      this.editProductForm.reset();
    }, err => {
      this.toastr.error(err.error.message);
    });
  }
  onClose() {
    this.router.navigate(['/admin-products'], { relativeTo: this.activatedRoute });
  }
}
