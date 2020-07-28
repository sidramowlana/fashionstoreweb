
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { ProductListComponent } from './product-list/product-list.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailComponent } from './product-list/product-detail/product-detail.component';
import { AdminProductComponent } from './Admin/admin-product/admin-product.component';
import { AddProductComponent } from './Admin/admin-product/add-product/add-product.component';
import { AdminCategoryComponent } from './Admin/admin-category/admin-category.component';
import { EditViewProductComponent } from './Admin/admin-product/edit-view-product/edit-view-product.component';
import { OverallInquiriesComponent } from './Admin/overall-inquiries/overall-inquiries.component';
import { AdminInquiryComponent } from './Admin/overall-inquiries/admin-inquiry/admin-inquiry.component';
import { AdminInquiryItemReplyComponent } from './Admin/overall-inquiries/admin-inquiry/admin-inquiry-item-reply/admin-inquiry-item-reply.component';
import { AdminInquiryReplyComponent } from './Admin/overall-inquiries/admin-inquiry-reply/admin-inquiry-reply.component';

const appRoutes: Routes =
    [
        { path: '', redirectTo: '/home', pathMatch: 'full' },
        { path: 'home', redirectTo: '/home', pathMatch: 'full' },
        { path: 'null', redirectTo: '/home', pathMatch: 'full' },
        {
            path: 'home', component: HomeComponent,
            children: [
                { path: '', component: ProductListComponent },
                { path: ':id', component: ProductDetailComponent }
            ]
        },
        { path: 'register', component: RegisterComponent },
        { path: 'login', component: LoginComponent },
        {
            path: 'products', component: AdminProductComponent, children:
                [
                    { path: 'new', component: AddProductComponent },
                    { path: 'productdetail/:id', component: EditViewProductComponent }
                ]
        },
        {
            path: 'category', component: AdminCategoryComponent, children: [
                { path: 'category', component: AddProductComponent }
            ]
        },
        // {path:'inquiries',component:OverallInquiriesComponent,children}
        {
            path: 'inquiries', component: OverallInquiriesComponent, children:
                [
                    { path: '', redirectTo: '/inquiries/inquiry', pathMatch: 'full' },
                { path: 'replies', redirectTo: '/inquiries/replies', pathMatch: 'full' },
                {
                    path: 'inquiry', component: AdminInquiryComponent, children: [
                        { path: ':id', component: AdminInquiryItemReplyComponent }
                    ]
                },
                { path: 'replies', component: AdminInquiryReplyComponent }
                ]
        },

        // {
        //     path: 'inquiries', component: AdminInquiryComponent, children: [
        //         { path: ':id', component: AdminInquiryItemReplyComponent },
        //         { path: 'replies-all', component: AdminInquiriesRepliesListComponent }

        //     ]
        // },
        // { path: 'replies', component: AdminInquiryListComponent }


    ];
@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})

export class AppRoutingModule {

}