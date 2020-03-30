import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { MerchantService } from './merchant/merchant.service';
import { UserService } from './user/user.service';
import { ExportService } from './merchant/export.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ServicesModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: ServicesModule,
      providers: [
        UserService,
        MerchantService,
        ExportService
      ]
    };
  }
 }
